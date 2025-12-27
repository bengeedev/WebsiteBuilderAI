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

// Design system (fonts, colors, images, icons)
export {
  // Font types
  type DesignFontCategory,
  type FontWeight,
  type DesignFontStyle,
  type FontDefinition,
  type DesignFontPairing,
  // Font data
  sansSerifFonts,
  serifFonts,
  displayFonts,
  allFonts,
  fontRegistry,
  designFontPairings,
  // Font functions
  getFont,
  getFontsByCategory,
  getFontsByStyle,
  getRecommendedFonts,
  getFontPairings,
  getDesignFontPairing,
  getRecommendedPairings,
  generateGoogleFontsUrl,
  // Color types
  type DesignColorScheme,
  type ColorMood,
  type DesignColorPreset,
  type ColorHarmony,
  // Color data
  designColorPresets,
  // Color functions
  getDesignColorPreset,
  getPresetsByMood,
  getRecommendedPresets,
  designHexToRgb,
  designRgbToHex,
  hexToHsl,
  hslToHex,
  adjustLightness,
  generateSchemeFromPrimary,
  generateCssVariables,
  generateDesignInlineStyles,
  generateHarmony,
  // Image types
  type ImageCategory,
  type ImageStyle,
  type AspectRatio,
  type PlaceholderConfig,
  type StockPhotoCategory,
  type ImagePromptTemplate,
  type ImageDimensions,
  type PlaceholderPreset,
  // Image data
  stockPhotoCategories,
  imagePromptTemplates,
  recommendedSizes,
  placeholderPresets,
  // Image functions
  getPlaceholderUrl,
  generateImagePrompt,
  getTemplatesByCategory as getImageTemplatesByCategory,
  getDimensionsFromRatio,
  getRecommendedSize,
  getUnsplashUrl,
  getUnsplashCollectionUrl,
  getPlaceholderPreset,
  getPlaceholderFromPreset,
  // Icon types
  type IconLibrary,
  type IconCategory,
  type IconStyle,
  type IconDefinition,
  type IconSet,
  // Icon data
  icons,
  iconRegistry,
  iconSets,
  // Icon functions
  getIcon,
  getIconsByCategory,
  searchIcons,
  getIconsForConcept,
  getIconEmoji,
  getIconCategories,
  getIconSet,
  getIconsFromSet,
} from "./design";
