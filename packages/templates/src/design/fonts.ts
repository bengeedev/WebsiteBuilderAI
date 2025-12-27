/**
 * Font Library
 *
 * Curated collection of Google Fonts organized by style and use case.
 * Each font includes metadata for AI selection and pairing recommendations.
 */

export type FontCategory = "sans-serif" | "serif" | "display" | "handwriting" | "monospace";

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type FontStyle = "modern" | "classic" | "elegant" | "playful" | "professional" | "minimal" | "bold" | "friendly";

export type FontDefinition = {
  id: string;
  name: string;
  family: string; // CSS font-family value
  category: FontCategory;
  styles: FontStyle[];
  weights: FontWeight[];
  googleFontsUrl: string;
  preview: string; // Sample text for preview
  pairsWith: string[]; // IDs of fonts that pair well
  useCases: string[];
  aiHints: {
    businessTypes: string[];
    moods: string[];
  };
};

// ============================================
// SANS-SERIF FONTS
// ============================================

export const sansSerifFonts: FontDefinition[] = [
  {
    id: "inter",
    name: "Inter",
    family: "'Inter', sans-serif",
    category: "sans-serif",
    styles: ["modern", "minimal", "professional"],
    weights: [300, 400, 500, 600, 700, 800],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["playfair-display", "merriweather", "source-serif-pro"],
    useCases: ["body", "ui", "headings"],
    aiHints: {
      businessTypes: ["saas", "tech", "startup", "agency", "consulting"],
      moods: ["clean", "professional", "modern", "trustworthy"],
    },
  },
  {
    id: "poppins",
    name: "Poppins",
    family: "'Poppins', sans-serif",
    category: "sans-serif",
    styles: ["modern", "friendly", "professional"],
    weights: [300, 400, 500, 600, 700, 800],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["lora", "source-serif-pro", "playfair-display"],
    useCases: ["headings", "body", "ui"],
    aiHints: {
      businessTypes: ["saas", "agency", "creative", "education", "healthcare"],
      moods: ["friendly", "approachable", "modern", "clean"],
    },
  },
  {
    id: "dm-sans",
    name: "DM Sans",
    family: "'DM Sans', sans-serif",
    category: "sans-serif",
    styles: ["modern", "minimal", "friendly"],
    weights: [400, 500, 700],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["dm-serif-display", "source-serif-pro"],
    useCases: ["body", "ui"],
    aiHints: {
      businessTypes: ["startup", "tech", "creative", "portfolio"],
      moods: ["clean", "modern", "geometric"],
    },
  },
  {
    id: "space-grotesk",
    name: "Space Grotesk",
    family: "'Space Grotesk', sans-serif",
    category: "sans-serif",
    styles: ["modern", "bold", "professional"],
    weights: [300, 400, 500, 600, 700],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["source-serif-pro", "merriweather"],
    useCases: ["headings", "display"],
    aiHints: {
      businessTypes: ["tech", "saas", "fintech", "blockchain"],
      moods: ["futuristic", "bold", "innovative"],
    },
  },
  {
    id: "outfit",
    name: "Outfit",
    family: "'Outfit', sans-serif",
    category: "sans-serif",
    styles: ["modern", "minimal", "elegant"],
    weights: [300, 400, 500, 600, 700, 800],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["source-serif-pro", "lora"],
    useCases: ["headings", "body", "ui"],
    aiHints: {
      businessTypes: ["fashion", "lifestyle", "creative", "agency"],
      moods: ["elegant", "modern", "sophisticated"],
    },
  },
  {
    id: "manrope",
    name: "Manrope",
    family: "'Manrope', sans-serif",
    category: "sans-serif",
    styles: ["modern", "professional", "friendly"],
    weights: [300, 400, 500, 600, 700, 800],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["libre-baskerville", "merriweather"],
    useCases: ["body", "headings", "ui"],
    aiHints: {
      businessTypes: ["saas", "consulting", "finance", "healthcare"],
      moods: ["trustworthy", "professional", "modern"],
    },
  },
  {
    id: "plus-jakarta-sans",
    name: "Plus Jakarta Sans",
    family: "'Plus Jakarta Sans', sans-serif",
    category: "sans-serif",
    styles: ["modern", "friendly", "professional"],
    weights: [300, 400, 500, 600, 700, 800],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["source-serif-pro", "lora"],
    useCases: ["body", "headings", "ui"],
    aiHints: {
      businessTypes: ["startup", "tech", "agency", "education"],
      moods: ["friendly", "modern", "approachable"],
    },
  },
  {
    id: "nunito",
    name: "Nunito",
    family: "'Nunito', sans-serif",
    category: "sans-serif",
    styles: ["friendly", "playful", "modern"],
    weights: [300, 400, 500, 600, 700, 800],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["lora", "merriweather"],
    useCases: ["body", "ui"],
    aiHints: {
      businessTypes: ["education", "kids", "healthcare", "nonprofit"],
      moods: ["friendly", "warm", "approachable", "soft"],
    },
  },
  {
    id: "work-sans",
    name: "Work Sans",
    family: "'Work Sans', sans-serif",
    category: "sans-serif",
    styles: ["modern", "professional", "minimal"],
    weights: [300, 400, 500, 600, 700, 800],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["source-serif-pro", "libre-baskerville"],
    useCases: ["body", "headings", "ui"],
    aiHints: {
      businessTypes: ["agency", "consulting", "business", "finance"],
      moods: ["professional", "clean", "reliable"],
    },
  },
  {
    id: "raleway",
    name: "Raleway",
    family: "'Raleway', sans-serif",
    category: "sans-serif",
    styles: ["elegant", "modern", "minimal"],
    weights: [300, 400, 500, 600, 700, 800],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["merriweather", "lora", "source-serif-pro"],
    useCases: ["headings", "display"],
    aiHints: {
      businessTypes: ["fashion", "luxury", "creative", "portfolio"],
      moods: ["elegant", "sophisticated", "stylish"],
    },
  },
];

