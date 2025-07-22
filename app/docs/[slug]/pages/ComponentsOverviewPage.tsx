"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Sparkles, LayoutGrid, Type, Compass, Eye, Film, ArrowRight } from "lucide-react";
import { sidebarGroups, componentRegistry } from "@/lib/registry";

// ─── Category config ─────────────────────────────────────

const categories = [
  {
    key: "buttons",
    label: "Buttons",
    icon: Sparkles,
    color: "text-ignite",
    bg: "bg-ignite/10",
    border: "border-ignite/20",
    description: "Interactive buttons with animations and effects",
  },
  {
    key: "cards",
    label: "Cards & Layout",
    icon: LayoutGrid,
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/20",
    description: "Cards, grids, and layout primitives",
  },
  {
    key: "text",
    label: "Text Effects",
    icon: Type,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    description: "Animated typography and text transitions",
  },
  {
    key: "navigation",
    label: "Navigation",
    icon: Compass,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    description: "Navbars, menus, tabs, and wayfinding",
  },
  {
    key: "visual",
    label: "Visual Effects",
    icon: Eye,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
    description: "Backgrounds, loaders, cursors, and visual flair",
  },
  {
    key: "media",
    label: "Media & Content",
    icon: Film,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
    description: "Heroes, avatars, sliders, and rich content",
  },
];

const categoryMap = Object.fromEntries(categories.map((c) => [c.key, c]));

// ─── Component ───────────────────────────────────────────

export default function ComponentsOverviewPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Get all component entries in sidebar order
  const allComponents = useMemo(() => {
    const componentsGroup = sidebarGroups.find((g) => g.title === "Components");
    const slugs = componentsGroup
      ? componentsGroup.items
          .filter((item) => item.slug !== "components-overview")
          .map((item) => item.slug)
      : [];
    return slugs.map((slug) => componentRegistry[slug]).filter(Boolean);
  }, []);

  // Filter components
  const filtered = useMemo(() => {
    return allComponents.filter((comp) => {
      const matchesSearch =
        !search ||
        comp.title.toLowerCase().includes(search.toLowerCase()) ||
        comp.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = !activeFilter || comp.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [allComponents, search, activeFilter]);

  // Group by category
  const grouped = useMemo(() => {
    const map: Record<string, typeof filtered> = {};
    for (const comp of filtered) {
      if (!map[comp.category]) map[comp.category] = [];
      map[comp.category].push(comp);
    }
    return map;
  }, [filtered]);

  // Count per category (from all, not filtered)
  const countPerCategory = useMemo(() => {
    const map: Record<string, number> = {};
    for (const comp of allComponents) {
      map[comp.category] = (map[comp.category] || 0) + 1;
    }
    return map;
  }, [allComponents]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <p className="mb-2 font-pixel text-xs uppercase tracking-wider text-ignite">
          Components
        </p>
        <h1 className="font-pixel text-3xl font-bold text-chalk">
          Components Overview
        </h1>
        <p className="mt-3 text-lg text-blush">
          Explore {allComponents.length} animated React components across{" "}
          {categories.length} categories. Click any component to see a live
          preview, code, and props.
        </p>
      </div>

      {/* Search + filter */}
      <div className="space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-faint" />
          <input
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-obsidian/50 py-2.5 pl-10 pr-4 text-sm text-chalk placeholder:text-text-faint outline-none transition-colors focus:border-ignite/40 focus:bg-obsidian"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-text-faint hover:text-chalk cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter(null)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              activeFilter === null
                ? "border-ignite/30 bg-ignite/10 text-ignite"
                : "border-border text-text-faint hover:text-chalk hover:border-border-light"
            }`}
          >
            All ({allComponents.length})
          </button>
          {categories.map((cat) => {
            const count = countPerCategory[cat.key] || 0;
            if (count === 0) return null;
            const isActive = activeFilter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(isActive ? null : cat.key)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? `${cat.border} ${cat.bg} ${cat.color}`
                    : "border-border text-text-faint hover:text-chalk hover:border-border-light"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-obsidian/50 py-16 text-center">
          <p className="text-sm text-text-faint">
            No components match &ldquo;{search}&rdquo;
            {activeFilter && ` in ${categoryMap[activeFilter]?.label}`}.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveFilter(null);
            }}
            className="mt-3 text-sm text-ignite hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {categories.map((cat) => {
            const comps = grouped[cat.key];
            if (!comps || comps.length === 0) return null;
            const Icon = cat.icon;

            return (
              <section key={cat.key}>
                {/* Category header */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${cat.bg} ${cat.border} border`}
                  >
                    <Icon className={`h-4 w-4 ${cat.color}`} />
                  </div>
                  <div>
                    <h2 className="font-pixel text-lg font-semibold text-chalk">
                      {cat.label}
                    </h2>
                    <p className="text-xs text-text-faint">{cat.description}</p>
                  </div>
                  <span className="ml-auto font-mono text-xs text-text-faint">
                    {comps.length}
                  </span>
                </div>

                {/* Component cards */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {comps.map((comp) => (
                    <Link
                      key={comp.slug}
                      href={`/docs/${comp.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-border bg-obsidian/30 px-4 py-3.5 transition-all hover:border-border-light hover:bg-obsidian"
                    >
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-chalk transition-colors group-hover:text-ignite">
                          {comp.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-text-faint line-clamp-1">
                          {comp.description}
                        </p>
                      </div>
                      <ArrowRight className="ml-3 h-3.5 w-3.5 shrink-0 text-text-faint opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-ignite" />
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
