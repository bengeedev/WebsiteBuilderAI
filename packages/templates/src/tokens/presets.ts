/**
 * Token Presets
 *
 * Pre-configured design token sets for different styles and industries.
 * These can be used as starting points and customized further.
 */

import type { DesignTokens, TokenPreset } from "./types";

// ============================================
// DEFAULT TOKENS
// ============================================

export const defaultTokens: DesignTokens = {
  colors: {
    primary: "#3b82f6",      // Blue
    secondary: "#1e293b",    // Slate dark
    accent: "#f59e0b",       // Amber
    background: "#ffffff",
    surface: "#f8fafc",
    border: "#e2e8f0",
    text: {
      primary: "#0f172a",
      secondary: "#475569",
      muted: "#94a3b8",
      inverse: "#ffffff",
    },
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },

  typography: {
    fontFamily: {
      heading: "Inter, system-ui, sans-serif",
      body: "Inter, system-ui, sans-serif",
      mono: "JetBrains Mono, Fira Code, monospace",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
  },

  spacing: {
    scale: {
      0: "0",
      px: "1px",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
    },
    section: {
      sm: "3rem",
      md: "4rem",
      lg: "5rem",
      xl: "6rem",
    },
    container: {
      maxWidth: "1280px",
      padding: "1rem",
    },
    gap: {
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    },
  },

  effects: {
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      full: "9999px",
    },
    shadow: {
      none: "none",
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    },
    transition: {
      fast: "150ms ease-in-out",
      normal: "200ms ease-in-out",
      slow: "300ms ease-in-out",
      slower: "500ms ease-in-out",
    },
    opacity: {
      0: "0",
      5: "0.05",
      10: "0.1",
      20: "0.2",
      25: "0.25",
      30: "0.3",
      40: "0.4",
      50: "0.5",
      60: "0.6",
      70: "0.7",
      75: "0.75",
      80: "0.8",
      90: "0.9",
      95: "0.95",
      100: "1",
    },
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

// ============================================
// INDUSTRY PRESETS
// ============================================

export const restaurantPreset: TokenPreset = {
  id: "restaurant",
  name: "Restaurant",
  description: "Warm, inviting colors perfect for restaurants and cafes",
  tags: ["food", "hospitality", "dining"],
  tokens: {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      primary: "#dc2626",      // Red
      secondary: "#1c1917",    // Stone dark
      accent: "#f59e0b",       // Amber
      background: "#fffbeb",   // Warm white
      surface: "#fef3c7",
    },
    typography: {
      ...defaultTokens.typography,
      fontFamily: {
        heading: "Playfair Display, Georgia, serif",
        body: "Lato, system-ui, sans-serif",
      },
    },
  },
};

export const professionalPreset: TokenPreset = {
  id: "professional",
  name: "Professional",
  description: "Clean, corporate look for professional services",
  tags: ["business", "corporate", "consulting"],
  tokens: {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      primary: "#1e40af",      // Blue dark
      secondary: "#1e293b",    // Slate dark
      accent: "#0891b2",       // Cyan
    },
    typography: {
      ...defaultTokens.typography,
      fontFamily: {
        heading: "Inter, system-ui, sans-serif",
        body: "Inter, system-ui, sans-serif",
      },
    },
    effects: {
      ...defaultTokens.effects,
      borderRadius: {
        ...defaultTokens.effects.borderRadius,
        DEFAULT: "0.25rem",
        lg: "0.5rem",
      },
    },
  },
};

export const creativePreset: TokenPreset = {
  id: "creative",
  name: "Creative",
  description: "Bold, expressive design for creative professionals",
  tags: ["design", "art", "portfolio", "creative"],
  tokens: {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      primary: "#7c3aed",      // Violet
      secondary: "#0f172a",    // Slate darkest
      accent: "#f472b6",       // Pink
      background: "#faf5ff",   // Light purple
    },
    typography: {
      ...defaultTokens.typography,
      fontFamily: {
        heading: "Space Grotesk, system-ui, sans-serif",
        body: "DM Sans, system-ui, sans-serif",
      },
    },
    effects: {
      ...defaultTokens.effects,
      borderRadius: {
        ...defaultTokens.effects.borderRadius,
        DEFAULT: "1rem",
        lg: "1.5rem",
        xl: "2rem",
      },
    },
  },
};

