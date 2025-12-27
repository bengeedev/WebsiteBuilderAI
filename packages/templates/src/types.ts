// Section types are defined in ./sections/types.ts
import type { SectionType, SectionContent, SectionLayout } from "./sections/types";

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
