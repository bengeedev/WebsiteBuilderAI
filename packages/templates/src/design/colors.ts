/**
 * Color Scheme System
 *
 * Provides color palettes, presets, and utilities for generating
 * harmonious color schemes based on a primary color.
 */

export type ColorScheme = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
};

export type ColorMood = "professional" | "playful" | "elegant" | "bold" | "calm" | "energetic" | "natural" | "luxury";

export type ColorPreset = {
  id: string;
  name: string;
  description: string;
  mood: ColorMood;
  scheme: ColorScheme;
  businessTypes: string[];
};

// ============================================
// COLOR PRESETS
// ============================================

export const colorPresets: ColorPreset[] = [
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    description: "Professional and trustworthy blue tones",
    mood: "professional",
    scheme: {
      primary: "#2563eb",
      secondary: "#1e40af",
      accent: "#06b6d4",
      background: "#ffffff",
      surface: "#f8fafc",
      text: {
        primary: "#0f172a",
        secondary: "#475569",
        muted: "#94a3b8",
        inverse: "#ffffff",
      },
      border: "#e2e8f0",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    businessTypes: ["saas", "tech", "consulting", "finance", "healthcare"],
  },
  {
    id: "forest-green",
    name: "Forest Green",
    description: "Natural and calming green palette",
    mood: "natural",
    scheme: {
      primary: "#059669",
      secondary: "#047857",
      accent: "#14b8a6",
      background: "#ffffff",
      surface: "#f0fdf4",
      text: {
        primary: "#052e16",
        secondary: "#166534",
        muted: "#6b7280",
        inverse: "#ffffff",
      },
      border: "#d1fae5",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#0ea5e9",
    },
    businessTypes: ["wellness", "organic", "environment", "agriculture", "healthcare"],
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    description: "Luxurious and creative purple tones",
    mood: "luxury",
    scheme: {
      primary: "#7c3aed",
      secondary: "#5b21b6",
      accent: "#a855f7",
      background: "#ffffff",
      surface: "#faf5ff",
      text: {
        primary: "#1e1b4b",
        secondary: "#4c1d95",
        muted: "#6b7280",
        inverse: "#ffffff",
      },
      border: "#e9d5ff",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    businessTypes: ["creative", "luxury", "beauty", "entertainment", "education"],
  },
  {
    id: "warm-coral",
    name: "Warm Coral",
    description: "Energetic and friendly coral palette",
    mood: "energetic",
    scheme: {
      primary: "#f43f5e",
      secondary: "#e11d48",
      accent: "#fb7185",
      background: "#ffffff",
      surface: "#fff1f2",
      text: {
        primary: "#1c1917",
        secondary: "#44403c",
        muted: "#78716c",
        inverse: "#ffffff",
      },
      border: "#fecdd3",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    businessTypes: ["restaurant", "food", "lifestyle", "beauty", "fashion"],
  },
  {
    id: "midnight-dark",
    name: "Midnight Dark",
    description: "Bold dark theme with accent colors",
    mood: "bold",
    scheme: {
      primary: "#6366f1",
      secondary: "#4f46e5",
      accent: "#a5b4fc",
      background: "#0f172a",
      surface: "#1e293b",
      text: {
        primary: "#f1f5f9",
        secondary: "#cbd5e1",
        muted: "#64748b",
        inverse: "#0f172a",
      },
      border: "#334155",
      success: "#4ade80",
      warning: "#fbbf24",
      error: "#f87171",
      info: "#60a5fa",
    },
    businessTypes: ["tech", "gaming", "entertainment", "music", "nightlife"],
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    description: "Warm and inviting orange tones",
    mood: "energetic",
    scheme: {
      primary: "#ea580c",
      secondary: "#c2410c",
      accent: "#fb923c",
      background: "#ffffff",
      surface: "#fff7ed",
      text: {
        primary: "#1c1917",
        secondary: "#44403c",
        muted: "#78716c",
        inverse: "#ffffff",
      },
      border: "#fed7aa",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    businessTypes: ["restaurant", "cafe", "food", "fitness", "sports"],
  },
  {
    id: "elegant-gold",
    name: "Elegant Gold",
    description: "Sophisticated gold and dark tones",
    mood: "luxury",
    scheme: {
      primary: "#b45309",
      secondary: "#78350f",
      accent: "#f59e0b",
      background: "#fffbeb",
      surface: "#fef3c7",
      text: {
        primary: "#1c1917",
        secondary: "#44403c",
        muted: "#78716c",
        inverse: "#ffffff",
      },
      border: "#fde68a",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    businessTypes: ["luxury", "jewelry", "hotel", "restaurant", "wedding"],
  },
  {
    id: "cool-slate",
    name: "Cool Slate",
    description: "Minimal and professional gray tones",
    mood: "professional",
    scheme: {
      primary: "#334155",
      secondary: "#1e293b",
      accent: "#0ea5e9",
      background: "#ffffff",
      surface: "#f8fafc",
      text: {
        primary: "#0f172a",
        secondary: "#475569",
        muted: "#94a3b8",
        inverse: "#ffffff",
      },
      border: "#e2e8f0",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    businessTypes: ["consulting", "legal", "finance", "architecture", "photography"],
  },
  {
    id: "fresh-teal",
    name: "Fresh Teal",
    description: "Modern teal with playful vibes",
    mood: "playful",
    scheme: {
      primary: "#0d9488",
      secondary: "#0f766e",
      accent: "#2dd4bf",
      background: "#ffffff",
      surface: "#f0fdfa",
      text: {
        primary: "#134e4a",
        secondary: "#115e59",
        muted: "#6b7280",
        inverse: "#ffffff",
      },
      border: "#99f6e4",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#0ea5e9",
    },
    businessTypes: ["startup", "tech", "creative", "education", "travel"],
  },
  {
    id: "classic-navy",
    name: "Classic Navy",
    description: "Timeless navy blue for traditional businesses",
    mood: "professional",
    scheme: {
      primary: "#1e3a5f",
      secondary: "#0f2744",
      accent: "#3b82f6",
      background: "#ffffff",
      surface: "#f8fafc",
      text: {
        primary: "#0f172a",
        secondary: "#334155",
        muted: "#64748b",
        inverse: "#ffffff",
      },
      border: "#cbd5e1",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    businessTypes: ["law", "finance", "insurance", "consulting", "real-estate"],
  },
  {
    id: "soft-pink",
    name: "Soft Pink",
    description: "Gentle and feminine pink palette",
    mood: "calm",
    scheme: {
      primary: "#ec4899",
      secondary: "#db2777",
      accent: "#f472b6",
      background: "#ffffff",
      surface: "#fdf2f8",
      text: {
        primary: "#1c1917",
        secondary: "#44403c",
        muted: "#78716c",
        inverse: "#ffffff",
      },
      border: "#fbcfe8",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    businessTypes: ["beauty", "fashion", "wedding", "bakery", "florist"],
  },
  {
    id: "earth-brown",
    name: "Earth Brown",
    description: "Natural and grounded brown tones",
    mood: "natural",
    scheme: {
      primary: "#78350f",
      secondary: "#451a03",
      accent: "#a16207",
      background: "#fffbeb",
      surface: "#fef3c7",
      text: {
        primary: "#1c1917",
        secondary: "#44403c",
        muted: "#78716c",
        inverse: "#ffffff",
      },
      border: "#d6d3d1",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    businessTypes: ["coffee", "restaurant", "outdoor", "furniture", "craft"],
  },
];

// ============================================
// COLOR UTILITIES
// ============================================

/**
 * Get color preset by ID
 */
export function getColorPreset(id: string): ColorPreset | undefined {
  return colorPresets.find((p) => p.id === id);
}

/**
 * Get presets by mood
 */
export function getPresetsByMood(mood: ColorMood): ColorPreset[] {
  return colorPresets.filter((p) => p.mood === mood);
}

/**
 * Get recommended presets for a business type
 */
export function getRecommendedPresets(businessType: string): ColorPreset[] {
  const businessLower = businessType.toLowerCase();
  const matches = colorPresets.filter((preset) =>
    preset.businessTypes.some((bt) =>
      businessLower.includes(bt) || bt.includes(businessLower)
    )
  );
  return matches.length > 0 ? matches : colorPresets.slice(0, 4);
}

/**
 * Convert hex to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

/**
 * Adjust color lightness
 */
export function adjustLightness(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const adjust = (value: number) => Math.min(255, Math.max(0, value + amount));

  return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
}

/**
 * Generate a color scheme from a single primary color
 */
export function generateSchemeFromPrimary(primaryHex: string): ColorScheme {
  const rgb = hexToRgb(primaryHex);
  if (!rgb) {
    return colorPresets[0].scheme; // Return default if invalid
  }

  // Calculate luminance to determine if it's a light or dark color
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  const isLight = luminance > 0.5;

  // Generate secondary (darker version of primary)
  const secondary = adjustLightness(primaryHex, -30);

  // Generate accent (lighter or complementary)
  const accent = adjustLightness(primaryHex, isLight ? -20 : 40);

  return {
    primary: primaryHex,
    secondary,
    accent,
    background: "#ffffff",
    surface: "#f8fafc",
    text: {
      primary: "#0f172a",
      secondary: "#475569",
      muted: "#94a3b8",
      inverse: "#ffffff",
    },
    border: "#e2e8f0",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  };
}

/**
 * Generate CSS custom properties from a color scheme
 */
export function generateCssVariables(scheme: ColorScheme): Record<string, string> {
  return {
    "--color-primary": scheme.primary,
    "--color-secondary": scheme.secondary,
    "--color-accent": scheme.accent,
    "--color-background": scheme.background,
    "--color-surface": scheme.surface,
    "--color-text-primary": scheme.text.primary,
    "--color-text-secondary": scheme.text.secondary,
    "--color-text-muted": scheme.text.muted,
    "--color-text-inverse": scheme.text.inverse,
    "--color-border": scheme.border,
    "--color-success": scheme.success,
    "--color-warning": scheme.warning,
    "--color-error": scheme.error,
    "--color-info": scheme.info,
  };
}

/**
 * Generate inline styles from a color scheme
 */
export function generateInlineStyles(scheme: ColorScheme): string {
  const vars = generateCssVariables(scheme);
  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
}

// ============================================
// COLOR HARMONIES
// ============================================

export type ColorHarmony = "complementary" | "analogous" | "triadic" | "split-complementary";

/**
 * Convert hex to HSL
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL to hex
 */
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  return rgbToHex(
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  );
}

/**
 * Generate color harmonies
 */
export function generateHarmony(hex: string, type: ColorHarmony): string[] {
  const hsl = hexToHsl(hex);
  if (!hsl) return [hex];

  const { h, s, l } = hsl;

  switch (type) {
    case "complementary":
      return [hex, hslToHex((h + 180) % 360, s, l)];

    case "analogous":
      return [
        hslToHex((h - 30 + 360) % 360, s, l),
        hex,
        hslToHex((h + 30) % 360, s, l),
      ];

    case "triadic":
      return [
        hex,
        hslToHex((h + 120) % 360, s, l),
        hslToHex((h + 240) % 360, s, l),
      ];

    case "split-complementary":
      return [
        hex,
        hslToHex((h + 150) % 360, s, l),
        hslToHex((h + 210) % 360, s, l),
      ];

    default:
      return [hex];
  }
}
