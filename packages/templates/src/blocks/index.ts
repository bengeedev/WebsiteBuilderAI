/**
 * Block System Exports
 *
 * Central export file for the composable block system.
 */

// Types
export type {
  BlockType,
  BlockVariant,
  BlockInstance,
  BlockCategory,
  BlockSchema,
  SchemaField,
  SchemaFieldType,
  LayoutConfig,
  ResponsiveValue,
  AIBlockHints,
  StyleOverrides,
  ResponsiveVisibility,
  ValidationResult,
  ValidationError,
  // Common content types
  LinkContent,
  ImageContent,
  VideoContent,
  HeroContent,
  TextWithImageContent,
  FeaturesContent,
  TestimonialsContent,
  CTAContent,
  ContactContent,
  FooterContent,
} from "./types";

// Registry and helpers
export {
  blockRegistry,
  getBlock,
  getBlockOrThrow,
  getAllBlocks,
  getBlocksByCategory,
  getVariant,
  getVariantOrThrow,
  getDefaultVariant,
  validateBlockContent,
  validateBlockInstance,
  generateBlockInstanceId,
  createBlockInstance,
  matchBlocksToIntent,
  getRecommendedBlocks,
} from "./registry";

// Block definitions
export { heroBlock } from "./definitions/hero";
export { textWithImageBlock } from "./definitions/text-with-image";
export { featuresBlock } from "./definitions/features";
export { testimonialsBlock } from "./definitions/testimonials";
export { ctaBlock } from "./definitions/cta";
export { contactBlock } from "./definitions/contact";
export { footerBlock } from "./definitions/footer";
