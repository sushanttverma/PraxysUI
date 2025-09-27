"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

// Inline mini-demos — lightweight versions rendered directly
import AnimatedButton from "@/app/components/ui/animated-button";
import FlipText from "@/app/components/ui/flip-text";
import GlowBorderCard from "@/app/components/ui/glow-border-card";
import AnimatedNumber from "@/app/components/ui/animated-number";
import LineHoverLink from "@/app/components/ui/line-hover-link";
import GlassDock from "@/app/components/ui/glass-dock";
import SpotlightNavbar from "@/app/components/ui/spotlight-navbar";
import CreepyButton from "@/app/components/ui/creepy-button";
import TypewriterText from "@/app/components/ui/typewriter-text";
import MorphingText from "@/app/components/ui/morphing-text";
import SpotlightCard from "@/app/components/ui/spotlight-card";
import SkeletonLoader from "@/app/components/ui/skeleton-loader";
import { Home, Search, Palette, Code2, Settings } from "lucide-react";

interface ShowcaseItem {
  title: string;
  slug: string;
  category: string;
  demo: React.ReactNode;
}

const showcaseItems: ShowcaseItem[] = [
  {
    title: "Animated Button",
    slug: "animated-button",
    category: "Buttons",
    demo: (
      <div className="flex items-center justify-center">
        <AnimatedButton>Get Started</AnimatedButton>
      </div>
    ),
  },
  {
    title: "Flip Text",
    slug: "flip-text",
    category: "Text Effects",
    demo: (
      <div className="flex items-center justify-center">
        <FlipText
          text="Praxys UI"
          className="text-2xl font-bold text-chalk font-pixel"
        />
      </div>
    ),
  },
  {
    title: "Glow Border Card",
    slug: "glow-border-card",
    category: "Cards",
    demo: (
      <GlowBorderCard className="!p-4">
        <p className="text-xs font-medium text-chalk">Hover me</p>
        <p className="mt-1 text-[10px] text-blush">
          Cursor-following glow effect
        </p>
      </GlowBorderCard>
    ),
  },
  {
    title: "Animated Number",
    slug: "animated-number",
    category: "Text Effects",
    demo: (
      <div className="flex items-center justify-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-chalk">
            <AnimatedNumber value={1234} />
          </div>
          <p className="text-[10px] text-blush">Users</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-ignite">
            <AnimatedNumber
              value={99}
              formatFn={(n) => `${Math.round(n)}%`}
            />
          </div>
          <p className="text-[10px] text-blush">Uptime</p>
        </div>
      </div>
    ),
  },
  {
    title: "Line Hover Link",
    slug: "line-hover-link",
    category: "Navigation",
    demo: (
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <LineHoverLink href="#">Documentation</LineHoverLink>
        <LineHoverLink href="#" lineColor="var(--color-blush)">
          Components
        </LineHoverLink>
      </div>
    ),
  },
  {
    title: "Glass Dock",
    slug: "glass-dock",
    category: "Navigation",
    demo: (
      <div className="flex items-center justify-center">
        <GlassDock
          items={[
            { icon: <Home className="h-full w-full" />, label: "Home" },
            { icon: <Search className="h-full w-full" />, label: "Search" },
            { icon: <Palette className="h-full w-full" />, label: "Design" },
            { icon: <Code2 className="h-full w-full" />, label: "Code" },
            {
              icon: <Settings className="h-full w-full" />,
              label: "Settings",
            },
          ]}
        />
      </div>
    ),
  },
  {
    title: "Spotlight Navbar",
    slug: "spotlight-navbar",
    category: "Navigation",
    demo: (
      <div className="flex items-center justify-center">
        <SpotlightNavbar
          items={[
            { label: "Home", href: "#home" },
            { label: "Docs", href: "#docs" },
            { label: "Blog", href: "#blog" },
          ]}
        />
      </div>
    ),
  },
  {
    title: "Creepy Button",
    slug: "creepy-button",
    category: "Buttons",
    demo: (
      <div className="flex items-center justify-center">
        <CreepyButton>Enter</CreepyButton>
      </div>
    ),
  },
  {
    title: "Typewriter Text",
    slug: "typewriter-text",
    category: "Text Effects",
    demo: (
      <div className="flex items-center justify-center">
        <TypewriterText
          strings={["Build faster.", "Ship sooner.", "Look incredible."]}
          className="text-xl font-bold text-chalk font-pixel"
        />
      </div>
    ),
  },
  {
    title: "Morphing Text",
    slug: "morphing-text",
    category: "Text Effects",
    demo: (
      <div className="flex items-center justify-center">
        <MorphingText
          words={["Design", "Develop", "Deploy"]}
          className="text-2xl font-bold text-chalk font-pixel"
        />
      </div>
    ),
  },
  {
    title: "Spotlight Card",
    slug: "spotlight-card",
    category: "Cards",
    demo: (
      <SpotlightCard className="!p-4">
        <p className="text-xs font-medium text-chalk">Hover me</p>
        <p className="mt-1 text-[10px] text-blush">
          Cursor-following spotlight effect
        </p>
      </SpotlightCard>
    ),
  },
  {
    title: "Skeleton Loader",
    slug: "skeleton-loader",
    category: "Visual",
    demo: (
      <div className="flex flex-col gap-2 w-full px-4">
        <SkeletonLoader variant="text" count={3} />
        <div className="flex items-center gap-3 mt-1">
          <SkeletonLoader variant="avatar" />
          <SkeletonLoader variant="button" />
        </div>
      </div>
    ),
  },
];

