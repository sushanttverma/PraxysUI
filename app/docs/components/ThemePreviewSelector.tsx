"use client";

import { useState, useEffect, useCallback } from "react";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { themePresets, type ThemeColors } from "@/lib/theme-presets";

const STORAGE_KEY = "praxys-preview-theme";

interface ThemePreviewSelectorProps {
  onThemeChange: (colors: ThemeColors | null) => void;
}

export default function ThemePreviewSelector({
  onThemeChange,
}: ThemePreviewSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("Praxys");

  // Load saved preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const preset = themePresets.find((p) => p.name === saved);
        if (preset) {
          setSelected(saved);
          // Only emit non-default theme
          if (saved !== "Praxys") {
            onThemeChange(preset.dark);
          }
        }
      }
    } catch {
      // localStorage unavailable
    }
    // Run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = useCallback(
    (preset: (typeof themePresets)[number]) => {
      setSelected(preset.name);
      setOpen(false);

      try {
        localStorage.setItem(STORAGE_KEY, preset.name);
      } catch {
        // localStorage unavailable
      }

      // null = use default site theme (no overrides)
      onThemeChange(preset.name === "Praxys" ? null : preset.dark);
    },
    [onThemeChange]
  );

  const isCustom = selected !== "Praxys";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-7 items-center gap-1 rounded-md px-2 text-[11px] font-medium transition-colors cursor-pointer",
          isCustom
            ? "text-ignite bg-ignite/10"
            : "text-text-faint hover:text-blush"
        )}
        title="Preview theme"
      >
        <Palette className="h-3 w-3" />
        {isCustom && <span>{selected}</span>}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-lg border border-border bg-obsidian p-1.5 shadow-xl">
            <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-faint">
              Preview Theme
            </p>
            {themePresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleSelect(preset)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                  selected === preset.name
                    ? "bg-ignite/10 text-ignite"
                    : "text-blush hover:bg-void hover:text-chalk"
                )}
              >
                {/* Color swatches */}
                <div className="flex -space-x-0.5">
                  {[
                    preset.dark.ignite,
                    preset.dark.blush,
                    preset.dark.chalk,
                  ].map((color, i) => (
                    <div
                      key={i}
                      className="h-3 w-3 rounded-full border border-void"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span>{preset.name}</span>
                {preset.name === "Praxys" && (
                  <span className="ml-auto text-[10px] text-text-faint">
                    default
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
