"use client";

import { useState, useCallback } from "react";
import { ArrowRight, Copy, Check } from "lucide-react";
import Link from "next/link";
import { COMPONENT_COUNT } from "@/lib/site-stats";

const NAMES =
  "Aurora · Particles · GlitchText · BlurFade · MagneticCursor · FlipText · GlowBorderCard · SpotlightCard · AnimatedButton · Confetti · MorphingText · TypewriterText · TextReveal · GradientMesh · LiquidMetal · Carousel · GlassDock · FloatingMenu · AnimatedTabs · Accordion · Modal · Sheet · Tooltip · CommandMenu · DataTable · MagicBento · Masonry · ChromaGrid · CircularGallery · Folder";

export default function SignalCTA() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("npx @praxys/ui init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border)]">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(224,78,45,0.06), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
        {/* Massive headline */}
        <h2 className="font-pixel text-[18vw] leading-[0.85] text-[var(--color-ignite)] sm:text-[14vw] md:text-[12vw]">
          Ship.
        </h2>

        <p className="mt-8 text-lg text-[var(--color-chalk)] sm:text-xl">
          {COMPONENT_COUNT}+ components. Zero dependencies. One command.
        </p>

        {/* Copy pill */}
        <button
          onClick={handleCopy}
          className="group mt-8 flex items-center gap-3 rounded-full border border-[var(--color-border)] px-6 py-3 font-mono text-sm transition-all hover:border-[var(--color-border-light)]"
        >
          <span className="text-[var(--color-blush)] transition-colors group-hover:text-[var(--color-chalk)]">
            npx @praxys/ui init
          </span>
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-[var(--color-text-faint)] transition-colors group-hover:text-[var(--color-blush)]" />
          )}
        </button>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href="/components">
            <button className="group flex h-12 items-center gap-2 rounded-xl bg-[var(--color-ignite)] px-7 text-sm font-semibold text-[var(--color-void)] transition-all hover:brightness-110">
              Browse Components
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Link>
          <Link href="/installation">
            <button className="flex h-12 items-center rounded-xl border border-[var(--color-border)] px-7 text-sm font-medium text-[var(--color-chalk)] transition-colors hover:border-[var(--color-border-light)]">
              Installation
            </button>
          </Link>
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-[var(--color-border)] opacity-[0.06]">
        <div className="flex w-max animate-marquee whitespace-nowrap py-3">
          <span className="font-mono text-[10px] tracking-widest text-[var(--color-chalk)] px-4">{NAMES}</span>
          <span className="font-mono text-[10px] tracking-widest text-[var(--color-chalk)] px-4">{NAMES}</span>
        </div>
      </div>
    </section>
  );
}
