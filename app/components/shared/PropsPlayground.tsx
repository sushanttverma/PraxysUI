"use client";

import {
  useState,
  useEffect,
  useCallback,
  type ComponentType,
  type ReactNode,
} from "react";
import { RotateCcw, Clipboard, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  componentRegistry,
  type PlaygroundConfig,
  type PlaygroundPropDef,
} from "@/lib/registry";

// ─── Types ──────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropValues = Record<string, any>;

interface PropsPlaygroundProps {
  slug: string;
  playground: PlaygroundConfig;
}

// ─── Helper: get default values from controls ───────────

function getDefaultValues(controls: PlaygroundPropDef[]): PropValues {
  const values: PropValues = {};
  for (const control of controls) {
    values[control.name] = control.default;
  }
  return values;
}

// ─── Helper: generate copy-paste JSX props string ───────

function generatePropsString(
  values: PropValues,
  controls: PlaygroundPropDef[]
): string {
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

// ─── Main component ─────────────────────────────────────

export default function PropsPlayground({
  slug,
  playground,
}: PropsPlaygroundProps) {
  const { controls, defaults } = playground;

  const [values, setValues] = useState<PropValues>(() =>
    getDefaultValues(controls)
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Component, setComponent] = useState<ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);

  const entry = componentRegistry[slug];
  const registryError = !entry ? `Component "${slug}" not found.` : null;

  useEffect(() => {
    if (!entry) return;
    entry
      .component()
      .then((mod) => setComponent(() => mod.default))
      .catch(() => setError(`Failed to load component "${slug}".`));
  }, [slug, entry]);

  const displayError = registryError || error;

  const handleChange = useCallback((name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setValues(getDefaultValues(controls));
    setKey((k) => k + 1);
  }, [controls]);

  const handleCopyProps = useCallback(() => {
    const propsStr = generatePropsString(values, controls);
    const text = propsStr ? `<Component\n  ${propsStr}\n/>` : `<Component />`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }, [values, controls]);

  const componentProps = { ...defaults, ...values };
  const childrenValue = componentProps.children;
  const passProps = { ...componentProps };
  const childrenControl = controls.find((c) => c.name === "children");
  if (childrenControl) delete passProps.children;
  if (playground.specialChildrenPreset && passProps.children === null) delete passProps.children;

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-[0_4px_32px_rgba(0,0,0,0.15)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-obsidian)]/50 px-5 py-3">
        <span className="text-xs font-semibold text-[var(--color-chalk)]">Playground</span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopyProps}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-[var(--color-text-faint)] transition-colors hover:bg-[var(--color-border)]/50 hover:text-[var(--color-chalk)] cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Clipboard className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
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

      {/* Body */}
      <div className="flex flex-col lg:flex-row">
        {/* Live preview */}
        <div className="flex-1 overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-void)]/50 p-4 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="flex min-h-[220px] items-center justify-center">
            {displayError ? (
              <p className="text-sm text-[var(--color-ignite)]/70">{displayError}</p>
            ) : !Component ? (
              <div className="flex items-center gap-2 text-[var(--color-text-faint)]">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-ignite)]" />
                Loading...
              </div>
            ) : (
              <PlaygroundPreview
                key={key}
                Component={Component}
                props={passProps}
                childrenValue={childrenControl ? childrenValue : undefined}
                specialChildrenPreset={playground.specialChildrenPreset}
              />
            )}
          </div>
        </div>

        {/* Controls panel */}
        {controls.length > 0 && (
          <div className="w-full shrink-0 bg-[var(--color-obsidian)]/20 p-5 lg:w-72 xl:w-80">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-faint)]">
              Properties
            </p>
            <div className="space-y-5">
              {controls.map((control) => (
                <ControlField
                  key={control.name}
                  control={control}
                  value={values[control.name]}
                  onChange={(val) => handleChange(control.name, val)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Preview wrapper ────────────────────────────────────

function PlaygroundPreview({
  Component,
  props,
  childrenValue,
  specialChildrenPreset,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<any>;
  props: PropValues;
  childrenValue?: ReactNode;
  specialChildrenPreset?: string;
}) {
  const specialChildren = getSpecialChildren(specialChildrenPreset);
  if (specialChildren !== undefined) return <Component {...props}>{specialChildren}</Component>;
  if (childrenValue !== undefined) return <Component {...props}>{childrenValue}</Component>;
  return <Component {...props} />;
}

// ─── Special children presets ───────────────────────────

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

// ─── Control field renderer ─────────────────────────────

function ControlField({
  control,
  value,
  onChange,
}: {
  control: PlaygroundPropDef;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const labelEl = (
    <div className="mb-2 flex items-center justify-between">
      <label className="text-[11px] font-medium text-[var(--color-blush)]">
        {control.label}
      </label>
      <span className="font-mono text-[10px] text-[var(--color-text-faint)]">{control.name}</span>
    </div>
  );

  switch (control.type) {
    case "text":
      return (
        <div>
          {labelEl}
          <input
            type="text"
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-void)] px-3 py-2 text-sm text-[var(--color-chalk)] outline-none transition-colors placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-ignite)]/30"
          />
        </div>
      );

    case "number": {
      const { min, max, step } = control;
      const numVal = Number(value ?? control.default);
      const pct = min !== undefined && max !== undefined ? ((numVal - min) / (max - min)) * 100 : 50;
      return (
        <div>
          {labelEl}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-[var(--color-border)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-ignite)] to-[var(--color-blush)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={numVal}
                onChange={(e) => onChange(Number(e.target.value))}
                className="relative z-10 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white/20 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-[0_0_8px_rgba(224,78,45,0.3)] [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(224,78,45,0.3)]"
              />
            </div>
            <input
              type="number"
              min={min}
              max={max}
              step={step}
              value={numVal}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-16 rounded-lg border border-[var(--color-border)] bg-[var(--color-void)] px-2 py-1.5 text-center font-mono text-xs text-[var(--color-chalk)] outline-none focus:border-[var(--color-ignite)]/30"
            />
          </div>
        </div>
      );
    }

    case "boolean":
      return (
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-[var(--color-blush)]">
            {control.label}
            <span className="ml-1.5 font-mono text-[10px] text-[var(--color-text-faint)]">{control.name}</span>
          </span>
          <button
            role="switch"
            aria-checked={!!value}
            onClick={() => onChange(!value)}
            className={cn(
              "relative h-6 w-11 rounded-full transition-colors cursor-pointer",
              value ? "bg-[var(--color-ignite)]" : "bg-[var(--color-border)]"
            )}
          >
            <span
              className={cn(
                "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform",
                !!value && "translate-x-5"
              )}
            />
          </button>
        </div>
      );

    case "select":
      return (
        <div>
          {labelEl}
          <div className="flex flex-wrap gap-1.5">
            {control.options.map((opt) => {
              const option = typeof opt === "string" ? { label: opt, value: opt } : opt;
              const isActive = option.value === String(value);
              return (
                <button
                  key={option.value}
                  onClick={() => onChange(option.value)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all cursor-pointer",
                    isActive
                      ? "bg-[var(--color-ignite)]/10 text-[var(--color-ignite)]"
                      : "bg-[var(--color-border)]/30 text-[var(--color-text-faint)] hover:bg-[var(--color-border)]/60 hover:text-[var(--color-chalk)]"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      );

    case "color":
      return (
        <div>
          {labelEl}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-8 w-8 rounded-lg border border-[var(--color-border)]" style={{ backgroundColor: String(value ?? control.default) }} />
              <input
                type="color"
                value={toHex(String(value ?? control.default))}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
            <input
              type="text"
              value={String(value ?? "")}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-void)] px-3 py-1.5 font-mono text-xs text-[var(--color-chalk)] outline-none focus:border-[var(--color-ignite)]/30"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}

/** Best-effort conversion to #hex for the color picker */
function toHex(color: string): string {
  if (color.startsWith("#") && (color.length === 7 || color.length === 4)) return color;
  return "#E84E2D";
}
