import { componentRegistry, sidebarGroups } from "./registry";
import { templateRegistry } from "./templates";

// ─── Computed stats (single source of truth) ────────────
// All counts are derived from actual data — add/remove an
// entry in its registry and the numbers update everywhere.

/** Number of UI components in the registry */
export const COMPONENT_COUNT = Object.keys(componentRegistry).length;

/** Number of sidebar categories (excluding "Getting Started") */
export const CATEGORY_COUNT = sidebarGroups.filter(
  (g) => g.title !== "Getting Started"
).length;

/** Number of page templates (auto-derived from templateRegistry) */
export const TEMPLATE_COUNT = Object.keys(templateRegistry).length;

/**
 * Number of built-in tools. Add an entry here whenever a new
 * tool page is added (Animation Studio, Shadow Lab, etc.).
 */
const toolSlugs = [
  "studio",
  "gradient-maker",
  "shadow-lab",
  "glass-generator",
  "customize",
] as const;

export const TOOL_COUNT = toolSlugs.length;

// ─── Formatted strings for reuse ────────────────────────

/** e.g. "70+" */
export const COMPONENT_COUNT_LABEL = `${COMPONENT_COUNT}+`;

/** One-liner for meta descriptions */
export const SITE_DESCRIPTION = `A curated collection of ${COMPONENT_COUNT} beautifully crafted, animated React components. Browse, copy, paste, and ship.`;
