"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarGroups } from "@/lib/registry";
import { cn } from "@/lib/utils";
import { ChevronRight, X } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Extract current slug from pathname
  // /docs or /docs/ → "introduction"
  // /docs/some-slug → "some-slug"
  const stripped = pathname.replace(/\/docs\/?/, "");
  const currentSlug = stripped === "" ? "introduction" : stripped;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-void/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        aria-label="Documentation navigation"
        className={cn(
          "fixed top-16 bottom-0 z-50 w-72 border-r border-border bg-void/95 backdrop-blur-xl overflow-y-auto",
          "transition-transform duration-300 ease-in-out",
          "lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0 lg:bg-transparent lg:backdrop-blur-none",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="font-pixel text-sm text-chalk">Navigation</span>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-blush hover:text-chalk"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav aria-label="Docs sidebar" className="px-4 py-6 lg:py-8">
          {sidebarGroups.map((group) => (
            <div key={group.title} className="mb-6">
              <h4 className="mb-2 px-3 font-pixel text-xs font-semibold uppercase tracking-wider text-text-faint">
                {group.title}
              </h4>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const href =
                    item.slug === "introduction"
                      ? "/docs"
                      : `/docs/${item.slug}`;
                  const isActive = currentSlug === item.slug;

                  return (
                    <li key={item.slug}>
                      <Link
                        href={href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-150",
                          isActive
                            ? "bg-ignite/10 text-ignite border border-ignite/20"
                            : "text-blush hover:bg-obsidian hover:text-chalk border border-transparent"
                        )}
                      >
                        <ChevronRight
                          className={cn(
                            "h-3 w-3 transition-transform",
                            isActive
                              ? "text-ignite"
                              : "text-text-faint group-hover:text-blush"
                          )}
                        />
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
