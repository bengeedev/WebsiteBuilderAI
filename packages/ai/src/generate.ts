import Anthropic from "@anthropic-ai/sdk";
import type { GenerateInput, SiteContent, SectionType } from "./types";
import type { BlockInstance, BlockType, BlockVariant, SchemaField } from "@repo/templates";
import { getRecommendedBlocks, getBlock } from "@repo/templates";

const anthropic = new Anthropic();

// ============================================
// BLOCK-BASED GENERATION (New)
// ============================================

export type GeneratedSite = {
  meta: {
    title: string;
    description: string;
  };
  blocks: BlockInstance[];
  designTokens?: {
    colors?: {
      primary?: string;
      secondary?: string;
    };
  };
};

/**
 * Generate site content as BlockInstance[] format
 * This is the new preferred method that works with the composable block system
 */
export async function generateSiteBlocks(
  input: GenerateInput
): Promise<GeneratedSite> {
  // Get recommended blocks for this business type
  const recommendedBlocks = getRecommendedBlocks(input.businessType);
  const blockIds = recommendedBlocks.map((b: BlockType) => b.id);

  // Build the schema examples for each block type
  const blockSchemas = recommendedBlocks.map((block: BlockType) => ({
    blockType: block.id,
    name: block.name,
    description: block.description,
    variants: block.variants.map((v: BlockVariant) => v.id),
    defaultVariant: block.defaultVariant,
    contentFields: block.schema.fields.map((f: SchemaField) => ({
      name: f.name,
      type: f.type,
      label: f.label,
      required: f.required || false,
    })),
  }));

  const prompt = `You are an expert website copywriter and designer. Generate compelling website content for the following business:

Business Name: ${input.businessName}
${input.businessTagline ? `Tagline: ${input.businessTagline}` : ""}
Business Type: ${input.businessType}
Description: ${input.businessDescription}

Generate content for these blocks: ${blockIds.join(", ")}

Here are the block schemas to follow:
${JSON.stringify(blockSchemas, null, 2)}

Return a JSON object with this exact structure:
{
  "meta": {
    "title": "SEO-optimized page title (60 chars max)",
    "description": "SEO meta description (160 chars max)"
  },
  "blocks": [
    {
      "id": "block_1",
      "blockType": "header",
      "variant": "simple",
      "content": {
        "logo": { "text": "Business Name" },
        "navigation": [
          { "text": "Home", "url": "#" },
          { "text": "About", "url": "#about" }
        ],
        "cta": { "text": "Contact Us", "url": "#contact" }
      }
    },
    {
      "id": "block_2",
      "blockType": "hero",
      "variant": "centered",
      "content": {
        "title": "Main headline",
        "subtitle": "Supporting text",
        "primaryCta": { "text": "Get Started", "url": "#contact" }
      }
    }
    // ... more blocks
  ]
}

Guidelines:
- Write in a professional but engaging tone
- Be specific to the business described
- Each block must have a unique "id" (use block_1, block_2, etc.)
- Use the correct "blockType" from the schemas provided
- Use valid "variant" values from the schemas
- Fill in the "content" object with appropriate fields from the schema
- For header: include navigation links to other sections
- For hero: create a compelling headline and call-to-action
- For features: create 3-6 feature items with titles and descriptions
- For menu (restaurants): create 2-3 categories with 3-4 items each, include prices
- For testimonials: create 3 realistic customer quotes
- For team: create 2-4 team member profiles
- For contact: include title, description, and contact information
- For footer: include logo, copyright, and relevant links
- Use relevant emojis for icons where appropriate
${input.primaryColor ? `- The brand primary color is ${input.primaryColor}` : ""}
${input.secondaryColor ? `- The brand secondary color is ${input.secondaryColor}` : ""}

Return ONLY valid JSON, no markdown or explanation.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8192,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  // Extract text content from response
  const textContent = response.content.find((block) => block.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("No text content in response");
  }

  // Parse JSON from response
  const jsonText = textContent.text.trim();

  try {
    const result = JSON.parse(jsonText) as GeneratedSite;
    // Validate and fix block IDs if needed
    result.blocks = result.blocks.map((block, index) => ({
      ...block,
      id: block.id || `block_${Date.now()}_${index}`,
    }));
    return result;
  } catch {
    // Try to extract JSON from markdown code block
    const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[1].trim()) as GeneratedSite;
      result.blocks = result.blocks.map((block, index) => ({
        ...block,
        id: block.id || `block_${Date.now()}_${index}`,
      }));
      return result;
    }
    throw new Error("Failed to parse AI response as JSON");
  }
}

// ============================================
// LEGACY SECTION-BASED GENERATION (Deprecated)
// ============================================

const TEMPLATE_SECTIONS: Record<string, SectionType[]> = {
  restaurant: ["hero", "about", "menu", "gallery", "testimonials", "contact"],
  portfolio: ["hero", "about", "portfolio", "services", "testimonials", "contact"],
  business: ["hero", "features", "about", "team", "testimonials", "cta", "contact"],
  ecommerce: ["hero", "features", "testimonials", "faq", "newsletter", "contact"],
  blog: ["hero", "about", "newsletter", "contact"],
  other: ["hero", "about", "features", "testimonials", "contact"],
};

/**
 * @deprecated Use generateSiteBlocks() instead
 * Generate site content in the legacy sections format
 */
export async function generateSiteContent(
  input: GenerateInput
): Promise<SiteContent> {
  const sections = TEMPLATE_SECTIONS[input.businessType] || TEMPLATE_SECTIONS.other;

  const prompt = `You are an expert website copywriter. Generate compelling website content for the following business:

Business Name: ${input.businessName}
${input.businessTagline ? `Tagline: ${input.businessTagline}` : ""}
Business Type: ${input.businessType}
Description: ${input.businessDescription}

Generate content for these website sections: ${sections.join(", ")}

Return a JSON object with this exact structure:
{
  "meta": {
    "title": "SEO-optimized page title (60 chars max)",
    "description": "SEO meta description (160 chars max)"
  },
  "sections": [
    {
      "type": "section_type",
      "title": "Section heading",
      "subtitle": "Optional subtitle",
      "content": "Main paragraph content",
      "items": [
        {
          "title": "Item title",
          "description": "Item description",
          "icon": "emoji icon",
          "price": "optional price"
        }
      ],
      "cta": {
        "text": "Button text",
        "url": "#contact"
      }
    }
  ]
}

Guidelines:
- Write in a professional but engaging tone
- Be specific to the business described
- For the hero section: create a compelling headline and subheadline
- For about section: tell the business story
- For features/services: create 3-4 key points
- For menu (restaurants): create 4-6 sample items with descriptions and prices
- For portfolio: describe 3-4 project categories
- For testimonials: create 3 realistic customer quotes with names
- For team: create 2-3 team member descriptions
- For contact: create an inviting call to action
- Use relevant emojis for icons

Return ONLY valid JSON, no markdown or explanation.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  // Extract text content from response
  const textContent = response.content.find((block) => block.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("No text content in response");
  }

  // Parse JSON from response
  const jsonText = textContent.text.trim();

  try {
    const content = JSON.parse(jsonText) as SiteContent;
    return content;
  } catch {
    // Try to extract JSON from markdown code block
    const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1].trim()) as SiteContent;
    }
    throw new Error("Failed to parse AI response as JSON");
  }
}
