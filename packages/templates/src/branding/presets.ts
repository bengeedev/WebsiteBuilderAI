import type { BrandingPreset, BrandColors, Typography } from "../types";
import { colorPresets, getColorPreset } from "./colors";
import { fontPairings, getFontPairing, createTypography } from "./fonts";

/**
 * Complete branding presets combining colors + typography
 * These are ready-to-use brand identities for different industries
 */
export const brandingPresets: BrandingPreset[] = [
  // Tech & SaaS
  {
    id: "tech-modern",
    name: "Tech Modern",
    description: "Clean and innovative for tech startups",
    colors: getColorPreset("indigo-saas")!.colors,
    typography: createTypography(getFontPairing("modern-tech")!),
  },
  {
    id: "saas-pro",
    name: "SaaS Professional",
    description: "Polished look for software products",
    colors: getColorPreset("blue-professional")!.colors,
    typography: createTypography(getFontPairing("jakarta-modern")!),
  },
  {
    id: "startup-bold",
    name: "Startup Bold",
    description: "Energetic and forward-thinking",
    colors: getColorPreset("cyan-tech")!.colors,
    typography: createTypography(getFontPairing("space-age")!),
  },

  // Professional Services
  {
    id: "corporate-classic",
    name: "Corporate Classic",
    description: "Trustworthy for finance and consulting",
    colors: getColorPreset("navy-corporate")!.colors,
    typography: createTypography(getFontPairing("professional-classic")!),
  },
  {
    id: "law-firm",
    name: "Law Firm",
    description: "Authoritative and respectable",
    colors: getColorPreset("navy-corporate")!.colors,
    typography: createTypography(getFontPairing("elegant-serif")!),
  },
  {
    id: "business-modern",
    name: "Business Modern",
    description: "Contemporary professional look",
    colors: getColorPreset("blue-professional")!.colors,
    typography: createTypography(getFontPairing("ibm-business")!),
  },

  // Creative & Agency
  {
    id: "creative-studio",
    name: "Creative Studio",
    description: "Bold and imaginative for agencies",
    colors: getColorPreset("purple-creative")!.colors,
    typography: createTypography(getFontPairing("syne-statement")!),
  },
  {
    id: "portfolio-minimal",
    name: "Portfolio Minimal",
    description: "Clean canvas for showcasing work",
    colors: getColorPreset("slate-minimal")!.colors,
    typography: createTypography(getFontPairing("dm-minimal")!),
  },
  {
    id: "artistic-bold",
    name: "Artistic Bold",
    description: "Expressive for artists and designers",
    colors: getColorPreset("mono-dark")!.colors,
    typography: createTypography(getFontPairing("raleway-artistic")!),
  },

  // Food & Hospitality
  {
    id: "restaurant-warm",
    name: "Restaurant Warm",
    description: "Inviting for dining establishments",
    colors: getColorPreset("coral-warm")!.colors,
    typography: createTypography(getFontPairing("elegant-serif")!),
  },
  {
    id: "cafe-cozy",
    name: "Café Cozy",
    description: "Comfortable for coffee shops",
    colors: getColorPreset("amber-cozy")!.colors,
    typography: createTypography(getFontPairing("friendly-round")!),
  },
  {
    id: "fine-dining",
    name: "Fine Dining",
    description: "Luxurious for upscale restaurants",
    colors: getColorPreset("gold-luxury")!.colors,
    typography: createTypography(getFontPairing("classic-luxe")!),
  },

  // Health & Wellness
  {
    id: "wellness-calm",
    name: "Wellness Calm",
    description: "Serene for spas and wellness",
    colors: getColorPreset("teal-wellness")!.colors,
    typography: createTypography(getFontPairing("quicksand-fun")!),
  },
  {
    id: "healthcare-trust",
    name: "Healthcare Trust",
    description: "Reliable for medical practices",
    colors: getColorPreset("blue-professional")!.colors,
    typography: createTypography(getFontPairing("roboto-reliable")!),
  },
  {
    id: "fitness-energy",
    name: "Fitness Energy",
    description: "Dynamic for gyms and trainers",
    colors: getColorPreset("orange-energy")!.colors,
    typography: createTypography(getFontPairing("bebas-power")!),
  },

  // Beauty & Fashion
  {
    id: "beauty-elegant",
    name: "Beauty Elegant",
    description: "Sophisticated for beauty brands",
    colors: getColorPreset("pink-playful")!.colors,
    typography: createTypography(getFontPairing("elegant-serif")!),
  },
  {
    id: "fashion-bold",
    name: "Fashion Bold",
    description: "Statement-making for fashion",
    colors: getColorPreset("mono-dark")!.colors,
    typography: createTypography(getFontPairing("oswald-punch")!),
  },
  {
    id: "salon-modern",
    name: "Salon Modern",
    description: "Trendy for hair and beauty salons",
    colors: getColorPreset("purple-creative")!.colors,
    typography: createTypography(getFontPairing("poppins-friendly")!),
  },

  // Real Estate & Property
  {
    id: "realestate-luxury",
    name: "Real Estate Luxury",
    description: "Premium for high-end properties",
    colors: getColorPreset("gold-luxury")!.colors,
    typography: createTypography(getFontPairing("elegant-serif")!),
  },
  {
    id: "property-modern",
    name: "Property Modern",
    description: "Clean for real estate agencies",
    colors: getColorPreset("blue-professional")!.colors,
    typography: createTypography(getFontPairing("bold-impact")!, { headingWeight: 600 }),
  },

  // Education & Learning
  {
    id: "education-friendly",
    name: "Education Friendly",
    description: "Approachable for schools and tutoring",
    colors: getColorPreset("blue-professional")!.colors,
    typography: createTypography(getFontPairing("nunito-warm")!),
  },
  {
    id: "course-modern",
    name: "Course Modern",
    description: "Engaging for online courses",
    colors: getColorPreset("indigo-saas")!.colors,
    typography: createTypography(getFontPairing("poppins-friendly")!),
  },

  // Non-profit & Community
  {
    id: "nonprofit-heart",
    name: "Non-profit Heart",
    description: "Compassionate for charitable orgs",
    colors: getColorPreset("green-nature")!.colors,
    typography: createTypography(getFontPairing("friendly-round")!),
  },
  {
    id: "community-open",
    name: "Community Open",
    description: "Welcoming for community groups",
    colors: getColorPreset("teal-wellness")!.colors,
    typography: createTypography(getFontPairing("nunito-warm")!),
  },

  // E-commerce
  {
    id: "ecommerce-clean",
    name: "E-commerce Clean",
    description: "Focused on products",
    colors: getColorPreset("slate-minimal")!.colors,
    typography: createTypography(getFontPairing("inter-clean")!),
  },
  {
    id: "shop-vibrant",
    name: "Shop Vibrant",
    description: "Energetic for retail",
    colors: getColorPreset("orange-energy")!.colors,
    typography: createTypography(getFontPairing("poppins-friendly")!),
  },
];

