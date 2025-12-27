/**
 * Block System Type Definitions
 *
 * Core types for the composable block-based website builder.
 * Blocks are elementary building units that can be composed into pages.
 */

// ============================================
// BLOCK CATEGORIES
// ============================================

export type BlockCategory = "structural" | "content" | "functional";

// ============================================
// LAYOUT CONFIGURATION
// ============================================

export type ResponsiveValue<T> = {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
};

export type LayoutConfig = {
  /** Container width: full-width, boxed, or narrow */
  container: "full" | "boxed" | "narrow";
  /** Padding for the section */
  padding: ResponsiveValue<string>;
  /** Grid configuration for multi-column layouts */
  grid?: {
    columns: ResponsiveValue<number>;
    gap: ResponsiveValue<string>;
  };
  /** Flex configuration for flex layouts */
  flex?: {
    direction: ResponsiveValue<"row" | "column">;
    align: "start" | "center" | "end" | "stretch";
    justify: "start" | "center" | "end" | "between" | "around";
    gap: ResponsiveValue<string>;
  };
  /** Min height for the section */
  minHeight?: ResponsiveValue<string>;
  /** Background configuration */
  background?: {
    type: "color" | "gradient" | "image" | "video";
    value: string;
    overlay?: string;
  };
};

// ============================================
// CONTENT SCHEMA
// ============================================

export type SchemaFieldType =
  | "text"
  | "richtext"
  | "image"
  | "video"
  | "link"
  | "array"
  | "object"
  | "color"
  | "select"
  | "boolean"
  | "number";

export type SchemaField = {
  name: string;
  type: SchemaFieldType;
  label: string;
  required?: boolean;
  default?: unknown;
  placeholder?: string;
  options?: { label: string; value: string }[]; // For select fields
  fields?: SchemaField[]; // For object/array fields
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
};

export type BlockSchema = {
  fields: SchemaField[];
};

// ============================================
// AI HINTS
// ============================================

export type AIBlockHints = {
  /** Example prompts that would use this block */
  triggers: string[];
  /** Content generation guidelines */
  contentGuidelines: string;
  /** When to use this block vs alternatives */
  useCases: string[];
  /** Priority for AI selection (higher = preferred) */
  priority: number;
};

// ============================================
// BLOCK VARIANT
// ============================================

export type BlockVariant = {
  /** Unique identifier for the variant */
  id: string;
  /** Human-readable name */
  name: string;
  /** Description of the variant style */
  description: string;
  /** Preview image URL (for variant picker) */
  preview?: string;
  /** Layout configuration for this variant */
  layout: LayoutConfig;
  /** Which schema fields are rendered in this variant */
  supportedContent: string[];
  /** Additional CSS classes for this variant */
  className?: string;
};

// ============================================
// BLOCK TYPE DEFINITION
// ============================================

export type BlockType = {
  /** Unique identifier (e.g., "hero", "text-with-image") */
  id: string;
  /** Human-readable name */
  name: string;
  /** Block category */
  category: BlockCategory;
  /** Description for users and AI */
  description: string;
  /** Available layout variants */
  variants: BlockVariant[];
  /** Default variant ID */
  defaultVariant: string;
  /** Content schema defining what data this block needs */
  schema: BlockSchema;
  /** Which design tokens this block uses */
  styleTokens: string[];
  /** Hints for AI content generation */
  aiHints: AIBlockHints;
  /** Icon for the block picker */
  icon?: string;
};

// ============================================
// STYLE OVERRIDES
// ============================================

export type StyleOverrides = {
  /** Override background */
  background?: LayoutConfig["background"];
  /** Override padding */
  padding?: ResponsiveValue<string>;
  /** Custom CSS classes */
  className?: string;
  /** Inline styles */
  style?: Record<string, string>;
};

// ============================================
// RESPONSIVE VISIBILITY
// ============================================

export type ResponsiveVisibility = {
  base: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
};

// ============================================
// BLOCK INSTANCE (Actual usage on a page)
// ============================================

export type BlockInstance = {
  /** Unique instance ID */
  id: string;
  /** Reference to BlockType.id */
  blockType: string;
  /** Reference to BlockVariant.id */
  variant: string;
  /** Actual content data matching the schema */
  content: Record<string, unknown>;
  /** Per-block style overrides */
  overrides?: StyleOverrides;
  /** Responsive visibility settings */
  visibility?: ResponsiveVisibility;
  /** Custom name for this instance (for CMS) */
  label?: string;
};

// ============================================
// COMMON CONTENT TYPES
// ============================================

export type LinkContent = {
  text: string;
  url: string;
  target?: "_blank" | "_self";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
};

export type ImageContent = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type VideoContent = {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
};

// ============================================
// BLOCK CONTENT TYPES (for specific blocks)
// ============================================

export type HeroContent = {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: LinkContent;
  secondaryCta?: LinkContent;
  image?: ImageContent;
  video?: VideoContent;
  badge?: string;
  stats?: { value: string; label: string }[];
};

export type TextWithImageContent = {
  title: string;
  subtitle?: string;
  content: string;
  image: ImageContent;
  cta?: LinkContent;
  features?: { icon?: string; title: string; description: string }[];
};

export type FeaturesContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  features: {
    icon?: string;
    title: string;
    description: string;
    link?: LinkContent;
  }[];
};

export type TestimonialsContent = {
  title?: string;
  subtitle?: string;
  testimonials: {
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: ImageContent;
    rating?: number;
  }[];
};

export type CTAContent = {
  title: string;
  description?: string;
  primaryCta: LinkContent;
  secondaryCta?: LinkContent;
  image?: ImageContent;
};

export type ContactContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  mapUrl?: string;
  socialLinks?: { platform: string; url: string }[];
  formFields?: {
    name: string;
    type: "text" | "email" | "phone" | "textarea" | "select";
    label: string;
    required: boolean;
    options?: string[];
  }[];
};

export type FooterContent = {
  logo?: ImageContent;
  tagline?: string;
  copyright?: string;
  columns?: {
    title: string;
    links: LinkContent[];
  }[];
  socialLinks?: { platform: string; url: string; icon?: string }[];
  newsletter?: {
    title: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
  };
};

// ============================================
// VALIDATION
// ============================================

export type ValidationError = {
  field: string;
  message: string;
};

export type ValidationResult = {
  valid: boolean;
  errors: ValidationError[];
};
