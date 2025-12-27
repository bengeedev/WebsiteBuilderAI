// ============================================
// WEBSITE BUILDING PIPELINE TYPES
// ============================================

export type PipelineStep =
  | "discovery"
  | "business_info"
  | "branding"
  | "structure"
  | "content"
  | "refinement";

export type FallbackStrategy =
  | "ask_user"           // Always ask user for this
  | "generate_default"   // AI generates if missing
  | "infer_from_context" // Derive from other data
  | "skip";              // Proceed without it

export type InputRequirement = {
  field: string;
  label: string;
  required: boolean;
  fallbackStrategy: FallbackStrategy;
  aiCanGenerate: boolean;
  validationFn?: (value: unknown) => boolean;
  dependsOn?: string[];
};

export type StepConfig = {
  id: PipelineStep;
  name: string;
  description: string;
  inputs: InputRequirement[];
  order: number;
};

// Input requirements matrix
export const INPUT_REQUIREMENTS: Record<string, InputRequirement> = {
  // Discovery inputs
  existingWebsite: {
    field: "existingWebsite",
    label: "Existing website URL",
    required: false,
    fallbackStrategy: "skip",
    aiCanGenerate: false,
  },
  existingSocials: {
    field: "existingSocials",
    label: "Social media accounts",
    required: false,
    fallbackStrategy: "skip",
    aiCanGenerate: false,
  },
  existingDomain: {
    field: "existingDomain",
    label: "Domain name",
    required: false,
    fallbackStrategy: "skip",
    aiCanGenerate: false,
  },
  existingEmail: {
    field: "existingEmail",
    label: "Contact email",
    required: false,
    fallbackStrategy: "skip",
    aiCanGenerate: false,
  },

  // Business info inputs (REQUIRED)
  businessType: {
    field: "businessType",
    label: "Business type",
    required: true,
    fallbackStrategy: "ask_user",
    aiCanGenerate: false,
    validationFn: (v) => typeof v === "string" && v.length > 0,
  },
  businessName: {
    field: "businessName",
    label: "Business name",
    required: true,
    fallbackStrategy: "ask_user",
    aiCanGenerate: false,
    validationFn: (v) => typeof v === "string" && v.length > 0,
  },
  businessDescription: {
    field: "businessDescription",
    label: "Business description",
    required: true,
    fallbackStrategy: "ask_user",
    aiCanGenerate: true,
    validationFn: (v) => typeof v === "string" && v.length > 10,
  },
  businessTagline: {
    field: "businessTagline",
    label: "Business tagline",
    required: false,
    fallbackStrategy: "generate_default",
    aiCanGenerate: true,
  },

  // Branding inputs
  primaryColor: {
    field: "primaryColor",
    label: "Primary brand color",
    required: false,
    fallbackStrategy: "generate_default",
    aiCanGenerate: true,
    validationFn: (v) => typeof v === "string" && /^#[0-9A-Fa-f]{6}$/.test(v),
  },
  secondaryColor: {
    field: "secondaryColor",
    label: "Secondary color",
    required: false,
    fallbackStrategy: "infer_from_context",
    aiCanGenerate: true,
    dependsOn: ["primaryColor"],
  },
  accentColor: {
    field: "accentColor",
    label: "Accent color",
    required: false,
    fallbackStrategy: "infer_from_context",
    aiCanGenerate: true,
    dependsOn: ["primaryColor"],
  },
  headingFont: {
    field: "headingFont",
    label: "Heading font",
    required: false,
    fallbackStrategy: "generate_default",
    aiCanGenerate: true,
  },
  bodyFont: {
    field: "bodyFont",
    label: "Body font",
    required: false,
    fallbackStrategy: "generate_default",
    aiCanGenerate: true,
  },
  logoUrl: {
    field: "logoUrl",
    label: "Logo",
    required: false,
    fallbackStrategy: "skip",
    aiCanGenerate: false,
  },

  // Structure inputs
  targetAudience: {
    field: "targetAudience",
    label: "Target audience",
    required: false,
    fallbackStrategy: "infer_from_context",
    aiCanGenerate: true,
    dependsOn: ["businessType", "businessDescription"],
  },
  siteGoals: {
    field: "siteGoals",
    label: "Website goals",
    required: false,
    fallbackStrategy: "generate_default",
    aiCanGenerate: true,
    dependsOn: ["businessType"],
  },
  selectedSections: {
    field: "selectedSections",
    label: "Site sections",
    required: false,
    fallbackStrategy: "generate_default",
    aiCanGenerate: true,
    dependsOn: ["businessType"],
  },
};

