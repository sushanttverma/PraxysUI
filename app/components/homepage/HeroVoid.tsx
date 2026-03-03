"use client";

import { useRef, useCallback, useState, useSyncExternalStore } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";
import Link from "next/link";
import Particles from "@/app/components/ui/particles";
import GlitchText from "@/app/components/ui/glitch-text";
import BlurFade from "@/app/components/ui/blur-fade";
import NoiseTexture from "@/app/components/ui/noise-texture";
import { COMPONENT_COUNT } from "@/lib/site-stats";

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function subscribeReducedMotion(cb: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

// Client-only flag: returns false on server, true on client.
// Avoids hydration mismatch for components with non-deterministic inline styles.
const emptySubscribe = () => () => {};
function useClientOnly() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function HeroVoid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false
  );
  const isClient = useClientOnly();

  // Scroll parallax — hero fades/moves at 0.5x speed
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("npx @praxys/ui init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-void"
    >
      {/* Soft ambient glow — pure CSS radial gradients, no boxy edges */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[80vw] h-[80vh] top-[-10%] left-[-10%] rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(ellipse at center, #E84E2D, transparent 70%)" }}
          animate={{ x: ["0%", "15%", "5%", "0%"], y: ["0%", "10%", "20%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[60vw] h-[60vh] bottom-[-5%] right-[-10%] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(ellipse at center, #C9958A, transparent 70%)" }}
          animate={{ x: ["0%", "-10%", "5%", "0%"], y: ["0%", "-15%", "-5%", "0%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[50vw] h-[50vh] top-[20%] right-[10%] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse at center, #E84E2D, transparent 70%)" }}
          animate={{ x: ["0%", "-8%", "12%", "0%"], y: ["0%", "12%", "-8%", "0%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Particles floating as embers */}
      {isClient && !reducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          <Particles
            count={15}
            size={3}
            color="#E84E2D"
            speed={2}
            className="!border-0 !rounded-none !bg-transparent w-full !h-full"
          />
        </div>
      )}

      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <NoiseTexture opacity={0.03} />
      </div>

      {/* Hero content — fades on scroll */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-30 mx-auto max-w-5xl px-6 text-center"
      >
        {/* Monospace tag */}
        <BlurFade delay={0.1} direction="up">
          <p className="font-mono text-xs text-blush tracking-wide mb-8">
            {`// open source · ${COMPONENT_COUNT}+ components · zero dependencies`}
          </p>
        </BlurFade>

        {/* Main headline */}
        <BlurFade delay={0.2} direction="up">
          <h1 className="font-pixel text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-chalk leading-[1.1] tracking-tight mb-4">
            Components that
          </h1>
        </BlurFade>

        <BlurFade delay={0.35} direction="up">
          <div className="mb-10">
            <GlitchText intensity="low" className="font-pixel text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ignite">
              move.
            </GlitchText>
          </div>
        </BlurFade>

        {/* Subtitle */}
        <BlurFade delay={0.5} direction="up">
          <p className="text-blush text-base sm:text-lg md:text-xl max-w-lg mx-auto mb-10">
            Copy-paste animated React components. No dependencies, no lock-in —
            just clean code that ships.
          </p>
        </BlurFade>

        {/* CTA buttons */}
        <BlurFade delay={0.6} direction="up">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/components">
              <button className="group flex h-12 items-center gap-2 rounded-xl bg-ignite px-7 text-sm font-medium text-void transition-all hover:brightness-110 cursor-pointer">
                Browse Components
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>

            <Link href="/installation">
              <button className="flex h-12 items-center gap-2 rounded-xl border border-border bg-obsidian/60 px-7 text-sm font-medium text-chalk transition-colors hover:border-border-light cursor-pointer">
                Installation
              </button>
            </Link>
          </div>
        </BlurFade>

        {/* Install command */}
        <BlurFade delay={0.7} direction="up">
          <button
            onClick={handleCopy}
            className="group inline-flex items-center gap-3 rounded-lg border border-border bg-obsidian/60 px-4 py-2.5 font-mono text-sm text-blush transition-colors hover:border-border-light hover:text-chalk cursor-pointer"
          >
            <span className="text-ignite/60">$</span>
            <span>npx @praxys/ui init</span>
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5 opacity-40 group-hover:opacity-70 transition-opacity" />
            )}
          </button>
        </BlurFade>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-chalk/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-chalk/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
