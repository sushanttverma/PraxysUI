"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, Palette, Layers, Box } from "lucide-react";
import { sidebarGroups, componentRegistry, backgroundSlugs } from "@/lib/registry";

/* ─── Category grouping ───────────────────────────────────── */

const CATEGORY_LABELS: Record<string, string> = {
  text: "Text Animations",
  buttons: "Buttons & Inputs",
  cards: "Cards & Layout",
  navigation: "Navigation",
  visual: "Visual Effects",
  media: "Media & Content",
};

const CATEGORY_ORDER = ["text", "buttons", "cards", "navigation", "visual", "media"];

type SidebarItem = { slug: string; title: string; href: string; isNew?: boolean; icon?: React.ReactNode };
type SidebarSection = { title: string; items: SidebarItem[] };

function buildSections(search: string): SidebarSection[] {
  const q = search.toLowerCase();
  const sections: SidebarSection[] = [];

  if (!q) {
    sections.push({
      title: "Get Started",
      items: [
        { slug: "introduction", title: "Introduction", href: "/components/introduction" },
        { slug: "installation", title: "Installation", href: "/components/installation" },
        { slug: "cli", title: "CLI", href: "/components/cli" },
      ],
    });

    sections.push({
      title: "Tools",
      items: [
        { slug: "background-studio", title: "Background Studio", href: "/components/tools/background-studio", icon: <Palette className="h-3.5 w-3.5" /> },
        { slug: "glass-generator", title: "Glass Generator", href: "/components/tools/glass-generator", icon: <Layers className="h-3.5 w-3.5" /> },
        { slug: "shadow-lab", title: "Shadow Lab", href: "/components/tools/shadow-lab", icon: <Box className="h-3.5 w-3.5" /> },
        { slug: "gradient-maker", title: "Gradient Maker", href: "/components/tools/gradient-maker", icon: <Palette className="h-3.5 w-3.5" /> },
      ],
    });
  }

  const buckets: Record<string, SidebarItem[]> = {};
  const bgItems: SidebarItem[] = [];

  for (const group of sidebarGroups) {
    for (const item of group.items) {
      if (item.slug === "components-overview") continue;
      const entry = componentRegistry[item.slug];
      if (!entry) continue;
      if (q && !item.title.toLowerCase().includes(q) && !item.slug.includes(q)) continue;

      const si: SidebarItem = {
        slug: item.slug,
        title: item.title,
        href: `/components/${item.slug}`,
        isNew: entry.isNew,
      };

      if (backgroundSlugs.has(item.slug)) {
        bgItems.push(si);
      } else {
        const cat = entry.category;
        if (!buckets[cat]) buckets[cat] = [];
        buckets[cat].push(si);
      }
    }
  }

  for (const key of CATEGORY_ORDER) {
    if (buckets[key]?.length) {
      sections.push({ title: CATEGORY_LABELS[key] || key, items: buckets[key] });
    }
  }
  if (bgItems.length > 0) {
    sections.push({ title: "Backgrounds", items: bgItems });
  }

  return sections;
}

/* ─── Sidebar Component ───────────────────────────────────── */

interface ComponentSidebarProps {
  activeSlug?: string;
}

export default function ComponentSidebar({ activeSlug }: ComponentSidebarProps) {
  const activeRef = useRef<HTMLAnchorElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  const sections = useMemo(() => buildSections(search), [search]);

  useEffect(() => {
    if (!search) activeRef.current?.scrollIntoView({ block: "center", behavior: "instant" });
  }, [activeSlug, search]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <aside className="sticky top-0 hidden h-screen w-[250px] shrink-0 overflow-y-auto border-r border-[var(--color-border)] bg-[var(--color-void)] pb-10 pl-5 pr-3 pt-8 lg:block [&::-webkit-scrollbar]:hidden">
      {/* Search */}
      <div className="relative mb-7">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-text-faint)]" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-obsidian)] py-2 pl-8 pr-7 text-[13px] text-[var(--color-chalk)] outline-none placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-border-light)]"
        />
        {search ? (
          <button
            onClick={() => setSearch("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] hover:text-[var(--color-blush)]"
          >
            <X className="h-3 w-3" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-[var(--color-border)] bg-[var(--color-obsidian)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-text-faint)]">
            /
          </kbd>
        )}
      </div>

      {/* Sections */}
      <nav>
        {sections.map((section) => (
          <div key={section.title} className="mb-7">
            <h3 className="mb-2 text-[13px] font-semibold text-[var(--color-blush)]">
              {section.title}
            </h3>
            <div className="border-l border-[var(--color-border)]">
              {section.items.map((item) => {
                const active = item.slug === activeSlug;
                return (
                  <Link
                    key={item.slug}
                    href={item.href}
                    ref={active ? activeRef : undefined}
                    className={`group -ml-px flex items-center gap-2 border-l-2 py-[6px] pl-4 pr-2 text-[13px] transition-colors ${
                      active
                        ? "border-[var(--color-ignite)] text-[var(--color-chalk)]"
                        : "border-transparent text-[var(--color-text-faint)] hover:border-[var(--color-border-light)] hover:text-[var(--color-blush)]"
                    }`}
                  >
                    {item.icon && <span className="shrink-0 text-[var(--color-text-faint)]">{item.icon}</span>}
                    <span className="truncate">{item.title}</span>
                    {item.isNew && (
                      <span className="shrink-0 rounded-md border border-[var(--color-border)] bg-[var(--color-ignite-dim)] px-1.5 py-px text-[10px] text-[var(--color-text-faint)]">
                        New
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        {sections.length === 0 && search && (
          <p className="text-xs text-[var(--color-text-faint)]">No results</p>
        )}
      </nav>
    </aside>
  );
}
