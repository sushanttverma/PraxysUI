"use client";

import { motion } from "framer-motion";
import { Copy, Paintbrush, Zap, Package, Accessibility, Moon } from "lucide-react";

const features = [
  {
    icon: Copy,
    title: "Copy & Paste",
    description:
      "No bloated dependencies. Just copy the component code directly into your project.",
  },
  {
    icon: Paintbrush,
    title: "Fully Customizable",
    description:
      "Every component uses Tailwind CSS and accepts custom props. Make it yours.",
  },
  {
    icon: Zap,
    title: "Animated & Performant",
    description:
      "Smooth animations powered by Framer Motion. GPU-accelerated and silky smooth.",
  },
  {
    icon: Package,
    title: "TypeScript First",
    description:
      "Full TypeScript support with proper types and IntelliSense out of the box.",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description:
      "Built with WAI-ARIA standards. Keyboard navigable and screen reader friendly.",
  },
  {
    icon: Moon,
    title: "Dark Mode Ready",
    description:
      "All components look stunning in both light and dark modes by default.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
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
            Why Praxys UI
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-pixel text-3xl font-bold text-chalk md:text-5xl"
          >
            Built for developers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-lg text-blush"
          >
            Not another component library. Just beautifully crafted components
            you can copy into your projects.
          </motion.p>
        </div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group rounded-2xl border border-border bg-obsidian p-8 transition-all hover:border-border-light"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-ignite-dim transition-colors group-hover:border-ignite/30">
                <feature.icon className="h-5 w-5 text-ignite" />
              </div>
              <h3 className="font-pixel text-lg font-semibold text-chalk">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-blush">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
