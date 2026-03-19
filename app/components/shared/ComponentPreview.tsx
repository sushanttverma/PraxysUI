"use client";

import { useState, useCallback, useMemo, useEffect, Suspense, type ComponentType, type ReactNode } from "react";
import {
  RotateCcw,
  Code2,
  Eye,
  Clipboard,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { componentRegistry, type PlaygroundConfig, type PlaygroundPropDef } from "@/lib/registry";

/* ─── Props ──────────────────────────────────────────────── */

interface ComponentPreviewProps {
  preview: React.ReactNode;
  codeBlock?: React.ReactNode;
  slug?: string;
  playground?: PlaygroundConfig;
}

/* ─── Helpers ────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropValues = Record<string, any>;

function getDefaultValues(controls: PlaygroundPropDef[]): PropValues {
  const values: PropValues = {};
  for (const control of controls) values[control.name] = control.default;
  return values;
}

function generatePropsString(values: PropValues, controls: PlaygroundPropDef[]): string {
  return controls
    .map((c) => {
      const val = values[c.name];
      if (val === c.default) return null;
      if (c.type === "text") return `${c.name}="${val}"`;
      if (c.type === "color") return `${c.name}="${val}"`;
      if (c.type === "select") return `${c.name}="${val}"`;
      if (c.type === "number") return `${c.name}={${val}}`;
      if (c.type === "boolean") return val ? c.name : `${c.name}={false}`;
      return null;
    })
    .filter(Boolean)
    .join("\n  ");
}

function getSpecialChildren(preset: string | undefined): ReactNode | undefined {
  if (preset === "glow-card") {
    return (
      <>
        <h3 className="text-lg font-semibold text-[var(--color-chalk)]">Card Title</h3>
        <p className="mt-2 text-sm text-[var(--color-blush)]">Hover over this card to see the glow effect.</p>
      </>
    );
  }
  if (preset === "liquid-metal") {
    return <span className="font-pixel text-2xl text-[var(--color-chalk)]">Move your cursor</span>;
  }
  if (preset === "grid-items") {
    return [1, 2, 3, 4, 5, 6].map((n) => (
      <div key={n} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] p-6 text-center text-[var(--color-chalk)]">
        Item {n}
      </div>
    ));
  }
  return undefined;
}

function toHex(color: string): string {
  if (color.startsWith("#") && (color.length === 7 || color.length === 4)) return color;
  return "#E84E2D";
}

/* ─── Main Component ─────────────────────────────────────── */

export default function ComponentPreview({
  preview,
  codeBlock,
  slug,
  playground,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [replayKey, setReplayKey] = useState(0);

  /* Playground state */
  const controls = useMemo(() => playground?.controls ?? [], [playground]);
  const hasPlayground = slug && playground && controls.length > 0;
  const [propValues, setPropValues] = useState<PropValues>(() => getDefaultValues(controls));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [PlaygroundComponent, setPlaygroundComponent] = useState<ComponentType<any> | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!hasPlayground || !slug) return;
    const entry = componentRegistry[slug];
    if (!entry) return;
    entry.component().then((mod) => setPlaygroundComponent(() => mod.default)).catch(() => {});
  }, [slug, hasPlayground]);

  const handleReplay = useCallback(() => setReplayKey((k) => k + 1), []);

  const handlePropChange = useCallback((name: string, value: unknown) => {
    setPropValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setPropValues(getDefaultValues(controls));
    setReplayKey((k) => k + 1);
  }, [controls]);

  const handleCopyProps = useCallback(() => {
    const str = generatePropsString(propValues, controls);
    const text = str ? `<Component\n  ${str}\n/>` : `<Component />`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }, [propValues, controls]);

  const playgroundProps = useMemo(() => {
    if (!hasPlayground) return {};
    const merged = { ...playground?.defaults, ...propValues };
    const childrenControl = controls.find((c) => c.name === "children");
    if (childrenControl) delete merged.children;
    if (playground?.specialChildrenPreset && merged.children === null) delete merged.children;
    return merged;
  }, [propValues, playground, controls, hasPlayground]);

  const playgroundChildren = useMemo(() => {
    if (!hasPlayground) return undefined;
    const special = getSpecialChildren(playground?.specialChildrenPreset);
    if (special !== undefined) return special;
    const childrenControl = controls.find((c) => c.name === "children");
    if (childrenControl) return propValues.children;
    return undefined;
  }, [hasPlayground, playground, controls, propValues]);

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-[0_4px_32px_rgba(0,0,0,0.15)]">
      {/* ─── Tab Bar ─── */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-obsidian)]/50 px-2">
        <div role="tablist" className="flex">
          <button
            role="tab"
            aria-selected={activeTab === "preview"}
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-3 text-xs font-semibold transition-all cursor-pointer",
              activeTab === "preview"
                ? "text-[var(--color-chalk)] border-b-2 border-[var(--color-ignite)]"
                : "text-[var(--color-text-faint)] hover:text-[var(--color-blush)]"
            )}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "code"}
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-3 text-xs font-semibold transition-all cursor-pointer",
              activeTab === "code"
                ? "text-[var(--color-chalk)] border-b-2 border-[var(--color-ignite)]"
                : "text-[var(--color-text-faint)] hover:text-[var(--color-blush)]"
            )}
          >
            <Code2 className="h-3.5 w-3.5" />
            Code
          </button>
        </div>

        {activeTab === "preview" && (
          <button
            onClick={handleReplay}
            aria-label="Replay animation"
            className="mr-2 flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] text-[var(--color-text-faint)] transition-all hover:text-[var(--color-chalk)] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* ─── Preview Panel ─── */}
      <div hidden={activeTab !== "preview"}>
        {activeTab === "preview" && (
          <>
            <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden bg-[var(--color-void)]/50 p-4 sm:p-8">
              <Suspense
                fallback={
                  <div className="flex h-40 items-center justify-center text-[var(--color-text-faint)]">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-ignite)]" />
                  </div>
                }
              >
                <div key={replayKey} className="flex w-full items-center justify-center">
                  {hasPlayground && PlaygroundComponent ? (
                    playgroundChildren !== undefined ? (
                      <PlaygroundComponent {...playgroundProps}>{playgroundChildren}</PlaygroundComponent>
                    ) : (
                      <PlaygroundComponent {...playgroundProps} />
                    )
                  ) : (
                    preview
                  )}
                </div>
              </Suspense>
            </div>

            {/* Customize controls */}
            {hasPlayground && (
              <div className="border-t border-[var(--color-border)] bg-[var(--color-obsidian)]/20">
                <div className="flex items-center justify-between border-b border-[var(--color-border)]/50 px-5 py-3">
                  <span className="text-sm font-bold text-[var(--color-chalk)]">Customize</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleCopyProps}
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-[var(--color-text-faint)] transition-colors hover:bg-[var(--color-border)]/50 hover:text-[var(--color-chalk)] cursor-pointer"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Clipboard className="h-3.5 w-3.5" />}
                      {copied ? "Copied" : "Copy Props"}
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-[var(--color-text-faint)] transition-colors hover:bg-[var(--color-border)]/50 hover:text-[var(--color-chalk)] cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset
                    </button>
                  </div>
                </div>
                <div className="px-5 py-5">
                  {controls.filter((c) => c.type === "select").length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {controls.filter((c) => c.type === "select").map((control) => (
                        <SelectPills key={control.name} control={control as PlaygroundPropDef & { type: "select" }} value={propValues[control.name]} onChange={handlePropChange} />
                      ))}
                    </div>
                  )}
                  <div className="space-y-5">
                    {controls.filter((c) => c.type !== "select").map((control) => (
                      <ControlField key={control.name} control={control} value={propValues[control.name]} onChange={(val) => handlePropChange(control.name, val)} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ─── Code Panel (Install + Usage + Code) ─── */}
      <div hidden={activeTab !== "code"}>
        {activeTab === "code" && codeBlock && (
          <div className="[&>div]:rounded-none [&>div]:border-0">{codeBlock}</div>
        )}
      </div>
    </div>
  );
}

/* ─── Select Pills ───────────────────────────────────────── */

function SelectPills({ control, value, onChange }: { control: PlaygroundPropDef & { type: "select" }; value: unknown; onChange: (name: string, value: unknown) => void }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-void)]/50 px-3 py-2">
      <span className="text-[11px] font-medium text-[var(--color-text-faint)]">{control.label}:</span>
      <div className="flex gap-1">
        {control.options.map((opt) => {
          const option = typeof opt === "string" ? { label: opt, value: opt } : opt;
          const isActive = option.value === String(value);
          return (
            <button key={option.value} onClick={() => onChange(control.name, option.value)} className={cn("rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer", isActive ? "bg-[var(--color-ignite)]/15 text-[var(--color-ignite)]" : "text-[var(--color-text-faint)] hover:text-[var(--color-chalk)]")}>{option.label}</button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Control Field ──────────────────────────────────────── */

function ControlField({ control, value, onChange }: { control: PlaygroundPropDef; value: unknown; onChange: (value: unknown) => void }) {
  switch (control.type) {
    case "boolean":
      return (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--color-chalk)]">{control.label}</span>
          <button role="switch" aria-checked={!!value} onClick={() => onChange(!value)} className={cn("relative h-6 w-11 rounded-full transition-colors cursor-pointer", value ? "bg-[var(--color-ignite)]" : "bg-[var(--color-border)]")}>
            <span className={cn("absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform", !!value && "translate-x-5")} />
          </button>
        </div>
      );
    case "number": {
      const { min, max, step } = control;
      const numVal = Number(value ?? control.default);
      const pct = min !== undefined && max !== undefined ? ((numVal - min) / (max - min)) * 100 : 50;
      return (
        <div className="flex items-center gap-4">
          <span className="w-32 shrink-0 text-sm font-medium text-[var(--color-chalk)]">{control.label}</span>
          <div className="relative flex-1">
            <div className="pointer-events-none absolute top-1/2 h-[4px] w-full -translate-y-1/2 rounded-full bg-[var(--color-border)]">
              <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-ignite)] to-[var(--color-blush)]" style={{ width: `${pct}%` }} />
            </div>
            <input type="range" min={min} max={max} step={step} value={numVal} onChange={(e) => onChange(Number(e.target.value))} className="relative z-10 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[var(--color-obsidian)] [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--color-obsidian)] [&::-webkit-slider-thumb]:bg-white" />
          </div>
          <span className="w-14 text-right font-mono text-sm text-[var(--color-chalk)]">{numVal}</span>
        </div>
      );
    }
    case "text":
      return (
        <div className="flex items-center gap-4">
          <span className="w-32 shrink-0 text-sm font-medium text-[var(--color-chalk)]">{control.label}</span>
          <input type="text" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-void)] px-3 py-2 text-sm text-[var(--color-chalk)] outline-none transition-colors placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-ignite)]/30" />
        </div>
      );
    case "color":
      return (
        <div className="flex items-center gap-4">
          <span className="w-32 shrink-0 text-sm font-medium text-[var(--color-chalk)]">{control.label}</span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-8 w-8 rounded-lg border border-[var(--color-border)]" style={{ backgroundColor: String(value ?? control.default) }} />
              <input type="color" value={toHex(String(value ?? control.default))} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
            </div>
            <span className="font-mono text-xs text-[var(--color-text-faint)]">{String(value)}</span>
          </div>
        </div>
      );
    default:
      return null;
  }
}
