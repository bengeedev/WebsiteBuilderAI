import { prisma } from "@repo/database";
import Link from "next/link";

type SearchParams = {
  page?: string;
  search?: string;
};

async function getUsers(page: number = 1, search?: string) {
  const pageSize = 25;
  const skip = (page - 1) * pageSize;

  const where = search
    ? {
        OR: [
          { email: { contains: search, mode: "insensitive" as const } },
          { name: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { projects: true },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
}

async function getUserStats() {
  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    usersLast24h,
    usersLastWeek,
    usersLastMonth,
    usersWithProjects,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: dayAgo } } }),
    prisma.user.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.user.count({ where: { createdAt: { gte: monthAgo } } }),
    prisma.user.count({
      where: { projects: { some: {} } },
    }),
  ]);

  return {
    totalUsers,
    usersLast24h,
    usersLastWeek,
    usersLastMonth,
    usersWithProjects,
    conversionRate: totalUsers > 0 ? ((usersWithProjects / totalUsers) * 100).toFixed(1) : 0,
  };
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search;

  const [userData, stats] = await Promise.all([
    getUsers(page, search),
    getUserStats(),
  ]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Users</h1>
        <p className="text-slate-400">Manage and monitor user accounts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total Users" value={stats.totalUsers.toLocaleString()} />
        <StatCard label="Last 24h" value={`+${stats.usersLast24h}`} highlight />
        <StatCard label="Last 7 Days" value={`+${stats.usersLastWeek}`} />
        <StatCard label="Last 30 Days" value={`+${stats.usersLastMonth}`} />
        <StatCard label="Conversion" value={`${stats.conversionRate}%`} subtitle="Users with projects" />
      </div>

      {/* Search & Filters */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 mb-6">
        <div className="p-4 border-b border-slate-800">
          <form className="flex gap-4">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search by email or name..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm font-medium transition"
            >
              Search
            </button>
            {search && (
              <Link
                href="/admin/users"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition"
              >
                Clear
              </Link>
            )}
          </form>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 text-left text-sm text-slate-400">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Projects</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.users.map((user) => (
                <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm font-medium">
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name || "No name"}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm ${user._count.projects > 0 ? "text-green-400" : "text-slate-500"}`}>
                      {user._count.projects} project{user._count.projects !== 1 ? "s" : ""}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.emailVerified
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {user.emailVerified ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-sm text-slate-400 hover:text-white transition">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {userData.totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Showing {(page - 1) * 25 + 1}-{Math.min(page * 25, userData.totalCount)} of {userData.totalCount.toLocaleString()} users
            </p>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`/admin/users?page=${page - 1}${search ? `&search=${search}` : ""}`}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-sm transition"
                >
                  Previous
                </Link>
              )}
              <span className="px-3 py-1.5 text-sm text-slate-400">
                Page {page} of {userData.totalPages}
              </span>
              {page < userData.totalPages && (
                <Link
                  href={`/admin/users?page=${page + 1}${search ? `&search=${search}` : ""}`}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-sm transition"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}

        {userData.users.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-400">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtitle,
  highlight,
}: {
  label: string;
  value: string;
  subtitle?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? "bg-violet-600/20 border border-violet-500/30" : "bg-slate-900 border border-slate-800"}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
