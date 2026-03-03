import { describe, it, expect } from "vitest";
import { componentRegistry, sidebarGroups } from "@/lib/registry";
import type { ComponentEntry } from "@/lib/registry";

const VALID_CATEGORIES = new Set([
  "buttons",
  "cards",
  "text",
  "navigation",
  "visual",
  "media",
]);

describe("componentRegistry", () => {
  const entries = Object.values(componentRegistry) as ComponentEntry[];

  it("is not empty", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it("every entry has a non-empty slug", () => {
    for (const entry of entries) {
      expect(entry.slug).toBeTruthy();
      expect(typeof entry.slug).toBe("string");
    }
  });

  it("every slug matches its registry key", () => {
    for (const [key, entry] of Object.entries(componentRegistry)) {
      expect((entry as ComponentEntry).slug).toBe(key);
    }
  });

  it("every entry has a non-empty title and description", () => {
    for (const entry of entries) {
      expect(entry.title.trim()).not.toBe("");
      expect(entry.description.trim()).not.toBe("");
    }
  });

  it("every entry belongs to a valid category", () => {
    for (const entry of entries) {
      expect(VALID_CATEGORIES.has(entry.category)).toBe(true);
    }
  });

  it("every entry has an array of dependencies", () => {
    for (const entry of entries) {
      expect(Array.isArray(entry.dependencies)).toBe(true);
    }
  });

  it("every entry has non-empty code and usage strings", () => {
    for (const entry of entries) {
      expect(typeof entry.code).toBe("string");
      expect(entry.code.trim().length).toBeGreaterThan(0);
      expect(typeof entry.usage).toBe("string");
      expect(entry.usage.trim().length).toBeGreaterThan(0);
    }
  });

  it("every entry has component and demo loader functions", () => {
    for (const entry of entries) {
      expect(typeof entry.component).toBe("function");
      expect(typeof entry.demo).toBe("function");
    }
  });

  it("every entry has a props array", () => {
    for (const entry of entries) {
      expect(Array.isArray(entry.props)).toBe(true);
    }
  });

  it("playground controls have required fields when present", () => {
    for (const entry of entries) {
      if (!entry.playground) continue;
      for (const control of entry.playground.controls) {
        expect(control.name.trim()).not.toBe("");
        expect(control.label.trim()).not.toBe("");
        expect(["text", "number", "boolean", "select", "color"]).toContain(
          control.type
        );
      }
    }
  });

  it("specialChildrenPreset is a known preset value when set", () => {
    const VALID_PRESETS = new Set(["glow-card", "liquid-metal", "grid-items"]);
    for (const entry of entries) {
      const preset = entry.playground?.specialChildrenPreset;
      if (preset !== undefined) {
        expect(VALID_PRESETS.has(preset)).toBe(true);
      }
    }
  });
});

describe("sidebarGroups", () => {
  it("is not empty", () => {
    expect(sidebarGroups.length).toBeGreaterThan(0);
  });

  it("every group has a title and items array", () => {
    for (const group of sidebarGroups) {
      expect(group.title.trim()).not.toBe("");
      expect(Array.isArray(group.items)).toBe(true);
    }
  });

  it("every sidebar item slug in Components groups resolves in the registry", () => {
    // Skip 'Getting Started' — those are doc page slugs, not component registry slugs
    const componentGroups = sidebarGroups.filter(
      (g) => g.title !== "Getting Started"
    );
    for (const group of componentGroups) {
      for (const item of group.items) {
        // Skip the 'Overview' pseudo-entry that lives at the top of the Components group
        if (item.slug === "components-overview") continue;
        expect(componentRegistry[item.slug]).toBeDefined();
      }
    }
  });
});
