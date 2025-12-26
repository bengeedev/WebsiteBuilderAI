import type { GoogleFont, FontPairing, Typography } from "../types";

/**
 * Curated Google Fonts collection
 * These are popular, versatile fonts with good language support
 */
export const googleFonts: Record<string, GoogleFont> = {
  // Sans-serif - Modern & Clean
  inter: {
    family: "Inter",
    weights: [400, 500, 600, 700],
    category: "sans-serif",
    fallback: "system-ui, sans-serif",
  },
  roboto: {
    family: "Roboto",
    weights: [400, 500, 700],
    category: "sans-serif",
    fallback: "Arial, sans-serif",
  },
  openSans: {
    family: "Open Sans",
    weights: [400, 500, 600, 700],
    category: "sans-serif",
    fallback: "Helvetica, Arial, sans-serif",
  },
  lato: {
    family: "Lato",
    weights: [400, 700],
    category: "sans-serif",
    fallback: "Helvetica, sans-serif",
  },
  poppins: {
    family: "Poppins",
    weights: [400, 500, 600, 700],
    category: "sans-serif",
    fallback: "system-ui, sans-serif",
  },
  montserrat: {
    family: "Montserrat",
    weights: [400, 500, 600, 700, 800],
    category: "sans-serif",
    fallback: "Arial, sans-serif",
  },
  nunito: {
    family: "Nunito",
    weights: [400, 600, 700],
    category: "sans-serif",
    fallback: "Arial, sans-serif",
  },
  sourceSansPro: {
    family: "Source Sans Pro",
    weights: [400, 600, 700],
    category: "sans-serif",
    fallback: "Arial, sans-serif",
  },
  dmSans: {
    family: "DM Sans",
    weights: [400, 500, 700],
    category: "sans-serif",
    fallback: "system-ui, sans-serif",
  },
  quicksand: {
    family: "Quicksand",
    weights: [400, 500, 600, 700],
    category: "sans-serif",
    fallback: "Arial, sans-serif",
  },
  mulish: {
    family: "Mulish",
    weights: [400, 500, 600, 700],
    category: "sans-serif",
    fallback: "Arial, sans-serif",
  },
  manrope: {
    family: "Manrope",
    weights: [400, 500, 600, 700, 800],
    category: "sans-serif",
    fallback: "system-ui, sans-serif",
  },
  ibmPlexSans: {
    family: "IBM Plex Sans",
    weights: [400, 500, 600, 700],
    category: "sans-serif",
    fallback: "Helvetica, sans-serif",
  },
  workSans: {
    family: "Work Sans",
    weights: [400, 500, 600, 700],
    category: "sans-serif",
    fallback: "Arial, sans-serif",
  },
  raleway: {
    family: "Raleway",
    weights: [400, 500, 600, 700],
    category: "sans-serif",
    fallback: "Arial, sans-serif",
  },
  spaceGrotesk: {
    family: "Space Grotesk",
    weights: [400, 500, 600, 700],
    category: "sans-serif",
    fallback: "system-ui, sans-serif",
  },
  plusJakartaSans: {
    family: "Plus Jakarta Sans",
    weights: [400, 500, 600, 700, 800],
    category: "sans-serif",
    fallback: "system-ui, sans-serif",
  },

  // Serif - Elegant & Classic
  playfairDisplay: {
    family: "Playfair Display",
    weights: [400, 500, 600, 700],
    category: "serif",
    fallback: "Georgia, serif",
  },
  merriweather: {
    family: "Merriweather",
    weights: [400, 700],
    category: "serif",
    fallback: "Georgia, serif",
  },
  lora: {
    family: "Lora",
    weights: [400, 500, 600, 700],
    category: "serif",
    fallback: "Georgia, serif",
  },
  crimsonPro: {
    family: "Crimson Pro",
    weights: [400, 500, 600, 700],
    category: "serif",
    fallback: "Times New Roman, serif",
  },
  sourceSerifPro: {
    family: "Source Serif Pro",
    weights: [400, 600, 700],
    category: "serif",
    fallback: "Georgia, serif",
  },
  cormorantGaramond: {
    family: "Cormorant Garamond",
    weights: [400, 500, 600, 700],
    category: "serif",
    fallback: "Garamond, serif",
  },
  libre: {
    family: "Libre Baskerville",
    weights: [400, 700],
    category: "serif",
    fallback: "Baskerville, serif",
  },
  dmSerif: {
    family: "DM Serif Display",
    weights: [400],
    category: "serif",
    fallback: "Georgia, serif",
  },
  fraunces: {
    family: "Fraunces",
    weights: [400, 500, 600, 700],
    category: "serif",
    fallback: "Georgia, serif",
  },

  // Display - Headlines & Impact
  bebas: {
    family: "Bebas Neue",
    weights: [400],
    category: "display",
    fallback: "Impact, sans-serif",
  },
  oswald: {
    family: "Oswald",
    weights: [400, 500, 600, 700],
    category: "display",
    fallback: "Impact, sans-serif",
  },
  anton: {
    family: "Anton",
    weights: [400],
    category: "display",
    fallback: "Impact, sans-serif",
  },
  archivo: {
    family: "Archivo Black",
    weights: [400],
    category: "display",
    fallback: "Impact, sans-serif",
  },
  staatliches: {
    family: "Staatliches",
    weights: [400],
    category: "display",
    fallback: "Impact, sans-serif",
  },
  syne: {
    family: "Syne",
    weights: [400, 500, 600, 700, 800],
    category: "display",
    fallback: "system-ui, sans-serif",
  },
  clashDisplay: {
    family: "Clash Display",
    weights: [400, 500, 600, 700],
    category: "display",
    fallback: "system-ui, sans-serif",
  },

  // Handwriting - Personal & Casual
  dancingScript: {
    family: "Dancing Script",
    weights: [400, 500, 600, 700],
    category: "handwriting",
    fallback: "cursive",
  },
  pacifico: {
    family: "Pacifico",
    weights: [400],
    category: "handwriting",
    fallback: "cursive",
  },
  caveat: {
    family: "Caveat",
    weights: [400, 500, 600, 700],
    category: "handwriting",
    fallback: "cursive",
  },
  greatVibes: {
    family: "Great Vibes",
    weights: [400],
    category: "handwriting",
    fallback: "cursive",
  },

  // Monospace - Code & Technical
  jetBrainsMono: {
    family: "JetBrains Mono",
    weights: [400, 500, 700],
    category: "monospace",
    fallback: "monospace",
  },
  firaCode: {
    family: "Fira Code",
    weights: [400, 500, 700],
    category: "monospace",
    fallback: "monospace",
  },
  ibmPlexMono: {
    family: "IBM Plex Mono",
    weights: [400, 500, 700],
    category: "monospace",
    fallback: "monospace",
  },
  spaceMono: {
    family: "Space Mono",
    weights: [400, 700],
    category: "monospace",
    fallback: "monospace",
  },
};

