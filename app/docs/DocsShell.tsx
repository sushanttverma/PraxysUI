"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Navbar, { HamburgerButton } from "../components/Navbar";
import BackToTop from "../components/BackToTop";

// ─── Slim docs footer ───────────────────────────────────

function DocsFooter() {
  return (
    <footer className="mt-16 border-t border-border py-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-text-faint">
          &copy; {new Date().getFullYear()} Praxys UI. Built with Next.js,
          Tailwind CSS & Framer Motion.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/changelog"
            className="text-xs text-text-faint transition-colors hover:text-blush"
          >
            Changelog
          </Link>
          <a
            href="https://github.com/sushanttverma/Praxys-UI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-text-faint transition-colors hover:text-blush"
          >
            <Github className="h-3 w-3" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── DocsShell ───────────────────────────────────────────

export default function DocsShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="min-h-screen bg-void">
      {/* Shared Navbar with sidebar toggle injected on the left */}
      <Navbar
        leftSlot={
          <div className="lg:hidden">
            <HamburgerButton
              open={sidebarOpen}
              onClick={() => setSidebarOpen((prev) => !prev)}
              label="sidebar"
            />
          </div>
        }
      />

      {/* Layout body */}
      <div className="flex min-h-screen pt-16">
        <Sidebar open={sidebarOpen} onClose={closeSidebar} />

        <main id="main-content" className="min-w-0 flex-1 px-6 py-10 lg:px-12 lg:py-12">
          <div className="mx-auto max-w-3xl">
            {children}
            <DocsFooter />
          </div>
        </main>
      </div>

      <BackToTop />
    </div>
  );
}
