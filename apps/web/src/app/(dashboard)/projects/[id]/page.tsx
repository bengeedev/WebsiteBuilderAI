import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@repo/database";
import { authOptions } from "@/lib/auth";
import { SitePreview } from "@/components/preview/site-preview";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Redirect to the new dashboard view
  redirect(`/projects/${id}/dashboard`);

  const project = await prisma.project.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      sites: {
        include: {
          pages: true,
        },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!project) {
    notFound();
  }

  const site = project.sites[0];
  const page = site?.pages[0];
  const content = page?.content as { sections?: Array<Record<string, unknown>> } | null;
  const styles = site?.styles as { primaryColor?: string; secondaryColor?: string } | null;

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-80 border-r bg-muted/30 p-4 overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold">{project.businessName || project.name}</h1>
            {project.businessTagline && (
              <p className="text-sm text-muted-foreground mt-1">
                {project.businessTagline}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Status
            </h2>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex h-2 w-2 rounded-full ${
                  site?.status === "PUBLISHED" ? "bg-green-500" : "bg-yellow-500"
                }`}
              />
              <span className="text-sm">
                {site?.status === "PUBLISHED" ? "Published" : "Draft"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Brand Colors
            </h2>
            <div className="flex gap-2">
              <div
                className="h-8 w-8 rounded-full border"
                style={{ backgroundColor: styles?.primaryColor || "#2563eb" }}
              />
              <div
                className="h-8 w-8 rounded-full border"
                style={{ backgroundColor: styles?.secondaryColor || "#1e293b" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Sections
            </h2>
            <ul className="space-y-1">
              {content?.sections?.map((section, index) => (
                <li key={index} className="text-sm py-1 px-2 rounded hover:bg-muted cursor-pointer">
                  {String(section.type || 'Section').charAt(0).toUpperCase() +
                   String(section.type || 'Section').slice(1)}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Actions
            </h2>
            <div className="space-y-2">
              <Link
                href={`/projects/${id}/edit`}
                className="block w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Edit Site
              </Link>
              <button
                className="block w-full rounded-md border border-input bg-background px-4 py-2 text-center text-sm font-medium hover:bg-accent"
              >
                Regenerate Content
              </button>
              <button
                className="block w-full rounded-md bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-700"
              >
                Publish Site
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 bg-muted/50 p-4 overflow-hidden">
        <div className="bg-background rounded-lg shadow-lg h-full overflow-hidden">
          <div className="border-b px-4 py-2 flex items-center gap-2 bg-muted/50">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-muted-foreground">
                {site?.subdomain
                  ? `${site.subdomain}.builderai.com`
                  : "Preview Mode"}
              </span>
            </div>
          </div>
          <div className="h-[calc(100%-2.5rem)] overflow-y-auto">
            {content?.sections ? (
              <SitePreview
                sections={content.sections}
                styles={styles || {}}
                businessName={project.businessName || project.name}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No content generated yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
