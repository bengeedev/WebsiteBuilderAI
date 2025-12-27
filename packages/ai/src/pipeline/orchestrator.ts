import { InputValidator, type ValidationResult } from "./validators/input-validator";
import {
  PIPELINE_STEPS,
  BUSINESS_TYPE_DEFAULTS,
  FONT_RECOMMENDATIONS,
  type PipelineStep,
  type PipelineState,
  type PipelineEvent,
  type StepConfig,
} from "./types";
import { ProjectMemoryService, SessionMemoryService } from "../memory";

export type OrchestratorConfig = {
  projectId: string;
  userId: string;
  onEvent?: (event: PipelineEvent) => void;
};

export class PipelineOrchestrator {
  private projectId: string;
  private userId: string;
  private validator: InputValidator;
  private state: PipelineState;
  private projectMemory: ProjectMemoryService;
  private sessionMemory: SessionMemoryService;
  private onEvent?: (event: PipelineEvent) => void;

  constructor(config: OrchestratorConfig, initialData: Record<string, unknown> = {}) {
    this.projectId = config.projectId;
    this.userId = config.userId;
    this.onEvent = config.onEvent;

    this.validator = new InputValidator(initialData);
    this.projectMemory = new ProjectMemoryService(config.projectId);
    this.sessionMemory = new SessionMemoryService(config.projectId, config.userId);

    this.state = {
      currentStep: "discovery",
      completedSteps: [],
      data: initialData,
      pendingInputs: [],
      errors: [],
    };
  }

  // --- State Management ---

  getState(): PipelineState {
    return { ...this.state };
  }

  getCurrentStep(): StepConfig {
    return PIPELINE_STEPS.find((s) => s.id === this.state.currentStep) ?? PIPELINE_STEPS[0];
  }

  getData(): Record<string, unknown> {
    return { ...this.state.data };
  }

  // --- Input Handling ---

  async setInput(field: string, value: unknown): Promise<void> {
    this.state.data[field] = value;
    this.validator.updateData({ [field]: value });

    this.emit({ type: "INPUT_RECEIVED", field, value });

    // Remove from pending if it was pending
    this.state.pendingInputs = this.state.pendingInputs.filter((f) => f !== field);

    // Save to session WIP state
    await this.sessionMemory.setWIPState({
      currentStep: this.state.currentStep,
      partialData: this.state.data,
    });

    // If this resolves a pending question, mark it resolved
    await this.sessionMemory.resolveQuestionByField(field);
  }

  async setBulkInputs(data: Record<string, unknown>): Promise<void> {
    for (const [field, value] of Object.entries(data)) {
      await this.setInput(field, value);
    }
  }

  // --- Step Progression ---

  async startStep(step: PipelineStep): Promise<ValidationResult> {
    this.state.currentStep = step;
    this.emit({ type: "STEP_STARTED", step });

    // Validate current inputs for this step
    const validation = this.validator.validateStep(step);

    // Track required inputs as pending questions
    for (const missing of validation.missingRequired) {
      const question = this.validator.getRequiredQuestions(step).find((q) => q.field === missing.field);
      if (question) {
        await this.sessionMemory.addPendingQuestion({
          field: question.field,
          question: question.question,
          required: true,
          options: question.options,
          context: question.context,
        });

        this.emit({
          type: "INPUT_REQUIRED",
          field: question.field,
          question: question.question,
          options: question.options,
        });
      }
    }

    // Apply suggestions for fields that can be auto-generated
    if (Object.keys(validation.suggestions).length > 0) {
      for (const [field, value] of Object.entries(validation.suggestions)) {
        if (!this.validator.hasValue(field)) {
          this.state.data[field] = value;
          this.validator.updateData({ [field]: value });
          this.emit({ type: "GENERATION_COMPLETED", field, value });
        }
      }
    }

    // Update session
    await this.sessionMemory.setWIPState({
      currentStep: step,
      partialData: this.state.data,
    });

    return validation;
  }

  async completeStep(): Promise<{ success: boolean; nextStep?: PipelineStep; errors?: string[] }> {
    const validation = this.validator.validateStep(this.state.currentStep);

    if (!validation.isValid) {
      const errors = validation.missingRequired.map((r) => `Missing: ${r.label}`);
      return { success: false, errors };
    }

    // Mark step as completed
    if (!this.state.completedSteps.includes(this.state.currentStep)) {
      this.state.completedSteps.push(this.state.currentStep);
    }

    this.emit({ type: "STEP_COMPLETED", step: this.state.currentStep });

    // Save progress to project memory
    await this.saveToProjectMemory();

    // Find next step
    const currentIndex = PIPELINE_STEPS.findIndex((s) => s.id === this.state.currentStep);
    const nextStep = PIPELINE_STEPS[currentIndex + 1];

    if (nextStep) {
      return { success: true, nextStep: nextStep.id };
    }

    // Pipeline complete
    this.emit({ type: "PIPELINE_COMPLETED" });
    return { success: true };
  }

