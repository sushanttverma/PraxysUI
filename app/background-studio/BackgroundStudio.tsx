"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  ArrowLeft,
  Check,
  Code2,
  Copy,
  Download,
  Palette,
  Plus,
  RotateCcw,
  Search,
  Share2,
  Sliders,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { BACKGROUNDS as RB_BACKGROUNDS, getDefaultProps } from "@/app/components/praxys-vendor/tools/background-studio/backgrounds/index.js";

/* ─── Types ─────────────────────────────────────────────── */

type PropDef = {
  name: string;
  label: string;
  type: "number" | "boolean" | "color" | "colorArray" | "select" | "rgbArray" | "text";
  min?: number;
  max?: number;
  step?: number;
  default: unknown;
  options?: Array<string | { label: string; value: string }>;
  minItems?: number;
  maxItems?: number;
};

type BackgroundDef = {
  id: string;
  label: string;
  installCommand: string;
  component: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>;
  props?: PropDef[];
  fixedProps?: Record<string, unknown>;
  forceRemountOnPropChange?: boolean;
};

/* ─── Constants ─────────────────────────────────────────── */

const PKG_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;
const PRAXYS_CLI_SUPPORTED = new Set<string>(["silk", "aurora", "particles", "grid-motion", "orb", "liquid-chrome", "balatro", "dither", "dot-grid", "beams", "dark-veil", "light-rays", "prism", "gradient-blinds", "grainient", "pixel-blast", "liquid-ether", "color-bends", "light-pillar", "antigravity", "click-spark", "laser-flow", "ribbons", "splash-cursor"]);

function formatJsxPropValue(value: unknown) {
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "boolean") return `{${value}}`;
  if (typeof value === "number") return `{${value}}`;
  return `{${JSON.stringify(value)}}`;
}

/* ─── Glassmorphic panel base ───────────────────────────── */

const glassBase =
  "backdrop-blur-2xl bg-[#0a0a0a]/70 border border-white/[0.06] shadow-[0_8px_64px_rgba(0,0,0,0.5)]";
const glassInteractive =
  "hover:bg-white/[0.06] active:bg-white/[0.08] transition-all duration-200";

/* ─── PropControl ───────────────────────────────────────── */

