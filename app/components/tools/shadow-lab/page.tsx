import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../../Navbar";
import ComponentSidebar from "../../shared/ComponentSidebar";
import Footer from "../../Footer";

export const metadata: Metadata = {
  title: "Shadow Lab | Praxys UI",
  description: "Design layered box-shadow effects with live preview and export CSS or Tailwind code.",
};

export default function ShadowLabToolPage() {
  return (
    <div className="min-h-screen bg-[var(--color-void)]">
      <Navbar />
      <div className="flex">
        <ComponentSidebar activeSlug="shadow-lab" />
        <main className="min-w-0 flex-1 px-8 pb-16 pt-24 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-pixel text-4xl font-bold tracking-tight text-[var(--color-chalk)]">
              Shadow Lab
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-blush)]">
              Design layered box-shadow effects visually. Stack multiple shadow layers,
              adjust offsets, blur, spread, and color — then export the code.
            </p>

            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-[var(--color-chalk)]">Features</h2>
              <ul className="space-y-2 text-[15px] text-[var(--color-text-faint)]">
                <li className="flex gap-3"><span className="text-[var(--color-ignite)]">•</span>Multi-layer shadow stacking</li>
                <li className="flex gap-3"><span className="text-[var(--color-ignite)]">•</span>Per-layer offset, blur, spread, and color controls</li>
                <li className="flex gap-3"><span className="text-[var(--color-ignite)]">•</span>Live preview on customizable shape</li>
                <li className="flex gap-3"><span className="text-[var(--color-ignite)]">•</span>Export as CSS or Tailwind</li>
              </ul>
            </div>

            <Link
              href="/shadow-lab"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-[var(--color-ignite)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Launch Shadow Lab
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
