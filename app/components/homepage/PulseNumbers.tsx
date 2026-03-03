"use client";

import BlurFade from "@/app/components/ui/blur-fade";
import GlowBorderCard from "@/app/components/ui/glow-border-card";
import AnimatedNumber from "@/app/components/ui/animated-number";
import TextReveal from "@/app/components/ui/text-reveal";
import TypewriterText from "@/app/components/ui/typewriter-text";
import { COMPONENT_COUNT, TOOL_COUNT } from "@/lib/site-stats";

const stats = [
  {
    value: COMPONENT_COUNT,
    suffix: "",
    label: "Animated Components",
  },
  {
    value: TOOL_COUNT,
    suffix: "",
    label: "Built-in Tools",
  },
  {
    value: 0,
    suffix: "",
    label: "Dependencies Required",
    isZero: true,
  },
  {
    value: 100,
    suffix: "%",
    label: "Open Source",
  },
];

export default function PulseNumbers() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-obsidian py-24 px-6 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232, 78, 45, 0.04), transparent)",
        }}
      />

      {/* Section header */}
      <div className="relative z-10 text-center mb-16">
        <span className="font-mono text-xs text-ignite/60 block mb-3">
          {"// by the numbers"}
        </span>
        <TextReveal className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalk font-pixel">
          Everything you need. Nothing you don&apos;t.
        </TextReveal>
      </div>

      {/* 2x2 stat grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full mb-16">
        {stats.map((stat, i) => (
          <BlurFade key={stat.label} delay={0.15 * i} direction="up">
            <GlowBorderCard className="!p-8 text-center">
              <div className="mb-3">
                {stat.isZero ? (
                  <span className="text-7xl sm:text-8xl md:text-9xl font-bold text-chalk font-pixel tabular-nums">
                    0
                  </span>
                ) : (
                  <AnimatedNumber
                    value={stat.value}
                    className="text-7xl sm:text-8xl md:text-9xl font-bold text-chalk font-pixel"
                    duration={2}
                  />
                )}
                {stat.suffix && (
                  <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-ignite font-pixel">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base text-blush">{stat.label}</p>
            </GlowBorderCard>
          </BlurFade>
        ))}
      </div>

      {/* Cycling tagline */}
      <div className="relative z-10 text-center">
        <TypewriterText
          strings={[
            "Copy. Paste. Ship.",
            "No npm install needed.",
            "Fully typed. Fully animated.",
            "Works with any React framework.",
          ]}
          typingSpeed={60}
          deletingSpeed={40}
          pauseDuration={2500}
          className="font-mono text-sm sm:text-base text-text-faint"
        />
      </div>
    </section>
  );
}
