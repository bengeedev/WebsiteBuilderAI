/**
 * Image System
 *
 * Provides placeholder images, AI image generation prompts,
 * and image utilities for the block system.
 */

export type ImageCategory =
  | "hero"
  | "team"
  | "product"
  | "gallery"
  | "background"
  | "icon"
  | "logo"
  | "testimonial"
  | "feature"
  | "about";

export type ImageStyle =
  | "photo"
  | "illustration"
  | "abstract"
  | "minimal"
  | "3d"
  | "gradient";

export type AspectRatio = "1:1" | "16:9" | "4:3" | "3:2" | "2:3" | "9:16";

// ============================================
// PLACEHOLDER SYSTEM
// ============================================

export type PlaceholderConfig = {
  width: number;
  height: number;
  category: ImageCategory;
  text?: string;
  bgColor?: string;
  textColor?: string;
};

/**
 * Generate a placeholder image URL
 * Uses a simple SVG-based placeholder system
 */
export function getPlaceholderUrl(config: PlaceholderConfig): string {
  const { width, height, category, text, bgColor = "#e2e8f0", textColor = "#64748b" } = config;

  // Encode as base64 SVG data URL
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-family="system-ui, sans-serif" font-size="${Math.min(width, height) / 8}px">
        ${text || getCategoryIcon(category)}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Get an icon/emoji for a category
 */
function getCategoryIcon(category: ImageCategory): string {
  const icons: Record<ImageCategory, string> = {
    hero: "🖼️",
    team: "👤",
    product: "📦",
    gallery: "🖼️",
    background: "🎨",
    icon: "⭐",
    logo: "✨",
    testimonial: "💬",
    feature: "✨",
    about: "📝",
  };
  return icons[category] || "📷";
}

// ============================================
// STOCK PHOTO CATEGORIES
// ============================================

export type StockPhotoCategory = {
  id: string;
  name: string;
  keywords: string[];
  unsplashCollection?: string;
};

export const stockPhotoCategories: StockPhotoCategory[] = [
  {
    id: "business",
    name: "Business & Office",
    keywords: ["office", "meeting", "professional", "workspace", "team"],
    unsplashCollection: "1424240",
  },
  {
    id: "technology",
    name: "Technology",
    keywords: ["tech", "computer", "code", "digital", "innovation"],
    unsplashCollection: "1132508",
  },
  {
    id: "food",
    name: "Food & Restaurant",
    keywords: ["food", "restaurant", "cooking", "dining", "cuisine"],
    unsplashCollection: "1163637",
  },
  {
    id: "nature",
    name: "Nature & Outdoors",
    keywords: ["nature", "landscape", "outdoor", "forest", "mountain"],
    unsplashCollection: "1582351",
  },
  {
    id: "people",
    name: "People & Portraits",
    keywords: ["portrait", "people", "smile", "professional", "headshot"],
    unsplashCollection: "1118894",
  },
  {
    id: "fitness",
    name: "Fitness & Health",
    keywords: ["fitness", "gym", "workout", "health", "wellness"],
    unsplashCollection: "1124679",
  },
  {
    id: "architecture",
    name: "Architecture",
    keywords: ["building", "architecture", "interior", "design", "modern"],
    unsplashCollection: "1115407",
  },
  {
    id: "abstract",
    name: "Abstract & Backgrounds",
    keywords: ["abstract", "gradient", "pattern", "texture", "background"],
    unsplashCollection: "1169119",
  },
];

// ============================================
// AI IMAGE GENERATION PROMPTS
// ============================================

export type ImagePromptTemplate = {
  id: string;
  name: string;
  category: ImageCategory;
  template: string;
  style: ImageStyle;
  negativePrompt?: string;
};

export const imagePromptTemplates: ImagePromptTemplate[] = [
  // Hero Images
  {
    id: "hero-abstract",
    name: "Abstract Hero Background",
    category: "hero",
    style: "abstract",
    template: "Abstract geometric background with smooth gradients, {primaryColor} and {secondaryColor} tones, modern minimalist design, professional website hero, high quality, 8k",
    negativePrompt: "text, logos, people, faces, low quality",
  },
  {
    id: "hero-gradient",
    name: "Gradient Hero",
    category: "hero",
    style: "gradient",
    template: "Beautiful smooth gradient background transitioning from {primaryColor} to {secondaryColor}, soft lighting, modern design, perfect for website header, cinematic",
    negativePrompt: "text, logos, harsh edges, noise",
  },
  {
    id: "hero-3d",
    name: "3D Abstract Hero",
    category: "hero",
    style: "3d",
    template: "3D abstract shapes floating in space, {primaryColor} lighting, glass morphism effect, modern futuristic design, website hero background, octane render",
    negativePrompt: "text, logos, low quality, blurry",
  },

  // Team Photos
  {
    id: "team-headshot",
    name: "Professional Headshot",
    category: "team",
    style: "photo",
    template: "Professional headshot portrait, neutral background, soft studio lighting, business attire, friendly smile, high quality photo",
    negativePrompt: "cartoon, illustration, multiple people",
  },
  {
    id: "team-illustration",
    name: "Team Illustration",
    category: "team",
    style: "illustration",
    template: "Modern flat illustration of a professional person, {primaryColor} accent colors, minimal style, friendly appearance, suitable for team section",
    negativePrompt: "realistic photo, 3d render",
  },

  // Product Images
  {
    id: "product-mockup",
    name: "Product Mockup",
    category: "product",
    style: "photo",
    template: "Clean product photography on white background, professional studio lighting, e-commerce style, high detail, {productType}",
    negativePrompt: "text, watermark, cluttered background",
  },
  {
    id: "product-lifestyle",
    name: "Product Lifestyle",
    category: "product",
    style: "photo",
    template: "Lifestyle product photography, natural lighting, beautiful setting, {productType} in use, aspirational, high quality",
    negativePrompt: "studio, plain background, fake",
  },

  // Feature Icons
  {
    id: "feature-icon-3d",
    name: "3D Feature Icon",
    category: "feature",
    style: "3d",
    template: "3D icon representing {concept}, {primaryColor} color, glossy finish, floating on transparent background, modern design, app icon style",
    negativePrompt: "flat, 2d, low quality, text",
  },
  {
    id: "feature-icon-minimal",
    name: "Minimal Feature Icon",
    category: "feature",
    style: "minimal",
    template: "Minimal line icon representing {concept}, single color {primaryColor}, clean vector style, simple geometric shapes",
    negativePrompt: "complex, detailed, photo, 3d",
  },

  // Gallery Images
  {
    id: "gallery-portfolio",
    name: "Portfolio Image",
    category: "gallery",
    style: "photo",
    template: "Professional portfolio image showing {projectType}, high quality photography, good composition, showcasing work",
    negativePrompt: "low quality, blurry, amateur",
  },

  // Backgrounds
  {
    id: "bg-pattern",
    name: "Pattern Background",
    category: "background",
    style: "abstract",
    template: "Seamless geometric pattern, {primaryColor} tones, subtle and elegant, perfect for website section background, tileable",
    negativePrompt: "photos, faces, text, busy",
  },
  {
    id: "bg-texture",
    name: "Texture Background",
    category: "background",
    style: "abstract",
    template: "Subtle texture background, {primaryColor} color palette, noise grain, modern minimal, website section background",
    negativePrompt: "photos, faces, text, strong patterns",
  },
];

/**
 * Generate an image prompt from a template
 */
export function generateImagePrompt(
  templateId: string,
  variables: Record<string, string>
): { prompt: string; negativePrompt?: string } | null {
  const template = imagePromptTemplates.find((t) => t.id === templateId);
  if (!template) return null;

  let prompt = template.template;
  for (const [key, value] of Object.entries(variables)) {
    prompt = prompt.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  }

  return {
    prompt,
    negativePrompt: template.negativePrompt,
  };
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: ImageCategory): ImagePromptTemplate[] {
  return imagePromptTemplates.filter((t) => t.category === category);
}

// ============================================
// IMAGE UTILITIES
// ============================================

export type ImageDimensions = {
  width: number;
  height: number;
};

/**
 * Get dimensions from aspect ratio
 */
export function getDimensionsFromRatio(
  ratio: AspectRatio,
  baseSize: number = 800
): ImageDimensions {
  const ratios: Record<AspectRatio, [number, number]> = {
    "1:1": [1, 1],
    "16:9": [16, 9],
    "4:3": [4, 3],
    "3:2": [3, 2],
    "2:3": [2, 3],
    "9:16": [9, 16],
  };

  const [w, h] = ratios[ratio];
  const isLandscape = w > h;

  if (isLandscape) {
    return {
      width: baseSize,
      height: Math.round((baseSize * h) / w),
    };
  } else {
    return {
      width: Math.round((baseSize * w) / h),
      height: baseSize,
    };
  }
}

/**
 * Recommended image sizes for different use cases
 */
export const recommendedSizes: Record<ImageCategory, ImageDimensions[]> = {
  hero: [
    { width: 1920, height: 1080 }, // Full HD
    { width: 1440, height: 600 },  // Wide banner
    { width: 1200, height: 800 },  // Standard
  ],
  team: [
    { width: 400, height: 400 },   // Square
    { width: 300, height: 400 },   // Portrait
    { width: 600, height: 600 },   // Large square
  ],
  product: [
    { width: 800, height: 800 },   // Square
    { width: 600, height: 800 },   // Portrait
    { width: 1000, height: 1000 }, // Large
  ],
  gallery: [
    { width: 800, height: 600 },   // 4:3
    { width: 600, height: 800 },   // 3:4
    { width: 800, height: 800 },   // Square
  ],
  background: [
    { width: 1920, height: 1080 }, // Full HD
    { width: 2560, height: 1440 }, // 2K
  ],
  icon: [
    { width: 64, height: 64 },
    { width: 128, height: 128 },
    { width: 256, height: 256 },
  ],
  logo: [
    { width: 200, height: 60 },    // Horizontal
    { width: 200, height: 200 },   // Square
  ],
  testimonial: [
    { width: 80, height: 80 },     // Avatar small
    { width: 120, height: 120 },   // Avatar medium
  ],
  feature: [
    { width: 400, height: 300 },   // Card image
    { width: 600, height: 400 },   // Featured
  ],
  about: [
    { width: 600, height: 800 },   // Portrait
    { width: 800, height: 600 },   // Landscape
  ],
};

/**
 * Get recommended size for a category
 */
export function getRecommendedSize(
  category: ImageCategory,
  index: number = 0
): ImageDimensions {
  const sizes = recommendedSizes[category];
  return sizes[Math.min(index, sizes.length - 1)];
}

// ============================================
// UNSPLASH INTEGRATION HELPERS
// ============================================

/**
 * Generate Unsplash URL for a random image
 */
export function getUnsplashUrl(
  width: number,
  height: number,
  query?: string
): string {
  const base = "https://source.unsplash.com/random";
  const size = `${width}x${height}`;
  const search = query ? `?${encodeURIComponent(query)}` : "";
  return `${base}/${size}${search}`;
}

/**
 * Get Unsplash collection URL
 */
export function getUnsplashCollectionUrl(
  collectionId: string,
  width: number,
  height: number
): string {
  return `https://source.unsplash.com/collection/${collectionId}/${width}x${height}`;
}

// ============================================
// PLACEHOLDER PRESETS
// ============================================

export type PlaceholderPreset = {
  id: string;
  name: string;
  category: ImageCategory;
  width: number;
  height: number;
  bgColor: string;
  textColor: string;
};

export const placeholderPresets: PlaceholderPreset[] = [
  { id: "hero-wide", name: "Hero Wide", category: "hero", width: 1200, height: 500, bgColor: "#6366f1", textColor: "#ffffff" },
  { id: "hero-tall", name: "Hero Tall", category: "hero", width: 800, height: 600, bgColor: "#8b5cf6", textColor: "#ffffff" },
  { id: "avatar-sm", name: "Avatar Small", category: "testimonial", width: 64, height: 64, bgColor: "#e2e8f0", textColor: "#64748b" },
  { id: "avatar-md", name: "Avatar Medium", category: "testimonial", width: 96, height: 96, bgColor: "#e2e8f0", textColor: "#64748b" },
  { id: "avatar-lg", name: "Avatar Large", category: "team", width: 200, height: 200, bgColor: "#e2e8f0", textColor: "#64748b" },
  { id: "team-portrait", name: "Team Portrait", category: "team", width: 400, height: 500, bgColor: "#f1f5f9", textColor: "#94a3b8" },
  { id: "gallery-square", name: "Gallery Square", category: "gallery", width: 400, height: 400, bgColor: "#f1f5f9", textColor: "#94a3b8" },
  { id: "gallery-wide", name: "Gallery Wide", category: "gallery", width: 600, height: 400, bgColor: "#f1f5f9", textColor: "#94a3b8" },
  { id: "product-square", name: "Product Square", category: "product", width: 500, height: 500, bgColor: "#ffffff", textColor: "#cbd5e1" },
  { id: "feature-card", name: "Feature Card", category: "feature", width: 400, height: 300, bgColor: "#f8fafc", textColor: "#94a3b8" },
  { id: "logo-horizontal", name: "Logo Horizontal", category: "logo", width: 180, height: 40, bgColor: "#0f172a", textColor: "#ffffff" },
];

/**
 * Get placeholder preset by ID
 */
export function getPlaceholderPreset(id: string): PlaceholderPreset | undefined {
  return placeholderPresets.find((p) => p.id === id);
}

/**
 * Generate placeholder from preset
 */
export function getPlaceholderFromPreset(presetId: string, text?: string): string {
  const preset = getPlaceholderPreset(presetId);
  if (!preset) return "";

  return getPlaceholderUrl({
    width: preset.width,
    height: preset.height,
    category: preset.category,
    text,
    bgColor: preset.bgColor,
    textColor: preset.textColor,
  });
}
