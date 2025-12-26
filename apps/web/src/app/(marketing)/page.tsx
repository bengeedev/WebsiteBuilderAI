import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            BuilderAI
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get Started Free
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center gap-8 py-24 text-center md:py-32">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Build Your Website
              <br />
              <span className="text-primary">With AI</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Just describe your business. Our AI creates a stunning,
              professional website in minutes. No coding, no design skills
              needed.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90"
            >
              Start Building Free
            </Link>
            <Link
              href="#demo"
              className="rounded-md border border-input bg-background px-8 py-3 text-lg font-medium hover:bg-accent hover:text-accent-foreground"
            >
              See Demo
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t bg-muted/50 py-24">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Why BuilderAI?
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <div className="mb-4 text-4xl">🤖</div>
                <h3 className="mb-2 text-xl font-semibold">AI-Powered</h3>
                <p className="text-muted-foreground">
                  Describe your business in plain English. Our AI understands
                  your needs and creates the perfect website.
                </p>
              </div>
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <div className="mb-4 text-4xl">⚡</div>
                <h3 className="mb-2 text-xl font-semibold">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Go from idea to live website in minutes, not weeks. Launch
                  your online presence today.
                </p>
              </div>
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <div className="mb-4 text-4xl">🎨</div>
                <h3 className="mb-2 text-xl font-semibold">Beautiful Design</h3>
                <p className="text-muted-foreground">
                  Professional templates customized to your brand. Your site
                  will look amazing on every device.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Build Your Website?
            </h2>
            <p className="mx-auto mb-8 max-w-[600px] text-lg text-muted-foreground">
              Join thousands of entrepreneurs who have launched their online
              presence with BuilderAI.
            </p>
            <Link
              href="/signup"
              className="inline-block rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get Started Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 BuilderAI. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
