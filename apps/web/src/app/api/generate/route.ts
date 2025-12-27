import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma, Prisma } from "@repo/database";
import { generateSiteContent } from "@repo/ai";
import { authOptions } from "@/lib/auth";

const generateSchema = z.object({
  projectId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { projectId } = generateSchema.parse(body);

    // Get project
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Find matching template
    const template = await prisma.template.findFirst({
      where: {
        category: project.businessType || "business",
        isActive: true,
      },
    });

    // Generate content with AI
    const startTime = Date.now();
    const content = await generateSiteContent({
      businessType: project.businessType || "business",
      businessName: project.businessName || project.name,
      businessDescription: project.description || "",
      businessTagline: project.businessTagline || undefined,
    });
    const durationMs = Date.now() - startTime;

    // Create site with generated content
    const site = await prisma.site.create({
      data: {
        projectId: project.id,
        templateId: template?.id || null,
        content: content as unknown as Prisma.InputJsonValue,
        styles: {
          primaryColor: project.primaryColor,
          secondaryColor: project.secondaryColor,
        } as Prisma.InputJsonValue,
        title: content.meta.title,
        description: content.meta.description,
        status: "DRAFT",
      },
    });

    // Create default pages
    await prisma.page.create({
      data: {
        siteId: site.id,
        name: "Home",
        slug: "",
        content: { sections: content.sections } as Prisma.InputJsonValue,
        metaTitle: content.meta.title,
        metaDescription: content.meta.description,
        order: 0,
      },
    });

    // Log generation
    await prisma.generation.create({
      data: {
        projectId: project.id,
        prompt: JSON.stringify({
          businessType: project.businessType,
          businessName: project.businessName,
          description: project.description,
        }),
        parameters: {} as Prisma.InputJsonValue,
        result: content as unknown as Prisma.InputJsonValue,
        model: "claude-sonnet-4-20250514",
        durationMs,
        status: "COMPLETED",
      },
    });

    return NextResponse.json({
      site,
      content,
    });
  } catch (error) {
    console.error("Generate error:", error);

    // Log failed generation
    const body = await req.json().catch(() => ({}));
    if (body.projectId) {
      await prisma.generation.create({
        data: {
          projectId: body.projectId,
          prompt: "Failed before generation",
          parameters: {},
          result: {},
          model: "claude-sonnet-4-20250514",
          status: "FAILED",
          error: error instanceof Error ? error.message : "Unknown error",
        },
      }).catch(() => {});
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate site" },
      { status: 500 }
    );
  }
}
