"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sidebarGroups, componentRegistry } from "@/lib/registry";

interface ComponentSidebarProps {
  activeSlug: string;
}

export default function ComponentSidebar({ activeSlug }: ComponentSidebarProps) {
  const activeRef = useRef<HTMLAnchorElement>(null);

  // Scroll active item into view on mount
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "center", behavior: "instant" });
  }, [activeSlug]);

  const componentsGroup = sidebarGroups.find((g) => g.title === "Components");
  const items = componentsGroup
    ? componentsGroup.items.filter((item) => item.slug !== "components-overview")
    : [];

  return (
    <aside className="sticky top-0 hidden h-screen w-[220px] shrink-0 overflow-y-auto border-r border-[var(--color-border)] bg-[var(--color-void)] py-6 pl-4 pr-2 lg:block [&::-webkit-scrollbar]:hidden">
      {/* Back to overview */}
      <Link
        href="/components"
        className="mb-5 flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-faint)] transition-colors hover:bg-[var(--color-border)]/30 hover:text-[var(--color-chalk)]"
      >
        Components
      </Link>

      {/* Component list */}
      <nav className="space-y-0.5">
        {items.map((item) => {
          const isActive = item.slug === activeSlug;
          const entry = componentRegistry[item.slug];
          return (
            <Link
              key={item.slug}
              href={`/components/${item.slug}`}
              ref={isActive ? activeRef : undefined}
              className={cn(
                "group flex items-center gap-2 rounded-lg border-l-2 px-3 py-2 text-[13px] font-medium transition-all",
                isActive
                  ? "border-[var(--color-ignite)] bg-[var(--color-ignite)]/[0.06] text-[var(--color-chalk)]"
                  : "border-transparent text-[var(--color-text-faint)] hover:border-[var(--color-border-light)] hover:bg-[var(--color-border)]/20 hover:text-[var(--color-chalk)]"
              )}
            >
              <span className="truncate">{item.title}</span>
              {entry?.isNew && !entry?.isSignature && (
                <span className="shrink-0 rounded-md bg-[var(--color-ignite)]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase text-[var(--color-ignite)]">
                  New
                </span>
              )}
              {entry?.isSignature && (
                <span className="shrink-0 rounded-md bg-gradient-to-r from-amber-500/20 to-[var(--color-ignite)]/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-amber-400">
                  ✦
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
