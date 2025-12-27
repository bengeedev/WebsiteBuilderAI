import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import { deleteFromR2, isR2Configured } from "@/lib/r2";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Get asset and verify ownership through project
    const asset = await prisma.asset.findUnique({
      where: { id },
      include: {
        project: {
          select: { userId: true },
        },
      },
    });

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    if (asset.project.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete from R2 if configured
    const metadata = asset.metadata as { key?: string } | null;
    if (isR2Configured() && metadata?.key) {
      try {
        await deleteFromR2(metadata.key);
      } catch (error) {
        console.error("Failed to delete from R2:", error);
        // Continue with database deletion even if R2 fails
      }
    }

    // Delete from database
    await prisma.asset.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete asset error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete asset" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Get asset and verify ownership through project
    const asset = await prisma.asset.findUnique({
      where: { id },
      include: {
        project: {
          select: { userId: true },
        },
      },
    });

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    if (asset.project.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({
      id: asset.id,
      name: asset.name,
      type: asset.type,
      url: asset.url,
      metadata: asset.metadata,
      createdAt: asset.createdAt,
    });
  } catch (error) {
    console.error("Get asset error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to get asset" },
      { status: 500 }
    );
  }
}
