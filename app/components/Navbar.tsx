"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import {
  Github,
  Star,
  Palette,
  Paintbrush,
  Wand2,
  Layers,
  GlassWater,
  BookOpen,
  Layout,
  Eye,
  FileText,
  Clock,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

// ─── Re-export HamburgerButton for docs sidebar ─────────

export function HamburgerButton({
  open,
  onClick,
  label = "menu",
}: {
  open: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? `Close ${label}` : `Open ${label}`}
      aria-expanded={open}
      className="relative z-50 flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-obsidian text-blush transition-colors hover:text-chalk hover:border-border-light cursor-pointer"
    >
      <div className="relative flex h-3.5 w-3.5 flex-col items-center justify-center">
        <span
          className={cn(
            "absolute h-[1.5px] w-3.5 rounded-full bg-current origin-center transition-all duration-300",
            open ? "rotate-45 translate-y-0" : "-translate-y-[3px]"
          )}
        />
        <span
          className={cn(
            "absolute h-[1.5px] w-3.5 rounded-full bg-current origin-center transition-all duration-300",
            open ? "-rotate-45 translate-y-0" : "translate-y-[3px]"
          )}
        />
      </div>
    </button>
  );
}

// ─── Nav data ───────────────────────────────────────────

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const pageItems: NavItem[] = [
  {
    href: "/components/install",
    label: "Installation",
    icon: <BookOpen className="h-4 w-4" />,
    description: "Getting started",
  },
  {
    href: "/components",
    label: "Components",
    icon: <Layout className="h-4 w-4" />,
    description: "Browse 70+ components",
  },
  {
    href: "/templates",
    label: "Templates",
    icon: <FileText className="h-4 w-4" />,
    description: "Ready-made layouts",
  },
  {
    href: "/examples",
    label: "Examples",
    icon: <Eye className="h-4 w-4" />,
    description: "Usage examples",
  },
];

const toolItems: NavItem[] = [
  {
    href: "/studio",
    label: "Animation Studio",
    icon: <Wand2 className="h-4 w-4" />,
    description: "Motion configuration",
  },
  {
    href: "/gradient-maker",
    label: "Gradient Maker",
    icon: <Palette className="h-4 w-4" />,
    description: "Mesh gradient creator",
  },
  {
    href: "/shadow-lab",
    label: "Shadow Lab",
    icon: <Layers className="h-4 w-4" />,
    description: "Layered shadow designer",
  },
  {
    href: "/glass-generator",
    label: "Glassmorphism",
    icon: <GlassWater className="h-4 w-4" />,
    description: "Frosted glass effects",
  },
  {
    href: "/customize",
    label: "Theme Builder",
    icon: <Paintbrush className="h-4 w-4" />,
    description: "Color scheme editor",
  },
];


// ─── Split text into per-character spans ─────────────────

