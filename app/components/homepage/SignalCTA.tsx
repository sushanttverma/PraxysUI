"use client";

import { useState } from "react";
import { ArrowRight, Copy, Check } from "lucide-react";
import Link from "next/link";
import { COMPONENT_COUNT } from "@/lib/site-stats";

const NAMES =
  "Aurora · Particles · DisplacementText · GlitchText · BlurFade · MagneticCursor · ScrambleText · FlipText · GlowBorderCard · SpotlightCard · AnimatedButton · CreepyButton · Confetti · MorphingText · TypewriterText · AnimatedNumber · TextReveal · GradientMesh · LiquidMetal · NoiseTexture · Carousel · GlassDock · FloatingMenu · AnimatedTabs · Accordion · Modal · Sheet · Tooltip · CommandMenu · DataTable";

export default function SignalCTA() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx @praxys/ui init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(232,78,45,0.05), transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="font-pixel text-[15vw] leading-none text-ignite">
          Ship.
        </h2>

        <p className="mt-6 text-lg text-chalk">
          {COMPONENT_COUNT}+ components. Zero dependencies. One command.
        </p>

        {/* Copy pill */}
        <button
          onClick={handleCopy}
          className="group mt-8 flex items-center gap-3 rounded-full border border-border px-5 py-2.5 font-mono text-sm transition-colors hover:border-border-light cursor-pointer"
        >
          <span className="text-blush group-hover:text-chalk transition-colors">
            npx @praxys/ui init
          </span>
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-text-faint group-hover:text-blush transition-colors" />
          )}
        </button>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <Link href="/components">
            <button className="group flex h-12 items-center gap-2 rounded-xl bg-ignite px-6 text-sm font-medium text-void transition-all hover:brightness-110 cursor-pointer">
              Browse Components
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Link>
          <Link href="/installation">
            <button className="flex h-12 items-center rounded-xl border border-border px-6 text-sm font-medium text-chalk transition-colors hover:border-border-light cursor-pointer">
              Installation
            </button>
          </Link>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden opacity-[0.08]">
        <div className="flex w-max animate-marquee whitespace-nowrap py-3">
          <span className="font-mono text-xs tracking-wider text-chalk px-4">
            {NAMES}
          </span>
          <span className="font-mono text-xs tracking-wider text-chalk px-4">
            {NAMES}
          </span>
        </div>
      </div>
    </section>
  );
}
