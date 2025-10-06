"use client";

import { useState, useCallback, useMemo, Suspense } from "react";
import { MotionConfig, motion } from "framer-motion";
import { RotateCcw, Gauge, Monitor, Tablet, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildThemeVars, type ThemeColors } from "@/lib/theme-presets";
import ThemePreviewSelector from "./ThemePreviewSelector";

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
  const [themeColors, setThemeColors] = useState<ThemeColors | null>(null);
  const [viewportSize, setViewportSize] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const handleReplay = useCallback(() => {
    setReplayKey((k) => k + 1);
  }, []);

  const handleThemeChange = useCallback((colors: ThemeColors | null) => {
    setThemeColors(colors);
  }, []);

  // Scale factor: speed 2x means animations should take half the time
  // So duration multiplier = 1 / speed
  const durationScale = 1 / speed;

  // Build CSS variable overrides for the selected theme
  const themeStyle = useMemo(() => {
    if (!themeColors) return undefined;
    return buildThemeVars(themeColors) as React.CSSProperties;
  }, [themeColors]);

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Tabs + Controls */}
      <div className="flex items-center justify-between border-b border-border bg-obsidian/50">
        <div role="tablist" aria-label="Component view" className="flex">
          <button
            role="tab"
            aria-selected={activeTab === "preview"}
            aria-controls="panel-preview"
            id="tab-preview"
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
            role="tab"
            aria-selected={activeTab === "code"}
            aria-controls="panel-code"
            id="tab-code"
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

        {/* Animation + Theme controls — only show on preview tab */}
        {activeTab === "preview" && (
          <div className="flex items-center gap-1 pr-3">
            {/* Viewport toggle */}
            {([
              { key: "desktop" as const, icon: Monitor, label: "Desktop" },
              { key: "tablet" as const, icon: Tablet, label: "Tablet" },
              { key: "mobile" as const, icon: Smartphone, label: "Mobile" },
            ]).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setViewportSize(key)}
                aria-label={label}
                className={cn(
                  "hidden sm:flex h-7 w-7 items-center justify-center rounded-md transition-colors cursor-pointer",
                  viewportSize === key
                    ? "text-ignite bg-ignite/10"
                    : "text-text-faint hover:text-blush"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}

            {/* Theme selector */}
            <ThemePreviewSelector onThemeChange={handleThemeChange} />

            {/* Speed selector */}
            <div className="relative">
              <button
                onClick={() => setShowSpeed((s) => !s)}
                aria-label="Animation speed"
                className={cn(
                  "flex h-7 items-center gap-1 rounded-md px-2 text-[11px] font-medium transition-colors cursor-pointer",
                  speed !== 1
                    ? "text-ignite bg-ignite/10"
                    : "text-text-faint hover:text-blush"
                )}
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
              aria-label="Replay animation"
              className="flex h-7 w-7 items-center justify-center rounded-md text-text-faint transition-colors hover:text-blush cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        id="panel-preview"
        role="tabpanel"
        aria-labelledby="tab-preview"
        hidden={activeTab !== "preview"}
      >
        {activeTab === "preview" && (
          <div
            className="flex justify-center bg-void/50 overflow-hidden transition-colors duration-200"
            style={themeStyle}
          >
            <motion.div
              className="w-full p-4 sm:p-6"
              animate={{
                maxWidth:
                  viewportSize === "tablet"
                    ? 768
                    : viewportSize === "mobile"
                      ? 375
                      : "100%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
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
            </motion.div>
          </div>
        )}
      </div>
      <div
        id="panel-code"
        role="tabpanel"
        aria-labelledby="tab-code"
        hidden={activeTab !== "code"}
      >
        {activeTab === "code" && (
          <div className="[&>div]:rounded-none [&>div]:border-0">{codeBlock}</div>
        )}
      </div>
    </div>
  );
}
