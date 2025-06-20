"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const componentCategories = [
  {
    name: "Buttons & Inputs",
    count: 4,
    items: ["Animated Button", "Creepy Button", "Social Flip Button", "Animated Toggle"],
  },
  {
    name: "Cards & Layout",
    count: 7,
    items: [
      "Glow Border Card",
      "Spotlight Card",
      "Testimonials Card",
      "Staggered Grid",
      "Expandable Bento Grid",
      "Perspective Grid",
      "Modal Dialog",
    ],
  },
  {
    name: "Text Effects",
    count: 7,
    items: [
      "3D Displacement Text",
      "Flip Text",
      "Flip Fade Text",
      "Animated Number",
      "Animated Counter",
      "Typewriter Text",
      "Morphing Text",
    ],
  },
  {
    name: "Navigation & Menus",
    count: 8,
    items: [
      "Spotlight Navbar",
      "Glass Dock",
      "Line Hover Link",
      "Accordion",
      "Animated Tabs",
      "Dropdown Menu",
      "Tooltip",
      "Command Menu",
    ],
  },
  {
    name: "Visual Effects",
    count: 11,
    items: [
      "Liquid Ocean",
      "Liquid Metal",
      "Light Lines",
      "Reveal Loader",
      "Toast Notification",
      "Magnetic Cursor",
      "Parallax Scroll",
      "Gradient Mesh",
      "Skeleton Loader",
      "Progress Bar",
      "Stepper",
    ],
  },
  {
    name: "Media & Content",
    count: 7,
    items: [
      "Animated Hero",
      "Masked Avatars",
      "Folder Preview",
      "Interactive Book",
      "Logo Slider",
      "Image Comparison",
      "Infinite Scroll",
    ],
  },
];

export default function ComponentGrid() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-ignite"
          >
            Explore
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-pixel text-3xl font-bold text-chalk md:text-5xl"
          >
            44 Components
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-lg text-blush"
          >
            From animated buttons to immersive layouts. Everything you need to
            build a standout UI.
          </motion.p>
        </div>

        {/* Category grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {componentCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-obsidian p-6 transition-all hover:border-border-light"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-pixel text-base font-semibold text-chalk">
                  {cat.name}
                </h3>
                <span className="rounded-full bg-ignite-dim px-2.5 py-0.5 text-xs font-medium text-ignite">
                  {cat.count}
                </span>
              </div>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-blush transition-colors hover:text-chalk"
                  >
                    <div className="h-1 w-1 rounded-full bg-ignite/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/docs/components-overview"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ignite transition-colors hover:text-blush"
          >
            View all components
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
