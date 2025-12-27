/**
 * Design System
 *
 * Comprehensive design system for BuilderAI including:
 * - Fonts: Google Fonts with pairing recommendations
 * - Colors: Color schemes, presets, and harmonies
 * - Images: Placeholders, AI prompts, and stock photo helpers
 * - Icons: Unified icon library with multiple sources
 */

// Fonts
export {
  // Types
  type FontCategory as DesignFontCategory,
  type FontWeight,
  type FontStyle as DesignFontStyle,
  type FontDefinition,
  type FontPairing as DesignFontPairing,
  // Data
  sansSerifFonts,
  serifFonts,
  displayFonts,
  allFonts,
  fontRegistry,
  fontPairings as designFontPairings,
  // Functions
  getFont,
  getFontsByCategory,
  getFontsByStyle,
  getRecommendedFonts,
  getFontPairings,
  getFontPairing as getDesignFontPairing,
  getRecommendedPairings,
  generateGoogleFontsUrl,
} from "./fonts";

// Colors
export {
  // Types
  type ColorScheme as DesignColorScheme,
  type ColorMood,
  type ColorPreset as DesignColorPreset,
  type ColorHarmony,
  // Data
  colorPresets as designColorPresets,
  // Functions
  getColorPreset as getDesignColorPreset,
  getPresetsByMood,
  getRecommendedPresets,
  hexToRgb as designHexToRgb,
  rgbToHex as designRgbToHex,
  hexToHsl,
  hslToHex,
  adjustLightness,
  generateSchemeFromPrimary,
  generateCssVariables,
  generateInlineStyles as generateDesignInlineStyles,
  generateHarmony,
} from "./colors";

// Images
export {
  // Types
  type ImageCategory,
  type ImageStyle,
  type AspectRatio,
  type PlaceholderConfig,
  type StockPhotoCategory,
  type ImagePromptTemplate,
  type ImageDimensions,
  type PlaceholderPreset,
  // Data
  stockPhotoCategories,
  imagePromptTemplates,
  recommendedSizes,
  placeholderPresets,
  // Functions
  getPlaceholderUrl,
  generateImagePrompt,
  getTemplatesByCategory,
  getDimensionsFromRatio,
  getRecommendedSize,
  getUnsplashUrl,
  getUnsplashCollectionUrl,
  getPlaceholderPreset,
  getPlaceholderFromPreset,
} from "./images";

// Icons
export {
  // Types
  type IconLibrary,
  type IconCategory,
  type IconStyle,
  type IconDefinition,
  type IconSet,
  // Data
  icons,
  iconRegistry,
  iconSets,
  // Functions
  getIcon,
  getIconsByCategory,
  searchIcons,
  getIconsForConcept,
  getIconEmoji,
  getIconCategories,
  getIconSet,
  getIconsFromSet,
} from "./icons";
