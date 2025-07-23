"use client";

import { useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Navbar, { HamburgerButton } from "../components/Navbar";

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

        <main className="min-w-0 flex-1 px-6 py-10 lg:px-12 lg:py-12">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
