import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import {
  componentRegistry,
  isComponentSlug,
} from "@/lib/registry";

const GITHUB_REPO_URL = "https://github.com/sushanttverma/Praxys-UI";
import { CodeBlock } from "@/app/components/shared/CodeBlock";
import { PropsTable } from "@/app/components/shared/PropsTable";
import { InstallSteps } from "@/app/components/shared/InstallSteps";
import ComponentPreview from "@/app/components/shared/ComponentPreview";
import ComponentPageClient from "@/app/components/shared/ComponentPageClient";
import ComponentSidebar from "@/app/components/shared/ComponentSidebar";
import Navbar from "../Navbar";

// ─── Dynamic metadata ───────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (isComponentSlug(slug)) {
    const entry = componentRegistry[slug];
    return { title: `${entry.title} | Praxys UI`, description: entry.description };
  }
  return {};
}

// ─── Static params ──────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(componentRegistry).map((slug) => ({ slug }));
}

// ─── Category meta ──────────────────────────────────────

const categoryMeta: Record<string, { label: string; accent: string }> = {
  buttons: { label: "Buttons", accent: "#E04E2D" },
  cards: { label: "Cards & Layout", accent: "#38bdf8" },
  text: { label: "Text Effects", accent: "#34d399" },
  navigation: { label: "Navigation", accent: "#fbbf24" },
  visual: { label: "Visual Effects", accent: "#a78bfa" },
  media: { label: "Media & Content", accent: "#fb7185" },
};

// ─── Page ───────────────────────────────────────────────

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isComponentSlug(slug)) notFound();

  const entry = componentRegistry[slug];
  const cat = categoryMeta[entry.category];

  return (
    <div className="min-h-screen bg-[var(--color-void)]">
      <Navbar />

      <div className="flex pt-16">
        {/* ─── Left Sidebar ─── */}
        <ComponentSidebar activeSlug={slug} />

        {/* ─── Main Content ─── */}
        <main className="min-w-0 flex-1 px-6 py-10 lg:px-12">
          <div className="mx-auto max-w-4xl">
            {/* ─── Header ─── */}
            <div className="mb-10">
              <h1 className="font-pixel text-4xl font-bold text-[var(--color-chalk)] sm:text-5xl md:text-6xl">
                {entry.title}
              </h1>

              {/* Meta row */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {cat && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
                    style={{ backgroundColor: `${cat.accent}15`, color: cat.accent }}
                  >
                    {cat.label}
                  </span>
                )}
                {entry.isSignature && (
                  <span className="rounded-full bg-gradient-to-r from-amber-500 to-[var(--color-ignite)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    SIGNATURE
                  </span>
                )}
                {entry.isNew && !entry.isSignature && (
                  <span className="rounded-full bg-[var(--color-ignite)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    NEW
                  </span>
                )}
                {entry.dependencies.map((dep) => (
                  <span
                    key={dep}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-obsidian)]/50 px-2.5 py-0.5 font-mono text-[10px] text-[var(--color-text-faint)]"
                  >
                    {dep}
                  </span>
                ))}
              </div>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-faint)]">
                {entry.description}
              </p>

              {/* Actions */}
              <div className="mt-5 flex items-center gap-3">
                <a
                  href={`${GITHUB_REPO_URL}/blob/main/app/components/ui/${slug}.tsx`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-xs font-medium text-[var(--color-text-faint)] transition-all hover:border-[var(--color-border-light)] hover:text-[var(--color-blush)]"
                >
                  <Github className="h-3.5 w-3.5" />
                  View Source
                  <ExternalLink className="h-3 w-3 opacity-40" />
                </a>
              </div>
            </div>

            {/* ─── Preview + Code + Customize ─── */}
            <section className="mb-12">
              <ComponentPreview
                preview={<ComponentPageClient slug={slug} />}
                slug={slug}
                playground={entry.playground}
                codeBlock={
                  <div className="space-y-4 p-4">
                    <InstallSteps
                      steps={[
                        {
                          title: "Install dependencies",
                          code: `npm install ${entry.dependencies.join(" ")}`,
                          language: "bash",
                        },
                        {
                          title: "Add utility file",
                          description: "Create the cn() utility if you haven't already.",
                          code: `import { type ClassValue, clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`,
                          language: "tsx",
                          filename: "lib/utils.ts",
                        },
                      ]}
                    />
                    <CodeBlock
                      code={entry.code}
                      language="tsx"
                      filename={`components/ui/${slug}.tsx`}
                    />
                  </div>
                }
              />
            </section>

            {/* ─── Props ─── */}
            {entry.props.length > 0 && (
              <section className="mb-12">
                <h2 className="mb-5 text-lg font-bold text-[var(--color-chalk)]">
                  Props
                </h2>
                <PropsTable props={entry.props} />
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
