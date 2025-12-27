import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma, Prisma } from "@repo/database";

// Valid asset types from Prisma schema
const VALID_ASSET_TYPES = ["IMAGE", "LOGO", "FAVICON", "VIDEO", "DOCUMENT"] as const;
type AssetType = typeof VALID_ASSET_TYPES[number];

function isValidAssetType(type: string): type is AssetType {
  return VALID_ASSET_TYPES.includes(type.toUpperCase() as AssetType);
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const type = searchParams.get("type"); // Optional filter by type

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

    // Build query
    const where: Prisma.AssetWhereInput = { projectId };
    if (type && isValidAssetType(type)) {
      where.type = type.toUpperCase() as AssetType;
    }

    // Get assets
    const assets = await prisma.asset.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        type: true,
        url: true,
        metadata: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ assets });
  } catch (error) {
    console.error("Get assets error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to get assets" },
      { status: 500 }
    );
  }
}
