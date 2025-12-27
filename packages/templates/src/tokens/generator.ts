/**
 * Token Generator
 *
 * Generates CSS variables and Tailwind configuration from design tokens.
 * This enables runtime theming and consistent styling across all blocks.
 */

import type { DesignTokens, BrandingInput } from "./types";
import { defaultTokens } from "./presets";
import { hexToRgb, rgbToHex } from "../branding/colors";

// ============================================
// CSS VARIABLE GENERATION
// ============================================

/**
 * Generate CSS custom properties (variables) from design tokens
 */
export function generateCSSVariables(tokens: DesignTokens): string {
  const variables: string[] = [];

  // Colors
  variables.push("/* Colors */");
  variables.push(`--color-primary: ${tokens.colors.primary};`);
  variables.push(`--color-secondary: ${tokens.colors.secondary};`);
  variables.push(`--color-accent: ${tokens.colors.accent};`);
  variables.push(`--color-background: ${tokens.colors.background};`);
  variables.push(`--color-surface: ${tokens.colors.surface};`);
  variables.push(`--color-border: ${tokens.colors.border};`);
  variables.push(`--color-text-primary: ${tokens.colors.text.primary};`);
  variables.push(`--color-text-secondary: ${tokens.colors.text.secondary};`);
  variables.push(`--color-text-muted: ${tokens.colors.text.muted};`);
  variables.push(`--color-text-inverse: ${tokens.colors.text.inverse};`);
  variables.push(`--color-success: ${tokens.colors.success};`);
  variables.push(`--color-warning: ${tokens.colors.warning};`);
  variables.push(`--color-error: ${tokens.colors.error};`);
  variables.push(`--color-info: ${tokens.colors.info};`);

  // Typography
  variables.push("");
  variables.push("/* Typography */");
  variables.push(`--font-heading: ${tokens.typography.fontFamily.heading};`);
  variables.push(`--font-body: ${tokens.typography.fontFamily.body};`);
  if (tokens.typography.fontFamily.mono) {
    variables.push(`--font-mono: ${tokens.typography.fontFamily.mono};`);
  }

  // Font sizes
  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    variables.push(`--font-size-${key}: ${value};`);
  });

  // Spacing
  variables.push("");
  variables.push("/* Spacing */");
  variables.push(`--container-max-width: ${tokens.spacing.container.maxWidth};`);
  variables.push(`--container-padding: ${tokens.spacing.container.padding};`);
  variables.push(`--section-padding-sm: ${tokens.spacing.section.sm};`);
  variables.push(`--section-padding-md: ${tokens.spacing.section.md};`);
  variables.push(`--section-padding-lg: ${tokens.spacing.section.lg};`);
  variables.push(`--section-padding-xl: ${tokens.spacing.section.xl};`);
  variables.push(`--gap-sm: ${tokens.spacing.gap.sm};`);
  variables.push(`--gap-md: ${tokens.spacing.gap.md};`);
  variables.push(`--gap-lg: ${tokens.spacing.gap.lg};`);
  variables.push(`--gap-xl: ${tokens.spacing.gap.xl};`);

  // Effects
  variables.push("");
  variables.push("/* Effects */");
  Object.entries(tokens.effects.borderRadius).forEach(([key, value]) => {
    const varName = key === "DEFAULT" ? "radius" : `radius-${key}`;
    variables.push(`--${varName}: ${value};`);
  });

  Object.entries(tokens.effects.shadow).forEach(([key, value]) => {
    const varName = key === "DEFAULT" ? "shadow" : `shadow-${key}`;
    variables.push(`--${varName}: ${value};`);
  });

  variables.push(`--transition-fast: ${tokens.effects.transition.fast};`);
  variables.push(`--transition-normal: ${tokens.effects.transition.normal};`);
  variables.push(`--transition-slow: ${tokens.effects.transition.slow};`);

  return `:root {\n  ${variables.join("\n  ")}\n}`;
}

/**
 * Generate a complete style tag with CSS variables
 */
export function generateStyleTag(tokens: DesignTokens): string {
  const css = generateCSSVariables(tokens);
  return `<style id="design-tokens">\n${css}\n</style>`;
}

/**
 * Generate inline style object for React
 */
export function generateInlineStyles(tokens: DesignTokens): Record<string, string> {
  return {
    "--color-primary": tokens.colors.primary,
    "--color-secondary": tokens.colors.secondary,
    "--color-accent": tokens.colors.accent,
    "--color-background": tokens.colors.background,
    "--color-surface": tokens.colors.surface,
    "--color-border": tokens.colors.border,
    "--color-text-primary": tokens.colors.text.primary,
    "--color-text-secondary": tokens.colors.text.secondary,
    "--color-text-muted": tokens.colors.text.muted,
    "--color-text-inverse": tokens.colors.text.inverse,
    "--font-heading": tokens.typography.fontFamily.heading,
    "--font-body": tokens.typography.fontFamily.body,
  } as Record<string, string>;
}

// ============================================
// TAILWIND CONFIGURATION
// ============================================

/**
 * Generate Tailwind CSS theme extension from design tokens
 */