function PropControl({
  prop,
  value,
  onChange,
}: {
  prop: PropDef;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
}) {
  if (prop.type === "number") {
    const numVal = Number(value);
    const min = prop.min ?? 0;
    const max = prop.max ?? 100;
    const pct = ((numVal - min) / (max - min)) * 100;
    return (
      <div className="group mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">{prop.label}</span>
          <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[11px] text-white/60">{String(value)}</span>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-ignite)] to-[var(--color-blush)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <input
            type="range"
            min={prop.min}
            max={prop.max}
            step={prop.step}
            value={numVal}
            onChange={(e) => onChange(prop.name, Number(e.target.value))}
            className="relative z-10 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white/20 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-[0_0_12px_rgba(224,78,45,0.3)] [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(224,78,45,0.3)]"
          />
        </div>
      </div>
    );
  }

  if (prop.type === "boolean") {
    const on = Boolean(value);
    return (
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">{prop.label}</span>
        <button
          onClick={() => onChange(prop.name, !on)}
          className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${on ? "bg-[var(--color-ignite)]" : "bg-white/10"}`}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${on ? "translate-x-5" : "translate-x-0"}`}
          />
        </button>
      </div>
    );
  }

  if (prop.type === "color") {
    return (
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">{prop.label}</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-white/40">{String(value)}</span>
          <div className="relative">
            <div className="h-7 w-7 rounded-lg border border-white/10" style={{ backgroundColor: String(value) }} />
            <input
              type="color"
              value={String(value)}
              onChange={(e) => onChange(prop.name, e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
        </div>
      </div>
    );
  }

  if (prop.type === "select") {
    return (
      <div className="mb-4">
        <span className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-white/40">{prop.label}</span>
        <div className="flex flex-wrap gap-1.5">
          {(prop.options ?? []).map((option) => {
            const v = typeof option === "string" ? option : option.value;
            const l = typeof option === "string" ? option : option.label;
            const active = v === String(value);
            return (
              <button
                key={v}
                onClick={() => onChange(prop.name, v)}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all duration-150 ${active ? "bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" : "text-white/40 hover:bg-white/[0.06] hover:text-white/60"}`}
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (prop.type === "text") {
    return (
      <div className="mb-4">
        <span className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-white/40">{prop.label}</span>
        <input
          type="text"
          value={String(value ?? "")}
          onChange={(e) => onChange(prop.name, e.target.value)}
          className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-white/15 focus:bg-white/[0.06]"
        />
      </div>
    );
  }

  if (prop.type === "rgbArray") {
    const rgb = Array.isArray(value) ? value : [0.5, 0.5, 0.5];
    const toHex = (n: number) => Math.round(Math.max(0, Math.min(1, n)) * 255).toString(16).padStart(2, "0");
    const hex = `#${toHex(Number(rgb[0]))}${toHex(Number(rgb[1]))}${toHex(Number(rgb[2]))}`;
    return (
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">{prop.label}</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-white/40">[{rgb.map((v) => Number(v).toFixed(2)).join(", ")}]</span>
          <div className="relative">
            <div className="h-7 w-7 rounded-lg border border-white/10" style={{ backgroundColor: hex }} />
            <input
              type="color"
              value={hex}
              onChange={(e) => {
                const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e.target.value);
                if (!m) return;
                onChange(prop.name, [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]);
              }}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
        </div>
      </div>
    );
  }

  if (prop.type === "colorArray") {
    const colors = Array.isArray(value) ? (value as string[]) : [String(value)];
    const minItems = prop.minItems ?? 1;
    const maxItems = prop.maxItems ?? 5;
    return (
      <div className="mb-4">
        <span className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-white/40">{prop.label}</span>
        <div className="flex flex-wrap gap-2">
          {colors.map((c, idx) => (
            <div key={`${prop.name}-${idx}`} className="group/color relative">
              <div className="h-8 w-8 rounded-lg border border-white/10" style={{ backgroundColor: c }}>
                <input
                  type="color"
                  value={c}
                  onChange={(e) => {
                    const next = [...colors];
                    next[idx] = e.target.value;
                    onChange(prop.name, next);
                  }}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
              {colors.length > minItems && (
                <button
                  onClick={() => onChange(prop.name, colors.filter((_, i) => i !== idx))}
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-white/60 opacity-0 transition-opacity group-hover/color:opacity-100"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              )}
            </div>
          ))}
          {colors.length < maxItems && (
            <button
              onClick={() => onChange(prop.name, [...colors, "#ffffff"])}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-dashed border-white/10 text-white/30 transition-colors hover:border-white/20 hover:text-white/50"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}

/* ─── Main Component ────────────────────────────────────── */

export default function BackgroundStudio() {
  const backgrounds = useMemo(() => RB_BACKGROUNDS as BackgroundDef[], []);

  /* State */
  const [bgId, setBgId] = useState(backgrounds.find((b) => b.id === "aurora")?.id ?? backgrounds[0]?.id ?? "silk");
  const selected = useMemo(() => backgrounds.find((b) => b.id === bgId) ?? backgrounds[0], [backgrounds, bgId]);

  const [values, setValues] = useState<Record<string, unknown>>(() => (selected ? getDefaultProps(selected) : {}));
  const [search, setSearch] = useState("");
  const [canvasBg, setCanvasBg] = useState("#060010");
  const [panelOpen, setPanelOpen] = useState(true);
  const [exportOpen, setExportOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [pkg, setPkg] = useState<(typeof PKG_MANAGERS)[number]>("pnpm");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [canvasBgOpen, setCanvasBgOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const previewRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingAnimationRef = useRef<number | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const commandRef = useRef<HTMLDivElement | null>(null);

  const [LoadedComponent, setLoadedComponent] = useState<React.ComponentType<Record<string, unknown>> | null>(null);

  /* Load component */
  useEffect(() => {
    let active = true;
    selected.component().then((mod) => {
      if (!active) return;
      setLoadedComponent(() => mod.default ?? null);
    });
    return () => { active = false; };
  }, [selected]);

  /* Keyboard shortcuts */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setCommandOpen(false);
        setExportOpen(false);
      }
      if (e.key === "\\" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPanelOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Focus search on command open */
  useEffect(() => {
    if (commandOpen) setTimeout(() => searchInputRef.current?.focus(), 100);
  }, [commandOpen]);

  /* Click outside command bar */
  useEffect(() => {
    if (!commandOpen) return;
    const handler = (e: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(e.target as Node)) setCommandOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [commandOpen]);

  /* Computed */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const sorted = [...backgrounds].sort((a, b) => a.label.localeCompare(b.label));
    return q ? sorted.filter((bg) => bg.label.toLowerCase().includes(q)) : sorted;
  }, [backgrounds, search]);

  const installCommand = useMemo(() => {
    if (!selected) return "";
    if (!PRAXYS_CLI_SUPPORTED.has(selected.id)) return "# Not in Praxys CLI yet — use Export below";
    const sub = `@praxys/ui add ${selected.id}`;
    if (pkg === "npm") return `npx ${sub}`;
    if (pkg === "yarn") return `yarn dlx ${sub}`;
    if (pkg === "bun") return `bunx ${sub}`;
    return `pnpm dlx ${sub}`;
  }, [selected, pkg]);

  const snippet = useMemo(() => {
    if (!selected) return "";
    const name = selected.label.replace(/\s+/g, "");
    const lines = (selected.props ?? []).map((p) => `    ${p.name}=${formatJsxPropValue(values[p.name])}`).join("\n");
    return `import ${name} from "@/components/${name}";\n\n<div style={{ width: '100%', height: '100vh', position: 'relative' }}>\n  <${name}${lines ? `\n${lines}\n  ` : " "}/>\n</div>`;
  }, [selected, values]);

  const componentProps = useMemo(() => {
    if (!selected) return {};
    let out = { ...values } as Record<string, unknown>;
    if (selected.fixedProps) out = { ...out, ...selected.fixedProps };
    return out;
  }, [selected, values]);

  /* Actions */
  const copy = useCallback((text: string, kind: string) => {
    navigator.clipboard.writeText(text);
    setCopied(kind);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  const changeBackground = useCallback(
    (id: string) => {
      const next = backgrounds.find((b) => b.id === id);
      if (!next) return;
      setBgId(id);
      setValues(getDefaultProps(next));
      setCommandOpen(false);
      setSearch("");
    },
    [backgrounds]
  );

  const updateProp = useCallback((name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const downloadImage = useCallback(() => {
    const sourceCanvas = previewRef.current?.querySelector("canvas");
    if (!sourceCanvas) return;
    const offscreen = document.createElement("canvas");
    offscreen.width = 1920;
    offscreen.height = 1080;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;
    requestAnimationFrame(() => {
      ctx.fillStyle = canvasBg;
      ctx.fillRect(0, 0, 1920, 1080);
      const sa = sourceCanvas.width / sourceCanvas.height;
      const ta = 16 / 9;
      let sx = 0, sy = 0, sw = sourceCanvas.width, sh = sourceCanvas.height;
      if (sa > ta) { sw = sourceCanvas.height * ta; sx = (sourceCanvas.width - sw) / 2; }
      else { sh = sourceCanvas.width / ta; sy = (sourceCanvas.height - sh) / 2; }
      ctx.drawImage(sourceCanvas, sx, sy, sw, sh, 0, 0, 1920, 1080);
      const link = document.createElement("a");
      link.download = `${bgId}-${Date.now()}.png`;
      link.href = offscreen.toDataURL("image/png");
      link.click();
    });
  }, [bgId, canvasBg]);

  const toggleRecordVideo = useCallback(() => {
    if (isRecording) {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      if (recordingTimeoutRef.current) clearTimeout(recordingTimeoutRef.current);
      if (recordingAnimationRef.current) cancelAnimationFrame(recordingAnimationRef.current);
      if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
      return;
    }
    const sourceCanvas = previewRef.current?.querySelector("canvas");
    if (!sourceCanvas) return;
    const offscreen = document.createElement("canvas");
    offscreen.width = 1920;
    offscreen.height = 1080;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;
    const sa = sourceCanvas.width / sourceCanvas.height;
    const ta = 16 / 9;
    let sx = 0, sy = 0, sw = sourceCanvas.width, sh = sourceCanvas.height;
    if (sa > ta) { sw = sourceCanvas.height * ta; sx = (sourceCanvas.width - sw) / 2; }
    else { sh = sourceCanvas.width / ta; sy = (sourceCanvas.height - sh) / 2; }
    const copyFrame = () => {
      ctx.fillStyle = canvasBg;
      ctx.fillRect(0, 0, 1920, 1080);
      ctx.drawImage(sourceCanvas, sx, sy, sw, sh, 0, 0, 1920, 1080);
      recordingAnimationRef.current = requestAnimationFrame(copyFrame);
    };
    copyFrame();
    const recorder = new MediaRecorder(offscreen.captureStream(60), { mimeType: "video/webm" });
    mediaRecorderRef.current = recorder;
    const chunks: Blob[] = [];
    recorder.ondataavailable = (ev) => { if (ev.data.size > 0) chunks.push(ev.data); };
    recorder.onstop = () => {
      if (recordingAnimationRef.current) cancelAnimationFrame(recordingAnimationRef.current);
      if (chunks.length > 0) {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${bgId}-${Date.now()}.webm`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
      setIsRecording(false);
      setRecordingProgress(0);
    };
    setIsRecording(true);
    recorder.start();
    let elapsed = 0;
    recordingIntervalRef.current = setInterval(() => { elapsed += 100; setRecordingProgress(Math.min((elapsed / 10000) * 100, 100)); }, 100);
    recordingTimeoutRef.current = setTimeout(() => {
      if (recorder.state === "recording") recorder.stop();
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    }, 10000);
  }, [bgId, canvasBg, isRecording]);

  if (!selected) return null;

  const propDefs = selected.props ?? [];

  return (
    <div className="relative h-screen w-screen overflow-hidden" style={{ backgroundColor: canvasBg }}>
      {/* ─── Full-bleed Background Preview ─── */}
      <div ref={previewRef} className="absolute inset-0">
        <Suspense fallback={<div className="flex h-full w-full items-center justify-center text-sm text-white/30">Loading...</div>}>
          {LoadedComponent ? (
            <LoadedComponent
              key={selected.forceRemountOnPropChange ? `${selected.id}-${JSON.stringify(componentProps)}` : selected.id}
              {...componentProps}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-white/30">Loading...</div>
          )}
        </Suspense>
      </div>

      {/* ─── Top Bar ─── */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-start justify-between p-4">
        {/* Back + Title */}
        <div className="pointer-events-auto flex items-center gap-3">
          <Link
            href="/components"
            className={`${glassBase} flex h-10 w-10 items-center justify-center rounded-2xl text-white/50 transition-colors hover:text-white`}
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className={`${glassBase} hidden items-center gap-2 rounded-2xl px-4 py-2.5 sm:flex`}>
            <div className="h-2 w-2 rounded-full bg-[var(--color-ignite)] shadow-[0_0_8px_var(--color-ignite)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">Praxys Studio</span>
          </div>
        </div>

        {/* Command Trigger */}
        <button
          onClick={() => setCommandOpen(true)}
          className={`${glassBase} ${glassInteractive} pointer-events-auto flex items-center gap-3 rounded-2xl px-4 py-2.5`}
        >
          <Search className="h-3.5 w-3.5 text-white/40" />
          <span className="text-sm text-white/50">{selected.label}</span>
          <kbd className="hidden rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-white/30 sm:inline">⌘K</kbd>
        </button>

        {/* Panel Toggle */}
        <button
          onClick={() => setPanelOpen((v) => !v)}
          className={`${glassBase} ${glassInteractive} pointer-events-auto flex h-10 w-10 items-center justify-center rounded-2xl text-white/50`}
        >
          <Sliders className="h-4 w-4" />
        </button>
      </div>

      {/* ─── Command Palette Overlay ─── */}
      {commandOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[15vh]">
          <div ref={commandRef} className={`${glassBase} w-full max-w-lg overflow-hidden rounded-3xl`}>
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
              <Search className="h-4 w-4 shrink-0 text-white/30" />
              <input
                ref={searchInputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search backgrounds..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
              />
              <kbd className="shrink-0 rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-white/30">ESC</kbd>
            </div>
            <div className="max-h-[320px] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-white/25">No backgrounds found</div>
              ) : (
                filtered.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => changeBackground(bg.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-150 ${
                      bg.id === bgId
                        ? "bg-white/[0.08] text-white"
                        : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                    }`}
                  >
                    <div className={`h-2 w-2 rounded-full ${bg.id === bgId ? "bg-[var(--color-ignite)] shadow-[0_0_6px_var(--color-ignite)]" : "bg-white/10"}`} />
                    <span className="text-sm font-medium">{bg.label}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Right Control Panel ─── */}
      <div
        className={`absolute right-0 top-0 z-30 h-full w-[320px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className={`${glassBase} ml-4 mt-[72px] mr-4 flex h-[calc(100%-160px)] flex-col overflow-hidden rounded-3xl`}>
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Controls</span>
            <button
              onClick={() => setPanelOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/60"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Canvas BG */}
          <div className="border-b border-white/[0.06] px-5 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="h-3.5 w-3.5 text-white/30" />
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">Canvas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-white/30">{canvasBg}</span>
                <div className="relative">
                  <div className="h-6 w-6 rounded-md border border-white/10" style={{ backgroundColor: canvasBg }} />
                  <input
                    type="color"
                    value={canvasBg}
                    onChange={(e) => setCanvasBg(e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable props */}
          <div className="flex-1 overflow-y-auto px-5 py-4 [&::-webkit-scrollbar]:hidden">
            {propDefs.length > 0 ? (
              propDefs.map((p) => <PropControl key={p.name} prop={p} value={values[p.name]} onChange={updateProp} />)
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-sm text-white/20">No configurable props</p>
              </div>
            )}
          </div>

          {/* Panel footer */}
          <div className="border-t border-white/[0.06] px-5 py-4">
            <div className="flex gap-2">
              <button
                onClick={() => setValues(getDefaultProps(selected))}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/[0.04] py-2.5 text-xs text-white/40 transition-colors hover:bg-white/[0.08] hover:text-white/60"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
              <button
                onClick={() => copy(window.location.href, "share")}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/[0.04] py-2.5 text-xs text-white/40 transition-colors hover:bg-white/[0.08] hover:text-white/60"
              >
                <Share2 className="h-3.5 w-3.5" /> {copied === "share" ? "Copied!" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Dock ─── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex items-end justify-center pb-6">
        <div className={`${glassBase} pointer-events-auto flex items-center gap-1 rounded-2xl p-1.5`}>
          {/* BG name pill */}
          <div className="mr-1 flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-ignite)] shadow-[0_0_6px_var(--color-ignite)]" />
            <span className="max-w-[120px] truncate text-[11px] font-medium text-white/60">{selected.label}</span>
          </div>

          <div className="mx-1 h-6 w-px bg-white/[0.06]" />

          {/* Download */}
          <button
            onClick={downloadImage}
            className={`${glassInteractive} flex h-10 w-10 items-center justify-center rounded-xl text-white/40`}
            title="Download PNG"
          >
            <Download className="h-4 w-4" />
          </button>

          {/* Record */}
          <button
            onClick={toggleRecordVideo}
            className={`flex h-10 items-center justify-center gap-2 rounded-xl px-3 transition-all duration-200 ${
              isRecording
                ? "bg-red-500/20 text-red-400"
                : `${glassInteractive} text-white/40`
            }`}
            title="Record 10s video"
          >
            <Video className="h-4 w-4" />
            {isRecording && <span className="text-[11px] font-mono">{Math.ceil((100 - recordingProgress) / 10)}s</span>}
          </button>

          <div className="mx-1 h-6 w-px bg-white/[0.06]" />

          {/* Canvas BG */}
          <div className="relative">
            <button
              onClick={() => setCanvasBgOpen((v) => !v)}
              className={`${glassInteractive} flex h-10 w-10 items-center justify-center rounded-xl`}
              title="Canvas background"
            >
              <div className="h-4 w-4 rounded-md border border-white/20" style={{ backgroundColor: canvasBg }} />
            </button>
            {canvasBgOpen && (
              <div className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2">
                <div className={`${glassBase} rounded-2xl p-3`}>
                  <input
                    type="color"
                    value={canvasBg}
                    onChange={(e) => setCanvasBg(e.target.value)}
                    className="h-32 w-32 cursor-pointer rounded-lg border-0 bg-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mx-1 h-6 w-px bg-white/[0.06]" />

          {/* Export */}
          <button
            onClick={() => setExportOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl bg-[var(--color-ignite)]/80 px-4 text-white transition-all duration-200 hover:bg-[var(--color-ignite)]"
          >
            <Code2 className="h-4 w-4" />
            <span className="text-xs font-semibold">Export</span>
          </button>
        </div>
      </div>

      {/* ─── Mobile Controls FAB ─── */}
      <button
        onClick={() => setPanelOpen(true)}
        className={`${glassBase} absolute bottom-20 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-2xl text-white/60 lg:hidden ${panelOpen ? "hidden" : ""}`}
      >
        <Sliders className="h-5 w-5" />
      </button>

      {/* ─── Export Modal ─── */}
      {exportOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" onClick={() => setExportOpen(false)}>
          <div
            className={`${glassBase} max-h-[85vh] w-full max-w-[640px] overflow-hidden rounded-3xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-white">Export</h2>
                <p className="mt-0.5 text-[13px] text-white/30">{selected.label}</p>
              </div>
              <button
                onClick={() => setExportOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[calc(85vh-80px)] overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden">
              {/* Install step */}
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.06] text-[11px] font-bold text-white/40">1</div>
                  <span className="text-sm font-semibold text-white/80">Install</span>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="flex gap-0 border-b border-white/[0.06]">
                    {PKG_MANAGERS.map((m) => (
                      <button
                        key={m}
                        onClick={() => setPkg(m)}
                        className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                          pkg === m ? "bg-white/[0.06] text-white" : "text-white/30 hover:text-white/50"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                  <div className="relative p-4">
                    <code className="block overflow-x-auto whitespace-nowrap pr-12 font-mono text-[13px] text-white/70">{installCommand}</code>
                    <button
                      onClick={() => copy(installCommand, "install")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-white/[0.06] p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white/60"
                    >
                      {copied === "install" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Code step */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.06] text-[11px] font-bold text-white/40">2</div>
                    <span className="text-sm font-semibold text-white/80">Use in your project</span>
                  </div>
                  <button
                    onClick={() => copy(snippet, "code")}
                    className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs text-white/40 transition-colors hover:bg-white/10 hover:text-white/60"
                  >
                    {copied === "code" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied === "code" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <pre className="overflow-x-auto whitespace-pre font-mono text-[12px] leading-relaxed text-white/60">{snippet}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Recording indicator ─── */}
      {isRecording && (
        <div className="absolute left-4 top-4 z-40 flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1.5 backdrop-blur-xl">
          <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="text-xs font-medium text-red-400">Recording</span>
          <div className="h-1 w-16 overflow-hidden rounded-full bg-red-500/20">
            <div className="h-full rounded-full bg-red-500 transition-all duration-100" style={{ width: `${recordingProgress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
