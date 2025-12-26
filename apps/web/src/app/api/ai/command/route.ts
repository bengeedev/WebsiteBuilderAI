import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@repo/database";
import { authOptions } from "@/lib/auth";

const anthropic = new Anthropic();

type Message = {
  role: string;
  content: string;
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId, command, history } = await req.json();

    // Get project and site data
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id,
      },
      include: {
        sites: {
          include: { pages: true },
          take: 1,
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const site = project.sites[0];
    const page = site?.pages[0];

    // Build context for AI
    const systemPrompt = `You are an AI webmaster assistant for "${project.businessName || project.name}".
You help users build and manage their website through conversation.

Current website state:
- Business: ${project.businessName} (${project.businessType})
- Description: ${project.description || "Not set"}
- Primary Color: ${project.primaryColor}
- Secondary Color: ${project.secondaryColor}
- Site Status: ${site?.status || "No site created"}
- Current Sections: ${JSON.stringify(page?.content || {})}

You can help with:
1. Adding/removing/editing website sections
2. Changing content, colors, and styling
3. SEO optimization suggestions
4. Blog post ideas and creation
5. General website advice

When the user asks you to make changes, describe what you would do and confirm the action.
Be friendly, helpful, and proactive with suggestions.
Keep responses concise but informative.

IMPORTANT: When you make a change, start your response with [ACTION: description] so the system knows to update the site.
For example: [ACTION: Added testimonials section with 3 reviews]`;

    // Convert history to Anthropic format
    const messages: Array<{ role: "user" | "assistant"; content: string }> = history
      .filter((m: Message) => m.role !== "system")
      .map((m: Message) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    // Add the new command
    messages.push({ role: "user", content: command });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    const textContent = response.content.find((block) => block.type === "text");
    const aiResponse = textContent?.type === "text" ? textContent.text : "I couldn't process that request.";

    // Check if AI wants to make an action
    const actionMatch = aiResponse.match(/\[ACTION: ([^\]]+)\]/);
    if (actionMatch) {
      // Log the action (in future, actually execute it)
      await prisma.generation.create({
        data: {
          projectId,
          prompt: command,
          parameters: { action: actionMatch[1] },
          result: { response: aiResponse },
          model: "claude-sonnet-4-20250514",
          status: "COMPLETED",
        },
      });
    }

    return NextResponse.json({
      response: aiResponse,
      action: actionMatch ? actionMatch[1] : null,
    });
  } catch (error) {
    console.error("AI command error:", error);
    return NextResponse.json(
      { error: "Failed to process command" },
      { status: 500 }
    );
  }
}