// ============================================
// SERIF FONTS
// ============================================

export const serifFonts: FontDefinition[] = [
  {
    id: "playfair-display",
    name: "Playfair Display",
    family: "'Playfair Display', serif",
    category: "serif",
    styles: ["elegant", "classic", "bold"],
    weights: [400, 500, 600, 700, 800, 900],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["inter", "poppins", "dm-sans", "work-sans"],
    useCases: ["headings", "display"],
    aiHints: {
      businessTypes: ["luxury", "fashion", "restaurant", "hotel", "wedding"],
      moods: ["elegant", "sophisticated", "dramatic", "luxurious"],
    },
  },
  {
    id: "merriweather",
    name: "Merriweather",
    family: "'Merriweather', serif",
    category: "serif",
    styles: ["classic", "professional", "elegant"],
    weights: [300, 400, 700, 900],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["inter", "poppins", "work-sans", "nunito"],
    useCases: ["body", "headings"],
    aiHints: {
      businessTypes: ["publishing", "blog", "news", "law", "education"],
      moods: ["trustworthy", "authoritative", "traditional"],
    },
  },
  {
    id: "lora",
    name: "Lora",
    family: "'Lora', serif",
    category: "serif",
    styles: ["elegant", "classic", "friendly"],
    weights: [400, 500, 600, 700],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["poppins", "dm-sans", "outfit", "nunito"],
    useCases: ["body", "headings"],
    aiHints: {
      businessTypes: ["blog", "lifestyle", "wellness", "beauty"],
      moods: ["warm", "elegant", "welcoming"],
    },
  },
  {
    id: "source-serif-pro",
    name: "Source Serif Pro",
    family: "'Source Serif Pro', serif",
    category: "serif",
    styles: ["classic", "professional", "minimal"],
    weights: [300, 400, 600, 700],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@300;400;600;700&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["inter", "dm-sans", "space-grotesk", "work-sans"],
    useCases: ["body", "headings"],
    aiHints: {
      businessTypes: ["publishing", "consulting", "finance", "legal"],
      moods: ["professional", "trustworthy", "refined"],
    },
  },
  {
    id: "libre-baskerville",
    name: "Libre Baskerville",
    family: "'Libre Baskerville', serif",
    category: "serif",
    styles: ["classic", "elegant", "professional"],
    weights: [400, 700],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["manrope", "work-sans", "inter"],
    useCases: ["body", "headings"],
    aiHints: {
      businessTypes: ["law", "publishing", "education", "nonprofit"],
      moods: ["traditional", "trustworthy", "authoritative"],
    },
  },
  {
    id: "dm-serif-display",
    name: "DM Serif Display",
    family: "'DM Serif Display', serif",
    category: "serif",
    styles: ["elegant", "bold", "modern"],
    weights: [400],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["dm-sans", "inter", "poppins"],
    useCases: ["headings", "display"],
    aiHints: {
      businessTypes: ["luxury", "fashion", "restaurant", "creative"],
      moods: ["elegant", "bold", "sophisticated"],
    },
  },
  {
    id: "cormorant-garamond",
    name: "Cormorant Garamond",
    family: "'Cormorant Garamond', serif",
    category: "serif",
    styles: ["elegant", "classic", "minimal"],
    weights: [300, 400, 500, 600, 700],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap",
    preview: "The quick brown fox jumps over the lazy dog",
    pairsWith: ["inter", "poppins", "dm-sans"],
    useCases: ["headings", "display", "body"],
    aiHints: {
      businessTypes: ["wedding", "luxury", "fashion", "jewelry"],
      moods: ["delicate", "refined", "romantic"],
    },
  },
];

