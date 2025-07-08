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
      if (val === c.default) return null; // skip defaults
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
  const [key, setKey] = useState(0); // force remount on reset

  // Load actual component
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

  const handleChange = useCallback(
    (name: string, value: unknown) => {
      setValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

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
    });
  }, [values, controls]);

  // Merge fixed defaults + control values for the component
  const componentProps = { ...defaults, ...values };

  // For components that need children as a playground prop, extract it
  const childrenValue = componentProps.children;
  const passProps = { ...componentProps };
  // If children is a string from controls, pass it as children separately
  const childrenControl = controls.find((c) => c.name === "children");
  if (childrenControl) {
    delete passProps.children;
  }

  // Special handling: glow-border-card needs children content
  if (slug === "glow-border-card" && passProps.children === null) {
    delete passProps.children;
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-obsidian/50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ignite"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <span className="text-sm font-medium text-chalk">Playground</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyProps}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-blush transition-colors hover:bg-ignite/10 hover:text-chalk cursor-pointer"
            title="Copy props"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-400" />
            ) : (
              <Clipboard className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-blush transition-colors hover:bg-ignite/10 hover:text-chalk cursor-pointer"
            title="Reset to defaults"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Body: Preview + Controls */}
      <div className="flex flex-col lg:flex-row">
        {/* Live preview */}
        <div className="flex-1 border-b lg:border-b-0 lg:border-r border-border bg-void/50 p-4 sm:p-6 overflow-hidden">
          <div className="flex min-h-[200px] items-center justify-center">
            {displayError ? (
              <p className="text-sm text-ignite/70">{displayError}</p>
            ) : !Component ? (
              <div className="flex items-center gap-2 text-text-faint">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-ignite/30 border-t-ignite" />
                Loading...
              </div>
            ) : (
              <PlaygroundPreview
                key={key}
                Component={Component}
                props={passProps}
                childrenValue={childrenControl ? childrenValue : undefined}
                slug={slug}
              />
            )}
          </div>
        </div>

        {/* Controls panel */}
        {controls.length > 0 && (
          <div className="w-full lg:w-72 xl:w-80 shrink-0 bg-obsidian/30 p-4">
            <p className="mb-3 font-pixel text-xs uppercase tracking-wider text-text-faint">
              Properties
            </p>
            <div className="space-y-4">
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

// ─── Preview wrapper (handles error boundary) ───────────

function PlaygroundPreview({
  Component,
  props,
  childrenValue,
  slug,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<any>;
  props: PropValues;
  childrenValue?: ReactNode;
  slug: string;
}) {
  // Special wrapper content for certain components
  const specialChildren = getSpecialChildren(slug);

  if (specialChildren !== undefined) {
    return <Component {...props}>{specialChildren}</Component>;
  }

  if (childrenValue !== undefined) {
    return <Component {...props}>{childrenValue}</Component>;
  }

  return <Component {...props} />;
}

// ─── Special children for components that need it ───────

function getSpecialChildren(
  slug: string
): ReactNode | undefined {
  if (slug === "glow-border-card") {
    return (
      <>
        <h3 className="text-lg font-semibold text-chalk">Card Title</h3>
        <p className="mt-2 text-sm text-blush">
          Hover over this card to see the glow effect.
        </p>
      </>
    );
  }

  if (slug === "liquid-metal") {
    return (
      <span className="font-pixel text-2xl text-chalk">Move your cursor</span>
    );
  }

  if (slug === "staggered-grid" || slug === "perspective-grid") {
    return [1, 2, 3, 4, 5, 6].map((n) => (
      <div
        key={n}
        className="rounded-lg border border-border bg-obsidian p-6 text-center text-chalk"
      >
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
    <label className="block text-xs font-medium text-blush mb-1.5">
      {control.label}
      <span className="ml-1 text-text-faint">({control.name})</span>
    </label>
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
            className="w-full rounded-lg border border-border bg-void px-3 py-1.5 text-sm text-chalk placeholder:text-text-faint focus:border-ignite/50 focus:outline-none focus:ring-1 focus:ring-ignite/25"
          />
        </div>
      );

    case "number": {
      const { min, max, step } = control;
      return (
        <div>
          {labelEl}
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={Number(value ?? control.default)}
              onChange={(e) => onChange(Number(e.target.value))}
              className="flex-1 accent-ignite cursor-pointer"
            />
            <input
              type="number"
              min={min}
              max={max}
              step={step}
              value={Number(value ?? control.default)}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-16 rounded-md border border-border bg-void px-2 py-1 text-center text-xs text-chalk focus:border-ignite/50 focus:outline-none"
            />
          </div>
        </div>
      );
    }

    case "boolean":
      return (
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-blush">
            {control.label}
            <span className="ml-1 text-text-faint">({control.name})</span>
          </span>
          <button
            onClick={() => onChange(!value)}
            className={cn(
              "relative h-5 w-9 rounded-full transition-colors cursor-pointer",
              value ? "bg-ignite" : "bg-border"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-chalk transition-transform",
                !!value && "translate-x-4"
              )}
            />
          </button>
        </div>
      );

    case "select":
      return (
        <div>
          {labelEl}
          <select
            value={String(value ?? control.default)}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-void px-3 py-1.5 text-sm text-chalk focus:border-ignite/50 focus:outline-none focus:ring-1 focus:ring-ignite/25 cursor-pointer"
          >
            {control.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );

    case "color":
      return (
        <div>
          {labelEl}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={toHex(String(value ?? control.default))}
              onChange={(e) => onChange(e.target.value)}
              className="h-8 w-8 shrink-0 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
            />
            <input
              type="text"
              value={String(value ?? "")}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 rounded-lg border border-border bg-void px-3 py-1.5 text-xs text-chalk font-mono placeholder:text-text-faint focus:border-ignite/50 focus:outline-none"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}

// ─── Color helper ───────────────────────────────────────

/** Best-effort conversion to #hex for the color picker */
function toHex(color: string): string {
  if (color.startsWith("#") && (color.length === 7 || color.length === 4)) {
    return color;
  }
  // For rgba/var values, fall back to a neutral
  return "#E84E2D";
}
