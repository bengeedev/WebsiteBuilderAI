import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/projects" className="text-2xl font-bold text-primary">
              BuilderAI
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <Link
                href="/projects"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Projects
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
            <Link
              href="/api/auth/signout"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Sign out
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
