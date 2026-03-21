"use client";

import React, { useState, useMemo, useRef, useEffect, Suspense, useCallback } from "react";
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
  Command,
  Rows3,
  Grid3X3,
} from "lucide-react";
import { sidebarGroups, componentRegistry } from "@/lib/registry";
import type { ComponentEntry } from "@/lib/registry";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import DemoErrorBoundary from "./shared/DemoErrorBoundary";

/* ─── Lazy demo cache ─────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const demoCache = new Map<string, React.LazyExoticComponent<React.ComponentType<any>>>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLazyDemo(slug: string, loader: () => Promise<{ default: React.ComponentType<any> }>) {
  if (!demoCache.has(slug)) {
    demoCache.set(slug, React.lazy(loader));
  }
  return demoCache.get(slug)!;
}

/* ─── Categories ──────────────────────────────────────────── */

const categories = [
  { key: "buttons", label: "Buttons", icon: Sparkles, accent: "#E04E2D" },
  { key: "cards", label: "Cards & Layout", icon: LayoutGrid, accent: "#38bdf8" },
  { key: "text", label: "Text Effects", icon: Type, accent: "#34d399" },
  { key: "navigation", label: "Navigation", icon: Compass, accent: "#fbbf24" },
  { key: "visual", label: "Visual Effects", icon: Eye, accent: "#a78bfa" },
  { key: "media", label: "Media & Content", icon: Film, accent: "#fb7185" },
];

const categoryMap = Object.fromEntries(categories.map((c) => [c.key, c]));

/* ─── Glass base ──────────────────────────────────────────── */

const glass = "backdrop-blur-2xl bg-[var(--color-void)]/70 border border-[var(--color-border)]";

/* ─── DemoSkeleton ────────────────────────────────────────── */

function DemoSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-ignite)]" />
    </div>
  );
}

/* ─── InView hook ─────────────────────────────────────────── */

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

/* ─── Stagger animation hook ──────────────────────────────── */

function useStagger(visible: boolean, index: number) {
  const delay = Math.min(index * 40, 400);
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

/* ─── Component Card ──────────────────────────────────────── */

function ComponentCard({ entry, index }: { entry: ComponentEntry; index: number }) {
  const router = useRouter();
  const cat = categoryMap[entry.category];
  const { ref, visible } = useInView();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [LazyDemo] = useState(() => getLazyDemo(entry.slug, entry.demo as () => Promise<{ default: React.ComponentType<any> }>));
  const style = useStagger(visible, index);

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
      style={style}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-obsidian)] transition-all duration-300 hover:border-[var(--color-border-light)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 30%), ${cat?.accent ?? "#E04E2D"}08, transparent 60%)`,
        }}
      />

      {/* Demo preview */}
      <div className="relative h-48 overflow-hidden border-b border-[var(--color-border)]/50 bg-[var(--color-void)]/50">
        <div className="flex h-full w-full items-center justify-center p-4">
          {visible ? (
            <Suspense fallback={<DemoSkeleton />}>
              <DemoErrorBoundary>
                <div className="pointer-events-none flex items-center justify-center">
                  <LazyDemo />
                </div>
              </DemoErrorBoundary>
            </Suspense>
          ) : (
            <DemoSkeleton />
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-void)]/0 opacity-0 transition-all duration-300 group-hover:bg-[var(--color-void)]/50 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Badges - top right */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          {entry.isSignature && (
            <span className="rounded-full bg-gradient-to-r from-amber-500 to-[var(--color-ignite)] px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-white shadow-[0_2px_12px_rgba(224,78,45,0.3)]">
              SIGNATURE
            </span>
          )}
          {entry.isNew && !entry.isSignature && (
            <span className="rounded-full bg-[var(--color-ignite)] px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-white shadow-[0_2px_12px_rgba(224,78,45,0.3)]">
              NEW
            </span>
          )}
        </div>
      </div>

      {/* Card info */}
      <div className="relative p-4">
        <div className="flex items-center gap-2.5">
          {cat && (
            <div
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${cat.accent}15` }}
            >
              <cat.icon className="h-3 w-3" style={{ color: cat.accent }} />
            </div>
          )}
          <h3 className="text-sm font-semibold text-[var(--color-chalk)] transition-colors group-hover:text-[var(--color-ignite)]">
            {entry.title}
          </h3>
        </div>
        <p className="mt-2 line-clamp-2 pl-[34px] text-[12px] leading-relaxed text-[var(--color-text-faint)]">
          {entry.description}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */

