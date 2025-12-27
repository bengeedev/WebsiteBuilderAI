// Types
export type {
  // Branding
  BrandColors,
  GoogleFont,
  Typography,
  FontPairing,
  BrandLogo,
  ColorPreset,
  BrandingPreset,

  // Templates
  TemplateCategory,
  TemplateTone,
  PageTemplate,
  Template,

  // Registry
  SectionRegistry,
  TemplateRegistry,
} from "./types";

// Branding system
export * from "./branding";

// Section layouts
export {
  // Types
  type SectionType,
  type LayoutStyle,
  type LayoutVariant,
  type SectionLayout,
  type ContentItem,
  type SectionContent,
  type SectionProps,
  // Layout definitions
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
  // Helper functions
  getLayoutsForSection,
  getLayoutById,
  getDefaultLayout,
  getSectionTypes,
  getTotalLayoutCount,
} from "./sections";

// Templates library
export {
  // Individual templates
  restaurantTemplate,
  portfolioTemplate,
  professionalServicesTemplate,
  healthcareTemplate,
  fitnessTemplate,
  realEstateTemplate,
  salonTemplate,
  constructionTemplate,
  automotiveTemplate,
  petServicesTemplate,
  educationTemplate,
  photographyTemplate,
  travelTemplate,
  nonprofitTemplate,
  techStartupTemplate,
  ecommerceTemplate,
  saasTemplate,
  appLandingTemplate,
  blogTemplate,
  resumeTemplate,
  eventTemplate,
  comingSoonTemplate,
  podcastTemplate,
  courseTemplate,
  agencyTemplate,
  // Template collections
  businessTemplates,
  usecaseTemplates,
  allTemplates,
  // Helper functions
  getTemplate,
  getTemplatesByCategory,
  getTemplatesByIndustry,
  getTemplatesByTag,
  searchTemplates,
  getRecommendedTemplate,
  getTemplateCount,
} from "./templates";

// Block system (new composable architecture)
export * from "./blocks";

// Design token system
export * from "./tokens";