/**
 * Curated font pairings for different brand tones
 */
export const fontPairings: FontPairing[] = [
  // Modern & Tech
  {
    id: "modern-tech",
    name: "Modern Tech",
    description: "Clean and contemporary for tech products and startups",
    heading: googleFonts.inter,
    body: googleFonts.inter,
    tone: "modern",
  },
  {
    id: "space-age",
    name: "Space Age",
    description: "Futuristic and geometric for innovative brands",
    heading: googleFonts.spaceGrotesk,
    body: googleFonts.inter,
    tone: "modern",
  },
  {
    id: "jakarta-modern",
    name: "Jakarta Modern",
    description: "Sophisticated modern look for SaaS products",
    heading: googleFonts.plusJakartaSans,
    body: googleFonts.inter,
    tone: "modern",
  },
  {
    id: "manrope-clean",
    name: "Manrope Clean",
    description: "Crisp and versatile for digital products",
    heading: googleFonts.manrope,
    body: googleFonts.inter,
    tone: "modern",
  },

  // Elegant & Luxury
  {
    id: "elegant-serif",
    name: "Elegant Serif",
    description: "Sophisticated and timeless for luxury brands",
    heading: googleFonts.playfairDisplay,
    body: googleFonts.lato,
    tone: "elegant",
  },
  {
    id: "classic-luxe",
    name: "Classic Luxe",
    description: "Refined elegance for high-end services",
    heading: googleFonts.cormorantGaramond,
    body: googleFonts.mulish,
    tone: "elegant",
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Magazine-style sophistication for content sites",
    heading: googleFonts.dmSerif,
    body: googleFonts.dmSans,
    tone: "elegant",
  },
  {
    id: "fraunces-elegant",
    name: "Fraunces Elegant",
    description: "Distinctive serif pairing for premium brands",
    heading: googleFonts.fraunces,
    body: googleFonts.openSans,
    tone: "elegant",
  },

  // Bold & Impactful
  {
    id: "bold-impact",
    name: "Bold Impact",
    description: "Strong and commanding for attention-grabbing sites",
    heading: googleFonts.montserrat,
    body: googleFonts.openSans,
    tone: "bold",
  },
  {
    id: "oswald-punch",
    name: "Oswald Punch",
    description: "Condensed headlines for maximum impact",
    heading: googleFonts.oswald,
    body: googleFonts.sourceSansPro,
    tone: "bold",
  },
  {
    id: "bebas-power",
    name: "Bebas Power",
    description: "All-caps headlines for fitness and sports",
    heading: googleFonts.bebas,
    body: googleFonts.roboto,
    tone: "bold",
  },
  {
    id: "syne-statement",
    name: "Syne Statement",
    description: "Unique display font for creative agencies",
    heading: googleFonts.syne,
    body: googleFonts.workSans,
    tone: "bold",
  },

  // Creative & Playful
  {
    id: "creative-pop",
    name: "Creative Pop",
    description: "Fun and approachable for creative portfolios",
    heading: googleFonts.poppins,
    body: googleFonts.nunito,
    tone: "creative",
  },
  {
    id: "quicksand-fun",
    name: "Quicksand Fun",
    description: "Rounded and friendly for casual brands",
    heading: googleFonts.quicksand,
    body: googleFonts.mulish,
    tone: "creative",
  },
  {
    id: "raleway-artistic",
    name: "Raleway Artistic",
    description: "Thin and stylish for design-focused sites",
    heading: googleFonts.raleway,
    body: googleFonts.openSans,
    tone: "creative",
  },

  // Professional & Business
  {
    id: "professional-classic",
    name: "Professional Classic",
    description: "Reliable and trustworthy for corporate sites",
    heading: googleFonts.sourceSansPro,
    body: googleFonts.merriweather,
    tone: "professional",
  },
  {
    id: "ibm-business",
    name: "IBM Business",
    description: "Corporate and technical for B2B services",
    heading: googleFonts.ibmPlexSans,
    body: googleFonts.ibmPlexSans,
    tone: "professional",
  },
  {
    id: "roboto-reliable",
    name: "Roboto Reliable",
    description: "Google's workhorse font for universal appeal",
    heading: googleFonts.roboto,
    body: googleFonts.roboto,
    tone: "professional",
  },
  {
    id: "work-sans-pro",
    name: "Work Sans Pro",
    description: "Optimized for screens, great for web apps",
    heading: googleFonts.workSans,
    body: googleFonts.workSans,
    tone: "professional",
  },

  // Minimal & Clean
  {
    id: "dm-minimal",
    name: "DM Minimal",
    description: "Geometric and understated for minimal designs",
    heading: googleFonts.dmSans,
    body: googleFonts.dmSans,
    tone: "minimal",
  },
  {
    id: "inter-clean",
    name: "Inter Clean",
    description: "UI-optimized font for clean interfaces",
    heading: googleFonts.inter,
    body: googleFonts.inter,
    tone: "minimal",
  },

  // Friendly & Approachable
  {
    id: "friendly-round",
    name: "Friendly Round",
    description: "Warm and inviting for community sites",
    heading: googleFonts.quicksand,
    body: googleFonts.mulish,
    tone: "friendly",
  },
  {
    id: "nunito-warm",
    name: "Nunito Warm",
    description: "Balanced and readable for welcoming sites",
    heading: googleFonts.nunito,
    body: googleFonts.lato,
    tone: "friendly",
  },
  {
    id: "poppins-friendly",
    name: "Poppins Friendly",
    description: "Geometric but soft for approachable brands",
    heading: googleFonts.poppins,
    body: googleFonts.openSans,
    tone: "friendly",
  },
];

