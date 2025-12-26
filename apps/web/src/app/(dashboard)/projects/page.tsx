import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@repo/database";
import { authOptions } from "@/lib/auth";

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
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
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your websites and create new ones
          </p>
        </div>
        <Link
          href="/projects/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Create New Website
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <div className="text-6xl mb-4">🌐</div>
          <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
          <p className="text-muted-foreground mb-6">
            Create your first AI-powered website in minutes
          </p>
          <Link
            href="/projects/new"
            className="inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Create Your First Website
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const site = project.sites[0];
            const styles = (project as { primaryColor?: string; secondaryColor?: string });

            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group block rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Preview Header */}
                <div
                  className="h-32 p-4 flex items-end"
                  style={{
                    backgroundColor: styles.secondaryColor || "#1e293b",
                  }}
                >
                  <div>
                    <h3
                      className="font-bold text-lg"
                      style={{ color: styles.primaryColor || "#2563eb" }}
                    >
                      {project.businessName || project.name}
                    </h3>
                    {project.businessTagline && (
                      <p className="text-sm text-gray-400 truncate">
                        {project.businessTagline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                        site?.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          site?.status === "PUBLISHED"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      />
                      {site?.status === "PUBLISHED" ? "Published" : "Draft"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {project.businessType || "Website"}
                    </span>
                  </div>

                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {project.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Updated{" "}
                      {new Date(
                        site?.updatedAt || project.updatedAt
                      ).toLocaleDateString()}
                    </span>
                    {site?.subdomain && (
                      <span className="text-primary">
                        {site.subdomain}.builderai.com
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Create New Card */}
          <Link
            href="/projects/new"
            className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors min-h-[200px]"
          >
            <div className="text-4xl mb-3">+</div>
            <span className="font-medium">Create New Website</span>
          </Link>
        </div>
      )}
    </div>
  );
}