function CharSplit({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-flip-char
          className="inline-block"
          style={{ transformOrigin: "center center" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// ─── Text Scramble Effect ────────────────────────────────

function scrambleText(el: HTMLElement, target: string, duration: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const steps = Math.ceil(duration / 0.03);
  let step = 0;

  const interval = setInterval(() => {
    step++;
    const progress = step / steps;
    const revealed = Math.floor(progress * target.length);

    let text = "";
    for (let i = 0; i < target.length; i++) {
      if (i < revealed) {
        text += target[i];
      } else {
        text += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = text;

    if (step >= steps) {
      clearInterval(interval);
      el.textContent = target;
    }
  }, 30);
}

// ─── Floating Menu Navbar ────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      if (href === "/components/install") return pathname === "/components/install";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  // ── GSAP open ──
  const animateOpen = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();
    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(
      shellRef.current,
      { width: 280, duration: 0.25, ease: "power3.out" },
      0
    );
    tl.to(
      contentRef.current,
      { height: "auto", opacity: 1, duration: 0.25, ease: "power3.out" },
      0
    );
    tl.to(
      topLineRef.current,
      { rotate: 45, y: 0, duration: 0.15, ease: "power2.out" },
      0
    );
    tl.to(
      bottomLineRef.current,
      { rotate: -45, y: 0, duration: 0.15, ease: "power2.out" },
      0
    );

    const items = itemsRef.current.filter(Boolean);
    tl.fromTo(
      items,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.25, stagger: 0.04, ease: "power2.out" },
      0.06
    );

    // Per-character flip on menu labels
    if (contentRef.current) {
      const chars = contentRef.current.querySelectorAll("[data-flip-char]");
      if (chars.length) {
        gsap.set(chars, { rotateX: -90 });
        tl.to(
          chars,
          {
            rotateX: 0,
            duration: 0.4,
            stagger: 0.012,
            ease: "power2.out",
          },
          0.1
        );
      }
    }

    if (labelRef.current) scrambleText(labelRef.current, "Close", 0.2);
  }, []);

  // ── GSAP close ──
  const animateClose = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();
    const tl = gsap.timeline();
    tlRef.current = tl;

    const items = itemsRef.current.filter(Boolean);
    tl.to(
      items,
      { opacity: 0, y: 8, duration: 0.1, stagger: 0.015, ease: "power2.in" },
      0
    );
    tl.to(
      contentRef.current,
      { height: 0, opacity: 0, duration: 0.2, ease: "power3.in" },
      0.04
    );
    tl.to(
      shellRef.current,
      { width: "auto", duration: 0.25, ease: "power3.inOut" },
      0.04
    );
    tl.to(
      topLineRef.current,
      { rotate: 0, y: -3, duration: 0.15, ease: "power2.out" },
      0
    );
    tl.to(
      bottomLineRef.current,
      { rotate: 0, y: 3, duration: 0.15, ease: "power2.out" },
      0
    );

    if (labelRef.current) scrambleText(labelRef.current, "Menu", 0.2);
  }, []);

  const toggleMenu = useCallback(() => {
    const next = !menuOpenRef.current;
    menuOpenRef.current = next;
    if (next) animateOpen();
    else animateClose();
    requestAnimationFrame(() => setMenuOpen(next));
  }, [animateOpen, animateClose]);

  const closeMenu = useCallback(() => {
    if (!menuOpenRef.current) return;
    menuOpenRef.current = false;
    animateClose();
    requestAnimationFrame(() => setMenuOpen(false));
  }, [animateClose]);

  // Set initial label text
  useEffect(() => {
    if (labelRef.current) labelRef.current.textContent = "Menu";
  }, []);

  // Close on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuOpenRef.current &&
        wrapRef.current &&
        !wrapRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [closeMenu]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closeMenu]);

  // ref index tracker
  let refIdx = 0;

  return (
    <div
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
      ref={wrapRef}
    >
      <div
        ref={shellRef}
        className="relative overflow-hidden rounded-2xl border border-border bg-obsidian shadow-2xl shadow-black/20"
      >
        {/* ── Top bar (always visible) ── */}
        <div className="flex items-center justify-between px-1.5 py-1.5 gap-2">
          {/* Menu / Close button */}
          <button
            onClick={toggleMenu}
            className={cn(
              "flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200",
              menuOpen
                ? "bg-chalk text-void"
                : "bg-void text-chalk hover:bg-border/50"
            )}
          >
            <div className="relative w-4 h-3.5 flex items-center justify-center">
              <span
                ref={topLineRef}
                style={{ transform: "translateY(-3px)" }}
                className={cn(
                  "absolute w-3.5 h-[1.5px] rounded-full origin-center",
                  menuOpen ? "bg-void" : "bg-chalk"
                )}
              />
              <span
                ref={bottomLineRef}
                style={{ transform: "translateY(3px)" }}
                className={cn(
                  "absolute w-3.5 h-[1.5px] rounded-full origin-center",
                  menuOpen ? "bg-void" : "bg-chalk"
                )}
              />
            </div>
            <span
              ref={labelRef}
              className="min-w-[2.5rem]"
              suppressHydrationWarning
            />
          </button>

          {/* Search trigger */}
          <button
            onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-void text-text-faint text-xs hover:text-chalk transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="h-3.5 w-3.5" />
            <kbd className="hidden sm:inline rounded border border-border-light bg-obsidian px-1 py-0.5 font-mono text-[9px] text-text-faint">
              ⌘K
            </kbd>
          </button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Brand badge */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-void text-text-faint text-xs font-medium select-none hover:text-chalk transition-colors"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded bg-ignite">
              <span className="font-pixel text-[9px] font-bold text-void">
                P
              </span>
            </div>
            <span className="hidden sm:inline text-chalk/70 font-pixel">
              Praxys UI
            </span>
          </Link>
        </div>

        {/* ── Expanded content ── */}
        <div ref={contentRef} style={{ height: 0, opacity: 0 }}>
          {/* ── Pages ── */}
          <div className="px-5 pt-3 pb-1">
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint/40 mb-2">
              Pages
            </p>
            <div className="space-y-px">
              {pageItems.map((item) => {
                const idx = refIdx++;
                return (
                  <div
                    key={item.href}
                    ref={(el) => {
                      itemsRef.current[idx] = el;
                    }}
                    style={{ opacity: 0 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      onMouseEnter={(e) => {
                        const chars =
                          e.currentTarget.querySelectorAll("[data-flip-char]");
                        if (chars.length) {
                          gsap.fromTo(
                            chars,
                            { rotateX: -90 },
                            {
                              rotateX: 0,
                              duration: 0.4,
                              stagger: 0.015,
                              ease: "power2.out",
                            }
                          );
                        }
                      }}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition-all duration-150",
                        isActive(item.href)
                          ? "text-ignite"
                          : "text-chalk hover:text-ignite"
                      )}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-150",
                          isActive(item.href)
                            ? "text-ignite"
                            : "text-text-faint group-hover:text-ignite"
                        )}
                      >
                        {item.icon}
                      </span>
                      <CharSplit
                        text={item.label}
                        className="text-sm font-semibold tracking-tight"
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Separator ── */}
          <div className="mx-5 my-1.5 border-t border-border" />

          {/* ── Tools ── */}
          <div className="px-5 pb-1">
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint/40 mb-2">
              Tools
            </p>
            <div className="space-y-px">
              {toolItems.map((item) => {
                const idx = refIdx++;
                return (
                  <div
                    key={item.href}
                    ref={(el) => {
                      itemsRef.current[idx] = el;
                    }}
                    style={{ opacity: 0 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      onMouseEnter={(e) => {
                        const chars =
                          e.currentTarget.querySelectorAll("[data-flip-char]");
                        if (chars.length) {
                          gsap.fromTo(
                            chars,
                            { rotateX: -90 },
                            {
                              rotateX: 0,
                              duration: 0.4,
                              stagger: 0.015,
                              ease: "power2.out",
                            }
                          );
                        }
                      }}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition-all duration-150",
                        isActive(item.href)
                          ? "text-ignite"
                          : "text-chalk hover:text-ignite"
                      )}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-150",
                          isActive(item.href)
                            ? "text-ignite"
                            : "text-text-faint group-hover:text-ignite"
                        )}
                      >
                        {item.icon}
                      </span>
                      <CharSplit
                        text={item.label}
                        className="text-sm font-semibold tracking-tight"
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Separator ── */}
          <div className="mx-5 my-1.5 border-t border-border" />

          {/* ── Bottom row ── */}
          <div className="px-5 pb-3 flex items-center justify-between">
            {(() => {
              const idx = refIdx++;
              return (
                <div
                  ref={(el) => {
                    itemsRef.current[idx] = el;
                  }}
                  style={{ opacity: 0 }}
                >
                  <Link
                    href="/changelog"
                    onClick={closeMenu}
                    className={cn(
                      "flex items-center gap-1.5 text-xs transition-colors",
                      isActive("/changelog")
                        ? "text-ignite"
                        : "text-text-faint hover:text-blush"
                    )}
                  >
                    <Clock className="h-3 w-3" />
                    <span>Changelog</span>
                  </Link>
                </div>
              );
            })()}
            {(() => {
              const idx = refIdx++;
              return (
                <div
                  ref={(el) => {
                    itemsRef.current[idx] = el;
                  }}
                  style={{ opacity: 0 }}
                >
                  <a
                    href="https://github.com/sushanttverma/Praxys-UI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-text-faint hover:text-chalk transition-colors"
                  >
                    <Github className="h-3 w-3" />
                    <span>GitHub</span>
                    <Star className="h-2.5 w-2.5 fill-current text-amber-400/70" />
                  </a>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
