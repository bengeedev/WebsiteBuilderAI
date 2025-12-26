import Anthropic from "@anthropic-ai/sdk";
import type { GenerateInput, SiteContent, SectionType } from "./types";

const anthropic = new Anthropic();

const TEMPLATE_SECTIONS: Record<string, SectionType[]> = {
  restaurant: ["hero", "about", "menu", "gallery", "testimonials", "contact"],
  portfolio: ["hero", "about", "portfolio", "services", "testimonials", "contact"],
  business: ["hero", "features", "about", "team", "testimonials", "cta", "contact"],
  ecommerce: ["hero", "features", "testimonials", "faq", "newsletter", "contact"],
  blog: ["hero", "about", "newsletter", "contact"],
  other: ["hero", "about", "features", "testimonials", "contact"],
};

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
