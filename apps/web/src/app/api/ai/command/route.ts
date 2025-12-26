import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@repo/database";
import { authOptions } from "@/lib/auth";
import {
  getAIRouter,
  ActionExecutor,
  siteTools,
  type SiteState,
  type Message,
  type ToolCall,
} from "@repo/ai";

const router = getAIRouter();

type HistoryMessage = {
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

    // Parse current site content
    const pageContent = page?.content as { sections?: unknown[] } | null;
    const siteStyles = site?.styles as Record<string, string> | null;

    // Build site state for the action executor
    const siteState: SiteState = {
      projectId,
      siteId: site?.id || "",
      sections: (pageContent?.sections as SiteState["sections"]) || [],
      styles: {
        primaryColor: project.primaryColor || "#3b82f6",
        secondaryColor: project.secondaryColor || "#1e293b",
        accentColor: siteStyles?.accentColor,
        headingFont: siteStyles?.headingFont,
        bodyFont: siteStyles?.bodyFont,
      },
      meta: {
        title: site?.title || project.businessName || project.name,
        description: project.description || "",
      },
    };

    // Build system prompt for AI with tool usage instructions
    const systemPrompt = `You are an AI webmaster for "${project.businessName || project.name}".
You have FULL CONTROL over this website and can make changes directly using tools.

Current website state:
- Business: ${project.businessName} (${project.businessType})
- Description: ${project.description || "Not set"}
- Primary Color: ${project.primaryColor}
- Secondary Color: ${project.secondaryColor}
- Site Status: ${site?.status || "No site created"}
- Current Sections: ${JSON.stringify(siteState.sections.map((s) => ({ id: s.id, type: s.type, title: s.title })))}

YOUR CAPABILITIES (use these tools to make changes):
- add_section: Add new sections (hero, about, features, services, testimonials, team, pricing, contact, cta, gallery, faq, blog, newsletter)
- remove_section: Remove sections by ID or type
- edit_section: Update section content (title, subtitle, text, items)
- reorder_sections: Change section order
- update_colors: Change color scheme (primary_color, secondary_color, accent_color)
- update_fonts: Change typography (heading_font, body_font)
- update_seo: Update page title and meta description
- get_site_info: Get current site information

IMPORTANT BEHAVIOR:
1. When the user asks for changes, USE THE TOOLS directly - don't just describe what you would do
2. Be proactive - if user says "make it better", suggest and implement specific improvements
3. After making changes, briefly confirm what was done
4. You are the webmaster - act decisively and make the website great

Keep responses concise. Focus on actions over explanations.`;

    // Convert history to message format
    const messages: Message[] = history
      .filter((m: HistoryMessage) => m.role !== "system")
      .map((m: HistoryMessage) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    // Add the new command
    messages.push({ role: "user", content: command });

    // Call AI with tools
    const response = await router.complete({
      system: systemPrompt,
      messages,
      tools: siteTools,
      maxTokens: 2048,
    });

    // Initialize action executor with current state
    const executor = new ActionExecutor(siteState);
    const executedActions: { action: string; description: string }[] = [];

    // Execute any tool calls from the AI
    if (response.toolCalls && response.toolCalls.length > 0) {
      const results = await executor.executeAll(response.toolCalls as ToolCall[]);

      for (const result of results) {
        if (result.success) {
          executedActions.push({
            action: result.action,
            description: result.description,
          });
        }
      }

      // Get the updated state
      const newState = executor.getState();

      // Save the updated site content to database
      if (page && site && executedActions.length > 0) {
        // Update page content
        await prisma.page.update({
          where: { id: page.id },
          data: {
            content: {
              sections: newState.sections,
            },
          },
        });

        // Update site styles and meta
        await prisma.site.update({
          where: { id: site.id },
          data: {
            styles: newState.styles,
            title: newState.meta.title,
            description: newState.meta.description,
          },
        });
      }

      // Log the generation
      await prisma.generation.create({
        data: {
          projectId,
          prompt: command,
          parameters: {
            tools: response.toolCalls.map((tc: ToolCall) => tc.name),
          },
          result: {
            response: response.content,
            actions: executedActions,
            newState: {
              sections: newState.sections.map((s) => ({ id: s.id, type: s.type })),
              styles: newState.styles,
            },
          },
          model: response.model || "claude-sonnet",
          status: "COMPLETED",
        },
      });
    }

    // Build response message
    let responseMessage = response.content || "";

    // If tools were used but no text response, generate a summary
    if (executedActions.length > 0 && !responseMessage) {
      responseMessage = `Done! ${executedActions.map((a) => a.description).join(". ")}.`;
    }

    return NextResponse.json({
      response: responseMessage,
      actions: executedActions,
      siteUpdated: executedActions.length > 0,
      newState: executedActions.length > 0 ? executor.getState() : null,
    });
  } catch (error) {
    console.error("AI command error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process command" },
      { status: 500 }
    );
  }
}
