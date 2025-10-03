"use client";

import { motion } from "framer-motion";
import AnimatedButton from "@/app/components/ui/animated-button";
import SpotlightCard from "@/app/components/ui/spotlight-card";
import MorphingText from "@/app/components/ui/morphing-text";
import CreepyButton from "@/app/components/ui/creepy-button";
import AnimatedNumber from "@/app/components/ui/animated-number";
import { COMPONENT_COUNT, TEMPLATE_COUNT, CATEGORY_COUNT } from "@/lib/site-stats";

const cellVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function DemoCell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={cellVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl border border-border bg-obsidian/40 backdrop-blur-sm p-6 flex items-center justify-center transition-colors duration-300 hover:border-ignite/20 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function FeatureCell({
  title,
  description,
  className = "",
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <motion.div
      variants={cellVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl border border-border bg-obsidian/40 backdrop-blur-sm p-8 flex flex-col justify-center transition-colors duration-300 hover:border-ignite/20 ${className}`}
    >
      <h3 className="font-pixel text-xl sm:text-2xl font-bold text-chalk mb-2">
        {title}
      </h3>
      <p className="text-sm text-blush leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function BentoShowcase() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section label */}
        <motion.p
          className="font-mono text-xs text-blush tracking-wide mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {"// explore the library"}
        </motion.p>

        {/* Bento grid — explicit placement on lg */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
          style={{
            gridTemplateRows:
              "repeat(4, minmax(180px, auto))" /* only affects lg via the col placements */,
          }}
        >
          {/* ── Row 1-2, Col 1-2: Demo 1 — AnimatedButton (tall) ── */}
          <DemoCell className="lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1 flex-col gap-4">
            <AnimatedButton>Click me</AnimatedButton>
            <AnimatedButton className="bg-ignite/20 border-ignite/40 text-sm">
              Hover effect
            </AnimatedButton>
          </DemoCell>

          {/* ── Row 1, Col 3-4: Demo 2 — SpotlightCard ── */}
          <DemoCell className="lg:col-span-2 lg:col-start-3 lg:row-start-1 p-0">
            <SpotlightCard className="w-full h-full border-0 rounded-2xl">
              <h4 className="text-sm font-medium text-chalk mb-1">
                Spotlight Card
              </h4>
              <p className="text-xs text-blush">
                Move your cursor to see the spotlight follow.
              </p>
            </SpotlightCard>
          </DemoCell>

          {/* ── Row 1-2, Col 5-6: Feature — Copy & Paste (tall) ── */}
          <FeatureCell
            title="Copy & Paste"
            description="No npm install, no package lock-in. Just grab the code and drop it in your project. Every component is self-contained."
            className="lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-1"
          />

          {/* ── Row 2, Col 3-4: Demo 3 — MorphingText ── */}
          <DemoCell className="lg:col-span-2 lg:col-start-3 lg:row-start-2">
            <MorphingText
              words={["Modern", "Animated", "Beautiful", "Yours"]}
              className="text-xl font-bold text-chalk font-pixel"
              interval={2500}
            />
          </DemoCell>

          {/* ── Row 3-4, Col 1-2: Feature — Animated & Performant (tall) ── */}
          <FeatureCell
            title="Animated & Performant"
            description="Powered by Framer Motion with GPU-accelerated transforms. 60fps animations that feel native, not janky."
            className="lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-3"
          />

          {/* ── Row 3, Col 3-4: Demo 4 — CreepyButton ── */}
          <DemoCell className="lg:col-span-2 lg:col-start-3 lg:row-start-3">
            <CreepyButton>Hover me</CreepyButton>
          </DemoCell>

          {/* ── Row 3, Col 5-6: Demo 5 — AnimatedNumber (wide stats) ── */}
          <DemoCell className="md:col-span-2 lg:col-span-2 lg:col-start-5 lg:row-start-3">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <AnimatedNumber
                  value={COMPONENT_COUNT}
                  className="text-3xl font-bold text-chalk font-pixel"
                />
                <p className="text-xs text-blush mt-1">Components</p>
              </div>
              <div className="text-center">
                <AnimatedNumber
                  value={TEMPLATE_COUNT}
                  className="text-3xl font-bold text-chalk font-pixel"
                />
                <p className="text-xs text-blush mt-1">Templates</p>
              </div>
              <div className="text-center">
                <AnimatedNumber
                  value={CATEGORY_COUNT}
                  className="text-3xl font-bold text-chalk font-pixel"
                />
                <p className="text-xs text-blush mt-1">Categories</p>
              </div>
            </div>
          </DemoCell>

          {/* ── Row 4, Col 3-4: Feature — TypeScript First ── */}
          <FeatureCell
            title="TypeScript First"
            description="Full type safety out of the box. Every prop is typed, every component is documented."
            className="lg:col-span-2 lg:col-start-3 lg:row-start-4"
          />

          {/* ── Row 4, Col 5-6: Feature — Dark Mode Native ── */}
          <FeatureCell
            title="Dark Mode Native"
            description="Built for dark mode from the ground up. Light mode works too — every component adapts automatically."
            className="lg:col-span-2 lg:col-start-5 lg:row-start-4"
          />
        </div>
      </div>
    </section>
  );
}
