/**
 * Section Layout Types
 *
 * Type definitions for section layouts and variants
 */

/**
 * Available section types
 */
export type SectionType =
  | "hero"
  | "about"
  | "features"
  | "services"
  | "testimonials"
  | "team"
  | "pricing"
  | "contact"
  | "cta"
  | "gallery"
  | "faq"
  | "blog"
  | "newsletter"
  | "stats"
  | "portfolio"
  | "menu";

/**
 * Layout variant styles
 */
export type LayoutStyle = "centered" | "split" | "asymmetric" | "minimal" | "bold";

/**
 * Layout variant metadata
 */
export type LayoutVariant = {
  id: string;
  name: string;
  description: string;
  style: LayoutStyle;
  thumbnail?: string;
  isDefault?: boolean;
};

/**
 * Section layout definition
 */
export type SectionLayout = {
  sectionType: SectionType;
  variants: LayoutVariant[];
};

/**
 * Content item for sections (features, services, team members, etc.)
 */
export type ContentItem = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  link?: string;
  price?: string;
  metadata?: Record<string, unknown>;
};

/**
 * Section content structure
 */
export type SectionContent = {
  id: string;
  type: SectionType;
  layout: string; // Layout variant ID
  title: string;
  subtitle?: string;
  content?: string;
  items?: ContentItem[];
  cta?: {
    primary?: { text: string; url?: string };
    secondary?: { text: string; url?: string };
  };
  image?: string;
  video?: string;
  background?: {
    type: "color" | "image" | "video" | "gradient";
    value: string;
  };
  styles?: Record<string, string>;
};

/**
 * Props for section components
 */
export type SectionProps = {
  content: SectionContent;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor?: string;
    headingFont: string;
    bodyFont: string;
  };
  className?: string;
};