  async goToStep(step: PipelineStep): Promise<ValidationResult> {
    return this.startStep(step);
  }

  // --- Auto-Generation ---

  async generateDefaults(): Promise<void> {
    const businessType = this.state.data.businessType as string | undefined;

    if (!businessType) return;

    // Apply business type defaults
    const defaults = BUSINESS_TYPE_DEFAULTS[businessType];
    const fonts = FONT_RECOMMENDATIONS[businessType];

    if (defaults) {
      for (const [field, value] of Object.entries(defaults)) {
        if (!this.validator.hasValue(field)) {
          this.emit({ type: "GENERATION_STARTED", field });
          this.state.data[field] = value;
          this.validator.updateData({ [field]: value });
          this.emit({ type: "GENERATION_COMPLETED", field, value });
        }
      }
    }

    if (fonts) {
      if (!this.validator.hasValue("headingFont")) {
        this.state.data.headingFont = fonts.heading;
        this.validator.updateData({ headingFont: fonts.heading });
      }
      if (!this.validator.hasValue("bodyFont")) {
        this.state.data.bodyFont = fonts.body;
        this.validator.updateData({ bodyFont: fonts.body });
      }
    }

    // Derive secondary/accent colors
    const primaryColor = this.state.data.primaryColor as string | undefined;
    if (primaryColor) {
      if (!this.validator.hasValue("secondaryColor")) {
        const secondary = this.deriveSecondaryColor(primaryColor);
        this.state.data.secondaryColor = secondary;
        this.validator.updateData({ secondaryColor: secondary });
      }
    }
  }

  // --- Discovery Data ---

  async setDiscoveredInfo(info: {
    existingWebsite?: {
      url: string;
      title?: string;
      description?: string;
      colors?: string[];
      logoUrl?: string;
    };
    socialLinks?: Record<string, string>;
    contactInfo?: { email?: string; phone?: string };
    domain?: string;
  }): Promise<void> {
    // Save to project memory
    await this.projectMemory.setDiscoveredInfo(info);

    // Extract useful data
    if (info.existingWebsite) {
      if (info.existingWebsite.title && !this.validator.hasValue("businessName")) {
        await this.setInput("businessName", info.existingWebsite.title);
      }
      if (info.existingWebsite.description && !this.validator.hasValue("businessDescription")) {
        await this.setInput("businessDescription", info.existingWebsite.description);
      }
      if (info.existingWebsite.colors?.length && !this.validator.hasValue("primaryColor")) {
        await this.setInput("primaryColor", info.existingWebsite.colors[0]);
      }
      if (info.existingWebsite.logoUrl) {
        await this.setInput("logoUrl", info.existingWebsite.logoUrl);
      }
    }

    if (info.contactInfo?.email) {
      await this.setInput("existingEmail", info.contactInfo.email);
    }

    if (info.socialLinks) {
      await this.setInput("existingSocials", info.socialLinks);
    }

    if (info.domain) {
      await this.setInput("existingDomain", info.domain);
    }
  }

  // --- Memory Integration ---

  private async saveToProjectMemory(): Promise<void> {
    const { businessName, businessType, businessDescription, businessTagline, targetAudience } = this.state.data;

    await this.projectMemory.updateBusinessDetails({
      name: businessName as string,
      type: businessType as string,
      description: businessDescription as string,
      tagline: businessTagline as string | undefined,
      targetAudience: targetAudience as string[] | undefined,
    });
  }

  async loadFromSession(): Promise<void> {
    const wipState = await this.sessionMemory.getWIPState();

    if (wipState.currentStep) {
      this.state.currentStep = wipState.currentStep as PipelineStep;
    }

    if (wipState.partialData) {
      this.state.data = { ...this.state.data, ...wipState.partialData };
      this.validator.updateData(wipState.partialData);
    }
  }

  // --- Validation ---

  getRequiredQuestions(): Array<{
    field: string;
    question: string;
    options?: string[];
    context?: string;
  }> {
    return this.validator.getRequiredQuestions(this.state.currentStep);
  }

  isStepValid(step?: PipelineStep): boolean {
    const result = this.validator.validateStep(step ?? this.state.currentStep);
    return result.isValid;
  }

  getMissingFields(): string[] {
    const result = this.validator.validateStep(this.state.currentStep);
    return result.missingRequired.map((r) => r.field);
  }

  // --- Utilities ---

  private emit(event: PipelineEvent): void {
    if (this.onEvent) {
      this.onEvent(event);
    }
  }

  private deriveSecondaryColor(primary: string): string {
    const hex = primary.replace("#", "");
    const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - 50);
    const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - 50);
    const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - 50);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  // --- Static Helpers ---

  static getStepByOrder(order: number): StepConfig | undefined {
    return PIPELINE_STEPS.find((s) => s.order === order);
  }

  static getAllSteps(): StepConfig[] {
    return [...PIPELINE_STEPS];
  }
}
