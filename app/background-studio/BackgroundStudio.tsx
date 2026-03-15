"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Info,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Share2,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { BACKGROUNDS as RB_BACKGROUNDS, getDefaultProps } from "@/app/components/praxys-vendor/tools/background-studio/backgrounds/index.js";
import { hyperspeedPresets } from "@/app/components/praxys-vendor/backgrounds/Hyperspeed/HyperSpeedPresets";

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

const PKG_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;
const PRAXYS_CLI_SUPPORTED = new Set<string>(["aurora", "particles"]);

function formatJsxPropValue(value: unknown) {
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "boolean") return `{${value}}`;
  if (typeof value === "number") return `{${value}}`;
  return `{${JSON.stringify(value)}}`;
}

export default function BackgroundStudio() {
  const backgrounds = useMemo(() => RB_BACKGROUNDS as BackgroundDef[], []);

  const [bgId, setBgId] = useState(backgrounds[0]?.id ?? "silk");
  const selected = useMemo(() => backgrounds.find((b) => b.id === bgId) ?? backgrounds[0], [backgrounds, bgId]);

  const [values, setValues] = useState<Record<string, unknown>>(() => (selected ? getDefaultProps(selected) : {}));
  const [search, setSearch] = useState("");
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [canvasBg, setCanvasBg] = useState("#060010");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [pkg, setPkg] = useState<(typeof PKG_MANAGERS)[number]>("pnpm");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);

  const previewRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingAnimationRef = useRef<number | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [LoadedComponent, setLoadedComponent] = useState<React.ComponentType<Record<string, unknown>> | null>(null);

  useEffect(() => {
    let active = true;
    selected.component().then((mod) => {
      if (!active) return;
      const fallback = (mod as unknown as { GridScan?: React.ComponentType<Record<string, unknown>> }).GridScan;
      setLoadedComponent(() => mod.default ?? fallback ?? null);
    });
    return () => {
      active = false;
    };
  }, [selected]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const sorted = [...backgrounds].sort((a, b) => a.label.localeCompare(b.label));
    return q ? sorted.filter((bg) => bg.label.toLowerCase().includes(q)) : sorted;
  }, [backgrounds, search]);

  const installCommand = useMemo(() => {
    if (!selected) return "";
    if (!PRAXYS_CLI_SUPPORTED.has(selected.id)) {
      return "# This item is not in Praxys CLI yet\n# Use 'Export for Praxys' below and copy the code";
    }
    const subcommand = `@praxys/ui add ${selected.id}`;
    if (pkg === "npm") return `npx ${subcommand}`;
    if (pkg === "yarn") return `yarn dlx ${subcommand}`;
    if (pkg === "bun") return `bunx ${subcommand}`;
    return `pnpm dlx ${subcommand}`;
  }, [selected, pkg]);

  const docsHref = useMemo(
    () => (selected && PRAXYS_CLI_SUPPORTED.has(selected.id) ? `/components/${selected.id}` : "/installation"),
    [selected]
  );

  const snippet = useMemo(() => {
    if (!selected) return "";
    const componentName = selected.label.replace(/\s+/g, "");
    const propDefs = selected.props ?? [];
    const propLines = propDefs
      .map((prop) => `    ${prop.name}=${formatJsxPropValue(values[prop.name])}`)
      .join("\n");

    return `import ${componentName} from \"@/components/${componentName}\";\n\n<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>\n  <${componentName}${propLines ? `\n${propLines}\n  ` : " "}/>\n</div>`;
  }, [selected, values]);

  const componentProps = useMemo(() => {
    if (!selected) return {};
    let out = { ...values } as Record<string, unknown>;
    if (selected.fixedProps) out = { ...out, ...selected.fixedProps };
    if (selected.id === "hyperspeed" && typeof out.preset === "string") {
      const preset = String(out.preset);
      delete out.preset;
      out.effectOptions = (hyperspeedPresets as Record<string, unknown>)[preset] ?? hyperspeedPresets.one;
    }
    return out;
  }, [selected, values]);

  const copy = (text: string, kind: string) => {
    navigator.clipboard.writeText(text);
    setCopied(kind);
    setTimeout(() => setCopied(null), 1200);
  };

  const changeBackground = (id: string) => {
    const next = backgrounds.find((b) => b.id === id);
    if (!next) return;
    setBgId(id);
    setValues(getDefaultProps(next));
    setSelectorOpen(false);
  };

  const updateProp = (name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const downloadImage = () => {
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
      const sourceAspect = sourceCanvas.width / sourceCanvas.height;
      const targetAspect = 16 / 9;
      let sx = 0;
      let sy = 0;
      let sw = sourceCanvas.width;
      let sh = sourceCanvas.height;
      if (sourceAspect > targetAspect) {
        sw = sourceCanvas.height * targetAspect;
        sx = (sourceCanvas.width - sw) / 2;
      } else {
        sh = sourceCanvas.width / targetAspect;
        sy = (sourceCanvas.height - sh) / 2;
      }
      ctx.drawImage(sourceCanvas, sx, sy, sw, sh, 0, 0, 1920, 1080);
      const link = document.createElement("a");
      link.download = `${bgId}-${Date.now()}.png`;
      link.href = offscreen.toDataURL("image/png");
      link.click();
    });
  };

  const toggleRecordVideo = () => {
    if (isRecording) {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      if (recordingTimeoutRef.current) clearTimeout(recordingTimeoutRef.current);
      if (recordingAnimationRef.current) cancelAnimationFrame(recordingAnimationRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") mediaRecorderRef.current.stop();
      return;
    }

    const sourceCanvas = previewRef.current?.querySelector("canvas");
    if (!sourceCanvas) return;

    const offscreen = document.createElement("canvas");
    offscreen.width = 1920;
    offscreen.height = 1080;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    const sourceAspect = sourceCanvas.width / sourceCanvas.height;
    const targetAspect = 16 / 9;
    let sx = 0;
    let sy = 0;
    let sw = sourceCanvas.width;
    let sh = sourceCanvas.height;
    if (sourceAspect > targetAspect) {
      sw = sourceCanvas.height * targetAspect;
      sx = (sourceCanvas.width - sw) / 2;
    } else {
      sh = sourceCanvas.width / targetAspect;
      sy = (sourceCanvas.height - sh) / 2;
    }

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

    recorder.ondataavailable = (ev) => {
      if (ev.data.size > 0) chunks.push(ev.data);
    };

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
    recordingIntervalRef.current = setInterval(() => {
      elapsed += 100;
      setRecordingProgress(Math.min((elapsed / 10000) * 100, 100));
    }, 100);

    recordingTimeoutRef.current = setTimeout(() => {
      if (recorder.state === "recording") recorder.stop();
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    }, 10000);
  };

  const renderControl = (prop: PropDef) => {
    const value = values[prop.name];

    if (prop.type === "number") {
      return (
        <div className="mb-5" key={prop.name}>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs text-[var(--color-blush)]">{prop.label}</label>
            <span className="font-mono text-[11px] text-[var(--color-blush)]">{String(value)}</span>
          </div>
          <input type="range" min={prop.min} max={prop.max} step={prop.step} value={Number(value)} onChange={(e) => updateProp(prop.name, Number(e.target.value))} className="w-full accent-[var(--color-ignite)]" />
        </div>
      );
    }

    if (prop.type === "boolean") {
      return (
        <div className="mb-4" key={prop.name}>
          <label className="mb-1.5 block text-xs text-[var(--color-blush)]">{prop.label}</label>
          <button onClick={() => updateProp(prop.name, !Boolean(value))} className={`rounded-md border px-3 py-1.5 text-xs ${Boolean(value) ? "border-[var(--color-ignite)] bg-[var(--color-void)] text-white" : "border-[var(--color-border)] text-[var(--color-blush)]"}`}>
            {Boolean(value) ? "On" : "Off"}
          </button>
        </div>
      );
    }

    if (prop.type === "color") {
      return (
        <div className="mb-4" key={prop.name}>
          <label className="mb-1.5 block text-xs text-[var(--color-blush)]">{prop.label}</label>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--color-blush)]">{String(value)}</span>
            <input type="color" value={String(value)} onChange={(e) => updateProp(prop.name, e.target.value)} className="h-8 w-10 rounded border border-[var(--color-border)] bg-transparent" />
          </div>
        </div>
      );
    }

    if (prop.type === "select") {
      return (
        <div className="mb-4" key={prop.name}>
          <label className="mb-1.5 block text-xs text-[var(--color-blush)]">{prop.label}</label>
          <select value={String(value)} onChange={(e) => updateProp(prop.name, e.target.value)} className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-void)] px-3 py-2 text-sm text-white">
            {(prop.options ?? []).map((option) => {
              const v = typeof option === "string" ? option : option.value;
              const l = typeof option === "string" ? option : option.label;
              return (
                <option value={v} key={v}>
                  {l}
                </option>
              );
            })}
          </select>
        </div>
      );
    }

    if (prop.type === "text") {
      return (
        <div className="mb-4" key={prop.name}>
          <label className="mb-1.5 block text-xs text-[var(--color-blush)]">{prop.label}</label>
          <input type="text" value={String(value ?? "")} onChange={(e) => updateProp(prop.name, e.target.value)} className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-void)] px-3 py-2 text-sm text-white" />
        </div>
      );
    }

    if (prop.type === "rgbArray") {
      const rgb = Array.isArray(value) ? value : [0.5, 0.5, 0.5];
      const toHex = (n: number) => Math.round(Math.max(0, Math.min(1, n)) * 255).toString(16).padStart(2, "0");
      const hex = `#${toHex(Number(rgb[0]))}${toHex(Number(rgb[1]))}${toHex(Number(rgb[2]))}`;
      return (
        <div className="mb-4" key={prop.name}>
          <label className="mb-1.5 block text-xs text-[var(--color-blush)]">{prop.label}</label>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--color-blush)]">[{rgb.map((v) => Number(v).toFixed(2)).join(", ")}]</span>
            <input
              type="color"
              value={hex}
              onChange={(e) => {
                const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e.target.value);
                if (!m) return;
                updateProp(prop.name, [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]);
              }}
              className="h-8 w-10 rounded border border-[var(--color-border)] bg-transparent"
            />
          </div>
        </div>
      );
    }

    if (prop.type === "colorArray") {
      const colors = Array.isArray(value) ? (value as string[]) : [String(value)];
      const minItems = prop.minItems ?? 1;
      const maxItems = prop.maxItems ?? 5;
      return (
        <div className="mb-4" key={prop.name}>
          <label className="mb-1.5 block text-xs text-[var(--color-blush)]">{prop.label}</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((c, idx) => (
              <div key={`${prop.name}-${idx}`} className="relative h-8 w-8 rounded-md border-2 border-[var(--color-border)]" style={{ backgroundColor: c }}>
                <input
                  type="color"
                  value={c}
                  onChange={(e) => {
                    const next = [...colors];
                    next[idx] = e.target.value;
                    updateProp(prop.name, next);
                  }}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                {colors.length > minItems && (
                  <button
                    onClick={() => updateProp(prop.name, colors.filter((_, i) => i !== idx))}
                    className="absolute -right-1.5 -top-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-void)] p-0.5 text-[var(--color-blush)]"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                )}
              </div>
            ))}
            {colors.length < maxItems && (
              <button
                onClick={() => updateProp(prop.name, [...colors, "#ffffff"])}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border-2 border-dashed border-[var(--color-border-light)] text-[var(--color-blush)] hover:border-[var(--color-ignite)]"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  if (!selected) return null;

  return (
    <main className="flex h-screen w-screen flex-col px-3 pb-3 pt-2 lg:px-4">
      <div className="mb-3 flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] px-3 py-2">
        <Link
          href="/components"
          className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-ignite)] bg-[var(--color-ignite)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--color-ignite)] transition-colors hover:bg-[var(--color-ignite)] hover:text-[var(--color-void)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Components
        </Link>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-blush)]">Praxys Studio</p>
      </div>

      <div className="mb-3 hidden rounded-md border border-[var(--color-border-light)] bg-[linear-gradient(90deg,var(--color-ignite),var(--color-blush))] py-1.5 text-center text-[11px] font-medium text-[var(--color-void)] lg:block">
        Praxys Background Studio: tune motion backgrounds for your UI in seconds.
      </div>

      <div className="relative flex min-h-0 flex-1 w-full gap-0 overflow-hidden lg:gap-4">
        <aside className="hidden h-full w-[300px] shrink-0 flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] p-3 lg:flex">
          <div className="mb-4 rounded-xl border border-[var(--color-border-light)] bg-[#100a1d] p-1.5">
            <button className="flex w-full items-center justify-between rounded-lg border border-[var(--color-ignite)] bg-[var(--color-void)] px-3 py-2 text-sm font-semibold text-white">
              <span>Praxys Background Studio</span>
              <span className="rounded bg-[#2a1748] px-1.5 text-[10px] text-[var(--color-blush)]">Praxys</span>
            </button>
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-blush)]">Background</p>
          <div className="relative mb-4">
            <button onClick={() => setSelectorOpen((v) => !v)} className="flex w-full items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-void)] px-3 py-2.5 text-sm text-white">
              <span>{selected.label}</span>
              <ChevronDown className={`h-4 w-4 text-[var(--color-blush)] transition-transform ${selectorOpen ? "rotate-180" : "rotate-0"}`} />
            </button>

            <div className={`absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] transition-all ${selectorOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
              <div className="border-b border-[var(--color-border)] p-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--color-blush)]" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search backgrounds..." className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-void)] py-2 pl-8 pr-2 text-xs text-white outline-none" />
                </div>
              </div>
              <div className="max-h-[240px] overflow-y-auto p-1.5">
                {filtered.map((bg) => (
                  <button key={bg.id} onClick={() => changeBackground(bg.id)} className={`mb-1 w-full rounded-md px-3 py-2 text-left text-sm ${bg.id === bgId ? "bg-[var(--color-void)] text-white" : "text-[var(--color-blush)] hover:bg-[var(--color-void)]"}`}>
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <p className="text-sm text-white">Canvas BG</p>
              <Info className="h-3.5 w-3.5 text-[var(--color-blush)]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[var(--color-blush)]">{canvasBg}</span>
              <input type="color" value={canvasBg} onChange={(e) => setCanvasBg(e.target.value)} className="h-7 w-7 rounded border border-[var(--color-border)] bg-transparent" />
            </div>
          </div>

          <div className="mb-4 h-px bg-[var(--color-border)]" />
          <div className="flex-1 overflow-y-auto pr-1">{(selected.props ?? []).map(renderControl)}</div>

          <div className="mt-4 border-t border-[var(--color-border)] pt-4">
            <div className="mb-2 flex gap-2">
              <button onClick={() => setValues(getDefaultProps(selected))} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-void)] px-3 py-2 text-xs text-[var(--color-blush)] hover:border-[var(--color-border-light)]">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
              <button onClick={() => copy(window.location.href, "share")} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-void)] px-3 py-2 text-xs text-[var(--color-blush)] hover:border-[var(--color-border-light)]">
                <Share2 className="h-3.5 w-3.5" /> {copied === "share" ? "Copied" : "Share"}
              </button>
            </div>

            <Link href={docsHref} className="mb-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-void)] px-3 py-2 text-xs text-[var(--color-blush)] hover:border-[var(--color-border-light)]">
              <ExternalLink className="h-3.5 w-3.5" /> {PRAXYS_CLI_SUPPORTED.has(selected.id) ? "Open Component Reference" : "Open Installation Guide"}
            </Link>

            <button onClick={() => setExportOpen(true)} className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--color-ignite)] px-3 py-2.5 text-xs font-semibold text-white hover:bg-[var(--color-blush)] hover:text-[var(--color-void)]">
              <Code2 className="h-4 w-4" /> Export for Praxys
            </button>
          </div>
        </aside>

        <section ref={previewRef} className="relative h-full w-full flex-1 overflow-hidden rounded-xl border border-[var(--color-border)]" style={{ backgroundColor: canvasBg }}>
          <Suspense fallback={<div className="flex h-full w-full items-center justify-center text-sm text-[var(--color-blush)]">Loading background...</div>}>
            {LoadedComponent ? (
              <LoadedComponent
                key={selected.forceRemountOnPropChange ? `${selected.id}-${JSON.stringify(componentProps)}` : selected.id}
                {...componentProps}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-[var(--color-blush)]">Loading background...</div>
            )}
          </Suspense>

          <div className="absolute left-4 top-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-obsidian)]/90 px-3 py-1.5 text-xs font-medium text-[var(--color-blush)]">{selected.label}</div>

          <div className="absolute bottom-4 left-4 z-10 hidden gap-2 lg:flex">
            <button onClick={downloadImage} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-obsidian)]/90 px-3 py-2 text-xs text-[var(--color-blush)] hover:bg-[var(--color-void)]">
              <Download className="h-3.5 w-3.5" /> Image
            </button>
            <button onClick={toggleRecordVideo} className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs ${isRecording ? "border-[var(--color-ignite)] bg-[var(--color-ignite)]/20 text-[var(--color-ignite)]" : "border-[var(--color-border)] bg-[var(--color-obsidian)]/90 text-[var(--color-blush)]"}`}>
              <Video className="h-3.5 w-3.5" /> {isRecording ? `${Math.ceil((100 - recordingProgress) / 10)}s` : "10s Video"}
            </button>
          </div>

          <button onClick={() => setMobileOpen(true)} className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl bg-[var(--color-ignite)] px-4 py-2.5 text-sm font-semibold text-[var(--color-void)] shadow-[0_6px_24px_rgba(232,78,45,0.35)] lg:hidden">
            <Settings className="h-4 w-4" /> Controls
          </button>
        </section>
      </div>

      {mobileOpen && (
        <>
          <button className="fixed inset-0 z-40 bg-black/60" onClick={() => setMobileOpen(false)} aria-label="Close controls" />
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-hidden rounded-t-3xl border-t border-[var(--color-border)] bg-[var(--color-obsidian)]">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <p className="text-sm font-semibold text-white">Controls</p>
              <button onClick={() => setMobileOpen(false)} className="rounded-md border border-[var(--color-border)] bg-[var(--color-void)] p-1.5 text-[var(--color-blush)]"><X className="h-4 w-4" /></button>
            </div>
            <div className="max-h-[72vh] overflow-y-auto p-4">{(selected.props ?? []).map(renderControl)}</div>
          </div>
        </>
      )}

      {exportOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={() => setExportOpen(false)}>
          <div className="max-h-[80vh] w-full max-w-[700px] overflow-y-auto rounded-[28px] border border-[var(--color-border)] bg-[var(--color-obsidian)] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-lg font-bold text-white">Export for Praxys</p>
              <button onClick={() => setExportOpen(false)} className="rounded-md p-1.5 text-[var(--color-blush)] hover:bg-[var(--color-void)]"><X className="h-5 w-5" /></button>
            </div>

            <p className="mb-3 text-sm font-semibold text-white">Step 1: Install in your project</p>
            <div className="mb-6 rounded-2xl border border-[var(--color-border-light)]">
              <div className="flex gap-4 border-b border-[var(--color-border-light)] bg-[var(--color-void)] px-4 pt-3">{PKG_MANAGERS.map((m) => <button key={m} onClick={() => setPkg(m)} className={`pb-2 text-sm ${pkg === m ? "text-[var(--color-blush)]" : "text-[#8b7aa7]"}`}>{m}</button>)}</div>
              <div className="relative p-4">
                <code className="block overflow-x-auto whitespace-nowrap pr-12 font-mono text-sm text-white">{installCommand}</code>
                <button onClick={() => copy(installCommand, "install")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-[var(--color-border-light)] bg-[var(--color-void)] p-2 text-[var(--color-chalk)]">{copied === "install" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</button>
              </div>
            </div>

            <p className="mb-3 text-sm font-semibold text-white">Step 2: Copy component code</p>
            <div className="rounded-2xl border border-[var(--color-border-light)] bg-[#090412] p-4"><pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs text-[#d7cff1]">{snippet}</pre></div>
          </div>
        </div>
      )}
    </main>
  );
}

