"use client";

import { motion } from "framer-motion";
import ShowcaseCard from "./ShowcaseCard";
import FlipText from "@/app/components/ui/flip-text";
import Aurora from "@/app/components/ui/aurora";
import Particles from "@/app/components/ui/particles";
import DisplacementText from "@/app/components/ui/displacement-text";
import GlowBorderCard from "@/app/components/ui/glow-border-card";
import CreepyButton from "@/app/components/ui/creepy-button";
import AnimatedButton from "@/app/components/ui/animated-button";
import AnimatedCounter from "@/app/components/ui/animated-counter";
import MorphingText from "@/app/components/ui/morphing-text";
import GradientMesh from "@/app/components/ui/gradient-mesh";
import { COMPONENT_COUNT } from "@/lib/site-stats";

const DEMOS = [
  {
    title: "Aurora",
    description: "Animated gradient blobs with 3D perspective and drift",
    render: () => (
      <Aurora
        colors={["#E84E2D", "#C9958A", "#7B61FF", "#06b6d4"]}
        blur={120}
        speed={10}
        className="!border-0 !rounded-none w-full h-full"
      />
    ),
  },
  {
    title: "DisplacementText",
    description: "Mouse-driven 3D text with spring-physics tilt and shadows",
    render: () => (
      <div className="w-full h-full flex items-center justify-center p-4">
        <DisplacementText
          text="Praxys"
          fontSize={64}
          color="var(--color-chalk)"
          shadowColor="var(--color-ignite)"
          depth={15}
        />
      </div>
    ),
  },
  {
    title: "GlowBorderCard",
    description: "Mouse-tracking radial gradient glow that follows your cursor",
    render: () => (
      <div className="w-full h-full flex items-center justify-center p-6">
        <GlowBorderCard className="max-w-[300px] w-full">
          <h4 className="text-base font-medium text-chalk mb-2">
            Deploy Complete
          </h4>
          <p className="text-sm text-blush">
            Your app is live at praxys.xyz. 3 components updated, 0 errors.
          </p>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-green-500/10 text-green-400 border border-green-500/20">
              success
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-ignite/10 text-ignite border border-ignite/20">
              v1.0.2
            </span>
          </div>
        </GlowBorderCard>
      </div>
    ),
  },
  {
    title: "Particles",
    description: "Physics-based particle system with configurable density and motion",
    render: () => (
      <Particles
        count={25}
        size={4}
        color="#E84E2D"
        speed={4}
        className="!border-0 !rounded-none !bg-transparent w-full !h-full"
      />
    ),
  },
  {
    title: "MorphingText",
    description: "Smooth blur-based text morphing between words",
    render: () => (
      <div className="w-full h-full flex items-center justify-center p-4">
        <MorphingText
          words={["Beautiful", "Animated", "Accessible", "Performant"]}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalk font-pixel"
          interval={2500}
        />
      </div>
    ),
  },
  {
    title: "AnimatedButton",
    description: "Spring-physics button with gradient shine on tap",
    render: () => (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
        <AnimatedButton className="bg-ignite/20 border-ignite/40 text-chalk px-8 py-3">
          Get Started
        </AnimatedButton>
        <AnimatedButton className="px-8 py-3">
          Browse Components
        </AnimatedButton>
      </div>
    ),
  },
  {
    title: "CreepyButton",
    description: "Flickering drip animation with per-letter jitter on hover",
    render: () => (
      <div className="w-full h-full flex items-center justify-center p-4">
        <CreepyButton>Hover if you dare</CreepyButton>
      </div>
    ),
  },
  {
    title: `${COMPONENT_COUNT}+ More`,
    description: "Explore the full library of animated components",
    render: () => (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
        <AnimatedCounter
          to={COMPONENT_COUNT}
          duration={2.5}
          suffix="+"
          className="text-6xl sm:text-7xl font-bold text-ignite font-pixel tabular-nums"
        />
        <p className="text-blush text-base">components and counting</p>
      </div>
    ),
  },
];

// 2-col grid, every row sums to exactly 2
// Row 1: Aurora (full width)
// Row 2: DisplacementText + GlowBorderCard
// Row 3: Particles (full width)
// Row 4: MorphingText + AnimatedButton
// Row 5: CreepyButton + Counter
const GRID_CLASSES: Record<string, string> = {
  "0": "md:col-span-2", // Aurora — full width
  "1": "md:col-span-1", // DisplacementText
  "2": "md:col-span-1", // GlowBorderCard
  "3": "md:col-span-2", // Particles — full width
  "4": "md:col-span-1", // MorphingText
  "5": "md:col-span-1", // AnimatedButton
  "6": "md:col-span-1", // CreepyButton
  "7": "md:col-span-1", // Counter
};

export default function VerticalShowcase() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* GradientMesh background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <GradientMesh
          colors={["#E84E2D", "#C9958A", "#0B0A08", "#E84E2D"]}
          speed={12}
          blur={140}
          className="!border-0 !rounded-none w-full h-full"
        />
      </div>

      {/* Section header */}
      <div className="relative z-10 max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs text-ignite/60 block mb-3">
            {"// the library"}
          </span>
          <FlipText
            text="Built to impress."
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalk font-pixel"
          />
        </motion.div>
      </div>

      {/* Bento grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEMOS.map((demo, i) => (
          <motion.div
            key={demo.title}
            className={GRID_CLASSES[String(i)] || ""}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
          >
            <ShowcaseCard
              title={demo.title}
              description={demo.description}
              index={i}
            >
              {demo.render()}
            </ShowcaseCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
