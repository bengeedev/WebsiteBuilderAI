import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import {
  generateImage,
  generateHeroImage,
  generateSectionImage,
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
        { error: "Image generation is not configured" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const {
      projectId,
      type = "custom", // custom | hero | section
      prompt,
      sectionType,
      style = "photo",
      quality = "standard",
      size = "1024x1024",
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

    let result;

    if (type === "hero") {
      // Generate hero image
      result = await generateHeroImage(
        project.businessType || "business",
        project.businessName || project.name,
        style
      );
    } else if (type === "section" && sectionType) {
      // Generate section image
      result = await generateSectionImage(
        sectionType,
        project.businessType || "business",
        project.description || "",
        style
      );
    } else if (prompt) {
      // Custom prompt
      const genResult = await generateImage({
        prompt,
        quality,
        size,
        style: "vivid",
      });
      result = genResult.images[0];
    } else {
      return NextResponse.json(
        { error: "Either prompt or type (hero/section) is required" },
        { status: 400 }
      );
    }

    // Create asset record for the generated image
    const asset = await prisma.asset.create({
      data: {
        projectId,
        name: `AI Generated ${type === "hero" ? "Hero" : type === "section" ? sectionType : "Image"}`,
        type: "IMAGE",
        url: result.url,
        metadata: {
          source: "ai_generated",
          model: "dall-e-3",
          prompt: result.revisedPrompt,
          type,
          sectionType,
          style,
        },
      },
    });

    // Log the generation
    await prisma.generation.create({
      data: {
        projectId,
        prompt: result.revisedPrompt,
        parameters: { type, style, quality, size },
        result: { url: result.url, assetId: asset.id },
        model: "dall-e-3",
        status: "COMPLETED",
      },
    });

    return NextResponse.json({
      success: true,
      image: {
        id: asset.id,
        url: result.url,
        prompt: result.revisedPrompt,
      },
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate image",
      },
      { status: 500 }
    );
  }
}
