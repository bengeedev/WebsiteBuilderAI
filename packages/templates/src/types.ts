import type { ReactNode } from "react";

// ============================================
// Branding Types
// ============================================

export type BrandColors = {
  // Core brand colors
  primary: string;
  secondary: string;
  accent: string;

  // Extended palette
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };

  // Semantic colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Gradients (optional)
  gradients?: {
    primary?: string;
    accent?: string;
  };
};

export type GoogleFont = {
  family: string;
  weights: number[];
  category: "sans-serif" | "serif" | "display" | "handwriting" | "monospace";
  fallback: string;
};

export type Typography = {
  headingFont: GoogleFont;
  bodyFont: GoogleFont;
  accentFont?: GoogleFont;
  scale: "compact" | "normal" | "spacious";
  headingWeight: 400 | 500 | 600 | 700 | 800;
  bodyWeight: 400 | 500;
};

export type FontPairing = {
  id: string;
  name: string;
  description: string;
  heading: GoogleFont;
  body: GoogleFont;
  tone: "modern" | "elegant" | "bold" | "creative" | "professional" | "minimal" | "friendly";
};

export type BrandLogo = {
  primary?: {
    url: string;
    type: "uploaded" | "generated";
    format: "svg" | "png" | "jpg";
  };
  icon?: string;
  favicon?: string;
  darkVariant?: string;
  generationPrompt?: string;
  alternatives?: string[];
};

export type ColorPreset = {
  id: string;
  name: string;
  description: string;
  colors: BrandColors;
  tone: "professional" | "vibrant" | "elegant" | "bold" | "minimal" | "warm" | "cool";
};

export type BrandingPreset = {
  id: string;
  name: string;
  colors: BrandColors;
  typography: Typography;
  description?: string;
};

// ============================================
// Section Types
// ============================================

export type SectionType =
  | "hero"
  | "about"
  | "features"
  | "services"
  | "menu"
  | "portfolio"
  | "gallery"
  | "testimonials"
  | "team"
  | "pricing"
  | "contact"
  | "cta"
  | "newsletter"
  | "faq"
  | "blog"
  | "stats"
  | "timeline"
  | "clients"
  | "process"
  | "comparison";

export type SectionItem = {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
  price?: string;
  author?: string;
  role?: string;
  rating?: number;
  link?: string;
};

export type SectionContent = {
  id: string;
  type: SectionType;
  layout?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  items?: SectionItem[];
  cta?: {
    text: string;
    url: string;
    variant?: "primary" | "secondary" | "outline";
  };
  secondaryCta?: {
    text: string;
    url: string;
  };
  backgroundImage?: string;
  backgroundVideo?: string;
  styles?: Record<string, string>;
};

export type SectionLayoutVariant = {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  requiredFields: string[];
  optionalFields: string[];
  defaultContent: Partial<SectionContent>;
};

export type SectionLayout = {
  sectionType: SectionType;
  variants: SectionLayoutVariant[];
};

export type SectionProps = {
  content: SectionContent;
  branding: BrandColors;
  typography?: Typography;
  className?: string;
};

// ============================================
// Template Types
// ============================================

export type TemplateCategory = "business" | "usecase";

export type TemplateTone = "professional" | "friendly" | "bold" | "minimal" | "elegant" | "playful";

export type PageTemplate = {
  name: string;
  slug: string;
  sections: SectionType[];
  defaultLayouts?: Record<SectionType, string>;
};

export type Template = {
  id: string;
  name: string;
  category: TemplateCategory;
  subcategory: string;
  description: string;
  thumbnail?: string;
  previewUrl?: string;

  // Structure
  pages: PageTemplate[];
  defaultSections: Partial<SectionContent>[];
  recommendedLayouts: Partial<Record<SectionType, string[]>>;

  // Defaults
  defaultBranding: BrandingPreset;

  // Metadata
  industry?: string;
  tone: TemplateTone;
  features: string[];
  tags: string[];
};

// ============================================
// Registry Types
// ============================================

export type SectionRegistry = {
  [K in SectionType]: SectionLayout;
};

export type TemplateRegistry = {
  business: Record<string, Template>;
  usecase: Record<string, Template>;
};
