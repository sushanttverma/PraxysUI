"use client";

import React, { useRef, useState, useEffect, Suspense, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const noopSub = () => () => {};
function useIsClient() {
  return useSyncExternalStore(noopSub, () => true, () => false);
}

const WALL_ITEMS = [
  { slug: "aurora", loader: () => import("@/app/components/demos/aurora-demo") },
  { slug: "animated-button", loader: () => import("@/app/components/demos/animated-button-demo") },
  { slug: "morphing-text", loader: () => import("@/app/components/demos/morphing-text-demo") },
  { slug: "glow-border-card", loader: () => import("@/app/components/demos/glow-border-card-demo") },
  { slug: "flip-text", loader: () => import("@/app/components/demos/flip-text-demo") },
  { slug: "creepy-button", loader: () => import("@/app/components/demos/creepy-button-demo") },
  { slug: "gradient-text", loader: () => import("@/app/components/demos/gradient-text-demo") },
  { slug: "spotlight-card", loader: () => import("@/app/components/demos/spotlight-card-demo") },
  { slug: "animated-toggle", loader: () => import("@/app/components/demos/animated-toggle-demo") },
  { slug: "shiny-text", loader: () => import("@/app/components/demos/shiny-text-demo") },
  { slug: "blur-text", loader: () => import("@/app/components/demos/blur-text-demo") },
  { slug: "glitch-text", loader: () => import("@/app/components/demos/glitch-text-demo") },
  { slug: "animated-counter", loader: () => import("@/app/components/demos/animated-counter-demo") },
  { slug: "badge", loader: () => import("@/app/components/demos/badge-demo") },
  { slug: "progress-bar", loader: () => import("@/app/components/demos/progress-bar-demo") },
  { slug: "animated-tabs", loader: () => import("@/app/components/demos/animated-tabs-demo") },
  { slug: "skeleton-loader", loader: () => import("@/app/components/demos/skeleton-loader-demo") },
  { slug: "rating", loader: () => import("@/app/components/demos/rating-demo") },
  { slug: "scramble-text", loader: () => import("@/app/components/demos/scramble-text-demo") },
  { slug: "text-reveal", loader: () => import("@/app/components/demos/text-reveal-demo") },
  { slug: "checkbox", loader: () => import("@/app/components/demos/checkbox-demo") },
  { slug: "switch", loader: () => import("@/app/components/demos/switch-demo") },
  { slug: "tag-input", loader: () => import("@/app/components/demos/tag-input-demo") },
  { slug: "copy-button", loader: () => import("@/app/components/demos/copy-button-demo") },
  { slug: "circular-text", loader: () => import("@/app/components/demos/circular-text-demo") },
  { slug: "stats-card", loader: () => import("@/app/components/demos/stats-card-demo") },
  { slug: "avatar-group", loader: () => import("@/app/components/demos/avatar-group-demo") },
  { slug: "stepper", loader: () => import("@/app/components/demos/stepper-demo") },
  { slug: "alert", loader: () => import("@/app/components/demos/alert-demo") },
  { slug: "divider", loader: () => import("@/app/components/demos/divider-demo") },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const demoCache = new Map<string, React.LazyExoticComponent<React.ComponentType<any>>>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLazy(slug: string, loader: () => Promise<{ default: React.ComponentType<any> }>) {
  if (!demoCache.has(slug)) demoCache.set(slug, React.lazy(loader));
  return demoCache.get(slug)!;
}

function WallCell({ slug, loader, index }: { slug: string; loader: () => Promise<{ default: React.ComponentType }>; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [LazyDemo] = useState(() => getLazy(slug, loader as () => Promise<{ default: React.ComponentType<any> }>));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => router.push(`/components/${slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] transition-all duration-300"
      style={{
        transform: hovered ? "scale(1.05) translateY(-4px)" : "scale(1)",
        zIndex: hovered ? 20 : 1,
        boxShadow: hovered ? "0 0 30px rgba(224,78,45,0.1), 0 16px 48px rgba(0,0,0,0.4)" : "none",
      }}
    >
      {/* Live demo — scaled to fit */}
      <div className="pointer-events-none flex h-full w-full items-center justify-center overflow-hidden p-2">
        <div style={{ transform: "scale(0.5)", transformOrigin: "center center", width: "200%", height: "200%" }}>
          {visible ? (
            <Suspense fallback={<div className="flex h-full w-full items-center justify-center"><div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-ignite)]" /></div>}>
              <LazyDemo />
            </Suspense>
          ) : null}
        </div>
      </div>

      {/* Hover overlay with name */}
      <div
        className="absolute inset-0 flex items-end justify-between rounded-xl p-3 transition-opacity duration-200"
        style={{
          opacity: hovered ? 1 : 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.4) 40%, transparent 100%)",
        }}
      >
        <span className="font-mono text-[11px] font-medium text-[var(--color-chalk)]">
          {slug.replace(/-/g, " ")}
        </span>
        <span className="font-mono text-[9px] text-[var(--color-text-faint)]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Top glow line on hover */}
      <div
        className="absolute left-0 right-0 top-0 h-px transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: "linear-gradient(90deg, transparent, var(--color-ignite), transparent)",
        }}
      />
    </div>
  );
}

export default function ComponentWall() {
  const isClient = useIsClient();

  return (
    <section className="relative bg-[var(--color-void)] py-24">
      {/* Header */}
      <div className="mx-auto mb-16 max-w-7xl px-6 text-center">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
          {"// the library"}
        </p>
        <h2 className="font-pixel text-3xl font-bold text-[var(--color-chalk)] sm:text-4xl md:text-5xl">
          {WALL_ITEMS.length} live components.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-[var(--color-blush)]">
          Every component runs in real-time below. Hover to inspect, click to explore.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gridAutoRows: "180px",
          }}
        >
          {isClient && WALL_ITEMS.map((item, i) => (
            <WallCell key={item.slug} slug={item.slug} loader={item.loader} index={i} />
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="mx-auto mt-12 max-w-7xl px-6 text-center">
        <Link
          href="/components"
          className="group inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-chalk)] transition-all hover:border-[var(--color-border-light)] hover:bg-[var(--color-obsidian)]"
        >
          View all components
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
