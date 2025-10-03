"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";
import Link from "next/link";
import AnimatedButton from "@/app/components/ui/animated-button";
import FlipText from "@/app/components/ui/flip-text";
import GlowBorderCard from "@/app/components/ui/glow-border-card";
import TypewriterText from "@/app/components/ui/typewriter-text";
import MorphingText from "@/app/components/ui/morphing-text";
import { COMPONENT_COUNT } from "@/lib/site-stats";

const DEMO_COMPONENTS = [
  {
    name: "AnimatedButton",
    render: () => (
      <div className="flex flex-col items-center gap-3">
        <AnimatedButton>Browse Components</AnimatedButton>
        <AnimatedButton className="bg-ignite/20 border-ignite/40">
          Get Started
        </AnimatedButton>
      </div>
    ),
  },
  {
    name: "FlipText",
    render: () => (
      <div className="flex flex-col items-center gap-4">
        <FlipText
          text="Praxys UI"
          className="text-2xl font-bold text-chalk font-pixel"
        />
        <FlipText
          text="Components that move."
          className="text-sm text-blush"
        />
      </div>
    ),
  },
  {
    name: "GlowBorderCard",
    render: () => (
      <GlowBorderCard className="max-w-[260px]">
        <h4 className="text-sm font-medium text-chalk mb-1">Notification</h4>
        <p className="text-xs text-blush">
          Your deployment is live. 3 components updated successfully.
        </p>
      </GlowBorderCard>
    ),
  },
  {
    name: "TypewriterText",
    render: () => (
      <div className="text-center">
        <span className="text-lg text-chalk font-medium">
          <TypewriterText
            strings={[
              "Build faster.",
              "Ship sooner.",
              "Animate everything.",
              "Copy & paste.",
            ]}
            typingSpeed={60}
            deletingSpeed={40}
            pauseDuration={2000}
          />
        </span>
      </div>
    ),
  },
  {
    name: "MorphingText",
    render: () => (
      <div className="text-center">
        <MorphingText
          words={["Beautiful", "Animated", "Accessible", "Performant"]}
          className="text-2xl font-bold text-chalk font-pixel"
          interval={2500}
        />
      </div>
    ),
  },
];

const CYCLE_INTERVAL = 4000;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DEMO_COMPONENTS.length);
    }, CYCLE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("npx praxys-ui init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Subtle diagonal accent line */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          background:
            "linear-gradient(135deg, transparent 40%, var(--color-ignite) 50%, transparent 60%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-6 py-24 pt-32 lg:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left column — text */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Monospace tag */}
            <motion.p
              className="font-mono text-xs text-blush tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {`// open source • ${COMPONENT_COUNT}+ components`}
            </motion.p>

            {/* Headline */}
            <motion.h1
              className="font-pixel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-chalk leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Components
              <br />
              that actually{" "}
              <span className="text-ignite">move.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-blush text-base sm:text-lg max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Copy-paste animated React components. No dependencies, no
              lock-in — just clean code that ships.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/components">
                <button className="group flex h-12 items-center gap-2 rounded-xl bg-ignite px-7 text-sm font-medium text-void transition-all hover:brightness-110 cursor-pointer">
                  Browse Components
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Link>
            </motion.div>

            {/* Install command pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={handleCopy}
                className="group inline-flex items-center gap-3 rounded-lg border border-border bg-obsidian/60 px-4 py-2.5 font-mono text-sm text-blush transition-colors hover:border-border-light hover:text-chalk cursor-pointer"
              >
                <span className="text-ignite/60">$</span>
                <span>npx praxys-ui init</span>
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 opacity-40 group-hover:opacity-70 transition-opacity" />
                )}
              </button>
            </motion.div>
          </motion.div>

          {/* Right column — live demo */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative">
              {/* Dot grid background */}
              <div
                className="absolute -inset-4 rounded-2xl opacity-[0.15]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, var(--color-blush) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Demo frame */}
              <div className="relative rounded-2xl border border-border bg-obsidian/40 backdrop-blur-sm overflow-hidden">
                {/* Frame header */}
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-ignite/40" />
                    <div className="h-2.5 w-2.5 rounded-full bg-blush/30" />
                    <div className="h-2.5 w-2.5 rounded-full bg-chalk/20" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] text-text-faint">
                    preview
                  </span>
                </div>

                {/* Demo content */}
                <div className="relative h-[280px] sm:h-[320px] flex items-center justify-center p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="w-full flex items-center justify-center"
                    >
                      {DEMO_COMPONENTS[activeIndex].render()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Component name footer */}
                <div className="border-t border-border px-4 py-2.5 flex items-center justify-between">
                  <span className="font-mono text-xs text-text-faint">
                    {"<"}
                    <span className="text-ignite">
                      {DEMO_COMPONENTS[activeIndex].name}
                    </span>
                    {" />"}
                  </span>
                  {/* Step indicators */}
                  <div className="flex gap-1.5">
                    {DEMO_COMPONENTS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          i === activeIndex
                            ? "w-4 bg-ignite"
                            : "w-1.5 bg-border-light hover:bg-blush/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
