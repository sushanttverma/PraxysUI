"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarGroups } from "@/lib/registry";
import { cn } from "@/lib/utils";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

// ─── Animation variants ─────────────────────────────────

const panelVariants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  const stripped = pathname.replace(/\/docs\/?/, "");
  const currentSlug = stripped === "" ? "introduction" : stripped;

  // Close only on actual route *change*, not on mount
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    onClose();
  }

  // Lock body scroll on mobile when open
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ─── Desktop sidebar (always visible, no animation) ───
  const sidebarContent = (
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
  );

  return (
    <>
      {/* ─── Desktop sidebar (static) ──────────────────── */}
      <aside
        aria-label="Documentation navigation"
        className="hidden lg:sticky lg:top-16 lg:z-0 lg:block lg:h-[calc(100vh-4rem)] lg:w-72 lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-border"
      >
        {sidebarContent}
      </aside>

      {/* ─── Mobile sidebar (slide from right) ─────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-void/70 backdrop-blur-md lg:hidden"
              onClick={onClose}
            />

            {/* Slide-in panel */}
            <motion.aside
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="closed"
              aria-label="Documentation navigation"
              className="fixed top-0 right-0 bottom-0 z-[70] flex w-[85vw] max-w-sm flex-col bg-void border-l border-border/60 overflow-hidden lg:hidden"
            >
              {/* Top accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="h-[2px] bg-gradient-to-r from-ignite via-ignite/50 to-transparent origin-left shrink-0"
              />

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="font-pixel text-xs uppercase tracking-widest text-ignite">
                    Docs
                  </span>
                  <span className="font-mono text-[10px] text-text-faint">
                    {sidebarGroups.reduce((n, g) => n + g.items.length, 0)} pages
                  </span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close sidebar"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-blush hover:text-chalk hover:border-ignite/40 transition-colors cursor-pointer"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 rotate-45" />
                </button>
              </div>

              {/* Scrollable nav */}
              <div className="flex-1 overflow-y-auto px-3 pb-6">
                <nav aria-label="Docs sidebar">
                  {sidebarGroups.map((group) => (
                    <div key={group.title} className="mb-5">
                      <h4 className="mb-2 px-3 font-pixel text-[10px] font-semibold uppercase tracking-widest text-text-faint">
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
                                  "group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-all duration-150",
                                  isActive
                                    ? "bg-ignite/10 text-ignite border border-ignite/20"
                                    : "text-blush hover:bg-obsidian hover:text-chalk border border-transparent"
                                )}
                              >
                                <ChevronRight
                                  className={cn(
                                    "h-3 w-3 shrink-0 transition-transform",
                                    isActive
                                      ? "text-ignite translate-x-0.5"
                                      : "text-text-faint group-hover:text-blush group-hover:translate-x-0.5"
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
              </div>

              {/* Footer */}
              <div className="shrink-0 border-t border-border/50 px-6 py-4">
                <p className="text-center font-pixel text-[10px] tracking-widest text-text-faint">
                  ui.praxys.xyz
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
