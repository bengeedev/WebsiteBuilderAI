import type { BrandColors, ColorPreset } from "../types";

/**
 * Generate a complete color palette from primary and secondary colors
 */
export function generatePalette(
  primary: string,
  secondary: string,
  accent?: string
): BrandColors {
  return {
    primary,
    secondary,
    accent: accent || primary,
    background: "#ffffff",
    surface: "#f8fafc",
    text: {
      primary: "#0f172a",
      secondary: "#475569",
      muted: "#94a3b8",
    },
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  };
}

/**
 * Generate dark mode variant of a palette
 */
export function generateDarkPalette(colors: BrandColors): BrandColors {
  return {
    ...colors,
    background: "#0f172a",
    surface: "#1e293b",
    text: {
      primary: "#f8fafc",
      secondary: "#cbd5e1",
      muted: "#64748b",
    },
  };
}

/**
 * Curated color presets covering different industries and moods
 */
export const colorPresets: ColorPreset[] = [
  // Professional / Corporate
  {
    id: "blue-professional",
    name: "Blue Professional",
    description: "Clean and trustworthy, perfect for corporate and tech",
    tone: "professional",
    colors: {
      primary: "#2563eb",
      secondary: "#1e293b",
      accent: "#3b82f6",
      background: "#ffffff",
      surface: "#f8fafc",
      text: { primary: "#0f172a", secondary: "#475569", muted: "#94a3b8" },
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
      gradients: {
        primary: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
      },
    },
  },
  {
    id: "navy-corporate",
    name: "Navy Corporate",
    description: "Sophisticated and authoritative for finance and law",
    tone: "professional",
    colors: {
      primary: "#1e3a5f",
      secondary: "#0f172a",
      accent: "#c9a227",
      background: "#ffffff",
      surface: "#f1f5f9",
      text: { primary: "#0f172a", secondary: "#334155", muted: "#64748b" },
      success: "#059669",
      warning: "#d97706",
      error: "#dc2626",
      info: "#0284c7",
    },
  },

  // Vibrant / Energetic
  {
    id: "orange-energy",
    name: "Orange Energy",
    description: "Dynamic and energetic for fitness and sports",
    tone: "vibrant",
    colors: {
      primary: "#f97316",
      secondary: "#292524",
      accent: "#fb923c",
      background: "#ffffff",
      surface: "#fff7ed",
      text: { primary: "#1c1917", secondary: "#44403c", muted: "#78716c" },
      success: "#22c55e",
      warning: "#eab308",
      error: "#ef4444",
      info: "#06b6d4",
      gradients: {
        primary: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
      },
    },
  },
  {
    id: "red-bold",
    name: "Red Bold",
    description: "Passionate and attention-grabbing for restaurants and entertainment",
    tone: "bold",
    colors: {
      primary: "#dc2626",
      secondary: "#1f2937",
      accent: "#fbbf24",
      background: "#ffffff",
      surface: "#fef2f2",
      text: { primary: "#111827", secondary: "#4b5563", muted: "#9ca3af" },
      success: "#16a34a",
      warning: "#ca8a04",
      error: "#b91c1c",
      info: "#2563eb",
    },
  },

  // Elegant / Luxury
  {
    id: "gold-luxury",
    name: "Gold Luxury",
    description: "Opulent and premium for luxury brands and jewelry",
    tone: "elegant",
    colors: {
      primary: "#b8860b",
      secondary: "#1a1a1a",
      accent: "#d4af37",
      background: "#fefefe",
      surface: "#faf5eb",
      text: { primary: "#1a1a1a", secondary: "#4a4a4a", muted: "#8a8a8a" },
      success: "#065f46",
      warning: "#92400e",
      error: "#991b1b",
      info: "#1e40af",
      gradients: {
        primary: "linear-gradient(135deg, #b8860b 0%, #d4af37 100%)",
      },
    },
  },
  {
    id: "purple-creative",
    name: "Purple Creative",
    description: "Imaginative and unique for creative agencies and artists",
    tone: "elegant",
    colors: {
      primary: "#7c3aed",
      secondary: "#18181b",
      accent: "#a855f7",
      background: "#ffffff",
      surface: "#faf5ff",
      text: { primary: "#18181b", secondary: "#3f3f46", muted: "#71717a" },
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#6366f1",
      gradients: {
        primary: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
        accent: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
      },
    },
  },

  // Nature / Wellness
  {
    id: "green-nature",
    name: "Green Nature",
    description: "Fresh and organic for wellness and eco-friendly brands",
    tone: "minimal",
    colors: {
      primary: "#059669",
      secondary: "#111827",
      accent: "#34d399",
      background: "#ffffff",
      surface: "#ecfdf5",
      text: { primary: "#064e3b", secondary: "#065f46", muted: "#6b7280" },
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#0ea5e9",
    },
  },
  {
    id: "teal-wellness",
    name: "Teal Wellness",
    description: "Calming and balanced for spas and healthcare",
    tone: "minimal",
    colors: {
      primary: "#0d9488",
      secondary: "#134e4a",
      accent: "#2dd4bf",
      background: "#ffffff",
      surface: "#f0fdfa",
      text: { primary: "#134e4a", secondary: "#115e59", muted: "#5eead4" },
      success: "#22c55e",
      warning: "#fbbf24",
      error: "#f87171",
      info: "#38bdf8",
    },
  },

  // Warm / Friendly
  {
    id: "coral-warm",
    name: "Coral Warm",
    description: "Inviting and friendly for hospitality and food",
    tone: "warm",
    colors: {
      primary: "#f43f5e",
      secondary: "#881337",
      accent: "#fb7185",
      background: "#ffffff",
      surface: "#fff1f2",
      text: { primary: "#1f2937", secondary: "#4b5563", muted: "#9ca3af" },
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#dc2626",
      info: "#3b82f6",
      gradients: {
        primary: "linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)",
      },
    },
  },
  {
    id: "amber-cozy",
    name: "Amber Cozy",
    description: "Warm and comforting for cafes and bakeries",
    tone: "warm",
    colors: {
      primary: "#d97706",
      secondary: "#451a03",
      accent: "#fbbf24",
      background: "#fffbeb",
      surface: "#fef3c7",
      text: { primary: "#451a03", secondary: "#78350f", muted: "#a16207" },
      success: "#16a34a",
      warning: "#ca8a04",
      error: "#dc2626",
      info: "#0284c7",
    },
  },

  // Cool / Modern
  {
    id: "cyan-tech",
    name: "Cyan Tech",
    description: "Futuristic and innovative for tech startups",
    tone: "cool",
    colors: {
      primary: "#06b6d4",
      secondary: "#164e63",
      accent: "#22d3ee",
      background: "#ffffff",
      surface: "#ecfeff",
      text: { primary: "#0f172a", secondary: "#334155", muted: "#64748b" },
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#0ea5e9",
      gradients: {
        primary: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      },
    },
  },
  {
    id: "indigo-saas",
    name: "Indigo SaaS",
    description: "Modern and sleek for SaaS and software products",
    tone: "cool",
    colors: {
      primary: "#6366f1",
      secondary: "#1e1b4b",
      accent: "#818cf8",
      background: "#ffffff",
      surface: "#eef2ff",
      text: { primary: "#1e1b4b", secondary: "#3730a3", muted: "#6366f1" },
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
      gradients: {
        primary: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        accent: "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)",
      },
    },
  },

  // Minimal / Clean
  {
    id: "slate-minimal",
    name: "Slate Minimal",
    description: "Clean and understated for portfolios and agencies",
    tone: "minimal",
    colors: {
      primary: "#475569",
      secondary: "#0f172a",
      accent: "#64748b",
      background: "#ffffff",
      surface: "#f8fafc",
      text: { primary: "#0f172a", secondary: "#334155", muted: "#94a3b8" },
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
  },
  {
    id: "mono-dark",
    name: "Mono Dark",
    description: "Sleek dark theme for modern portfolios",
    tone: "minimal",
    colors: {
      primary: "#f8fafc",
      secondary: "#e2e8f0",
      accent: "#3b82f6",
      background: "#0f172a",
      surface: "#1e293b",
      text: { primary: "#f8fafc", secondary: "#cbd5e1", muted: "#64748b" },
      success: "#34d399",
      warning: "#fbbf24",
      error: "#f87171",
      info: "#60a5fa",
    },
  },

  // Pink / Playful
  {
    id: "pink-playful",
    name: "Pink Playful",
    description: "Fun and youthful for beauty and lifestyle brands",
    tone: "vibrant",
    colors: {
      primary: "#ec4899",
      secondary: "#831843",
      accent: "#f472b6",
      background: "#ffffff",
      surface: "#fdf2f8",
      text: { primary: "#1f2937", secondary: "#4b5563", muted: "#9ca3af" },
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#8b5cf6",
      gradients: {
        primary: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
      },
    },
  },
];

/**
 * Get a color preset by ID
 */
export function getColorPreset(id: string): ColorPreset | undefined {
  return colorPresets.find((preset) => preset.id === id);
}

/**
 * Get color presets by tone
 */
export function getColorPresetsByTone(
  tone: ColorPreset["tone"]
): ColorPreset[] {
  return colorPresets.filter((preset) => preset.tone === tone);
}

/**
 * Convert hex to RGB values
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
 * Calculate luminance for contrast checking
 */
export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Check if text should be light or dark on a background
 */
export function getContrastTextColor(backgroundColor: string): string {
  const luminance = getLuminance(backgroundColor);
  return luminance > 0.5 ? "#0f172a" : "#ffffff";
}
