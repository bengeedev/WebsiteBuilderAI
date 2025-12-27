import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import {
  generateLogo,
  generateLogoVariations,
  isDalleConfigured,
} from "@repo/ai";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if DALL-E is configured
    if (!isDalleConfigured()) {
      return NextResponse.json(
        { error: "Logo generation is not configured" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const {
      projectId,
      style = "minimalist",
      colors,
      generateVariations = false,
      variationCount = 3,
    } = body;

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Verify project belongs to user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const businessName = project.businessName || project.name;
    const businessType = project.businessType || "business";

    let logos;

    if (generateVariations) {
      // Generate multiple logo variations
      logos = await generateLogoVariations(
        businessName,
        businessType,
        style,
        Math.min(variationCount, 5) // Cap at 5
      );
    } else {
      // Generate single logo
      const logo = await generateLogo(
        businessName,
        businessType,
        style,
        colors
      );
      logos = [logo];
    }

    // Create asset records for each generated logo
    const assets = await Promise.all(
      logos.map((logo, index) =>
        prisma.asset.create({
          data: {
            projectId,
            name: `AI Generated Logo${logos.length > 1 ? ` ${index + 1}` : ""}`,
            type: "LOGO",
            url: logo.url,
            metadata: {
              source: "ai_generated",
              model: "dall-e-3",
              prompt: logo.revisedPrompt,
              style,
              colors,
              isVariation: logos.length > 1,
              variationIndex: index,
            },
          },
        })
      )
    );

    // Log the generation
    await prisma.generation.create({
      data: {
        projectId,
        prompt: `Logo generation for ${businessName} (${style} style)`,
        parameters: { style, colors, generateVariations, variationCount },
        result: {
          logos: logos.map((l, i) => ({
            url: l.url,
            assetId: assets[i].id,
          })),
        },
        model: "dall-e-3",
        status: "COMPLETED",
      },
    });

    return NextResponse.json({
      success: true,
      logos: logos.map((logo, index) => ({
        id: assets[index].id,
        url: logo.url,
        prompt: logo.revisedPrompt,
      })),
    });
  } catch (error) {
    console.error("Logo generation error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate logo",
      },
      { status: 500 }
    );
  }
}
