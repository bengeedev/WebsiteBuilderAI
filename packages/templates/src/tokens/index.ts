/**
 * Design Tokens Exports
 *
 * Complete design token system for consistent styling across all blocks.
 */

// Types
export type {
  DesignTokens,
  TokenPreset,
  SemanticColors,
  ColorScale,
  TypographyTokens,
  FontFamily,
  FontSizeScale,
  FontWeightScale,
  LineHeightScale,
  LetterSpacingScale,
  SpacingTokens,
  SpacingScale,
  SectionSpacing,
  ContainerConfig,
  EffectTokens,
  BorderRadiusScale,
  ShadowScale,
  TransitionConfig,
  BreakpointTokens,
  BrandingInput,
  ExtractedBranding,
} from "./types";

// Generators
export {
  generateCSSVariables,
  generateStyleTag,
  generateInlineStyles,
  generateTailwindTheme,
  createTokensFromBranding,
  // Color utilities (hexToRgb, rgbToHex are exported from branding module)
  isLightColor,
  getContrastingTextColor,
  lightenColor,
  darkenColor,
  generateColorScale,
} from "./generator";

// Presets
export {
  defaultTokens,
  restaurantPreset,
  professionalPreset,
  creativePreset,
  minimalPreset,
  healthcarePreset,
  techPreset,
  ecommercePreset,
  tokenPresets,
  getPreset,
  getPresetsByTag,
  getRecommendedPreset,
} from "./presets";