// ============================================
// DISPLAY FONTS
// ============================================

export const displayFonts: FontDefinition[] = [
  {
    id: "bebas-neue",
    name: "Bebas Neue",
    family: "'Bebas Neue', sans-serif",
    category: "display",
    styles: ["bold", "modern", "minimal"],
    weights: [400],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
    preview: "THE QUICK BROWN FOX",
    pairsWith: ["inter", "poppins", "lora"],
    useCases: ["headings", "display"],
    aiHints: {
      businessTypes: ["sports", "fitness", "entertainment", "media"],
      moods: ["bold", "impactful", "energetic"],
    },
  },
  {
    id: "oswald",
    name: "Oswald",
    family: "'Oswald', sans-serif",
    category: "display",
    styles: ["bold", "modern", "professional"],
    weights: [300, 400, 500, 600, 700],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap",
    preview: "The quick brown fox jumps",
    pairsWith: ["merriweather", "lora", "source-serif-pro"],
    useCases: ["headings", "display"],
    aiHints: {
      businessTypes: ["news", "sports", "media", "politics"],
      moods: ["bold", "attention-grabbing", "serious"],
    },
  },
  {
    id: "abril-fatface",
    name: "Abril Fatface",
    family: "'Abril Fatface', serif",
    category: "display",
    styles: ["elegant", "bold", "classic"],
    weights: [400],
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap",
    preview: "The quick brown fox",
    pairsWith: ["inter", "poppins", "lora"],
    useCases: ["headings", "display"],
    aiHints: {
      businessTypes: ["fashion", "magazine", "editorial", "luxury"],
      moods: ["dramatic", "elegant", "editorial"],
    },
  },
];

// ============================================
// ALL FONTS & UTILITIES
// ============================================

export const allFonts: FontDefinition[] = [
  ...sansSerifFonts,
  ...serifFonts,
  ...displayFonts,
];

export const fontRegistry = new Map<string, FontDefinition>(
  allFonts.map((font) => [font.id, font])
);

/**
 * Get a font by ID
 */
export function getFont(id: string): FontDefinition | undefined {
  return fontRegistry.get(id);
}

/**
 * Get fonts by category
 */
export function getFontsByCategory(category: FontCategory): FontDefinition[] {
  return allFonts.filter((font) => font.category === category);
}

/**
 * Get fonts by style
 */
export function getFontsByStyle(style: FontStyle): FontDefinition[] {
  return allFonts.filter((font) => font.styles.includes(style));
}

/**
 * Get font recommendations for a business type
 */
export function getRecommendedFonts(businessType: string): {
  heading: FontDefinition[];
  body: FontDefinition[];
} {
  const businessLower = businessType.toLowerCase();

  // Find fonts that match this business type
  const matchingFonts = allFonts.filter((font) =>
    font.aiHints.businessTypes.some((bt) =>
      businessLower.includes(bt) || bt.includes(businessLower)
    )
  );

  // If no matches, return general recommendations
  if (matchingFonts.length === 0) {
    return {
      heading: [getFont("inter")!, getFont("poppins")!, getFont("playfair-display")!],
      body: [getFont("inter")!, getFont("poppins")!, getFont("merriweather")!],
    };
  }

  // Separate into heading and body candidates
  const headingFonts = matchingFonts.filter((f) =>
    f.useCases.includes("headings") || f.useCases.includes("display")
  );
  const bodyFonts = matchingFonts.filter((f) =>
    f.useCases.includes("body")
  );

  return {
    heading: headingFonts.length > 0 ? headingFonts.slice(0, 5) : [getFont("inter")!, getFont("playfair-display")!],
    body: bodyFonts.length > 0 ? bodyFonts.slice(0, 5) : [getFont("inter")!, getFont("merriweather")!],
  };
}