/**
 * Get a branding preset by ID
 */
export function getBrandingPreset(id: string): BrandingPreset | undefined {
  return brandingPresets.find((preset) => preset.id === id);
}

/**
 * Get recommended presets for an industry
 */
export function getPresetsForIndustry(industry: string): BrandingPreset[] {
  const industryMap: Record<string, string[]> = {
    restaurant: ["restaurant-warm", "cafe-cozy", "fine-dining"],
    technology: ["tech-modern", "saas-pro", "startup-bold"],
    healthcare: ["healthcare-trust", "wellness-calm"],
    fitness: ["fitness-energy", "wellness-calm"],
    beauty: ["beauty-elegant", "salon-modern", "fashion-bold"],
    realestate: ["realestate-luxury", "property-modern"],
    professional: ["corporate-classic", "law-firm", "business-modern"],
    creative: ["creative-studio", "portfolio-minimal", "artistic-bold"],
    education: ["education-friendly", "course-modern"],
    nonprofit: ["nonprofit-heart", "community-open"],
    ecommerce: ["ecommerce-clean", "shop-vibrant"],
  };

  const presetIds = industryMap[industry.toLowerCase()] || [];
  return presetIds
    .map((id) => getBrandingPreset(id))
    .filter((preset): preset is BrandingPreset => preset !== undefined);
}

/**
 * Create a custom branding preset from color and font pairing
 */
export function createBrandingPreset(
  colorPresetId: string,
  fontPairingId: string,
  name?: string
): BrandingPreset | null {
  const colorPreset = getColorPreset(colorPresetId);
  const fontPairing = getFontPairing(fontPairingId);

  if (!colorPreset || !fontPairing) {
    return null;
  }

  return {
    id: `custom-${colorPresetId}-${fontPairingId}`,
    name: name || `${colorPreset.name} + ${fontPairing.name}`,
    colors: colorPreset.colors,
    typography: createTypography(fontPairing),
  };
}

/**
 * Generate CSS variables from a branding preset
 */
export function getBrandingCSSVariables(
  branding: BrandingPreset
): Record<string, string> {
  const { colors, typography } = branding;

  return {
    // Colors
    "--color-primary": colors.primary,
    "--color-secondary": colors.secondary,
    "--color-accent": colors.accent,
    "--color-background": colors.background,
    "--color-surface": colors.surface,
    "--color-text-primary": colors.text.primary,
    "--color-text-secondary": colors.text.secondary,
    "--color-text-muted": colors.text.muted,
    "--color-success": colors.success,
    "--color-warning": colors.warning,
    "--color-error": colors.error,
    "--color-info": colors.info,

    // Gradients
    ...(colors.gradients?.primary && {
      "--gradient-primary": colors.gradients.primary,
    }),
    ...(colors.gradients?.accent && {
      "--gradient-accent": colors.gradients.accent,
    }),

    // Typography
    "--font-heading": `"${typography.headingFont.family}", ${typography.headingFont.fallback}`,
    "--font-body": `"${typography.bodyFont.family}", ${typography.bodyFont.fallback}`,
    "--font-weight-heading": typography.headingWeight.toString(),
    "--font-weight-body": typography.bodyWeight.toString(),
  };
}
