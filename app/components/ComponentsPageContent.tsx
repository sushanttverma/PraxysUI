"use client";

import React, { useState, useMemo, useRef, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  LayoutGrid,
  Type,
  Compass,
  Eye,
  Film,
  ArrowUpRight,
  X,
} from "lucide-react";
import { sidebarGroups, componentRegistry } from "@/lib/registry";
import type { ComponentEntry } from "@/lib/registry";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

// ─── Lazy demo cache ──────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const demoCache = new Map<string, React.LazyExoticComponent<React.ComponentType<any>>>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLazyDemo(slug: string, loader: () => Promise<{ default: React.ComponentType<any> }>) {
  if (!demoCache.has(slug)) {
    demoCache.set(slug, React.lazy(loader));
  }
  return demoCache.get(slug)!;
}

// ─── Category config ──────────────────────────────────────

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

// ─── Demo skeleton ────────────────────────────────────────

function DemoSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-ignite" />
    </div>
  );
}

// ─── Viewport-aware wrapper ───────────────────────────────

function useInView(rootMargin = "200px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}

// ─── Component card ───────────────────────────────────────

function ComponentCard({ entry }: { entry: ComponentEntry }) {
  const router = useRouter();
  const cat = categoryMap[entry.category];
  const { ref, visible } = useInView();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [LazyDemo] = useState(() => getLazyDemo(entry.slug, entry.demo as () => Promise<{ default: React.ComponentType<any> }>));

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/components/${entry.slug}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/components/${entry.slug}`);
        }
      }}
      className="card-glow group flex flex-col rounded-2xl border border-border bg-obsidian transition-all hover:border-border-light cursor-pointer"
    >
      {/* Live demo area */}
      <div className="relative h-44 overflow-hidden rounded-t-2xl border-b border-border/50 bg-void/50 p-4 flex items-center justify-center">
        {visible ? (
          <Suspense fallback={<DemoSkeleton />}>
            <div className="pointer-events-none flex items-center justify-center">
              <LazyDemo />
            </div>
          </Suspense>
        ) : (
          <DemoSkeleton />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-void/0 opacity-0 transition-all duration-300 group-hover:bg-void/40 group-hover:opacity-100 pointer-events-none">
          <ArrowUpRight className="h-5 w-5 text-chalk" />
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-chalk transition-colors group-hover:text-ignite">
            {entry.title}
          </h3>
          {cat && (
            <span
              className={`rounded-full ${cat.bg} ${cat.border} border px-2 py-0.5 text-[10px] font-medium ${cat.color}`}
            >
              {cat.label}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-xs text-text-faint line-clamp-2">
          {entry.description}
        </p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────

export default function ComponentsPageContent() {
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

  // Count per category (from all, not filtered)
  const countPerCategory = useMemo(() => {
    const map: Record<string, number> = {};
    for (const comp of allComponents) {
      map[comp.category] = (map[comp.category] || 0) + 1;
    }
    return map;
  }, [allComponents]);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-24 pb-20">
        {/* Editorial header */}
        <div className="mb-10">
          <p className="font-mono text-[10px] text-text-faint tracking-wider mb-1">
            {"// components"}
          </p>
          <div className="flex items-end gap-3">
            <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl font-bold text-chalk leading-none">
              Components
            </h1>
            <span className="rounded-full bg-ignite/10 border border-ignite/20 px-2.5 py-0.5 text-xs font-medium text-ignite mb-0.5">
              {allComponents.length}+
            </span>
          </div>
          <div className="mt-4 h-px w-full" style={{ background: 'linear-gradient(90deg, var(--color-ignite), var(--color-ignite) 30%, transparent)' }} />
        </div>

        {/* Search + filter */}
        <div className="mb-8 space-y-4">
          {/* Search bar */}
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-faint" />
            <input
              type="text"
              placeholder="Search components..."
              aria-label="Search components"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-obsidian/50 py-2.5 pl-10 pr-10 text-sm text-chalk placeholder:text-text-faint outline-none transition-colors focus:border-ignite/40 focus:bg-obsidian"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint hover:text-chalk cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
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
              const Icon = cat.icon;
              const count = countPerCategory[cat.key] || 0;
              if (count === 0) return null;
              const isActive = activeFilter === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveFilter(isActive ? null : cat.key)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? `${cat.border} ${cat.bg} ${cat.color}`
                      : "border-border text-text-faint hover:text-chalk hover:border-border-light"
                  }`}
                >
                  <Icon className="h-3 w-3" />
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((comp) => (
              <ComponentCard key={comp.slug} entry={comp} />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