export default function ComponentShowcase() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Section header */}
      <div className="mx-auto mb-16 max-w-7xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 text-sm font-medium uppercase tracking-widest text-ignite"
        >
          Components
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-pixel text-3xl font-bold text-chalk md:text-5xl"
        >
          See them in action
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-blush"
        >
          Every component is interactive. Hover, click, and explore right here.
        </motion.p>
      </div>

      {/* Scrolling row 1 - left */}
      <div className="mb-4 flex overflow-hidden">
        <div className="animate-marquee flex gap-4">
          {[...showcaseItems.slice(0, 6), ...showcaseItems.slice(0, 6)].map(
            (item, i) => (
              <ShowcaseCard key={`row1-${i}`} item={item} />
            )
          )}
        </div>
      </div>

      {/* Scrolling row 2 - right (reversed) */}
      <div className="flex overflow-hidden">
        <div
          className="animate-marquee flex gap-4"
          style={{ animationDirection: "reverse", animationDuration: "35s" }}
        >
          {[...showcaseItems.slice(6), ...showcaseItems.slice(6)].map(
            (item, i) => (
              <ShowcaseCard key={`row2-${i}`} item={item} />
            )
          )}
        </div>
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void to-transparent" />
    </section>
  );
}

function ShowcaseCard({
  item,
}: {
  item: ShowcaseItem;
}) {
  const router = useRouter();

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/components/${item.slug}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/components/${item.slug}`);
        }
      }}
      className="card-glow group w-[320px] shrink-0 cursor-pointer rounded-2xl border border-border bg-obsidian transition-all hover:border-border-light block"
    >
      {/* Live demo area */}
      <div className="relative h-44 overflow-hidden rounded-t-2xl border-b border-border/50 bg-void/50 p-4 flex items-center justify-center">
        {/* Prevent click propagation on interactive elements */}
        <div
          className="w-full"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {item.demo}
        </div>

        {/* Hover overlay with arrow */}
        <div className="absolute inset-0 flex items-center justify-center bg-void/0 opacity-0 transition-all duration-300 group-hover:bg-void/40 group-hover:opacity-100 pointer-events-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ignite/30 bg-obsidian/90 text-ignite">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-pixel text-sm font-semibold text-chalk transition-colors group-hover:text-ignite">
            {item.title}
          </h3>
          <span className="rounded-full bg-ignite-dim px-2 py-0.5 text-[10px] font-medium text-ignite">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
}
