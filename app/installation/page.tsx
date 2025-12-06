import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CodeBlock } from "@/app/components/shared/CodeBlock";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─── Metadata ────────────────────────────────────────────

export function generateMetadata(): Metadata {
  return {
    title: "Installation | Praxys UI",
    description:
      "Get started with Praxys UI in under a minute — one CLI command sets up everything.",
  };
}

// ─── Breadcrumbs ─────────────────────────────────────────

function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-xs text-text-faint">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight className="h-3 w-3 text-text-faint/50" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-blush"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-blush">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Page component ──────────────────────────────────────

export default function InstallPage() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pt-24 pb-20">
        <div className="space-y-16">
          {/* Editorial header */}
          <div>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Installation" },
              ]}
            />
            <p className="font-mono text-[10px] text-text-faint tracking-wider mb-1">
              {"// getting-started"}
            </p>
            <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl font-bold text-chalk leading-none">
              Installation
            </h1>
            <div className="mt-4 h-px w-full" style={{ background: 'linear-gradient(90deg, var(--color-ignite), var(--color-ignite) 30%, transparent)' }} />
            <p className="mt-6 text-blush text-lg">
              Get Praxys UI running in your project in under a minute.
            </p>
          </div>

          {/* ─── Create a Next.js Project ─────────────────── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ignite font-pixel text-sm font-bold text-void">
                1
              </span>
              <h2 className="font-pixel text-xl font-semibold text-chalk">
                Create a Next.js Project
              </h2>
            </div>
            <p className="text-blush">
              Start with a Next.js project that has TypeScript and Tailwind CSS.
              Skip this if you already have one.
            </p>
            <CodeBlock
              code={`npx create-next-app@latest my-app --typescript --tailwind --eslint --app
cd my-app`}
              language="bash"
            />
          </section>

          {/* ─── Run the CLI ──────────────────────────────── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ignite font-pixel text-sm font-bold text-void">
                2
              </span>
              <h2 className="font-pixel text-xl font-semibold text-chalk">
                Initialize Praxys UI
              </h2>
            </div>
            <p className="text-blush">
              One command sets up everything — installs dependencies, creates the{" "}
              <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">cn()</code>{" "}
              utility, and writes a config file.
            </p>
            <CodeBlock code="npx praxys-ui init" language="bash" />
            <p className="text-sm text-text-faint">
              This auto-detects your package manager (npm, pnpm, yarn, bun) and installs{" "}
              <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">framer-motion</code>,{" "}
              <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">clsx</code>, and{" "}
              <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">tailwind-merge</code>.
            </p>
          </section>

          {/* ─── Add Components ────────────────────────────── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ignite font-pixel text-sm font-bold text-void">
                3
              </span>
              <h2 className="font-pixel text-xl font-semibold text-chalk">
                Add Components
              </h2>
            </div>
            <p className="text-blush">
              Add any component by name, or run{" "}
              <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">add</code>{" "}
              with no arguments for an interactive picker.
            </p>
            <CodeBlock
              code={`# Add by name
npx praxys-ui add animated-button

# Add multiple at once
npx praxys-ui add accordion alert tooltip

# Interactive picker
npx praxys-ui add`}
              language="bash"
            />
          </section>

          {/* ─── Use It ───────────────────────────────────── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ignite font-pixel text-sm font-bold text-void">
                4
              </span>
              <h2 className="font-pixel text-xl font-semibold text-chalk">
                Use It
              </h2>
            </div>
            <p className="text-blush">
              Import the component and drop it into your page.
            </p>
            <CodeBlock
              code={`import AnimatedButton from "@/components/ui/animated-button";

export default function Page() {
  return <AnimatedButton>Get Started</AnimatedButton>;
}`}
              language="tsx"
              filename="app/page.tsx"
            />
          </section>

          {/* ─── More CLI Commands ─────────────────────────── */}
          <section className="space-y-6">
            <h2 className="font-pixel text-xl font-semibold text-chalk">
              More CLI Commands
            </h2>
            <CodeBlock
              code={`npx praxys-ui list                    # Browse all 100 components
npx praxys-ui list --category buttons  # Filter by category
npx praxys-ui list --search modal      # Search components
npx praxys-ui info animated-button     # Component details
npx praxys-ui view switch              # View source code
npx praxys-ui diff accordion           # Compare with latest
npx praxys-ui update                   # Update all components
npx praxys-ui remove alert             # Remove a component
npx praxys-ui doctor                   # Check project health
npx praxys-ui stats                    # Coverage dashboard`}
              language="bash"
            />
          </section>

          {/* ─── Prerequisites Note ───────────────────────── */}
          <section className="space-y-6">
            <div className="rounded-xl border border-ignite/20 bg-ignite/5 p-5">
              <h3 className="font-pixel text-base font-semibold text-chalk mb-2">
                Prerequisites
              </h3>
              <ul className="space-y-1.5 text-sm text-blush">
                <li>React 18+ and Next.js 14+ with the App Router</li>
                <li>Tailwind CSS 4 (included with{" "}
                  <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                    create-next-app --tailwind
                  </code>)
                </li>
                <li>TypeScript recommended</li>
              </ul>
            </div>
          </section>

          {/* ─── Manual Setup ─────────────────────────────── */}
          <section className="space-y-6">
            <h2 className="font-pixel text-xl font-semibold text-chalk">
              Manual Setup
            </h2>
            <p className="text-blush">
              Prefer not to use the CLI? Here&apos;s the manual equivalent.
            </p>

            <div>
              <h3 className="mb-3 font-pixel text-base font-semibold text-chalk">
                Install dependencies
              </h3>
              <CodeBlock
                code="npm install framer-motion clsx tailwind-merge"
                language="bash"
              />
            </div>

            <div>
              <h3 className="mb-3 font-pixel text-base font-semibold text-chalk">
                Create the cn() utility
              </h3>
              <CodeBlock
                code={`import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
                language="tsx"
                filename="lib/utils.ts"
              />
            </div>

            <div>
              <h3 className="mb-3 font-pixel text-base font-semibold text-chalk">
                Copy components
              </h3>
              <p className="text-blush">
                Copy any component from{" "}
                <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                  app/components/ui/
                </code>{" "}
                in the{" "}
                <Link
                  href="https://github.com/sushanttverma/Praxys-UI"
                  className="text-ignite hover:underline"
                  target="_blank"
                >
                  GitHub repo
                </Link>{" "}
                into your project&apos;s{" "}
                <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                  components/ui/
                </code>{" "}
                folder.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
