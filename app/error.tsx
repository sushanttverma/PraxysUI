"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-void px-6">
      {/* Glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-ignite/5 blur-[120px]" />
      </div>

      <div className="relative text-center">
        <h2 className="font-pixel text-2xl font-bold text-chalk sm:text-3xl">
          Something went wrong
        </h2>
        <p className="mt-3 max-w-md text-base text-blush">
          An unexpected error occurred. You can try again or head back to the
          home page.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-ignite px-5 text-sm font-medium text-void transition-colors hover:bg-ignite/90 cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
          >
            Go home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 font-mono text-xs text-text-faint">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
