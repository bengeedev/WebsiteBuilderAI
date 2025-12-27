import {
  INPUT_REQUIREMENTS,
  PIPELINE_STEPS,
  BUSINESS_TYPE_DEFAULTS,
  FONT_RECOMMENDATIONS,
  type InputRequirement,
  type PipelineStep,
  type StepConfig,
} from "../types";

export type ValidationResult = {
  isValid: boolean;
  missingRequired: InputRequirement[];
  canGenerate: InputRequirement[];
  canInfer: InputRequirement[];
  suggestions: Record<string, unknown>;
};

export class InputValidator {
  private data: Record<string, unknown>;

  constructor(data: Record<string, unknown>) {
    this.data = data;
  }

  updateData(data: Record<string, unknown>): void {
    this.data = { ...this.data, ...data };
  }

  getValue(field: string): unknown {
    return this.data[field];
  }

  hasValue(field: string): boolean {
    const value = this.data[field];
    if (value === undefined || value === null) return false;
    if (typeof value === "string" && value.trim() === "") return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  }

  validateField(field: string): { valid: boolean; error?: string } {
    const requirement = INPUT_REQUIREMENTS[field];
    if (!requirement) {
      return { valid: true };
    }

    const value = this.getValue(field);

    // Check if required
    if (requirement.required && !this.hasValue(field)) {
      return { valid: false, error: `${requirement.label} is required` };
    }

    // Run custom validation if present
    if (value && requirement.validationFn && !requirement.validationFn(value)) {
      return { valid: false, error: `Invalid ${requirement.label}` };
    }

    return { valid: true };
  }

  validateStep(step: PipelineStep): ValidationResult {
    const stepConfig = PIPELINE_STEPS.find((s) => s.id === step);
    if (!stepConfig) {
      return {
        isValid: true,
        missingRequired: [],
        canGenerate: [],
        canInfer: [],
        suggestions: {},
      };
    }

    const missingRequired: InputRequirement[] = [];
    const canGenerate: InputRequirement[] = [];
    const canInfer: InputRequirement[] = [];
    const suggestions: Record<string, unknown> = {};

    for (const input of stepConfig.inputs) {
      if (!this.hasValue(input.field)) {
        if (input.required) {
          missingRequired.push(input);
        } else {
          // Check fallback strategy
          switch (input.fallbackStrategy) {
            case "generate_default":
              if (input.aiCanGenerate) {
                canGenerate.push(input);
                const suggestion = this.suggestDefault(input.field);
                if (suggestion !== undefined) {
                  suggestions[input.field] = suggestion;
                }
              }
              break;
            case "infer_from_context":
              if (this.canInferFromContext(input)) {
                canInfer.push(input);
                const inferred = this.inferValue(input.field);
                if (inferred !== undefined) {
                  suggestions[input.field] = inferred;
                }
              }
              break;
          }
        }
      }
    }

    return {
      isValid: missingRequired.length === 0,
      missingRequired,
      canGenerate,
      canInfer,
      suggestions,
    };
  }

  validateAll(): ValidationResult {
    const allMissing: InputRequirement[] = [];
    const allCanGenerate: InputRequirement[] = [];
    const allCanInfer: InputRequirement[] = [];
    const allSuggestions: Record<string, unknown> = {};

    for (const step of PIPELINE_STEPS) {
      const result = this.validateStep(step.id);
      allMissing.push(...result.missingRequired);
      allCanGenerate.push(...result.canGenerate);
      allCanInfer.push(...result.canInfer);
      Object.assign(allSuggestions, result.suggestions);
    }

    return {
      isValid: allMissing.length === 0,
      missingRequired: allMissing,
      canGenerate: allCanGenerate,
      canInfer: allCanInfer,
      suggestions: allSuggestions,
    };
  }

  private canInferFromContext(input: InputRequirement): boolean {
    if (!input.dependsOn) return false;
    return input.dependsOn.every((dep) => this.hasValue(dep));
  }