export default function ComponentsPageContent() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "dense">("grid");
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  /* Sticky bar on scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  /* Track mouse for card glow */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const cards = (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>("[data-card]");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  }, []);

  /* All components */
  const allComponents = useMemo(() => {
    const componentsGroup = sidebarGroups.find((g) => g.title === "Components");
    const slugs = componentsGroup
      ? componentsGroup.items.filter((item) => item.slug !== "components-overview").map((item) => item.slug)
      : [];
    return slugs.map((slug) => componentRegistry[slug]).filter(Boolean);
  }, []);

  /* Filtered */
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

  /* Counts */
  const countPerCategory = useMemo(() => {
    const map: Record<string, number> = {};
    for (const comp of allComponents) {
      map[comp.category] = (map[comp.category] || 0) + 1;
    }
    return map;
  }, [allComponents]);

  /* Signature components */
  const signatureComponents = useMemo(() => allComponents.filter((c) => c.isSignature), [allComponents]);

  return (
    <div className="min-h-screen bg-[var(--color-void)]">
      <Navbar />

      {/* ─── Hero ─── */}
      <div ref={heroRef} className="relative overflow-hidden border-b border-[var(--color-border)]">
        {/* Subtle gradient mesh */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[var(--color-ignite)]/[0.03] blur-[120px]" />
          <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-[var(--color-blush)]/[0.03] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-32">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2">
            <span className="font-mono text-[11px] text-[var(--color-text-faint)]">praxys</span>
            <span className="text-[var(--color-text-faint)]">/</span>
            <span className="font-mono text-[11px] text-[var(--color-ignite)]">components</span>
          </div>

          {/* Title row */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-pixel text-4xl font-bold tracking-tight text-[var(--color-chalk)] sm:text-5xl md:text-6xl">
                Components
              </h1>
              <p className="mt-3 max-w-lg text-base text-[var(--color-text-faint)]">
                {allComponents.length} animated React components. Browse, preview, copy, ship.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-6">
              {categories.slice(0, 4).map((cat) => (
                <div key={cat.key} className="text-center">
                  <p className="text-xl font-bold text-[var(--color-chalk)]">{countPerCategory[cat.key] || 0}</p>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-faint)]">{cat.label.split(" ")[0]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search bar — hero version */}
          <div className="mt-10">
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))}
              className={`${glass} group flex w-full max-w-xl items-center gap-3 rounded-2xl px-5 py-3.5 transition-all hover:border-[var(--color-border-light)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.2)]`}
            >
              <Search className="h-4 w-4 text-[var(--color-text-faint)]" />
              <span className="flex-1 text-left text-sm text-[var(--color-text-faint)]">Search components...</span>
              <kbd className="rounded-lg bg-[var(--color-border)] px-2 py-1 font-mono text-[10px] text-[var(--color-text-faint)]">⌘K</kbd>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Sticky Filter Bar ─── */}
      <div
        className={`sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-void)]/80 backdrop-blur-2xl transition-all duration-300 ${
          stickyVisible ? "translate-y-0 opacity-100" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
          {/* Inline search */}
          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-text-faint)]" />
            <input
              type="text"
              placeholder="Filter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)]/50 py-2 pl-9 pr-8 text-xs text-[var(--color-chalk)] outline-none transition-colors placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-ignite)]/30"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] hover:text-[var(--color-chalk)]">
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="hidden h-6 w-px bg-[var(--color-border)] sm:block" />

          {/* Category pills */}
          <div className="scrollbar-thin flex flex-1 items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveFilter(null)}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all ${
                activeFilter === null
                  ? "bg-[var(--color-ignite)]/10 text-[var(--color-ignite)]"
                  : "text-[var(--color-text-faint)] hover:bg-[var(--color-border)]/50 hover:text-[var(--color-chalk)]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => {
              const count = countPerCategory[cat.key] || 0;
              if (count === 0) return null;
              const isActive = activeFilter === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveFilter(isActive ? null : cat.key)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all ${
                    isActive
                      ? "text-white"
                      : "text-[var(--color-text-faint)] hover:bg-[var(--color-border)]/50 hover:text-[var(--color-chalk)]"
                  }`}
                  style={isActive ? { backgroundColor: `${cat.accent}20`, color: cat.accent } : undefined}
                >
                  <cat.icon className="h-3 w-3" />
                  {cat.label}
                  <span className="opacity-50">{count}</span>
                </button>
              );
            })}
          </div>

          {/* View toggle */}
          <div className="hidden items-center gap-0.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)]/50 p-0.5 sm:flex">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-lg p-1.5 transition-all ${viewMode === "grid" ? "bg-[var(--color-border)] text-[var(--color-chalk)]" : "text-[var(--color-text-faint)]"}`}
            >
              <Grid3X3 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewMode("dense")}
              className={`rounded-lg p-1.5 transition-all ${viewMode === "dense" ? "bg-[var(--color-border)] text-[var(--color-chalk)]" : "text-[var(--color-text-faint)]"}`}
            >
              <Rows3 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Command palette trigger */}
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))}
            className="hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)]/50 p-2 text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-chalk)] sm:flex"
          >
            <Command className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ─── Component Grid ─── */}
      <main className="mx-auto max-w-7xl px-6 py-10" onMouseMove={handleMouseMove}>
        {/* Active filter indicator */}
        {(search || activeFilter) && (
          <div className="mb-6 flex items-center gap-3">
            <p className="text-sm text-[var(--color-text-faint)]">
              <span className="font-semibold text-[var(--color-chalk)]">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "component" : "components"}
              {activeFilter && (
                <span>
                  {" "}in <span style={{ color: categoryMap[activeFilter]?.accent }}>{categoryMap[activeFilter]?.label}</span>
                </span>
              )}
              {search && (
                <span>
                  {" "}matching &ldquo;<span className="text-[var(--color-chalk)]">{search}</span>&rdquo;
                </span>
              )}
            </p>
            <button
              onClick={() => { setSearch(""); setActiveFilter(null); }}
              className="rounded-lg px-2 py-1 text-[11px] text-[var(--color-text-faint)] transition-colors hover:bg-[var(--color-border)]/50 hover:text-[var(--color-chalk)]"
            >
              Clear
            </button>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-[var(--color-border)] bg-[var(--color-obsidian)]/30 py-24">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-border)]">
              <Search className="h-5 w-5 text-[var(--color-text-faint)]" />
            </div>
            <p className="text-sm text-[var(--color-text-faint)]">No components match your search</p>
            <button
              onClick={() => { setSearch(""); setActiveFilter(null); }}
              className="mt-4 rounded-xl bg-[var(--color-ignite)]/10 px-4 py-2 text-sm font-medium text-[var(--color-ignite)] transition-colors hover:bg-[var(--color-ignite)]/20"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            }
          >
            {filtered.map((comp, i) => (
              <div key={comp.slug} data-card>
                {viewMode === "grid" ? (
                  <ComponentCard entry={comp} index={i} />
                ) : (
                  <DenseCard entry={comp} index={i} />
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

/* ─── Dense Card (compact view) ───────────────────────────── */

function DenseCard({ entry, index }: { entry: ComponentEntry; index: number }) {
  const router = useRouter();
  const cat = categoryMap[entry.category];
  const { ref, visible } = useInView();
  const style = useStagger(visible, index);

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
      style={style}
      className="group cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] p-4 transition-all duration-200 hover:border-[var(--color-border-light)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
    >
      <div className="flex items-center gap-3">
        {cat && (
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${cat.accent}12` }}
          >
            <cat.icon className="h-3.5 w-3.5" style={{ color: cat.accent }} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-[var(--color-chalk)] transition-colors group-hover:text-[var(--color-ignite)]">
            {entry.title}
          </h3>
          <p className="truncate text-[11px] text-[var(--color-text-faint)]">{entry.description}</p>
        </div>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-faint)] opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </div>
  );
}
