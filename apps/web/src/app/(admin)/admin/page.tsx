import { prisma } from "@repo/database";
import Link from "next/link";

async function getStats() {
  const [
    totalUsers,
    totalProjects,
    totalSites,
    recentUsers,
    recentProjects,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.site.count(),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true, createdAt: true },
    }),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { email: true } },
        sites: { select: { id: true, status: true } },
      },
    }),
  ]);

  // Get users created in last 7 days
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const newUsersThisWeek = await prisma.user.count({
    where: { createdAt: { gte: weekAgo } },
  });

  // Get sites by status
  const sitesByStatus = await prisma.site.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  return {
    totalUsers,
    totalProjects,
    totalSites,
    newUsersThisWeek,
    recentUsers,
    recentProjects,
    sitesByStatus,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-400">Overview of your platform</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          label="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change={`+${stats.newUsersThisWeek} this week`}
          trend="up"
          icon="👥"
        />
        <MetricCard
          label="Total Projects"
          value={stats.totalProjects.toLocaleString()}
          icon="📁"
        />
        <MetricCard
          label="Total Sites"
          value={stats.totalSites.toLocaleString()}
          icon="🌐"
        />
        <MetricCard
          label="Live Sites"
          value={stats.sitesByStatus.find((s) => s.status === "PUBLISHED")?._count.status.toLocaleString() || "0"}
          icon="🟢"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Users</h2>
            <Link href="/admin/users" className="text-sm text-violet-400 hover:text-violet-300">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {stats.recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm">{user.email}</span>
                </div>
                <span className="text-xs text-slate-400">
                  {formatRelativeTime(user.createdAt)}
                </span>
              </div>
            ))}
            {stats.recentUsers.length === 0 && (
              <p className="text-slate-500 text-sm">No users yet</p>
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Projects</h2>
            <Link href="/admin/sites" className="text-sm text-violet-400 hover:text-violet-300">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {stats.recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: project.primaryColor || "#6366f1" }}
                  >
                    {project.businessName?.charAt(0) || "P"}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{project.businessName || project.name}</p>
                    <p className="text-xs text-slate-400">{project.user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">
                    {project.sites.length} site{project.sites.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            ))}
            {stats.recentProjects.length === 0 && (
              <p className="text-slate-500 text-sm">No projects yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickAction
          href="/admin/blocks"
          icon="🧱"
          title="Block Library"
          description="View and manage all block components"
        />
        <QuickAction
          href="/admin/users"
          icon="👥"
          title="User Management"
          description="View user details and activity"
        />
        <QuickAction
          href="/admin/sites"
          icon="🌐"
          title="Site Monitoring"
          description="Monitor all sites and their status"
        />
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  change,
  trend,
  icon,
}: {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: string;
}) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
      <div className="flex items-start justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        {change && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            trend === "up" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
          }`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="bg-slate-900 rounded-xl border border-slate-800 p-5 hover:bg-slate-800 hover:border-slate-700 transition group"
    >
      <span className="text-2xl mb-3 block">{icon}</span>
      <h3 className="font-semibold mb-1 group-hover:text-violet-400 transition">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </Link>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