/**
 * Get font pairings for a given font
 */
export function getFontPairings(fontId: string): FontDefinition[] {
  const font = fontRegistry.get(fontId);
  if (!font) return [];

  return font.pairsWith
    .map((id) => fontRegistry.get(id))
    .filter((f): f is FontDefinition => f !== undefined);
}

/**
 * Generate Google Fonts URL for multiple fonts
 */
export function generateGoogleFontsUrl(fontIds: string[]): string {
  const fonts = fontIds
    .map((id) => fontRegistry.get(id))
    .filter((f): f is FontDefinition => f !== undefined);

  if (fonts.length === 0) return "";

  const families = fonts.map((font) => {
    const weights = font.weights.join(";");
    return `family=${font.name.replace(/\s+/g, "+")}:wght@${weights}`;
  });

  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
}

// ============================================
// FONT PAIRING PRESETS
// ============================================

export type FontPairing = {
  id: string;
  name: string;
  description: string;
  heading: string; // Font ID
  body: string; // Font ID
  styles: FontStyle[];
  businessTypes: string[];
};

export const fontPairings: FontPairing[] = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Clean and professional look for SaaS and tech companies",
    heading: "inter",
    body: "inter",
    styles: ["modern", "professional", "minimal"],
    businessTypes: ["saas", "tech", "startup", "consulting"],
  },
  {
    id: "elegant-classic",
    name: "Elegant Classic",
    description: "Sophisticated pairing for luxury and fashion brands",
    heading: "playfair-display",
    body: "inter",
    styles: ["elegant", "classic"],
    businessTypes: ["luxury", "fashion", "restaurant", "hotel"],
  },
  {
    id: "friendly-modern",
    name: "Friendly Modern",
    description: "Approachable and modern for education and healthcare",
    heading: "poppins",
    body: "nunito",
    styles: ["friendly", "modern"],
    businessTypes: ["education", "healthcare", "nonprofit"],
  },
  {
    id: "bold-editorial",
    name: "Bold Editorial",
    description: "Statement-making headlines with readable body text",
    heading: "bebas-neue",
    body: "merriweather",
    styles: ["bold", "modern"],
    businessTypes: ["media", "sports", "entertainment"],
  },
  {
    id: "refined-minimal",
    name: "Refined Minimal",
    description: "Understated elegance with excellent readability",
    heading: "dm-serif-display",
    body: "dm-sans",
    styles: ["elegant", "minimal", "modern"],
    businessTypes: ["portfolio", "creative", "architecture"],
  },
  {
    id: "warm-welcoming",
    name: "Warm & Welcoming",
    description: "Inviting combination for hospitality and lifestyle",
    heading: "lora",
    body: "poppins",
    styles: ["friendly", "elegant"],
    businessTypes: ["restaurant", "cafe", "wellness", "lifestyle"],
  },
  {
    id: "tech-forward",
    name: "Tech Forward",
    description: "Futuristic feel for innovative tech companies",
    heading: "space-grotesk",
    body: "inter",
    styles: ["modern", "bold"],
    businessTypes: ["fintech", "blockchain", "ai", "tech"],
  },
  {
    id: "traditional-trust",
    name: "Traditional & Trustworthy",
    description: "Established feel for legal and financial services",
    heading: "libre-baskerville",
    body: "work-sans",
    styles: ["classic", "professional"],
    businessTypes: ["law", "finance", "insurance", "consulting"],
  },
];

/**
 * Get font pairing by ID
 */
export function getFontPairing(id: string): FontPairing | undefined {
  return fontPairings.find((p) => p.id === id);
}

/**
 * Get recommended font pairings for a business type
 */
export function getRecommendedPairings(businessType: string): FontPairing[] {
  const businessLower = businessType.toLowerCase();
  return fontPairings.filter((pairing) =>
    pairing.businessTypes.some((bt) =>
      businessLower.includes(bt) || bt.includes(businessLower)
    )
  );
}
