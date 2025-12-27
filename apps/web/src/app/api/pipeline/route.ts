import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  PipelineOrchestrator,
  BUSINESS_TYPE_DEFAULTS,
  FONT_RECOMMENDATIONS,
} from "@repo/ai";

// Temporary mock for testing without a real project
const MOCK_PROJECT_ID = "temp-onboarding";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data } = body;

    switch (action) {
      case "get_defaults": {
        // Get defaults for a business type
        const { businessType } = data;
        const defaults = BUSINESS_TYPE_DEFAULTS[businessType] || {};
        const fonts = FONT_RECOMMENDATIONS[businessType] || { heading: "Inter", body: "Inter" };
        const primaryColor = (defaults.primaryColor as string) || "#2563eb";

        return NextResponse.json({
          primaryColor,
          secondaryColor: deriveSecondaryColor(primaryColor),
          headingFont: fonts.heading,
          bodyFont: fonts.body,
          siteGoals: defaults.siteGoals || [],
          selectedSections: defaults.selectedSections || ["hero", "about", "contact"],
        });
      }

      case "validate_step": {
        // Validate inputs for a step
        const orchestrator = new PipelineOrchestrator(
          { projectId: MOCK_PROJECT_ID, userId: session.user.id },
          data
        );

        const validation = await orchestrator.startStep(data.step || "discovery");
        const questions = orchestrator.getRequiredQuestions();

        return NextResponse.json({
          isValid: validation.isValid,
          missingFields: validation.missingRequired.map((r) => r.field),
          suggestions: validation.suggestions,
          questions,
        });
      }

      case "save_discovery": {
        // Save discovered info (would save to ProjectMemory in production)
        // For now, just return success - real save happens when project is created
        return NextResponse.json({
          success: true,
          message: "Discovery data will be saved when project is created",
        });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Pipeline API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Pipeline error" },
      { status: 500 }
    );
  }
}

function deriveSecondaryColor(primary: string): string {
  const hex = primary.replace("#", "");
  const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - 50);
  const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - 50);
  const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - 50);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