export const minimalPreset: TokenPreset = {
  id: "minimal",
  name: "Minimal",
  description: "Clean, minimalist design with plenty of whitespace",
  tags: ["minimal", "clean", "modern"],
  tokens: {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      primary: "#171717",      // Neutral dark
      secondary: "#404040",    // Neutral
      accent: "#737373",       // Neutral light
      border: "#f5f5f5",
    },
    effects: {
      ...defaultTokens.effects,
      borderRadius: {
        ...defaultTokens.effects.borderRadius,
        DEFAULT: "0",
        sm: "0",
        md: "0",
        lg: "0",
      },
      shadow: {
        ...defaultTokens.effects.shadow,
        DEFAULT: "none",
        sm: "none",
        md: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
    },
  },
};

export const healthcarePreset: TokenPreset = {
  id: "healthcare",
  name: "Healthcare",
  description: "Calming, trustworthy colors for healthcare and wellness",
  tags: ["health", "medical", "wellness", "spa"],
  tokens: {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      primary: "#0d9488",      // Teal
      secondary: "#134e4a",    // Teal dark
      accent: "#5eead4",       // Teal light
      background: "#f0fdfa",   // Teal lightest
      surface: "#ccfbf1",
    },
    typography: {
      ...defaultTokens.typography,
      fontFamily: {
        heading: "Nunito, system-ui, sans-serif",
        body: "Open Sans, system-ui, sans-serif",
      },
    },
  },
};

export const techPreset: TokenPreset = {
  id: "tech",
  name: "Tech Startup",
  description: "Modern, innovative look for tech companies",
  tags: ["tech", "startup", "saas", "software"],
  tokens: {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      primary: "#6366f1",      // Indigo
      secondary: "#0f172a",    // Slate darkest
      accent: "#22d3ee",       // Cyan
      background: "#f8fafc",
    },
    typography: {
      ...defaultTokens.typography,
      fontFamily: {
        heading: "Plus Jakarta Sans, system-ui, sans-serif",
        body: "Inter, system-ui, sans-serif",
      },
    },
    effects: {
      ...defaultTokens.effects,
      borderRadius: {
        ...defaultTokens.effects.borderRadius,
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
      },
    },
  },
};

export const ecommercePreset: TokenPreset = {
  id: "ecommerce",
  name: "E-commerce",
  description: "Conversion-focused design for online stores",
  tags: ["shop", "store", "retail", "ecommerce"],
  tokens: {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      primary: "#059669",      // Emerald
      secondary: "#1e293b",    // Slate dark
      accent: "#f97316",       // Orange (for CTAs)
    },
    typography: {
      ...defaultTokens.typography,
      fontFamily: {
        heading: "Poppins, system-ui, sans-serif",
        body: "Inter, system-ui, sans-serif",
      },
    },
  },
};

// ============================================
// PRESET REGISTRY
// ============================================

export const tokenPresets: TokenPreset[] = [
  { id: "default", name: "Default", description: "Clean, versatile default design", tags: ["default"], tokens: defaultTokens },
  restaurantPreset,
  professionalPreset,
  creativePreset,
  minimalPreset,
  healthcarePreset,
  techPreset,
  ecommercePreset,
];

/**
 * Get a preset by ID
 */
export function getPreset(id: string): TokenPreset | undefined {
  return tokenPresets.find((p) => p.id === id);
}

/**
 * Get presets matching tags
 */
export function getPresetsByTag(tag: string): TokenPreset[] {
  return tokenPresets.filter((p) => p.tags.includes(tag));
}

/**
 * Get recommended preset for a business type
 */
export function getRecommendedPreset(businessType: string): TokenPreset {
  const mapping: Record<string, string> = {
    restaurant: "restaurant",
    cafe: "restaurant",
    bakery: "restaurant",
    portfolio: "creative",
    photography: "creative",
    design: "creative",
    agency: "creative",
    consulting: "professional",
    law: "professional",
    finance: "professional",
    accounting: "professional",
    healthcare: "healthcare",
    medical: "healthcare",
    spa: "healthcare",
    wellness: "healthcare",
    fitness: "healthcare",
    tech: "tech",
    saas: "tech",
    startup: "tech",
    software: "tech",
    ecommerce: "ecommerce",
    shop: "ecommerce",
    store: "ecommerce",
    retail: "ecommerce",
  };

  const presetId = mapping[businessType.toLowerCase()] || "default";
  return getPreset(presetId) || tokenPresets[0];
}
