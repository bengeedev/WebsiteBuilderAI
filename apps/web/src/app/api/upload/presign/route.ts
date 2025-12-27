import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import {
  getUploadPresignedUrl,
  validateFile,
  getAssetTypeFromMime,
  isR2Configured,
} from "@/lib/r2";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if R2 is configured
    if (!isR2Configured()) {
      return NextResponse.json(
        { error: "File storage is not configured" },
        { status: 503 }
      );
    }

    const { projectId, filename, contentType, size } = await req.json();

    if (!projectId || !filename || !contentType) {
      return NextResponse.json(
        { error: "Missing required fields: projectId, filename, contentType" },
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

    // Validate file
    const validation = validateFile({ size: size || 0, type: contentType });
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Determine asset type
    const assetType = getAssetTypeFromMime(contentType);

    // Get presigned URL
    const { uploadUrl, key, publicUrl } = await getUploadPresignedUrl({
      projectId,
      filename,
      contentType,
      assetType,
    });

    return NextResponse.json({
      uploadUrl,
      key,
      publicUrl,
      assetType,
    });
  } catch (error) {
    console.error("Presign error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
