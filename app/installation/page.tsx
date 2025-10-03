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
      "Complete installation guide for Praxys UI — Next.js, Tailwind CSS, and utilities setup.",
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

      <main className="mx-auto max-w-7xl px-6 pt-24 pb-20">
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
          </div>

          {/* ─── Step 1: Install Next.js ─────────────────────── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ignite font-pixel text-sm font-bold text-void">
                1
              </span>
              <h2 className="font-pixel text-xl font-semibold text-chalk">
                Install Next.js
              </h2>
            </div>
            <p className="text-blush">
              Create a new Next.js project with TypeScript, Tailwind CSS, ESLint,
              and App Router.
            </p>

            <div>
              <h3 className="mb-3 font-pixel text-lg font-semibold text-chalk">
                Create Project
              </h3>
              <p className="mb-4 text-blush">
                Run the following command to create a new Next.js project:
              </p>
              <CodeBlock
                code={`npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias '@/*'`}
                language="bash"
              />
            </div>

            <div>
              <p className="mb-4 text-blush">
                Navigate to your project directory:
              </p>
              <CodeBlock code="cd my-app" language="bash" />
            </div>

            <div>
              <h3 className="mb-3 font-pixel text-lg font-semibold text-chalk">
                Start Development Server
              </h3>
              <p className="mb-4 text-blush">
                Start the development server to verify your setup:
              </p>
              <CodeBlock code="npm run dev" language="bash" />
            </div>

            <div className="rounded-xl border border-ignite/20 bg-ignite/5 p-4">
              <p className="text-sm text-blush">
                <strong className="text-chalk">Note:</strong> Praxys UI components
                require React 18+ and Next.js 14+ with the App Router. Make sure
                you have the latest versions installed.
              </p>
            </div>
          </section>

          {/* ─── Step 2: Install Tailwind CSS ────────────────── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ignite font-pixel text-sm font-bold text-void">
                2
              </span>
              <h2 className="font-pixel text-xl font-semibold text-chalk">
                Install Tailwind CSS
              </h2>
            </div>
            <p className="text-blush">
              Set up Tailwind CSS v4 in your Next.js project.
            </p>

            <div>
              <h3 className="mb-3 font-pixel text-lg font-semibold text-chalk">
                Install Tailwind CSS
              </h3>
              <p className="mb-4 text-blush">
                Install Tailwind CSS and the PostCSS plugin:
              </p>
              <CodeBlock
                code="npm install tailwindcss @tailwindcss/postcss"
                language="bash"
              />
            </div>

            <div>
              <h3 className="mb-3 font-pixel text-lg font-semibold text-chalk">
                Configure PostCSS
              </h3>
              <p className="mb-4 text-blush">
                Update your{" "}
                <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                  postcss.config.mjs
                </code>{" "}
                file:
              </p>
              <CodeBlock
                code={`/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;`}
                language="js"
                filename="postcss.config.mjs"
              />
            </div>

            <div>
              <h3 className="mb-3 font-pixel text-lg font-semibold text-chalk">
                Import Tailwind
              </h3>
              <p className="mb-4 text-blush">
                Add the Tailwind import to your global CSS file:
              </p>
              <CodeBlock
                code={`@import "tailwindcss";`}
                language="css"
                filename="app/globals.css"
              />
            </div>

            <div className="rounded-xl border border-ignite/20 bg-ignite/5 p-4">
              <p className="text-sm text-blush">
                <strong className="text-chalk">Tip:</strong> If you used{" "}
                <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                  create-next-app
                </code>{" "}
                with the{" "}
                <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                  --tailwind
                </code>{" "}
                flag, Tailwind CSS is already set up for you.
              </p>
            </div>
          </section>

          {/* ─── Step 3: Add Utilities ───────────────────────── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ignite font-pixel text-sm font-bold text-void">
                3
              </span>
              <h2 className="font-pixel text-xl font-semibold text-chalk">
                Add Utilities
              </h2>
            </div>
            <p className="text-blush">
              Add the{" "}
              <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                cn()
              </code>{" "}
              utility function used by all Praxys UI components.
            </p>

            <div>
              <h3 className="mb-3 font-pixel text-lg font-semibold text-chalk">
                Install Dependencies
              </h3>
              <p className="mb-4 text-blush">
                Install{" "}
                <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                  clsx
                </code>{" "}
                and{" "}
                <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                  tailwind-merge
                </code>
                :
              </p>
              <CodeBlock code="npm install clsx tailwind-merge" language="bash" />
            </div>

            <div>
              <h3 className="mb-3 font-pixel text-lg font-semibold text-chalk">
                Create Utility File
              </h3>
              <p className="mb-4 text-blush">
                Create{" "}
                <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                  lib/utils.ts
                </code>{" "}
                with the following code:
              </p>
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
              <h3 className="mb-3 font-pixel text-lg font-semibold text-chalk">
                What is cn()?
              </h3>
              <p className="text-blush">
                The{" "}
                <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                  cn()
                </code>{" "}
                function combines{" "}
                <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                  clsx
                </code>{" "}
                for conditional class names with{" "}
                <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                  tailwind-merge
                </code>{" "}
                for smart Tailwind class deduplication. This ensures that when you
                pass custom classes via the{" "}
                <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
                  className
                </code>{" "}
                prop, they properly override default styles without conflicts.
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-pixel text-lg font-semibold text-chalk">
                Usage Example
              </h3>
              <CodeBlock
                code={`import { cn } from "@/lib/utils";

// Merge conditional + override classes
cn("px-4 py-2 bg-blue-500", isActive && "bg-red-500", className)
// Result: "px-4 py-2 bg-red-500" (tailwind-merge resolves conflicts)`}
                language="tsx"
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
