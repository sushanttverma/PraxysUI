"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Star, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import CommandPalette from "./CommandPalette";

// ─── Animated hamburger (morphing circle button) ────────

function HamburgerButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-obsidian text-blush transition-colors hover:text-chalk cursor-pointer"
      whileTap={{ scale: 0.9 }}
      animate={{
        borderColor: open ? "var(--color-ignite)" : "var(--color-border)",
        backgroundColor: open ? "var(--color-ignite)" : "var(--color-obsidian)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex h-4 w-4 flex-col items-center justify-center">
        <motion.span
          animate={
            open
              ? { rotate: 45, y: 0, width: 16 }
              : { rotate: 0, y: -3.5, width: 16 }
          }
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="absolute h-[1.5px] rounded-full"
          style={{ backgroundColor: open ? "var(--color-void)" : "currentColor" }}
        />
        <motion.span
          animate={
            open
              ? { opacity: 0, scaleX: 0 }
              : { opacity: 1, scaleX: 1 }
          }
          transition={{ duration: 0.2 }}
          className="absolute h-[1.5px] w-3 rounded-full bg-current"
          style={{ backgroundColor: open ? "var(--color-void)" : "currentColor" }}
        />
        <motion.span
          animate={
            open
              ? { rotate: -45, y: 0, width: 16 }
              : { rotate: 0, y: 3.5, width: 10 }
          }
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="absolute h-[1.5px] rounded-full self-end"
          style={{ backgroundColor: open ? "var(--color-void)" : "currentColor" }}
        />
      </div>
    </motion.button>
  );
}

// ─── Nav links data ──────────────────────────────────────

const navLinks = [
  { href: "/docs/components-overview", label: "Components" },
  { href: "/templates", label: "Templates" },
  { href: "/customize", label: "Customize" },
  { href: "/examples", label: "Examples" },
  { href: "/docs", label: "Docs" },
];

const mobileLinks = [
  ...navLinks,
  { href: "/changelog", label: "Changelog" },
];

// ─── Animation variants ─────────────────────────────────

const panelVariants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
  open: {
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: 50 },
  open: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const footerVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { delay: 0.4, duration: 0.4 },
  },
};

// ─── Navbar ──────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-void/85 backdrop-blur-xl"
      >
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ignite">
              <span className="font-pixel text-sm font-bold text-void">P</span>
            </div>
            <span className="font-pixel text-lg font-semibold text-chalk">
              Praxys UI
            </span>
          </Link>

          {/* Desktop Nav — centered */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-blush transition-colors hover:text-chalk"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side — desktop */}
          <div className="hidden items-center gap-3 md:flex">
            <CommandPalette />
            <ThemeToggle />
            <a
              href="https://github.com/sushanttverma/Praxys-UI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star Praxys UI on GitHub"
              className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-blush transition-colors hover:border-border-light hover:text-chalk"
            >
              <Github className="h-4 w-4" />
              <Star className="h-3 w-3 fill-current text-amber-400" />
              <span className="text-xs font-medium">Star</span>
            </a>
          </div>

          {/* Mobile — right side */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <HamburgerButton
              open={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            />
          </div>
        </div>
      </nav>

      {/* ─── Mobile slide-in panel (right to left) ──── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-void/70 backdrop-blur-md md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 z-40 flex w-[85vw] max-w-sm flex-col bg-void border-l border-border/60 md:hidden"
            >
              {/* Top accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="h-[2px] bg-gradient-to-r from-ignite via-ignite/50 to-transparent origin-left"
              />

              {/* Header area */}
              <div className="flex items-center justify-between px-6 pt-20 pb-6">
                <span className="font-pixel text-xs uppercase tracking-widest text-ignite">
                  Navigation
                </span>
                <span className="font-mono text-[10px] text-text-faint">
                  {mobileLinks.length} pages
                </span>
              </div>

              {/* Links */}
              <div className="flex flex-col px-3 flex-1">
                {mobileLinks.map((link, i) => (
                  <motion.div key={link.href} variants={linkVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center justify-between rounded-xl px-4 py-4 transition-colors hover:bg-obsidian"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[10px] text-text-faint w-5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-lg font-medium text-chalk">
                          {link.label}
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-text-faint opacity-0 -translate-x-1 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-ignite" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <motion.div
                variants={footerVariants}
                className="mt-auto border-t border-border/50 px-6 py-6"
              >
                <a
                  href="https://github.com/sushanttverma/Praxys-UI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-border bg-obsidian px-4 py-3 text-sm text-blush transition-colors hover:border-ignite/40 hover:text-chalk"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="h-4 w-4" />
                    <span>Star on GitHub</span>
                  </div>
                  <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
                </a>
                <p className="mt-4 text-center font-pixel text-[10px] tracking-widest text-text-faint">
                  ui.praxys.xyz
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
