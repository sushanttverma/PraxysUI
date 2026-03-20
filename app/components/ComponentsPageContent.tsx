"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { sidebarGroups, componentRegistry, backgroundSlugs } from "@/lib/registry";
import type { ComponentEntry } from "@/lib/registry";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ComponentSidebar from "./shared/ComponentSidebar";

/* ─── Category grouping (matches sidebar) ─────────────────── */

const CATEGORY_LABELS: Record<string, string> = {
  text: "Text Animations",
  buttons: "Buttons & Inputs",
  cards: "Cards & Layout",
  navigation: "Navigation",
  visual: "Visual Effects",
  media: "Media & Content",
};

const CATEGORY_ORDER = ["text", "buttons", "cards", "navigation", "visual", "media"];

type GroupItem = { slug: string; title: string; entry: ComponentEntry };
type Group = { title: string; items: GroupItem[] };

function buildGroups(): Group[] {
  const buckets: Record<string, GroupItem[]> = {};
  const bgItems: GroupItem[] = [];

  for (const group of sidebarGroups) {
    for (const item of group.items) {
      if (item.slug === "components-overview") continue;
      const entry = componentRegistry[item.slug];
      if (!entry) continue;
      const gi: GroupItem = { slug: item.slug, title: item.title, entry };
      if (backgroundSlugs.has(item.slug)) {
        bgItems.push(gi);
      } else {
        const cat = entry.category;
        if (!buckets[cat]) buckets[cat] = [];
        buckets[cat].push(gi);
      }
    }
  }

  const result: Group[] = [];
  for (const key of CATEGORY_ORDER) {
    if (buckets[key]?.length) {
      result.push({ title: CATEGORY_LABELS[key] || key, items: buckets[key] });
    }
  }
  if (bgItems.length > 0) {
    result.push({ title: "Backgrounds", items: bgItems });
  }
  return result;
}

/* ─── Component Card ──────────────────────────────────────── */

function ComponentCard({ entry }: { entry: ComponentEntry }) {
  const router = useRouter();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/components/${entry.slug}`)}
      onKeyDown={(e) => { if (e.key === "Enter") router.push(`/components/${entry.slug}`); }}
      className="group cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] p-4 transition-all duration-200 hover:border-[var(--color-border-light)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[var(--color-chalk)] transition-colors group-hover:text-[var(--color-ignite)]">
          {entry.title}
        </h3>
        {entry.isNew && (
          <span className="rounded-md border border-[var(--color-border)] bg-[var(--color-ignite-dim)] px-1.5 py-0.5 text-[10px] text-[var(--color-text-faint)]">
            New
          </span>
        )}
      </div>
      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[var(--color-text-faint)]">
        {entry.description}
      </p>
      <div className="mt-3 overflow-hidden rounded-md bg-[var(--color-void)] px-2 py-1">
        <code className="block truncate font-mono text-[10px] text-[var(--color-text-faint)]">
          npx @praxys/ui add {entry.slug}
        </code>
      </div>
    </div>
  );
}

/* ─── Category Section ─────────────────────────────────────── */

function CategorySection({ group }: { group: Group }) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-base font-semibold text-[var(--color-chalk)]">{group.title}</h2>
        <span className="rounded-full bg-[var(--color-ignite-dim)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-faint)]">
          {group.items.length}
        </span>
        <div className="h-px flex-1 bg-[var(--color-border)]" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {group.items.map((item) => (
          <ComponentCard key={item.slug} entry={item.entry} />
        ))}
      </div>
    </section>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */

export default function ComponentsPageContent() {
  const groups = useMemo(() => buildGroups(), []);
  const totalCount = groups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <div className="min-h-screen bg-[var(--color-void)]">
      <Navbar />

      <div className="flex">
        <ComponentSidebar />

        <main className="min-w-0 flex-1 px-8 pb-10 pt-24 lg:px-12">
          <div className="mb-12 max-w-2xl">
            <h1 className="font-pixel text-3xl font-bold tracking-tight text-[var(--color-chalk)] sm:text-4xl">
              Components
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-blush)]">
              {totalCount} animated React components you can copy and paste into your apps.
              Every component is free, open-source, and ready for production.
            </p>
            <div className="mt-6">
              <div className="inline-block rounded-lg border border-[var(--color-border)] bg-[var(--color-obsidian)] px-4 py-2">
                <code className="font-mono text-sm text-[var(--color-blush)]">
                  npx @praxys/ui add <span className="text-[var(--color-chalk)]">[component]</span>
                </code>
              </div>
            </div>
          </div>

          {groups.map((group) => (
            <CategorySection key={group.title} group={group} />
          ))}

          <div className="mt-8">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