  private suggestDefault(field: string): unknown {
    const businessType = this.data.businessType as string | undefined;

    switch (field) {
      case "primaryColor":
        return businessType
          ? BUSINESS_TYPE_DEFAULTS[businessType]?.primaryColor ?? "#2563eb"
          : "#2563eb";

      case "headingFont":
        return businessType
          ? FONT_RECOMMENDATIONS[businessType]?.heading ?? "Inter"
          : "Inter";

      case "bodyFont":
        return businessType
          ? FONT_RECOMMENDATIONS[businessType]?.body ?? "Inter"
          : "Inter";

      case "siteGoals":
        return businessType
          ? BUSINESS_TYPE_DEFAULTS[businessType]?.siteGoals ?? []
          : [];

      case "selectedSections":
        return businessType
          ? BUSINESS_TYPE_DEFAULTS[businessType]?.selectedSections ?? ["hero", "about", "contact"]
          : ["hero", "about", "contact"];

      default:
        return undefined;
    }
  }

  private inferValue(field: string): unknown {
    const primaryColor = this.data.primaryColor as string | undefined;

    switch (field) {
      case "secondaryColor":
        return primaryColor ? this.deriveSecondaryColor(primaryColor) : "#1e293b";

      case "accentColor":
        return primaryColor ? this.deriveAccentColor(primaryColor) : "#f59e0b";

      case "targetAudience":
        return this.inferTargetAudience();

      default:
        return undefined;
    }
  }

  private deriveSecondaryColor(primary: string): string {
    // Simple darkening - in production, use a proper color library
    const hex = primary.replace("#", "");
    const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - 50);
    const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - 50);
    const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - 50);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  private deriveAccentColor(primary: string): string {
    // Complementary color - simplified
    const hex = primary.replace("#", "");
    const r = 255 - parseInt(hex.slice(0, 2), 16);
    const g = 255 - parseInt(hex.slice(2, 4), 16);
    const b = 255 - parseInt(hex.slice(4, 6), 16);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  private inferTargetAudience(): string[] {
    const businessType = this.data.businessType as string | undefined;
    const description = this.data.businessDescription as string | undefined;

    // Basic inference based on business type
    const audienceMap: Record<string, string[]> = {
      restaurant: ["Food lovers", "Local diners", "Families"],
      portfolio: ["Potential clients", "Recruiters", "Collaborators"],
      business: ["Business owners", "Decision makers", "Companies"],
      ecommerce: ["Online shoppers", "Value seekers", "Product enthusiasts"],
      blog: ["Readers", "Enthusiasts", "Knowledge seekers"],
      fitness: ["Health-conscious individuals", "Athletes", "Beginners"],
    };

    return businessType ? audienceMap[businessType] ?? [] : [];
  }

  getRequiredQuestions(step: PipelineStep): Array<{
    field: string;
    question: string;
    options?: string[];
    context?: string;
  }> {
    const result = this.validateStep(step);
    const questions: Array<{
      field: string;
      question: string;
      options?: string[];
      context?: string;
    }> = [];

    for (const input of result.missingRequired) {
      questions.push(this.buildQuestion(input));
    }

    return questions;
  }

  private buildQuestion(input: InputRequirement): {
    field: string;
    question: string;
    options?: string[];
    context?: string;
  } {
    const questionMap: Record<string, { question: string; options?: string[]; context?: string }> = {
      businessType: {
        question: "What type of business is this website for?",
        options: ["Restaurant & Food", "Portfolio & Creative", "Business & Services", "E-commerce & Shop", "Blog & Content", "Fitness & Health"],
        context: "This helps us choose the right template and features",
      },
      businessName: {
        question: "What's the name of your business?",
        context: "This will be used throughout your website",
      },
      businessDescription: {
        question: "Tell me about your business in a few sentences.",
        context: "Describe what you do, who you serve, and what makes you unique",
      },
    };

    return {
      field: input.field,
      ...(questionMap[input.field] ?? {
        question: `What is your ${input.label.toLowerCase()}?`,
      }),
    };
  }
}
