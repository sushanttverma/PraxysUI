import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../../Navbar";
import ComponentSidebar from "../../shared/ComponentSidebar";
import Footer from "../../Footer";

export const metadata: Metadata = {
  title: "Background Studio | Praxys UI",
  description: "Interactive background customizer — preview, tweak props, and export code for WebGL backgrounds.",
};

export default function BackgroundStudioToolPage() {
  return (
    <div className="min-h-screen bg-[var(--color-void)]">
      <Navbar />
      <div className="flex">
        <ComponentSidebar activeSlug="background-studio" />
        <main className="min-w-0 flex-1 px-8 pb-16 pt-24 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-pixel text-4xl font-bold tracking-tight text-[var(--color-chalk)]">
              Background Studio
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-blush)]">
              An interactive playground for WebGL background components. Preview backgrounds in real-time,
              tweak every prop with live controls, and export ready-to-use code.
            </p>

            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-[var(--color-chalk)]">Features</h2>
              <ul className="space-y-2 text-[15px] text-[var(--color-text-faint)]">
                <li className="flex gap-3">
                  <span className="text-[var(--color-ignite)]">•</span>
                  Live preview with full-screen canvas
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-ignite)]">•</span>
                  Real-time prop controls — colors, speed, scale, and more
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-ignite)]">•</span>
                  Export JSX code with your custom prop values
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-ignite)]">•</span>
                  Download PNG screenshots or record WebM video
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-ignite)]">•</span>
                  CLI install commands for every background
                </li>
              </ul>
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-[var(--color-chalk)]">Available Backgrounds</h2>
              <p className="text-[15px] text-[var(--color-text-faint)]">
                24 backgrounds including Silk, Aurora, Particles, Liquid Chrome, Balatro, Dither,
                Beams, Prism, Liquid Ether, and more. Each with fully customizable props.
              </p>
            </div>

            <Link
              href="/background-studio"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-[var(--color-ignite)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Launch Background Studio
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
