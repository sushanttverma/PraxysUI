"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import CommandPalette from "./CommandPalette";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-40 border-b border-border/60 bg-void/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ignite">
            <span className="font-pixel text-sm font-bold text-void">P</span>
          </div>
          <span className="font-pixel text-lg font-semibold text-chalk">
            Praxys UI
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
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
          <Link
            href="/docs"
            className="text-sm text-blush transition-colors hover:text-chalk"
          >
            Docs
          </Link>
        </div>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex">
          <CommandPalette />
          <ThemeToggle />
          <a
            href="https://github.com/sushanttverma/Praxys-UI"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Praxys UI on GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-blush transition-colors hover:border-border-light hover:text-chalk"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-blush md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 bg-obsidian p-4">
              <Link
                href="/docs/components-overview"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-blush transition-colors hover:bg-void hover:text-chalk"
              >
                Components
              </Link>
              <Link
                href="/templates"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-blush transition-colors hover:bg-void hover:text-chalk"
              >
                Templates
              </Link>
              <Link
                href="/docs"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-blush transition-colors hover:bg-void hover:text-chalk"
              >
                Docs
              </Link>
              <Link
                href="/changelog"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-blush transition-colors hover:bg-void hover:text-chalk"
              >
                Changelog
              </Link>
              <div className="my-2 border-t border-border" />
              <div className="flex items-center gap-3 px-3 py-2.5">
                <ThemeToggle />
                <a
            href="https://github.com/sushanttverma/Praxys-UI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blush transition-colors hover:text-chalk"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
