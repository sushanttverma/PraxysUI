"use client";

import { useState, Suspense } from "react";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  preview: React.ReactNode;
  codeBlock: React.ReactNode;
}

export default function ComponentPreview({
  preview,
  codeBlock,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-border bg-obsidian/50">
        <button
          onClick={() => setActiveTab("preview")}
          className={cn(
            "px-4 py-2.5 text-sm font-medium transition-colors",
            activeTab === "preview"
              ? "text-ignite border-b-2 border-ignite"
              : "text-text-faint hover:text-blush"
          )}
        >
          Preview
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={cn(
            "px-4 py-2.5 text-sm font-medium transition-colors",
            activeTab === "code"
              ? "text-ignite border-b-2 border-ignite"
              : "text-text-faint hover:text-blush"
          )}
        >
          Code
        </button>
      </div>

      {/* Content */}
      {activeTab === "preview" ? (
        <div className="bg-void/50 p-4 sm:p-6 overflow-hidden">
          <Suspense
            fallback={
              <div className="flex h-32 items-center justify-center text-text-faint">
                Loading preview...
              </div>
            }
          >
            {preview}
          </Suspense>
        </div>
      ) : (
        <div className="[&>div]:rounded-none [&>div]:border-0">{codeBlock}</div>
      )}
    </div>
  );
}
