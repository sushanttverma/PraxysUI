import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../../Navbar";
import ComponentSidebar from "../../shared/ComponentSidebar";
import Footer from "../../Footer";

export const metadata: Metadata = {
  title: "Gradient Maker | Praxys UI",
  description: "Create beautiful gradients with an interactive editor and export CSS, Tailwind, or SVG code.",
};

export default function GradientMakerToolPage() {
  return (
    <div className="min-h-screen bg-[var(--color-void)]">
      <Navbar />
      <div className="flex">
        <ComponentSidebar activeSlug="gradient-maker" />
        <main className="min-w-0 flex-1 px-8 pb-16 pt-24 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-pixel text-4xl font-bold tracking-tight text-[var(--color-chalk)]">
              Gradient Maker
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-blush)]">
              Create beautiful gradients with an interactive blob-based editor.
              Add color stops, adjust positions, and export as CSS, Tailwind, or SVG.
            </p>

            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-[var(--color-chalk)]">Features</h2>
              <ul className="space-y-2 text-[15px] text-[var(--color-text-faint)]">
                <li className="flex gap-3"><span className="text-[var(--color-ignite)]">•</span>Interactive blob-based gradient editor</li>
                <li className="flex gap-3"><span className="text-[var(--color-ignite)]">•</span>Add, remove, and reposition color blobs</li>
                <li className="flex gap-3"><span className="text-[var(--color-ignite)]">•</span>Export as CSS, Tailwind, or SVG</li>
                <li className="flex gap-3"><span className="text-[var(--color-ignite)]">•</span>Custom background color</li>
              </ul>
            </div>

            <Link
              href="/gradient-maker"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-[var(--color-ignite)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Launch Gradient Maker
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
