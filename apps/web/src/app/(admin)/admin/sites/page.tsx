import { prisma } from "@repo/database";
import Link from "next/link";

type SearchParams = {
  page?: string;
  status?: string;
  search?: string;
};

async function getSiteStats() {
  // Aggregated stats - efficient for large scale
  const [
    totalSites,
    publishedSites,
    draftSites,
    sitesWithDomain,
  ] = await Promise.all([
    prisma.site.count(),
    prisma.site.count({ where: { status: "PUBLISHED" } }),
    prisma.site.count({ where: { status: "DRAFT" } }),
    prisma.site.count({ where: { customDomain: { not: null } } }),
  ]);

  // Get sites created over time (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const sitesLastWeek = await prisma.site.count({
    where: { createdAt: { gte: weekAgo } },
  });

  return {
    totalSites,
    publishedSites,
    draftSites,
    sitesWithDomain,
    sitesLastWeek,
    publishRate: totalSites > 0 ? ((publishedSites / totalSites) * 100).toFixed(1) : 0,
  };
}

async function getSites(page: number = 1, status?: string, search?: string) {
  const pageSize = 25;
  const skip = (page - 1) * pageSize;

  const where: Record<string, unknown> = {};

  if (status && status !== "all") {
    where.status = status.toUpperCase();
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { subdomain: { contains: search, mode: "insensitive" } },
      { customDomain: { contains: search, mode: "insensitive" } },
    ];
  }

  const [sites, totalCount] = await Promise.all([
    prisma.site.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            businessName: true,
            primaryColor: true,
            user: { select: { email: true } },
          },
        },
        _count: {
          select: { pages: true },
        },
      },
    }),
    prisma.site.count({ where }),
  ]);

  return {
    sites,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
}

export default async function SitesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const status = searchParams.status;
  const search = searchParams.search;

  const [siteData, stats] = await Promise.all([
    getSites(page, status, search),
    getSiteStats(),
  ]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Site Monitoring</h1>
        <p className="text-slate-400">Monitor all sites across the platform</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard label="Total Sites" value={formatNumber(stats.totalSites)} icon="🌐" />
        <StatCard label="Published" value={formatNumber(stats.publishedSites)} icon="🟢" />
        <StatCard label="Draft" value={formatNumber(stats.draftSites)} icon="📝" />
        <StatCard label="Custom Domain" value={formatNumber(stats.sitesWithDomain)} icon="🔗" />
        <StatCard label="This Week" value={`+${formatNumber(stats.sitesLastWeek)}`} icon="📈" />
        <StatCard label="Publish Rate" value={`${stats.publishRate}%`} icon="🎯" />
      </div>

      {/* Scale Indicator */}
      <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚀</span>
          <div>
            <p className="font-medium">Infrastructure Ready</p>
            <p className="text-sm text-slate-400">
              Designed to scale to 100M+ sites with aggregated metrics and efficient pagination
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{formatNumber(stats.totalSites)}</p>
          <p className="text-xs text-slate-400">Current Sites</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-slate-900 rounded-xl border border-slate-800">
        <div className="p-4 border-b border-slate-800 flex flex-wrap gap-4 items-center">
          {/* Status Filter */}
          <div className="flex gap-2">
            {["all", "published", "draft"].map((s) => (
              <Link
                key={s}
                href={`/admin/sites?status=${s}${search ? `&search=${search}` : ""}`}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  (status || "all") === s
                    ? "bg-violet-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Link>
            ))}
          </div>

          {/* Search */}
          <form className="flex-1 flex gap-2">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search sites by title or domain..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
            {status && <input type="hidden" name="status" value={status} />}
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm font-medium transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Sites Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 text-left text-sm text-slate-400">
                <th className="px-4 py-3 font-medium">Site</th>
                <th className="px-4 py-3 font-medium">Owner</th>
                <th className="px-4 py-3 font-medium">Domain</th>
                <th className="px-4 py-3 font-medium">Pages</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {siteData.sites.map((site) => (
                <tr key={site.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: site.project?.primaryColor || "#6366f1" }}
                      >
                        {site.project?.businessName?.charAt(0) || site.title?.charAt(0) || "S"}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{site.title || "Untitled"}</p>
                        <p className="text-xs text-slate-400">
                          {site.project?.businessName || site.project?.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {site.project?.user?.email || "-"}
                  </td>
                  <td className="px-4 py-3">
                    {site.customDomain ? (
                      <span className="text-sm text-green-400">{site.customDomain}</span>
                    ) : site.subdomain ? (
                      <span className="text-sm text-slate-400">{site.subdomain}.builderai.com</span>
                    ) : (
                      <span className="text-sm text-slate-500">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {site._count.pages} page{site._count.pages !== 1 ? "s" : ""}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={site.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {formatDate(site.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {siteData.totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Showing {formatNumber((page - 1) * 25 + 1)}-{formatNumber(Math.min(page * 25, siteData.totalCount))} of {formatNumber(siteData.totalCount)} sites
            </p>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={buildPageUrl(page - 1, status, search)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-sm transition"
                >
                  Previous
                </Link>
              )}
              <span className="px-3 py-1.5 text-sm text-slate-400">
                Page {formatNumber(page)} of {formatNumber(siteData.totalPages)}
              </span>
              {page < siteData.totalPages && (
                <Link
                  href={buildPageUrl(page + 1, status, search)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-sm transition"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}

        {siteData.sites.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-400">No sites found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg">{icon}</span>
      </div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusLower = status.toLowerCase();
  const styles: Record<string, string> = {
    published: "bg-green-500/20 text-green-400",
    draft: "bg-yellow-500/20 text-yellow-400",
    archived: "bg-slate-500/20 text-slate-400",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${styles[statusLower] || styles.draft}`}>
      {statusLower.charAt(0).toUpperCase() + statusLower.slice(1)}
    </span>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function buildPageUrl(page: number, status?: string, search?: string): string {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  if (status) params.set("status", status);
  if (search) params.set("search", search);
  return `/admin/sites?${params.toString()}`;
}
