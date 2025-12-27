import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import type { AssetType as R2AssetType } from "@/lib/r2";

// Map R2 asset types to Prisma enum
const assetTypeMap: Record<R2AssetType, "IMAGE" | "LOGO" | "VIDEO" | "DOCUMENT"> = {
  image: "IMAGE",
  logo: "LOGO",
  video: "VIDEO",
  document: "DOCUMENT",
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      projectId,
      key,
      publicUrl,
      filename,
      assetType,
      mimeType,
      size,
      width,
      height,
    } = await req.json();

    if (!projectId || !key || !publicUrl || !filename || !assetType) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    // Create asset record
    const asset = await prisma.asset.create({
      data: {
        projectId,
        name: filename,
        type: assetTypeMap[assetType as R2AssetType] || "IMAGE",
        url: publicUrl,
        metadata: {
          key,
          mimeType,
          size,
          width,
          height,
          source: "uploaded",
        },
      },
    });

    return NextResponse.json({
      success: true,
      asset: {
        id: asset.id,
        name: asset.name,
        type: asset.type,
        url: asset.url,
      },
    });
  } catch (error) {
    console.error("Confirm upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to confirm upload" },
      { status: 500 }
    );
  }
}
