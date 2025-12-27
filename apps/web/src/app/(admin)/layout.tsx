import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

// Admin emails - in production, use database role or env var
const ADMIN_EMAILS = [
  process.env.ADMIN_EMAIL,
  "admin@builderai.com",
].filter(Boolean);

// In development, allow all authenticated users to access admin
const isDev = process.env.NODE_ENV === "development";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Check if user is admin (allow all users in development)
  const isAdmin = isDev || ADMIN_EMAILS.includes(session.user.email || "");
  if (!isAdmin) {
    redirect("/projects");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center font-bold text-lg">
              B
            </div>
            <div>
              <h1 className="font-bold">BuilderAI</h1>
              <p className="text-xs text-slate-400">Admin Console</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/admin" icon="📊" label="Dashboard" />
          <NavItem href="/admin/blocks" icon="🧱" label="Block Library" />
          <NavItem href="/admin/users" icon="👥" label="Users" />
          <NavItem href="/admin/sites" icon="🌐" label="Sites" />
          <NavItem href="/admin/settings" icon="⚙️" label="Settings" />
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm">
              {session.user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.user.email}</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
          <Link
            href="/projects"
            className="mt-3 block text-center text-xs text-slate-400 hover:text-white transition py-2 rounded bg-slate-800 hover:bg-slate-700"
          >
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
