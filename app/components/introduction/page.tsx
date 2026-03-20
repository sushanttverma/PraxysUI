import type { Metadata } from "next";
import Navbar from "../Navbar";
import ComponentSidebar from "../shared/ComponentSidebar";
import Footer from "../Footer";
import { componentCount } from "@/lib/registry";

export const metadata: Metadata = {
  title: "Introduction | Praxys UI",
  description: "An open-source collection of animated React components you can copy-paste into your projects.",
};

export default function IntroductionPage() {
  return (
    <div className="min-h-screen bg-[var(--color-void)]">
      <Navbar />
      <div className="flex">
        <ComponentSidebar activeSlug="introduction" />

        <main className="min-w-0 flex-1 px-8 pb-16 pt-24 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--color-chalk)] sm:text-5xl">
              Introduction
            </h1>

            <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-[var(--color-blush)]">
              <p>
                Praxys UI is an open-source collection of{" "}
                <span className="text-[var(--color-chalk)]">{componentCount}+ carefully crafted animated React components</span>{" "}
                that aim to enhance your React web applications.
              </p>

              <p>
                This is not your typical component library, which means you won&apos;t find a set of generic buttons,
                inputs, or other common UI elements here.
              </p>

              <p>
                These components are here to help you stand out and make a statement visually by adding
                a touch of creativity to your projects.
              </p>
            </div>

            <h2 className="mt-14 text-3xl font-bold text-[var(--color-chalk)]">Mission</h2>

            <div className="mt-6 space-y-6 text-[15px] leading-relaxed text-[var(--color-blush)]">
              <p>
                The goal of Praxys UI is simple — provide flexible, visually stunning and most importantly,{" "}
                <span className="text-[var(--color-chalk)]">free components</span> that take web projects to the next level.
              </p>

              <p>To make that happen, the project is committed to the following principles:</p>

              <ul className="space-y-3 pl-1">
                <li className="flex gap-3">
                  <span className="mt-0.5 text-[var(--color-chalk)]">•</span>
                  <span>
                    <span className="font-medium text-[var(--color-blush)]">Free For All:</span>{" "}
                    You own the code, and it&apos;s free to use in your projects
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 text-[var(--color-chalk)]">•</span>
                  <span>
                    <span className="font-medium text-[var(--color-blush)]">Prop-First Approach:</span>{" "}
                    Easy customization through thoughtfully exposed props
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 text-[var(--color-chalk)]">•</span>
                  <span>
                    <span className="font-medium text-[var(--color-blush)]">Fully Modular:</span>{" "}
                    Install strictly what you need, Praxys UI is not a dependency
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 text-[var(--color-chalk)]">•</span>
                  <span>
                    <span className="font-medium text-[var(--color-blush)]">Copy &amp; Paste:</span>{" "}
                    Every component can be copied directly into your project
                  </span>
                </li>
              </ul>
            </div>

            <h2 className="mt-14 text-3xl font-bold text-[var(--color-chalk)]">Quick Start</h2>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--color-blush)]">
              <p>Install any component with a single command:</p>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] px-5 py-4">
                <code className="font-mono text-sm text-[var(--color-blush)]">
                  npx @praxys/ui add [component]
                </code>
              </div>
              <p>
                Or browse the sidebar to explore components by category. Click any component to see a live preview,
                props documentation, and installation instructions.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
