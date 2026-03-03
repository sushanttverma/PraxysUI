import { describe, it, expect } from "vitest";
import { templateRegistry, getTemplate, allTemplateSlugs } from "@/lib/templates";

describe("templateRegistry", () => {
  it("is not empty", () => {
    expect(Object.keys(templateRegistry).length).toBeGreaterThan(0);
  });

  it("every entry has slug, title, description, category, and components", () => {
    for (const [key, tpl] of Object.entries(templateRegistry)) {
      expect(tpl.slug).toBe(key);
      expect(tpl.title.trim()).not.toBe("");
      expect(tpl.description.trim()).not.toBe("");
      expect(tpl.category.trim()).not.toBe("");
      expect(Array.isArray(tpl.components)).toBe(true);
      expect(tpl.components.length).toBeGreaterThan(0);
    }
  });

  it("allTemplateSlugs matches the registry keys", () => {
    expect(allTemplateSlugs).toEqual(Object.keys(templateRegistry));
  });
});

describe("getTemplate()", () => {
  it("returns the correct template for a valid slug", () => {
    const first = allTemplateSlugs[0];
    const result = getTemplate(first);
    expect(result).toBeDefined();
    expect(result?.slug).toBe(first);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getTemplate("does-not-exist")).toBeUndefined();
  });
});
