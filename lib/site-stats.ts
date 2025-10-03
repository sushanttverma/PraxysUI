import { componentRegistry, sidebarGroups } from "./registry";

// ─── Computed stats (single source of truth) ────────────
// These are derived from actual data — add a component to
// the registry or a template to the list and counts update
// automatically everywhere across the site.

/** Number of UI components in the registry */
export const COMPONENT_COUNT = Object.keys(componentRegistry).length;

/** Number of sidebar categories (excluding "Getting Started") */
export const CATEGORY_COUNT = sidebarGroups.filter(
  (g) => g.title !== "Getting Started"
).length;

// Template count lives here since templates aren't in the registry.
// Update this when you add/remove templates.
/** Number of page templates */
export const TEMPLATE_COUNT = 14;

/** Number of tools (Animation Studio, Shadow Lab, etc.) */
export const TOOL_COUNT = 5;

// ─── Formatted strings for reuse ────────────────────────

/** e.g. "70+" */
export const COMPONENT_COUNT_LABEL = `${COMPONENT_COUNT}+`;

/** One-liner for meta descriptions */
export const SITE_DESCRIPTION = `A curated collection of ${COMPONENT_COUNT} beautifully crafted, animated React components. Browse, copy, paste, and ship.`;
