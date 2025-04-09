"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Github, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border/60 bg-void/85 backdrop-blur-xl">
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
            href="/docs/components"
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
          <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-obsidian px-3 text-sm text-text-faint transition-colors hover:border-border-light hover:text-blush">
            <Search className="h-3.5 w-3.5" />
            <span>Search...</span>
            <kbd className="ml-4 rounded border border-border bg-void px-1.5 py-0.5 font-mono text-[10px] text-text-faint">
              Ctrl K
            </kbd>
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-blush transition-colors hover:border-border-light hover:text-chalk"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-blush md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
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
                href="/docs/components"
                className="rounded-lg px-3 py-2.5 text-sm text-blush transition-colors hover:bg-void hover:text-chalk"
              >
                Components
              </Link>
              <Link
                href="/templates"
                className="rounded-lg px-3 py-2.5 text-sm text-blush transition-colors hover:bg-void hover:text-chalk"
              >
                Templates
              </Link>
              <Link
                href="/docs"
                className="rounded-lg px-3 py-2.5 text-sm text-blush transition-colors hover:bg-void hover:text-chalk"
              >
                Docs
              </Link>
              <div className="my-2 border-t border-border" />
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-blush transition-colors hover:bg-void hover:text-chalk"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