export function generateTailwindTheme(tokens: DesignTokens): Record<string, unknown> {
  return {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
        mono: "var(--font-mono, ui-monospace, monospace)",
      },
      fontSize: Object.fromEntries(
        Object.entries(tokens.typography.fontSize).map(([key, value]) => [
          key,
          `var(--font-size-${key}, ${value})`,
        ])
      ),
      spacing: {
        section: "var(--section-padding-lg)",
        "section-sm": "var(--section-padding-sm)",
        "section-md": "var(--section-padding-md)",
        "section-lg": "var(--section-padding-lg)",
        "section-xl": "var(--section-padding-xl)",
      },
      maxWidth: {
        container: "var(--container-max-width)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
      },
      boxShadow: {
        DEFAULT: "var(--shadow)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "200ms",
        slow: "300ms",
      },
    },
  };
}

// ============================================
// TOKEN CREATION FROM BRANDING
// ============================================

/**
 * Create full design tokens from branding input
 */
export function createTokensFromBranding(input: BrandingInput): DesignTokens {
  const base = { ...defaultTokens };

  // Apply colors
  base.colors.primary = input.primaryColor;
  base.colors.secondary = input.secondaryColor || deriveSecondaryColor(input.primaryColor);
  base.colors.accent = input.accentColor || deriveAccentColor(input.primaryColor);

  // Apply fonts
  if (input.headingFont) {
    base.typography.fontFamily.heading = input.headingFont;
  }
  if (input.bodyFont) {
    base.typography.fontFamily.body = input.bodyFont;
  }

  // Apply style variations
  if (input.style) {
    applyStylePreset(base, input.style);
  }

  // Apply dark mode
  if (input.darkMode) {
    applyDarkMode(base);
  }

  return base;
}

/**
 * Derive secondary color from primary
 */
function deriveSecondaryColor(primary: string): string {
  // Darken the primary color by 30%
  const hex = primary.replace("#", "");
  const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - 50);
  const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - 50);
  const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - 50);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/**
 * Derive accent color from primary (complementary)
 */
function deriveAccentColor(primary: string): string {
  // Shift hue for complementary color
  const hex = primary.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Simple complementary: rotate hue
  const newR = Math.min(255, (r + 128) % 256);
  const newG = Math.min(255, (g + 64) % 256);
  const newB = Math.min(255, (b + 128) % 256);

  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
}

/**
 * Apply style preset modifications
 */
function applyStylePreset(tokens: DesignTokens, style: BrandingInput["style"]): void {
  switch (style) {
    case "modern":
      tokens.effects.borderRadius.DEFAULT = "0.5rem";
      tokens.effects.borderRadius.lg = "1rem";
      tokens.typography.fontFamily.heading = "Inter, sans-serif";
      break;
    case "classic":
      tokens.effects.borderRadius.DEFAULT = "0.25rem";
      tokens.effects.borderRadius.lg = "0.5rem";
      tokens.typography.fontFamily.heading = "Georgia, serif";
      break;
    case "minimal":
      tokens.effects.borderRadius.DEFAULT = "0";
      tokens.effects.shadow.DEFAULT = "none";
      break;
    case "bold":
      tokens.effects.borderRadius.DEFAULT = "1rem";
      tokens.effects.shadow.DEFAULT = "0 10px 40px -10px rgba(0, 0, 0, 0.2)";
      break;
    case "playful":
      tokens.effects.borderRadius.DEFAULT = "1.5rem";
      tokens.effects.borderRadius.lg = "2rem";
      break;
  }
}

/**
 * Apply dark mode colors
 */
function applyDarkMode(tokens: DesignTokens): void {
  tokens.colors.background = "#0f172a";
  tokens.colors.surface = "#1e293b";
  tokens.colors.border = "#334155";
  tokens.colors.text = {
    primary: "#f8fafc",
    secondary: "#cbd5e1",
    muted: "#64748b",
    inverse: "#0f172a",
  };
}

// ============================================
// COLOR UTILITIES
// ============================================

// hexToRgb and rgbToHex are imported from ../branding/colors
// Re-export them for convenience
export { hexToRgb, rgbToHex } from "../branding/colors";

/**
 * Check if a color is light or dark
 */
export function isLightColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  // Using relative luminance formula
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5;
}

/**
 * Get contrasting text color for a background
 */
export function getContrastingTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? "#1e293b" : "#ffffff";
}

/**
 * Lighten a color by percentage
 */
export function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const amount = Math.round(2.55 * percent);
  const r = Math.min(255, rgb.r + amount);
  const g = Math.min(255, rgb.g + amount);
  const b = Math.min(255, rgb.b + amount);

  return rgbToHex(r, g, b);
}

/**
 * Darken a color by percentage
 */
export function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const amount = Math.round(2.55 * percent);
  const r = Math.max(0, rgb.r - amount);
  const g = Math.max(0, rgb.g - amount);
  const b = Math.max(0, rgb.b - amount);

  return rgbToHex(r, g, b);
}

/**
 * Generate a color scale from a base color
 */
export function generateColorScale(baseColor: string): Record<string, string> {
  return {
    50: lightenColor(baseColor, 45),
    100: lightenColor(baseColor, 40),
    200: lightenColor(baseColor, 30),
    300: lightenColor(baseColor, 20),
    400: lightenColor(baseColor, 10),
    500: baseColor,
    600: darkenColor(baseColor, 10),
    700: darkenColor(baseColor, 20),
    800: darkenColor(baseColor, 30),
    900: darkenColor(baseColor, 40),
    950: darkenColor(baseColor, 45),
  };
}
