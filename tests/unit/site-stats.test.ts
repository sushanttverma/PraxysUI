import { describe, it, expect } from "vitest";
import {
  COMPONENT_COUNT,
  CATEGORY_COUNT,
  TEMPLATE_COUNT,
  TOOL_COUNT,
  COMPONENT_COUNT_LABEL,
  SITE_DESCRIPTION,
} from "@/lib/site-stats";
import { componentRegistry, sidebarGroups } from "@/lib/registry";
import { templateRegistry } from "@/lib/templates";

describe("site-stats", () => {
  it("COMPONENT_COUNT matches the registry size", () => {
    expect(COMPONENT_COUNT).toBe(Object.keys(componentRegistry).length);
    expect(COMPONENT_COUNT).toBeGreaterThan(0);
  });

  it("CATEGORY_COUNT excludes 'Getting Started'", () => {
    const expected = sidebarGroups.filter(
      (g) => g.title !== "Getting Started"
    ).length;
    expect(CATEGORY_COUNT).toBe(expected);
  });

  it("TEMPLATE_COUNT matches templateRegistry size", () => {
    expect(TEMPLATE_COUNT).toBe(Object.keys(templateRegistry).length);
    expect(TEMPLATE_COUNT).toBeGreaterThan(0);
  });

  it("TOOL_COUNT is a positive integer", () => {
    expect(TOOL_COUNT).toBeGreaterThan(0);
    expect(Number.isInteger(TOOL_COUNT)).toBe(true);
  });

  it("COMPONENT_COUNT_LABEL ends with '+'", () => {
    expect(COMPONENT_COUNT_LABEL).toBe(`${COMPONENT_COUNT}+`);
    expect(COMPONENT_COUNT_LABEL.endsWith("+")).toBe(true);
  });

  it("SITE_DESCRIPTION contains the component count", () => {
    expect(SITE_DESCRIPTION).toContain(String(COMPONENT_COUNT));
  });
});
