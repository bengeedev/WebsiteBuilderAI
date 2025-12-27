/**
 * Design Token Type Definitions
 *
 * A comprehensive design token system that provides consistent
 * styling across all blocks. Tokens are converted to CSS variables
 * and can be used with Tailwind.
 */

// ============================================
// COLOR TOKENS
// ============================================

export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;  // Primary shade
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export type SemanticColors = {
  /** Main brand color - used for primary actions and highlights */
  primary: string;
  /** Supporting brand color - used for secondary elements */
  secondary: string;
  /** Accent color - used for emphasis and highlights */
  accent: string;
  /** Page background color */
  background: string;
  /** Card/section surface color */
  surface: string;
  /** Border colors */
  border: string;
  /** Text colors */
  text: {
    primary: string;    // Main text
    secondary: string;  // Supporting text
    muted: string;      // Subtle text
    inverse: string;    // Text on dark backgrounds
  };
  /** Semantic status colors */
  success: string;
  warning: string;
  error: string;
  info: string;
};

// ============================================
// TYPOGRAPHY TOKENS
// ============================================

export type FontFamily = {
  /** Font for headings (h1-h6) */
  heading: string;
  /** Font for body text */
  body: string;
  /** Font for code/monospace (optional) */
  mono?: string;
};

export type FontSizeScale = {
  xs: string;    // 12px / 0.75rem
  sm: string;    // 14px / 0.875rem
  base: string;  // 16px / 1rem
  lg: string;    // 18px / 1.125rem
  xl: string;    // 20px / 1.25rem
  "2xl": string; // 24px / 1.5rem
  "3xl": string; // 30px / 1.875rem
  "4xl": string; // 36px / 2.25rem
  "5xl": string; // 48px / 3rem
  "6xl": string; // 60px / 3.75rem
};

export type FontWeightScale = {
  light: number;    // 300
  normal: number;   // 400
  medium: number;   // 500
  semibold: number; // 600
  bold: number;     // 700
  extrabold: number; // 800
};

export type LineHeightScale = {
  none: number;    // 1
  tight: number;   // 1.25
  snug: number;    // 1.375
  normal: number;  // 1.5
  relaxed: number; // 1.625
  loose: number;   // 2
};

export type LetterSpacingScale = {
  tighter: string; // -0.05em
  tight: string;   // -0.025em
  normal: string;  // 0
  wide: string;    // 0.025em
  wider: string;   // 0.05em
  widest: string;  // 0.1em
};

export type TypographyTokens = {
  fontFamily: FontFamily;
  fontSize: FontSizeScale;
  fontWeight: FontWeightScale;
  lineHeight: LineHeightScale;
  letterSpacing: LetterSpacingScale;
};

// ============================================
// SPACING TOKENS
// ============================================

export type SpacingScale = {
  0: string;    // 0
  px: string;   // 1px
  0.5: string;  // 2px / 0.125rem
  1: string;    // 4px / 0.25rem
  1.5: string;  // 6px / 0.375rem
  2: string;    // 8px / 0.5rem
  2.5: string;  // 10px / 0.625rem
  3: string;    // 12px / 0.75rem
  3.5: string;  // 14px / 0.875rem
  4: string;    // 16px / 1rem
  5: string;    // 20px / 1.25rem
  6: string;    // 24px / 1.5rem
  7: string;    // 28px / 1.75rem
  8: string;    // 32px / 2rem
  9: string;    // 36px / 2.25rem
  10: string;   // 40px / 2.5rem
  11: string;   // 44px / 2.75rem
  12: string;   // 48px / 3rem
  14: string;   // 56px / 3.5rem
  16: string;   // 64px / 4rem
  20: string;   // 80px / 5rem
  24: string;   // 96px / 6rem
  28: string;   // 112px / 7rem
  32: string;   // 128px / 8rem
};

export type SectionSpacing = {
  /** Small section padding (mobile default) */
  sm: string;
  /** Medium section padding */
  md: string;
  /** Large section padding (desktop default) */
  lg: string;
  /** Extra large section padding */
  xl: string;
};

export type ContainerConfig = {
  /** Maximum container width */
  maxWidth: string;
  /** Container horizontal padding */
  padding: string;
};

export type SpacingTokens = {
  /** Base spacing scale */
  scale: SpacingScale;
  /** Section vertical spacing */
  section: SectionSpacing;
  /** Container configuration */
  container: ContainerConfig;
  /** Common gap values */
  gap: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
};

// ============================================
// EFFECT TOKENS
// ============================================

export type BorderRadiusScale = {
  none: string;   // 0
  sm: string;     // 2px / 0.125rem
  DEFAULT: string; // 4px / 0.25rem
  md: string;     // 6px / 0.375rem
  lg: string;     // 8px / 0.5rem
  xl: string;     // 12px / 0.75rem
  "2xl": string;  // 16px / 1rem
  "3xl": string;  // 24px / 1.5rem
  full: string;   // 9999px
};

export type ShadowScale = {
  none: string;
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  inner: string;
};

export type TransitionConfig = {
  /** Fast transition (150ms) */
  fast: string;
  /** Normal transition (200ms) */
  normal: string;
  /** Slow transition (300ms) */
  slow: string;
  /** Very slow transition (500ms) */
  slower: string;
};

export type EffectTokens = {
  borderRadius: BorderRadiusScale;
  shadow: ShadowScale;
  transition: TransitionConfig;
  /** Opacity values */
  opacity: {
    0: string;
    5: string;
    10: string;
    20: string;
    25: string;
    30: string;
    40: string;
    50: string;
    60: string;
    70: string;
    75: string;
    80: string;
    90: string;
    95: string;
    100: string;
  };
};

// ============================================
// BREAKPOINT TOKENS
// ============================================

export type BreakpointTokens = {
  sm: string;   // 640px
  md: string;   // 768px
  lg: string;   // 1024px
  xl: string;   // 1280px
  "2xl": string; // 1536px
};

// ============================================
// COMPLETE DESIGN TOKENS
// ============================================

export type DesignTokens = {
  /** Color tokens */
  colors: SemanticColors;
  /** Typography tokens */
  typography: TypographyTokens;
  /** Spacing tokens */
  spacing: SpacingTokens;
  /** Effect tokens (shadows, radius, transitions) */
  effects: EffectTokens;
  /** Responsive breakpoints */
  breakpoints: BreakpointTokens;
};

// ============================================
// TOKEN PRESET
// ============================================

export type TokenPreset = {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Description */
  description: string;
  /** Industry/use case tags */
  tags: string[];
  /** The actual tokens */
  tokens: DesignTokens;
};

// ============================================
// BRANDING INPUT
// ============================================

export type BrandingInput = {
  /** Primary brand color (hex) */
  primaryColor: string;
  /** Secondary brand color (hex, optional - will be derived) */
  secondaryColor?: string;
  /** Accent color (hex, optional - will be derived) */
  accentColor?: string;
  /** Heading font family */
  headingFont?: string;
  /** Body font family */
  bodyFont?: string;
  /** Design style preference */
  style?: "modern" | "classic" | "minimal" | "bold" | "playful";
  /** Dark mode preference */
  darkMode?: boolean;
};

// ============================================
// EXTRACTED BRANDING
// ============================================

export type ExtractedBranding = {
  /** Extracted colors from website/logo */
  colors: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    text?: string;
  };
  /** Detected fonts */
  fonts?: {
    heading?: string;
    body?: string;
  };
  /** Logo URL if found */
  logo?: string;
  /** Favicon URL if found */
  favicon?: string;
  /** Source URL */
  source: string;
  /** Confidence score (0-1) */
  confidence: number;
};
