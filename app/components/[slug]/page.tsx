import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import {
  componentRegistry,
  isComponentSlug,
  getPrevNext,
  getTitle,
} from "@/lib/registry";
import { CodeBlock } from "@/app/components/shared/CodeBlock";
import { PropsTable } from "@/app/components/shared/PropsTable";
import { InstallSteps } from "@/app/components/shared/InstallSteps";
import ComponentPreview from "@/app/components/shared/ComponentPreview";
import ComponentPageClient from "@/app/components/shared/ComponentPageClient";
import PropsPlayground from "@/app/components/shared/PropsPlayground";
import Navbar from "../Navbar";
import Footer from "../Footer";

// ─── Dynamic metadata ───────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (isComponentSlug(slug)) {
    const entry = componentRegistry[slug];
    return {
      title: entry.title,
      description: entry.description,
    };
  }

  return {};
}

// ─── Static params ──────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(componentRegistry).map((slug) => ({ slug }));
}

// ─── Breadcrumbs ────────────────────────────────────────

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

// ─── Page component ─────────────────────────────────────

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isComponentSlug(slug)) {
    notFound();
  }

  const entry = componentRegistry[slug];
  const { prev, next } = getPrevNext(slug);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-24 pb-20">
        <div className="space-y-10">
          {/* Editorial header */}
          <div>
            <Breadcrumbs
              items={[
                { label: "Components", href: "/components" },
                { label: entry.title },
              ]}
            />
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="font-mono text-[10px] text-text-faint tracking-wider mb-1">
                  {`// components / ${slug}`}
                </p>
                <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl font-bold text-chalk leading-none">
                  {entry.title}
                </h1>
              </div>
              <a
                href={`https://github.com/sushanttverma/Praxys-UI/blob/main/app/components/ui/${slug}.tsx`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-text-faint transition-colors hover:border-border-light hover:text-blush mb-0.5"
              >
                Edit on GitHub
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="mt-4 h-px w-full" style={{ background: 'linear-gradient(90deg, var(--color-ignite), var(--color-ignite) 30%, transparent)' }} />
          </div>

          {/* Preview + Code */}
          <ComponentPreview
            preview={<ComponentPageClient slug={slug} />}
            codeBlock={
              <CodeBlock
                code={entry.code}
                language="tsx"
                filename={`components/ui/${slug}.tsx`}
              />
            }
          />

          {/* Playground */}
          {entry.playground && entry.playground.controls.length > 0 && (
            <div>
              <h2 className="mb-4 font-pixel text-xl font-semibold text-chalk">
                Playground
              </h2>
              <p className="mb-4 text-sm text-blush">
                Tweak the props below and see the component update in real time.
              </p>
              <PropsPlayground slug={slug} playground={entry.playground} />
            </div>
          )}

          {/* Install */}
          <div>
            <h2 className="mb-4 font-pixel text-xl font-semibold text-chalk">
              Installation
            </h2>

            <InstallSteps
              steps={[
                {
                  title: "Install dependencies",
                  code: `npm install ${entry.dependencies.join(" ")}`,
                  language: "bash",
                },
                {
                  title: "Add utility file",
                  description:
                    "Create the cn() utility if you haven't already.",
                  code: `import { type ClassValue, clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`,
                  language: "tsx",
                  filename: "lib/utils.ts",
                },
                {
                  title: "Copy the source code",
                  description: `Copy the code below and paste it into components/ui/${slug}.tsx`,
                  code: entry.code,
                  language: "tsx",
                  filename: `components/ui/${slug}.tsx`,
                },
              ]}
            />
          </div>

          {/* Usage */}
          <div>
            <h2 className="mb-4 font-pixel text-xl font-semibold text-chalk">
              Usage
            </h2>
            <CodeBlock code={entry.usage} language="tsx" />
          </div>

          {/* Props */}
          <div>
            <h2 className="mb-4 font-pixel text-xl font-semibold text-chalk">
              Props
            </h2>
            <PropsTable props={entry.props} />
          </div>

          {/* Prev / Next navigation */}
          <div className="border-t border-border pt-8">
            <div className="flex items-center justify-between">
              {prev ? (
                <Link
                  href={`/components/${prev}`}
                  className="group flex items-center gap-2 text-text-faint transition-colors hover:text-ignite"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="font-mono text-sm">{getTitle(prev)}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/components/${next}`}
                  className="group flex items-center gap-2 text-text-faint transition-colors hover:text-ignite"
                >
                  <span className="font-mono text-sm">{getTitle(next)}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
