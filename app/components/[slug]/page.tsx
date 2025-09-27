import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import {
  componentRegistry,
  isComponentSlug,
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

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Breadcrumbs + Header */}
          <div>
            <Breadcrumbs
              items={[
                { label: "Components", href: "/components" },
                { label: entry.title },
              ]}
            />
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-chalk">
                  {entry.title}
                </h1>
                <p className="mt-3 text-lg text-blush">{entry.description}</p>
              </div>
              <a
                href={`https://github.com/sushanttverma/Praxys-UI/blob/main/app/components/ui/${slug}.tsx`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-text-faint transition-colors hover:border-border-light hover:text-blush"
              >
                Edit on GitHub
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
