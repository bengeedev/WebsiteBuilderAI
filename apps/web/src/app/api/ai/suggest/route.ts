import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAIRouter, buildOnboardingSuggestionPrompt } from "@repo/ai";

const router = getAIRouter();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { field, currentValue, businessContext } = await req.json();

    if (!field || !businessContext?.type || !businessContext?.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build the suggestion prompt using the capabilities prompt builder
    const prompt = buildOnboardingSuggestionPrompt(
      field,
      currentValue || "",
      businessContext
    );

    // Get AI suggestions
    const response = await router.complete({
      system: `You are a helpful assistant that generates creative and professional suggestions for business websites.
Always return exactly 3 suggestions, one per line, with no numbering, bullets, or extra formatting.
Make suggestions specific to the business type and context.`,
      messages: [{ role: "user", content: prompt }],
      maxTokens: 500,
      temperature: 0.8, // Slightly higher for more creative suggestions
    });

    // Parse the response into individual suggestions
    const suggestions = response.content
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .slice(0, 3);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("AI suggestion error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate suggestions" },
      { status: 500 }
    );
  }
}
