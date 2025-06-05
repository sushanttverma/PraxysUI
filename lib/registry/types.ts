import type { ComponentType } from "react";

// ─── Types ───────────────────────────────────────────────

export type PropDef = {
  name: string;
  type: string;
  default: string;
  description: string;
};

export type PlaygroundPropDef = {
  name: string;
  label: string;
} & (
  | { type: "text"; default: string }
  | { type: "number"; default: number; min?: number; max?: number; step?: number }
  | { type: "boolean"; default: boolean }
  | { type: "select"; default: string; options: string[] }
  | { type: "color"; default: string }
);

export type PlaygroundConfig = {
  controls: PlaygroundPropDef[];
  /** Fixed props required by the component but not editable (e.g. complex arrays/objects) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaults?: Record<string, any>;
};

export type ComponentEntry = {
  slug: string;
  title: string;
  description: string;
  category: "buttons" | "cards" | "text" | "navigation" | "visual" | "media";
  dependencies: string[];
  code: string;
  usage: string;
  props: PropDef[];
  playground?: PlaygroundConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: () => Promise<{ default: ComponentType<any> }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  demo: () => Promise<{ default: ComponentType<any> }>;
};

export type SidebarGroup = {
  title: string;
  items: { slug: string; title: string }[];
};
