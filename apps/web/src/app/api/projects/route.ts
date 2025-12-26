import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@repo/database";
import { authOptions } from "@/lib/auth";

const createProjectSchema = z.object({
  businessType: z.string().min(1),
  businessName: z.string().min(1),
  businessDescription: z.string().min(1),
  businessTagline: z.string().optional(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  logoUrl: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      where: { userId: session.user.id },
      include: {
        sites: {
          select: {
            id: true,
            status: true,
            subdomain: true,
            publishedAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    return NextResponse.json(
      { error: "Failed to get projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = createProjectSchema.parse(body);

    const project = await prisma.project.create({
      data: {
        userId: session.user.id,
        name: data.businessName,
        description: data.businessDescription,
        businessType: data.businessType,
        businessName: data.businessName,
        businessTagline: data.businessTagline || null,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        logoUrl: data.logoUrl || null,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Create project error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
