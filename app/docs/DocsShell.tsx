"use client";

import { useState } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import CommandPalette from "../components/CommandPalette";

// ─── Animated hamburger (matching main Navbar) ──────────

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
      aria-label={open ? "Close sidebar" : "Open sidebar"}
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
          className="absolute h-[1.5px] w-3 rounded-full"
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

// ─── DocsShell ───────────────────────────────────────────

export default function DocsShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-void">
      {/* Docs Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/60 bg-void/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Mobile sidebar toggle */}
            <div className="lg:hidden">
              <HamburgerButton
                open={sidebarOpen}
                onClick={() => setSidebarOpen((prev) => !prev)}
              />
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ignite">
                <span className="font-pixel text-sm font-bold text-void">
                  P
                </span>
              </div>
              <span className="font-pixel text-lg font-semibold text-chalk">
                Praxys UI
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav className="ml-6 hidden items-center gap-6 lg:flex">
              <Link
                href="/docs"
                className="text-sm text-blush transition-colors hover:text-chalk"
              >
                Docs
              </Link>
              <Link
                href="/docs/components-overview"
                className="text-sm text-blush transition-colors hover:text-chalk"
              >
                Components
              </Link>
              <Link
                href="/templates"
                className="text-sm text-blush transition-colors hover:text-chalk"
              >
                Templates
              </Link>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex">
              <CommandPalette />
            </div>
            <ThemeToggle />
            <a
              href="https://github.com/sushanttverma/Praxys-UI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-blush transition-colors hover:border-border-light hover:text-chalk"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Layout body */}
      <div className="flex min-h-screen pt-16">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="min-w-0 flex-1 px-6 py-10 lg:px-12 lg:py-12">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
