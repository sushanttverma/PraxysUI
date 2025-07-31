import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getPrevNext, getTitle } from "@/lib/registry";
import IntroductionPage from "./[slug]/pages/IntroductionPage";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Get started with Praxys UI. Learn how to install, configure, and use 63 animated React components in your project.",
};

export default function DocsIndexPage() {
  const { next } = getPrevNext("introduction");

  return (
    <div>
      <IntroductionPage />

      {/* Next page */}
      <div className="mt-12 flex items-center justify-end border-t border-border pt-6">
        {next && (
          <Link
            href={`/docs/${next}`}
            className="group flex items-center gap-2 text-sm text-blush transition-colors hover:text-chalk"
          >
            {getTitle(next)}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
