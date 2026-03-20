import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../Navbar";
import ComponentSidebar from "../shared/ComponentSidebar";
import Footer from "../Footer";
import { CodeBlock } from "@/app/components/shared/CodeBlock";
import { componentCount } from "@/lib/registry";

export const metadata: Metadata = {
  title: "Installation | Praxys UI",
  description: "Get started with Praxys UI in under a minute — one CLI command sets up everything.",
};

export default function InstallationPage() {
  return (
    <div className="min-h-screen bg-[var(--color-void)]">
      <Navbar />
      <div className="flex">
        <ComponentSidebar activeSlug="installation" />

        <main className="min-w-0 flex-1 px-8 pb-16 pt-24 lg:px-16">
          <div className="mx-auto max-w-3xl space-y-14">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-[var(--color-chalk)] sm:text-5xl">
                Installation
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-blush)]">
                Get Praxys UI running in your project in under a minute.
              </p>
            </div>

            {/* Step 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-obsidian)] text-xs font-bold text-[var(--color-blush)]">
                  1
                </span>
                <h2 className="text-xl font-semibold text-[var(--color-chalk)]">Create a Next.js Project</h2>
              </div>
              <p className="text-[15px] text-[var(--color-text-faint)]">
                Start with a Next.js project that has TypeScript and Tailwind CSS. Skip this if you already have one.
              </p>
              <CodeBlock
                code={`npx create-next-app@latest my-app --typescript --tailwind --eslint --app\ncd my-app`}
                language="bash"
              />
            </section>

            {/* Step 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-obsidian)] text-xs font-bold text-[var(--color-blush)]">
                  2
                </span>
                <h2 className="text-xl font-semibold text-[var(--color-chalk)]">Initialize Praxys UI</h2>
              </div>
              <p className="text-[15px] text-[var(--color-text-faint)]">
                One command sets up everything — installs dependencies, creates the{" "}
                <code className="rounded bg-[var(--color-obsidian)] px-1.5 py-0.5 font-mono text-xs text-[var(--color-blush)]">cn()</code>{" "}
                utility, and writes a config file.
              </p>
              <CodeBlock code="npx @praxys/ui init" language="bash" />
              <p className="text-[13px] text-[var(--color-text-faint)]">
                Auto-detects your package manager and installs framer-motion, clsx, and tailwind-merge.
              </p>
            </section>

            {/* Step 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-obsidian)] text-xs font-bold text-[var(--color-blush)]">
                  3
                </span>
                <h2 className="text-xl font-semibold text-[var(--color-chalk)]">Add Components</h2>
              </div>
              <p className="text-[15px] text-[var(--color-text-faint)]">
                Add any component by name, or run add with no arguments for an interactive picker.
              </p>
              <CodeBlock
                code={`# Add by name\nnpx @praxys/ui add animated-button\n\n# Add multiple at once\nnpx @praxys/ui add accordion alert tooltip\n\n# Interactive picker\nnpx @praxys/ui add`}
                language="bash"
              />
            </section>

            {/* Step 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-obsidian)] text-xs font-bold text-[var(--color-blush)]">
                  4
                </span>
                <h2 className="text-xl font-semibold text-[var(--color-chalk)]">Use It</h2>
              </div>
              <p className="text-[15px] text-[var(--color-text-faint)]">Import the component and drop it into your page.</p>
              <CodeBlock
                code={`import AnimatedButton from "@/components/ui/animated-button";\n\nexport default function Page() {\n  return <AnimatedButton>Get Started</AnimatedButton>;\n}`}
                language="tsx"
                filename="app/page.tsx"
              />
            </section>

            {/* More CLI commands */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-[var(--color-chalk)]">More CLI Commands</h2>
              <CodeBlock
                code={`npx @praxys/ui list                    # Browse all ${componentCount} components\nnpx @praxys/ui list --category buttons  # Filter by category\nnpx @praxys/ui doctor                   # Check project health\nnpx @praxys/ui stats                    # Coverage dashboard`}
                language="bash"
              />
            </section>

            {/* Prerequisites */}
            <section>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] p-5">
                <h3 className="mb-2 text-base font-semibold text-[var(--color-chalk)]">Prerequisites</h3>
                <ul className="space-y-1.5 text-[14px] text-[var(--color-text-faint)]">
                  <li>React 18+ and Next.js 14+ with the App Router</li>
                  <li>Tailwind CSS 4</li>
                  <li>TypeScript recommended</li>
                </ul>
              </div>
            </section>

            {/* Manual setup */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-[var(--color-chalk)]">Manual Setup</h2>
              <p className="text-[15px] text-[var(--color-text-faint)]">Prefer not to use the CLI? Here&apos;s the manual equivalent.</p>

              <div>
                <h3 className="mb-3 text-base font-semibold text-[var(--color-blush)]">Install dependencies</h3>
                <CodeBlock code="npm install framer-motion clsx tailwind-merge" language="bash" />
              </div>

              <div>
                <h3 className="mb-3 text-base font-semibold text-[var(--color-blush)]">Create the cn() utility</h3>
                <CodeBlock
                  code={`import { type ClassValue, clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`}
                  language="tsx"
                  filename="lib/utils.ts"
                />
              </div>

              <div>
                <h3 className="mb-3 text-base font-semibold text-[var(--color-blush)]">Copy components</h3>
                <p className="text-[15px] text-[var(--color-text-faint)]">
                  Copy any component from the{" "}
                  <Link href="https://github.com/sushanttverma/Praxys-UI" className="text-[var(--color-blush)] underline underline-offset-2 hover:text-[var(--color-chalk)]" target="_blank">
                    GitHub repo
                  </Link>{" "}
                  into your project.
                </p>
              </div>
            </section>

            <div className="pt-4">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
