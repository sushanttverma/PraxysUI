"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";
import Link from "next/link";
import { COMPONENT_COUNT } from "@/lib/site-stats";
import { useTheme } from "@/app/components/ThemeProvider";

const LiquidEther = dynamic(
  () => import("@/app/components/praxys-vendor/backgrounds/LiquidEther/LiquidEther"),
  { ssr: false }
);

export default function HeroVoid() {
  const [copied, setCopied] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Wait for section to have real dimensions before mounting WebGL
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.contentRect.width > 0 && entry.contentRect.height > 0) {
        ro.disconnect();
        // Extra frame delay to ensure paint is complete
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setShowBg(true);
          });
        });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("npx @praxys/ui init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100dvh] items-center justify-center overflow-hidden bg-[var(--color-void)]"
    >
      {/* Liquid Ether Background */}
      {showBg && (
        <div
          className="absolute inset-0 z-0"
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <LiquidEther
            colors={isLight ? ["#E04E2D", "#F0EDE8", "#C9958A", "#FAFAF8"] : ["#E04E2D", "#1c1a17", "#C9958A", "#050505"]}
            mouseForce={20}
            cursorSize={120}
            resolution={0.5}
            isViscous={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            className="!pointer-events-auto"
            style={{ width: "100%", height: "100%", position: "relative" }}
          />
        </div>
      )}

      {/* Overlay to ensure text readability */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: isLight
            ? "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(250,250,248,0.3), rgba(250,250,248,0.65) 70%)"
            : "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(5,5,5,0.3), rgba(5,5,5,0.7) 70%)",
        }}
      />

      {/* Scroll-linked content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center px-6"
      >
        {/* Tag */}
        <motion.p
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-faint)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {COMPONENT_COUNT}+ animated components · open source
        </motion.p>

        {/* Title */}
        <motion.h1
          className="font-pixel text-center text-[13vw] leading-[0.85] tracking-tight sm:text-[11vw] md:text-[9vw]"
          style={{ color: "var(--color-chalk)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Components
          <br />
          <span style={{ color: "var(--color-ignite)" }}>that move.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 max-w-md text-center text-sm leading-relaxed text-[var(--color-blush)] sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Copy-paste animated React components.
          <br className="hidden sm:block" />
          No dependencies. No lock-in. Just ship.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Link href="/components">
            <button className="group flex h-12 items-center gap-2 rounded-xl bg-[var(--color-ignite)] px-7 text-sm font-semibold text-[var(--color-void)] transition-all hover:brightness-110">
              Browse Components
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Link>
          <Link href="/installation">
            <button className="flex h-12 items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)]/60 px-7 text-sm font-medium text-[var(--color-chalk)] backdrop-blur-sm transition-all hover:bg-[var(--color-obsidian)]">
              Installation
            </button>
          </Link>
        </motion.div>

        {/* Copy command */}
        <motion.button
          onClick={handleCopy}
          className="group mt-6 inline-flex items-center gap-3 border-none bg-transparent font-mono text-xs tracking-wide text-[var(--color-text-faint)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span className="text-[var(--color-ignite)] opacity-50">$</span>
          npx @praxys/ui init
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3 opacity-40 transition-opacity group-hover:opacity-80" />
          )}
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-[var(--color-border)] pt-1.5"
        >
          <div className="h-1.5 w-0.5 rounded-full bg-[var(--color-text-faint)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
