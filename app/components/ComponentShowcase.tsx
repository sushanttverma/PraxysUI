"use client";

import { motion } from "framer-motion";

const showcaseCards = [
  {
    title: "Animated Hero",
    description: "Eye-catching hero sections with smooth animations",
    gradient: "from-ignite/20 to-blush/10",
  },
  {
    title: "Glow Border Card",
    description: "Cards with dynamic glowing border effects",
    gradient: "from-blush/20 to-ignite/10",
  },
  {
    title: "3D Displacement Text",
    description: "Stunning 3D text effects with liquid displacement",
    gradient: "from-ignite/15 to-transparent",
  },
  {
    title: "Glass Dock",
    description: "macOS-style dock with glassmorphism effects",
    gradient: "from-blush/15 to-ignite/5",
  },
  {
    title: "Flip Text",
    description: "Animated text flip transitions and reveals",
    gradient: "from-ignite/20 to-blush/10",
  },
  {
    title: "Spotlight Navbar",
    description: "Navigation with interactive spotlight effect",
    gradient: "from-blush/20 to-ignite/10",
  },
  {
    title: "Perspective Grid",
    description: "3D perspective grid layout with hover effects",
    gradient: "from-ignite/15 to-transparent",
  },
  {
    title: "Staggered Grid",
    description: "Grid layout with staggered entrance animations",
    gradient: "from-blush/15 to-ignite/5",
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
          Crafted with care
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-blush"
        >
          Every component is designed to be beautiful, accessible, and easy to
          customize.
        </motion.p>
      </div>

      {/* Scrolling row 1 - left */}
      <div className="mb-4 flex overflow-hidden">
        <div className="animate-marquee flex gap-4">
          {[...showcaseCards, ...showcaseCards].map((card, i) => (
            <ShowcaseCard key={`row1-${i}`} card={card} />
          ))}
        </div>
      </div>

      {/* Scrolling row 2 - right (reversed) */}
      <div className="flex overflow-hidden">
        <div
          className="animate-marquee flex gap-4"
          style={{ animationDirection: "reverse", animationDuration: "35s" }}
        >
          {[...showcaseCards.slice(4), ...showcaseCards.slice(0, 4), ...showcaseCards.slice(4), ...showcaseCards.slice(0, 4)].map(
            (card, i) => (
              <ShowcaseCard key={`row2-${i}`} card={card} />
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

function ShowcaseCard({ card }: { card: (typeof showcaseCards)[number] }) {
  return (
    <div className="card-glow group w-[320px] shrink-0 cursor-pointer rounded-2xl border border-border bg-obsidian p-6 transition-all hover:border-border-light">
      {/* Preview area */}
      <div
        className={`mb-5 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} border border-border/50`}
      >
        <div className="flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-ignite/40 transition-all group-hover:bg-ignite/70"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Card content */}
      <h3 className="font-pixel text-base font-semibold text-chalk transition-colors group-hover:text-ignite">
        {card.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-text-faint">
        {card.description}
      </p>
    </div>
  );
}
