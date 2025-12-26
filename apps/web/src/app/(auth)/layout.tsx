import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            BuilderAI
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center py-12">
        {children}
      </main>
    </div>
  );
}