// Step configurations
export const PIPELINE_STEPS: StepConfig[] = [
  {
    id: "discovery",
    name: "Discovery",
    description: "Gather existing business assets",
    order: 1,
    inputs: [
      INPUT_REQUIREMENTS.existingWebsite,
      INPUT_REQUIREMENTS.existingSocials,
      INPUT_REQUIREMENTS.existingDomain,
      INPUT_REQUIREMENTS.existingEmail,
    ],
  },
  {
    id: "business_info",
    name: "Business Information",
    description: "Core business details",
    order: 2,
    inputs: [
      INPUT_REQUIREMENTS.businessType,
      INPUT_REQUIREMENTS.businessName,
      INPUT_REQUIREMENTS.businessDescription,
      INPUT_REQUIREMENTS.businessTagline,
    ],
  },
  {
    id: "branding",
    name: "Branding",
    description: "Visual identity",
    order: 3,
    inputs: [
      INPUT_REQUIREMENTS.primaryColor,
      INPUT_REQUIREMENTS.secondaryColor,
      INPUT_REQUIREMENTS.accentColor,
      INPUT_REQUIREMENTS.headingFont,
      INPUT_REQUIREMENTS.bodyFont,
      INPUT_REQUIREMENTS.logoUrl,
    ],
  },
  {
    id: "structure",
    name: "Site Structure",
    description: "Goals and sections",
    order: 4,
    inputs: [
      INPUT_REQUIREMENTS.targetAudience,
      INPUT_REQUIREMENTS.siteGoals,
      INPUT_REQUIREMENTS.selectedSections,
    ],
  },
  {
    id: "content",
    name: "Content Generation",
    description: "Generate site content",
    order: 5,
    inputs: [],
  },
  {
    id: "refinement",
    name: "Refinement",
    description: "User edits and adjustments",
    order: 6,
    inputs: [],
  },
];

// Pipeline state
export type PipelineState = {
  currentStep: PipelineStep;
  completedSteps: PipelineStep[];
  data: Record<string, unknown>;
  pendingInputs: string[];
  errors: Array<{ field: string; message: string }>;
};

// Pipeline events
export type PipelineEvent =
  | { type: "STEP_STARTED"; step: PipelineStep }
  | { type: "INPUT_REQUIRED"; field: string; question: string; options?: string[] }
  | { type: "INPUT_RECEIVED"; field: string; value: unknown }
  | { type: "STEP_COMPLETED"; step: PipelineStep }
  | { type: "GENERATION_STARTED"; field: string }
  | { type: "GENERATION_COMPLETED"; field: string; value: unknown }
  | { type: "ERROR"; field: string; message: string }
  | { type: "PIPELINE_COMPLETED" };

// Business type defaults
export const BUSINESS_TYPE_DEFAULTS: Record<string, Partial<Record<string, unknown>>> = {
  restaurant: {
    primaryColor: "#dc2626", // Red
    siteGoals: ["Showcase menu", "Enable reservations", "Show location & hours"],
    selectedSections: ["hero", "menu", "about", "gallery", "contact", "location"],
  },
  portfolio: {
    primaryColor: "#0f172a", // Dark slate
    siteGoals: ["Showcase work", "Attract clients", "Share expertise"],
    selectedSections: ["hero", "portfolio", "about", "services", "testimonials", "contact"],
  },
  business: {
    primaryColor: "#2563eb", // Blue
    siteGoals: ["Generate leads", "Build trust", "Explain services"],
    selectedSections: ["hero", "services", "about", "team", "testimonials", "contact", "cta"],
  },
  ecommerce: {
    primaryColor: "#16a34a", // Green
    siteGoals: ["Drive sales", "Showcase products", "Build trust"],
    selectedSections: ["hero", "featured-products", "categories", "about", "testimonials", "contact"],
  },
  blog: {
    primaryColor: "#7c3aed", // Purple
    siteGoals: ["Share content", "Build audience", "Establish authority"],
    selectedSections: ["hero", "featured-posts", "categories", "about", "newsletter", "contact"],
  },
  fitness: {
    primaryColor: "#ea580c", // Orange
    siteGoals: ["Attract members", "Show programs", "Enable booking"],
    selectedSections: ["hero", "programs", "trainers", "schedule", "pricing", "testimonials", "contact"],
  },
};

// Font recommendations by business type
export const FONT_RECOMMENDATIONS: Record<string, { heading: string; body: string }> = {
  restaurant: { heading: "Playfair Display", body: "Lato" },
  portfolio: { heading: "Space Grotesk", body: "Inter" },
  business: { heading: "Inter", body: "Inter" },
  ecommerce: { heading: "Poppins", body: "Open Sans" },
  blog: { heading: "Merriweather", body: "Source Sans Pro" },
  fitness: { heading: "Montserrat", body: "Roboto" },
};
