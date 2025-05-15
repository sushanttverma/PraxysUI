import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  componentRegistry,
  isComponentSlug,
  allSlugs,
  getPrevNext,
  getTitle,
} from "@/lib/registry";
import { CodeBlock } from "../components/CodeBlock";
import { PropsTable } from "../components/PropsTable";
import { InstallSteps } from "../components/InstallSteps";
import ComponentPreview from "../components/ComponentPreview";
import ComponentPageClient from "./ComponentPageClient";

// ─── Doc pages (non-component pages) ────────────────────

import InstallationPage from "./pages/InstallationPage";
import InstallTailwindPage from "./pages/InstallTailwindPage";
import AddUtilitiesPage from "./pages/AddUtilitiesPage";
import CliPage from "./pages/CliPage";
import ComponentsOverviewPage from "./pages/ComponentsOverviewPage";

const docPages: Record<string, React.ComponentType> = {
  installation: InstallationPage,
  "install-tailwind": InstallTailwindPage,
  "add-utilities": AddUtilitiesPage,
  cli: CliPage,
  "components-overview": ComponentsOverviewPage,
};

// ─── Dynamic metadata ───────────────────────────────────

const docPageTitles: Record<string, string> = {
  installation: "Install Next.js",
  "install-tailwind": "Install Tailwind CSS",
  "add-utilities": "Add Utilities",
  cli: "CLI",
  "components-overview": "Components Overview",
};

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

  if (docPageTitles[slug]) {
    return {
      title: docPageTitles[slug],
    };
  }

  return {};
}

// ─── Generate static params ─────────────────────────────

export function generateStaticParams() {
  return allSlugs
    .filter((s) => s !== "introduction")
    .map((slug) => ({ slug }));
}

// ─── Page component ─────────────────────────────────────

export default async function DocsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if it's a valid slug (introduction is handled by /docs, not this route)
  if (!allSlugs.includes(slug) || slug === "introduction") {
    notFound();
  }

  const { prev, next } = getPrevNext(slug);

  // ── Doc page ──
  if (docPages[slug]) {
    const DocComponent = docPages[slug];
    return (
      <div>
        <DocComponent />
        <PrevNextNav prev={prev} next={next} />
      </div>
    );
  }

  // ── Component page ──
  if (isComponentSlug(slug)) {
    const entry = componentRegistry[slug];

    return (
      <div className="space-y-10">
        {/* Header */}
        <div>
          <p className="mb-2 font-pixel text-xs uppercase tracking-wider text-ignite">
            Components
          </p>
          <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-chalk">
            {entry.title}
          </h1>
          <p className="mt-3 text-lg text-blush">{entry.description}</p>
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

        {/* Prev/Next */}
        <PrevNextNav prev={prev} next={next} />
      </div>
    );
  }

  notFound();
}

// ─── Prev/Next navigation ───────────────────────────────

function PrevNextNav({
  prev,
  next,
}: {
  prev: string | null;
  next: string | null;
}) {
  return (
    <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border pt-6">
      {prev ? (
        <Link
          href={prev === "introduction" ? "/docs" : `/docs/${prev}`}
          className="group flex items-center gap-2 text-sm text-blush transition-colors hover:text-chalk"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          {getTitle(prev)}
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/docs/${next}`}
          className="group flex items-center gap-2 text-sm text-blush transition-colors hover:text-chalk self-end sm:self-auto"
        >
          {getTitle(next)}
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
