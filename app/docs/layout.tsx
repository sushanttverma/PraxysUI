"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Github, Menu } from "lucide-react";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-void">
      {/* Docs Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/60 bg-void/85 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-blush hover:text-chalk lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>

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
            <button className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-obsidian px-3 text-sm text-text-faint transition-colors hover:border-border-light hover:text-blush sm:flex">
              <Search className="h-3.5 w-3.5" />
              <span>Search...</span>
              <kbd className="ml-4 rounded border border-border bg-void px-1.5 py-0.5 font-mono text-[10px] text-text-faint">
                Ctrl K
              </kbd>
            </button>
            <ThemeToggle />
            <a
              href="https://github.com"
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
      <div className="flex pt-16">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="min-w-0 flex-1 px-6 py-10 lg:px-12 lg:py-12">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
