import type { Metadata } from "next";
import Navbar from "../Navbar";
import ComponentSidebar from "../shared/ComponentSidebar";
import Footer from "../Footer";

export const metadata: Metadata = {
  title: "CLI | Praxys UI",
  description: "Install Praxys UI components via the CLI with a single command.",
};

export default function CliPage() {
  return (
    <div className="min-h-screen bg-[var(--color-void)]">
      <Navbar />
      <div className="flex">
        <ComponentSidebar activeSlug="cli" />

        <main className="min-w-0 flex-1 px-8 pb-16 pt-24 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--color-chalk)] sm:text-5xl">
              CLI
            </h1>

            <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-[var(--color-blush)]">
              <p>
                The Praxys UI CLI lets you add components to your project with a single command.
                No need to manually copy files or install dependencies.
              </p>
            </div>

            <h2 className="mt-12 text-2xl font-bold text-[var(--color-chalk)]">Initialize</h2>
            <div className="mt-4 space-y-3">
              <p className="text-[15px] text-[var(--color-blush)]">Set up Praxys UI in your project:</p>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] px-5 py-4">
                <code className="font-mono text-sm text-[var(--color-blush)]">npx @praxys/ui init</code>
              </div>
              <p className="text-[13px] text-white/35">
                This creates a <code className="rounded bg-[var(--color-obsidian)] px-1.5 py-0.5 text-[var(--color-blush)]">praxys.config.json</code> and
                sets up the components directory and utilities.
              </p>
            </div>

            <h2 className="mt-12 text-2xl font-bold text-[var(--color-chalk)]">Add Components</h2>
            <div className="mt-4 space-y-3">
              <p className="text-[15px] text-[var(--color-blush)]">Add any component by name:</p>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] px-5 py-4">
                <code className="font-mono text-sm text-[var(--color-blush)]">npx @praxys/ui add flip-text</code>
              </div>
              <p className="text-[15px] text-[var(--color-blush)]">Add multiple components at once:</p>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] px-5 py-4">
                <code className="font-mono text-sm text-[var(--color-blush)]">npx @praxys/ui add flip-text aurora glow-border-card</code>
              </div>
              <p className="text-[15px] text-[var(--color-blush)]">Or add everything:</p>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] px-5 py-4">
                <code className="font-mono text-sm text-[var(--color-blush)]">npx @praxys/ui add --all</code>
              </div>
            </div>

            <h2 className="mt-12 text-2xl font-bold text-[var(--color-chalk)]">List Components</h2>
            <div className="mt-4 space-y-3">
              <p className="text-[15px] text-[var(--color-blush)]">See all available components:</p>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] px-5 py-4">
                <code className="font-mono text-sm text-[var(--color-blush)]">npx @praxys/ui list</code>
              </div>
            </div>

            <h2 className="mt-12 text-2xl font-bold text-[var(--color-chalk)]">Doctor</h2>
            <div className="mt-4 space-y-3">
              <p className="text-[15px] text-[var(--color-blush)]">Check your project health:</p>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] px-5 py-4">
                <code className="font-mono text-sm text-[var(--color-blush)]">npx @praxys/ui doctor</code>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
