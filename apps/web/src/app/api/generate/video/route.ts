import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import {
  startVideoGeneration,
  checkVideoStatus,
  generateHeroVideo,
  animateImage,
  isRunwayConfigured,
} from "@repo/ai";

/**
 * Start a video generation task
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if Runway is configured
    if (!isRunwayConfigured()) {
      return NextResponse.json(
        { error: "Video generation is not configured" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const {
      projectId,
      type = "custom", // custom | hero | animate
      prompt,
      imageUrl, // For animate type
      duration = 5,
      aspectRatio = "16:9",
      style = "cinematic",
      motion = "subtle", // For animate type
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

    let task;

    if (type === "hero") {
      // Generate hero video
      task = await generateHeroVideo(
        project.businessType || "business",
        project.description || "",
        style
      );
    } else if (type === "animate" && imageUrl) {
      // Animate an existing image
      task = await animateImage(imageUrl, motion, duration);
    } else if (prompt) {
      // Custom prompt
      task = await startVideoGeneration({
        prompt,
        duration,
        aspectRatio,
        style,
      });
    } else {
      return NextResponse.json(
        { error: "Either prompt, hero type, or animate with imageUrl is required" },
        { status: 400 }
      );
    }

    // Store the task for polling
    await prisma.generation.create({
      data: {
        projectId,
        prompt: prompt || `Video generation (${type})`,
        parameters: {
          type,
          taskId: task.id,
          duration,
          aspectRatio,
          style,
          imageUrl,
        },
        result: { taskId: task.id, status: task.status },
        model: "runway-gen-3",
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      taskId: task.id,
      status: task.status,
      message: "Video generation started. Poll /api/generate/video/status for updates.",
    });
  } catch (error) {
    console.error("Video generation error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to start video generation",
      },
      { status: 500 }
    );
  }
}

/**
 * Check the status of a video generation task
 */
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");
    const projectId = searchParams.get("projectId");

    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    if (!isRunwayConfigured()) {
      return NextResponse.json(
        { error: "Video generation is not configured" },
        { status: 503 }
      );
    }

    // Check task status
    const status = await checkVideoStatus(taskId);

    // If completed, create asset record
    if (status.status === "completed" && status.videoUrl && projectId) {
      // Check if asset already exists
      const existingAsset = await prisma.asset.findFirst({
        where: {
          projectId,
          metadata: {
            path: ["taskId"],
            equals: taskId,
          },
        },
      });

      if (!existingAsset) {
        const asset = await prisma.asset.create({
          data: {
            projectId,
            name: "AI Generated Video",
            type: "VIDEO",
            url: status.videoUrl,
            metadata: {
              source: "ai_generated",
              model: "runway-gen-3",
              taskId,
              thumbnailUrl: status.thumbnailUrl,
            },
          },
        });

        // Update generation record
        await prisma.generation.updateMany({
          where: {
            projectId,
            parameters: {
              path: ["taskId"],
              equals: taskId,
            },
          },
          data: {
            status: "COMPLETED",
            result: {
              taskId,
              videoUrl: status.videoUrl,
              thumbnailUrl: status.thumbnailUrl,
              assetId: asset.id,
            },
          },
        });

        return NextResponse.json({
          ...status,
          assetId: asset.id,
        });
      }
    } else if (status.status === "failed") {
      // Update generation record
      await prisma.generation.updateMany({
        where: {
          parameters: {
            path: ["taskId"],
            equals: taskId,
          },
        },
        data: {
          status: "FAILED",
        },
      });
    }

    return NextResponse.json(status);
  } catch (error) {
    console.error("Video status check error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to check video status",
      },
      { status: 500 }
    );
  }
}
