import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAIRouter } from "@repo/ai";

const router = getAIRouter();

type ScrapedData = {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  logoUrl?: string;
  colors?: string[];
  contactInfo?: {
    email?: string;
    phone?: string;
  };
  socialLinks?: Record<string, string>;
};

const businessTypes = [
  { id: "restaurant", name: "Restaurant & Food", keywords: ["restaurant", "cafe", "food", "menu", "dining", "cuisine", "chef", "bakery", "coffee", "bar", "catering"] },
  { id: "portfolio", name: "Portfolio & Creative", keywords: ["portfolio", "artist", "designer", "photographer", "creative", "gallery", "work", "projects", "freelance"] },
  { id: "business", name: "Business & Services", keywords: ["consulting", "agency", "services", "solutions", "professional", "company", "enterprise", "corporate", "firm"] },
  { id: "ecommerce", name: "E-commerce & Shop", keywords: ["shop", "store", "buy", "products", "cart", "price", "order", "shipping", "sale"] },
  { id: "blog", name: "Blog & Content", keywords: ["blog", "article", "post", "news", "stories", "content", "writer", "journal", "magazine"] },
  { id: "fitness", name: "Fitness & Health", keywords: ["fitness", "gym", "health", "wellness", "training", "workout", "coach", "yoga", "nutrition", "therapy", "medical"] },
];

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { scrapedData } = await req.json() as { scrapedData: ScrapedData };

    if (!scrapedData) {
      return NextResponse.json(
        { error: "Missing scraped data" },
        { status: 400 }
      );
    }

    // Build context from scraped data
    const context = `
Website URL: ${scrapedData.url || "Unknown"}
Title: ${scrapedData.title || "Not found"}
Description: ${scrapedData.description || "Not found"}
Colors detected: ${scrapedData.colors?.join(", ") || "None"}
Contact email: ${scrapedData.contactInfo?.email || "None"}
Contact phone: ${scrapedData.contactInfo?.phone || "None"}
Social links: ${scrapedData.socialLinks ? Object.entries(scrapedData.socialLinks).map(([k, v]) => `${k}: ${v}`).join(", ") : "None"}
Has logo: ${scrapedData.logoUrl ? "Yes" : "No"}
`.trim();

    // Ask AI to understand the business
    const prompt = `Based on this website data, analyze the business and provide:

${context}

Respond in this EXACT JSON format:
{
  "businessName": "The actual business name extracted from the title/content",
  "summary": "A friendly 1-2 sentence summary of what this business does and who they serve. Write in second person like 'You run a...' or 'Your business is...'",
  "suggestedType": "One of: restaurant, portfolio, business, ecommerce, blog, fitness",
  "confidence": "high, medium, or low",
  "keyInsights": ["insight 1", "insight 2", "insight 3"],
  "suggestedTagline": "A catchy tagline based on what you learned"
}

Be conversational and warm in the summary. Make the user feel understood.`;

    const response = await router.complete({
      system: `You are analyzing a website to understand what kind of business it is.
Extract key information and determine the business type.
Always respond with valid JSON only, no markdown or extra text.
Be warm and conversational in your summary - make the business owner feel understood.`,
      messages: [{ role: "user", content: prompt }],
      maxTokens: 800,
      temperature: 0.3, // Lower for more consistent analysis
    });

    // Parse the AI response
    let analysis;
    try {
      // Clean up response - remove markdown code blocks if present
      let cleanResponse = response.content.trim();
      if (cleanResponse.startsWith("```")) {
        cleanResponse = cleanResponse.replace(/```json?\n?/g, "").replace(/```$/g, "").trim();
      }
      analysis = JSON.parse(cleanResponse);
    } catch {
      // If parsing fails, create a fallback response
      console.error("Failed to parse AI response:", response.content);

      // Try to detect business type from keywords
      const combinedText = `${scrapedData.title || ""} ${scrapedData.description || ""}`.toLowerCase();
      let detectedType = "business"; // default
      let maxMatches = 0;

      for (const bt of businessTypes) {
        const matches = bt.keywords.filter(kw => combinedText.includes(kw)).length;
        if (matches > maxMatches) {
          maxMatches = matches;
          detectedType = bt.id;
        }
      }

      analysis = {
        businessName: scrapedData.title || "Your Business",
        summary: `Based on your website, you appear to run a ${detectedType} business. I can see you've already established your online presence!`,
        suggestedType: detectedType,
        confidence: maxMatches > 2 ? "medium" : "low",
        keyInsights: [
          scrapedData.colors?.length ? "You have a defined color palette" : null,
          scrapedData.contactInfo?.email ? "Contact information is available" : null,
          scrapedData.socialLinks ? "Social media presence detected" : null,
        ].filter(Boolean),
        suggestedTagline: null,
      };
    }

    return NextResponse.json({
      ...analysis,
      scrapedData, // Include original data for reference
    });
  } catch (error) {
    console.error("AI understanding error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to understand business" },
      { status: 500 }
    );
  }
}
