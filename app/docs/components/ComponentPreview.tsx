"use client";

import { useState, useCallback, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { RotateCcw, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

const SPEED_OPTIONS = [
  { label: "0.25x", value: 0.25 },
  { label: "0.5x", value: 0.5 },
  { label: "1x", value: 1 },
  { label: "2x", value: 2 },
] as const;

interface ComponentPreviewProps {
  preview: React.ReactNode;
  codeBlock: React.ReactNode;
}

export default function ComponentPreview({
  preview,
  codeBlock,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [speed, setSpeed] = useState(1);
  const [replayKey, setReplayKey] = useState(0);
  const [showSpeed, setShowSpeed] = useState(false);

  const handleReplay = useCallback(() => {
    setReplayKey((k) => k + 1);
  }, []);

  // Scale factor: speed 2x means animations should take half the time
  // So duration multiplier = 1 / speed
  const durationScale = 1 / speed;

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Tabs + Controls */}
      <div className="flex items-center justify-between border-b border-border bg-obsidian/50">
        <div className="flex">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer",
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
              "px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer",
              activeTab === "code"
                ? "text-ignite border-b-2 border-ignite"
                : "text-text-faint hover:text-blush"
            )}
          >
            Code
          </button>
        </div>

        {/* Animation controls — only show on preview tab */}
        {activeTab === "preview" && (
          <div className="flex items-center gap-1 pr-3">
            {/* Speed selector */}
            <div className="relative">
              <button
                onClick={() => setShowSpeed((s) => !s)}
                className={cn(
                  "flex h-7 items-center gap-1 rounded-md px-2 text-[11px] font-medium transition-colors cursor-pointer",
                  speed !== 1
                    ? "text-ignite bg-ignite/10"
                    : "text-text-faint hover:text-blush"
                )}
                title="Animation speed"
              >
                <Gauge className="h-3 w-3" />
                {speed !== 1 && <span>{speed}x</span>}
              </button>

              {showSpeed && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowSpeed(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-1 rounded-lg border border-border bg-obsidian p-1 shadow-xl">
                    {SPEED_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSpeed(opt.value);
                          setShowSpeed(false);
                          setReplayKey((k) => k + 1);
                        }}
                        className={cn(
                          "flex w-full items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap",
                          speed === opt.value
                            ? "bg-ignite/10 text-ignite"
                            : "text-blush hover:bg-void hover:text-chalk"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Replay button */}
            <button
              onClick={handleReplay}
              className="flex h-7 w-7 items-center justify-center rounded-md text-text-faint transition-colors hover:text-blush cursor-pointer"
              title="Replay animation"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {activeTab === "preview" ? (
        <div className="bg-void/50 p-4 sm:p-6 overflow-hidden">
          <MotionConfig
            transition={{
              duration: 0.5 * durationScale,
            }}
          >
            <Suspense
              fallback={
                <div className="flex h-32 items-center justify-center text-text-faint">
                  Loading preview...
                </div>
              }
            >
              <div
                key={replayKey}
                style={{
                  ["--motion-duration-scale" as string]: durationScale,
                }}
              >
                {preview}
              </div>
            </Suspense>
          </MotionConfig>
        </div>
      ) : (
        <div className="[&>div]:rounded-none [&>div]:border-0">{codeBlock}</div>
      )}
    </div>
  );
}
