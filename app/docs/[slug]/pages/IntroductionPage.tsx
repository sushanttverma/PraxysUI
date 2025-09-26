import Link from "next/link";
import { ArrowRight, Zap, Palette, Code2, Layers } from "lucide-react";

export default function IntroductionPage() {
  return (
    <div className="space-y-10">
      <div>
        <p className="mb-2 font-pixel text-xs uppercase tracking-wider text-ignite">
          Getting Started
        </p>
        <h1 className="font-pixel text-3xl font-bold text-chalk">
          Introduction
        </h1>
        <p className="mt-3 text-lg text-blush">
          Welcome to <strong className="text-chalk">Praxys UI</strong>, a
          curated collection of beautifully crafted, animated React components.
          Build stunning interfaces with precision and speed.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          {
            icon: Zap,
            title: "Copy & Paste",
            desc: "No npm install for components. Just copy the code and customize it.",
          },
          {
            icon: Palette,
            title: "Fully Customizable",
            desc: "Every component uses Tailwind CSS and accepts className props.",
          },
          {
            icon: Code2,
            title: "TypeScript First",
            desc: "Full type safety with well-defined props and interfaces.",
          },
          {
            icon: Layers,
            title: "Animated",
            desc: "Powered by Framer Motion for smooth, performant animations.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border bg-obsidian/50 p-5"
          >
            <item.icon className="mb-3 h-5 w-5 text-ignite" />
            <h3 className="text-sm font-semibold text-chalk">{item.title}</h3>
            <p className="mt-1 text-sm text-blush">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Quick start */}
      <div>
        <h2 className="mb-4 font-pixel text-xl font-semibold text-chalk">
          Quick Start
        </h2>
        <p className="mb-4 text-blush">
          Get started in three simple steps:
        </p>
        <ol className="space-y-3 text-blush">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ignite/10 font-pixel text-xs text-ignite">
              1
            </span>
            <span>
              Set up a{" "}
              <Link href="/docs/installation" className="text-ignite hover:underline">
                Next.js project
              </Link>{" "}
              with Tailwind CSS
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ignite/10 font-pixel text-xs text-ignite">
              2
            </span>
            <span>
              Add the{" "}
              <Link href="/docs/add-utilities" className="text-ignite hover:underline">
                cn() utility
              </Link>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ignite/10 font-pixel text-xs text-ignite">
              3
            </span>
            <span>
              Browse{" "}
              <Link
                href="/components"
                className="text-ignite hover:underline"
              >
                components
              </Link>{" "}
              and copy what you need
            </span>
          </li>
        </ol>
      </div>

      {/* CTA */}
      <Link
        href="/docs/installation"
        className="group inline-flex items-center gap-2 rounded-lg bg-ignite px-5 py-2.5 text-sm font-medium text-void transition-all hover:bg-ignite/90"
      >
        Get Started
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
