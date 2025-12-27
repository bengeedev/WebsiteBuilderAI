/**
 * Section Layouts Module
 *
 * Layout variants for all section types
 */

// Types
export type {
  SectionType,
  LayoutStyle,
  LayoutVariant,
  SectionLayout,
  ContentItem,
  SectionContent,
  SectionProps,
} from "./types";

// Layout definitions
export {
  heroLayouts,
  featuresLayouts,
  testimonialsLayouts,
  pricingLayouts,
  aboutLayouts,
  servicesLayouts,
  teamLayouts,
  contactLayouts,
  ctaLayouts,
  galleryLayouts,
  faqLayouts,
  blogLayouts,
  newsletterLayouts,
  statsLayouts,
  portfolioLayouts,
  menuLayouts,
  sectionLayouts,
} from "./layouts";

// Helper functions
export {
  getLayoutsForSection,
  getLayoutById,
  getDefaultLayout,
  getSectionTypes,
  getTotalLayoutCount,
} from "./layouts";