/**
 * Get a font pairing by ID
 */
export function getFontPairing(id: string): FontPairing | undefined {
  return fontPairings.find((pairing) => pairing.id === id);
}

/**
 * Get font pairings by tone
 */
export function getFontPairingsByTone(
  tone: FontPairing["tone"]
): FontPairing[] {
  return fontPairings.filter((pairing) => pairing.tone === tone);
}

/**
 * Generate typography configuration from a font pairing
 */
export function createTypography(
  pairing: FontPairing,
  options?: Partial<Typography>
): Typography {
  return {
    headingFont: pairing.heading,
    bodyFont: pairing.body,
    scale: options?.scale || "normal",
    headingWeight: options?.headingWeight || 700,
    bodyWeight: options?.bodyWeight || 400,
    ...options,
  };
}

/**
 * Generate Google Fonts URL for a typography configuration
 */
export function getGoogleFontsUrl(typography: Typography): string {
  const fonts = new Map<string, number[]>();

  // Add heading font
  const headingKey = typography.headingFont.family.replace(/\s+/g, "+");
  fonts.set(headingKey, [...typography.headingFont.weights]);

  // Add body font (merge weights if same font)
  const bodyKey = typography.bodyFont.family.replace(/\s+/g, "+");
  if (fonts.has(bodyKey)) {
    const existing = fonts.get(bodyKey)!;
    const merged = [...new Set([...existing, ...typography.bodyFont.weights])];
    fonts.set(bodyKey, merged.sort((a, b) => a - b));
  } else {
    fonts.set(bodyKey, [...typography.bodyFont.weights]);
  }

  // Add accent font if present
  if (typography.accentFont) {
    const accentKey = typography.accentFont.family.replace(/\s+/g, "+");
    fonts.set(accentKey, [...typography.accentFont.weights]);
  }

  // Build URL
  const familyParams = Array.from(fonts.entries())
    .map(([family, weights]) => `family=${family}:wght@${weights.join(";")}`)
    .join("&");

  return `https://fonts.googleapis.com/css2?${familyParams}&display=swap`;
}

/**
 * Generate CSS variables for typography
 */
export function getTypographyCSSVariables(typography: Typography): Record<string, string> {
  return {
    "--font-heading": `"${typography.headingFont.family}", ${typography.headingFont.fallback}`,
    "--font-body": `"${typography.bodyFont.family}", ${typography.bodyFont.fallback}`,
    "--font-weight-heading": typography.headingWeight.toString(),
    "--font-weight-body": typography.bodyWeight.toString(),
  };
}
