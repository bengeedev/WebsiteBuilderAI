/**
 * DALL-E 3 Image Generation Provider
 *
 * Uses OpenAI's DALL-E 3 to generate images from text prompts.
 */

import OpenAI from "openai";

export type ImageStyle = "natural" | "vivid";
export type ImageQuality = "standard" | "hd";
export type ImageSize = "1024x1024" | "1792x1024" | "1024x1792";

export type GenerateImageOptions = {
  prompt: string;
  style?: ImageStyle;
  quality?: ImageQuality;
  size?: ImageSize;
  n?: number; // Number of images (DALL-E 3 only supports 1)
};

export type GeneratedImage = {
  url: string;
  revisedPrompt: string;
};

export type GenerateImageResult = {
  images: GeneratedImage[];
  model: string;
};

// Check if DALL-E is configured
export function isDalleConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY;
}

// Create OpenAI client
function getOpenAIClient(): OpenAI {
  if (!isDalleConfigured()) {
    throw new Error("DALL-E is not configured. Please set OPENAI_API_KEY environment variable.");
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

/**
 * Generate an image using DALL-E 3
 */
export async function generateImage(
  options: GenerateImageOptions
): Promise<GenerateImageResult> {
  const client = getOpenAIClient();

  const {
    prompt,
    style = "natural",
    quality = "standard",
    size = "1024x1024",
  } = options;

  const response = await client.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1, // DALL-E 3 only supports 1 image at a time
    size,
    quality,
    style,
    response_format: "url",
  });

  if (!response.data || response.data.length === 0) {
    throw new Error("No images generated");
  }

  const images: GeneratedImage[] = response.data.map((img) => ({
    url: img.url!,
    revisedPrompt: img.revised_prompt || prompt,
  }));

  return {
    images,
    model: "dall-e-3",
  };
}

/**
 * Generate a hero image for a website
 */
export async function generateHeroImage(
  businessType: string,
  businessName: string,
  style: "photo" | "illustration" | "abstract" = "photo"
): Promise<GeneratedImage> {
  const stylePrompts: Record<string, string> = {
    photo: "professional photography style, high quality, realistic lighting",
    illustration: "modern digital illustration, clean lines, flat design",
    abstract: "abstract art, geometric shapes, modern design",
  };

  const prompt = `Create a hero image for a ${businessType} business called "${businessName}".
Style: ${stylePrompts[style]}.
The image should be suitable for a website header, professional and inviting, with space for text overlay.
No text in the image.`;

  const result = await generateImage({
    prompt,
    quality: "hd",
    size: "1792x1024", // Landscape for hero
    style: "vivid",
  });

  return result.images[0];
}

/**
 * Generate a section image
 */
export async function generateSectionImage(
  sectionType: string,
  businessType: string,
  description: string,
  style: "photo" | "illustration" = "photo"
): Promise<GeneratedImage> {
  const sectionPrompts: Record<string, string> = {
    about: "team or workspace photo, professional, welcoming",
    services: "service being provided, action shot, professional",
    testimonials: "happy customers, professional portraits",
    features: "product or service features showcase",
    gallery: "portfolio or gallery style image",
    contact: "office location or contact imagery",
  };

  const sectionHint = sectionPrompts[sectionType] || "professional business imagery";

  const prompt = `Create an image for the ${sectionType} section of a ${businessType} website.
Description: ${description}
Style: ${style === "photo" ? "professional photography" : "modern illustration"}
Guidance: ${sectionHint}
No text in the image. High quality, suitable for website use.`;

  const result = await generateImage({
    prompt,
    quality: "standard",
    size: "1024x1024",
    style: "natural",
  });

  return result.images[0];
}

/**
 * Generate a logo using DALL-E 3
 */
export async function generateLogo(
  businessName: string,
  businessType: string,
  style: "minimalist" | "bold" | "vintage" | "playful" | "corporate" = "minimalist",
  colors?: string[]
): Promise<GeneratedImage> {
  const styleDescriptions: Record<string, string> = {
    minimalist: "minimalist, simple, clean lines, geometric, modern",
    bold: "bold, strong, impactful, dynamic",
    vintage: "vintage, retro, classic, timeless",
    playful: "playful, fun, colorful, friendly",
    corporate: "professional, corporate, sophisticated, trustworthy",
  };

  const colorHint = colors?.length
    ? `Use colors: ${colors.join(", ")}.`
    : "Use appropriate professional colors.";

  const prompt = `Design a logo for "${businessName}", a ${businessType} business.
Style: ${styleDescriptions[style]}
${colorHint}
The logo should be:
- Simple and recognizable
- Works on both light and dark backgrounds
- Scalable (looks good at any size)
- Professional and unique
Create a logo icon or symbol, not text. Vector-style, clean edges.`;

  const result = await generateImage({
    prompt,
    quality: "hd",
    size: "1024x1024",
    style: "vivid",
  });

  return result.images[0];
}

/**
 * Generate multiple logo variations
 */
export async function generateLogoVariations(
  businessName: string,
  businessType: string,
  style: "minimalist" | "bold" | "vintage" | "playful" | "corporate" = "minimalist",
  count: number = 3
): Promise<GeneratedImage[]> {
  const variations: GeneratedImage[] = [];

  // Generate multiple logos sequentially (DALL-E 3 only does 1 at a time)
  for (let i = 0; i < count; i++) {
    const variation = await generateLogo(
      businessName,
      businessType,
      style,
      undefined
    );
    variations.push(variation);
  }

  return variations;
}
