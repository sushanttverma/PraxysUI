"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function DocsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Docs error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-obsidian">
          <span className="text-xl text-ignite">!</span>
        </div>

        <h2 className="font-pixel text-xl font-bold text-chalk sm:text-2xl">
          Failed to load this page
        </h2>
        <p className="mt-3 max-w-md text-sm text-blush">
          Something went wrong while loading this documentation page. This might
          be a temporary issue with the component preview.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-ignite px-4 text-sm font-medium text-void transition-colors hover:bg-ignite/90 cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/docs"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
          >
            Back to docs
          </Link>
        </div>

        {error.digest && (
          <p className="mt-4 font-mono text-xs text-text-faint">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
