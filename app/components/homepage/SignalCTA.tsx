"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";
import Link from "next/link";
import Confetti from "@/app/components/ui/confetti";
import MagneticCursor from "@/app/components/ui/magnetic-cursor";
import TypewriterText from "@/app/components/ui/typewriter-text";
import { componentCount } from "@/lib/registry";

const TERMINAL_LINES = [
  { text: "$ npx @praxys/ui init", delay: 0 },
  { text: "✓ Installing components...", delay: 1200 },
  { text: `✓ ${componentCount} components added`, delay: 2400 },
  { text: "→ Ready to ship!", delay: 3400 },
];

const COMPONENT_NAMES = [
  "Aurora", "Particles", "DisplacementText", "GlitchText", "BlurFade",
  "MagneticCursor", "ScrambleText", "FlipText", "GlowBorderCard",
  "SpotlightCard", "AnimatedButton", "CreepyButton", "Confetti",
  "MorphingText", "TypewriterText", "AnimatedNumber", "TextReveal",
  "GradientMesh", "LiquidMetal", "NoiseTexture", "AnimatedCounter",
  "ParallaxScroll", "Carousel", "GlassDock", "FloatingMenu",
  "AnimatedTabs", "AnimatedInput", "AnimatedToggle", "Accordion",
  "Modal", "Sheet", "Tooltip", "Popover", "ContextMenu",
  "CommandMenu", "DatePicker", "ColorPicker", "FileUpload",
  "DataTable", "Timeline", "Stepper", "PricingCard", "ProfileCard",
];

export default function SignalCTA() {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentChar, setCurrentChar] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          setIsInView(true);
          hasTriggered.current = true;
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Terminal typing animation
  useEffect(() => {
    if (!isInView) return;
    const timeouts: NodeJS.Timeout[] = [];

    TERMINAL_LINES.forEach((line, lineIndex) => {
      const t = setTimeout(() => {
        setCurrentLine(lineIndex);
        setCurrentChar(0);

        const chars = line.text.split("");
        chars.forEach((_, charIndex) => {
          const charTimeout = setTimeout(() => {
            setCurrentChar(charIndex + 1);
          }, charIndex * 30);
          timeouts.push(charTimeout);
        });

        const completeTimeout = setTimeout(() => {
          setTypedLines((prev) => [...prev, line.text]);
          setCurrentLine((l) => l + 1);
          setCurrentChar(0);

          if (lineIndex === TERMINAL_LINES.length - 1) {
            setTimeout(() => setShowConfetti(true), 200);
            setTimeout(() => setShowConfetti(false), 2500);
          }
        }, chars.length * 30 + 200);
        timeouts.push(completeTimeout);
      }, line.delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isInView]);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx @praxys/ui init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const marqueeText = COMPONENT_NAMES.join("  ·  ");

  return (
    <section
      ref={sectionRef}
      className="relative py-32 sm:py-40 overflow-hidden"
    >
      {/* Subtle radial glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(232, 78, 45, 0.08), transparent 70%)",
        }}
      />

      <Confetti trigger={showConfetti} count={60} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-pixel text-4xl sm:text-5xl md:text-6xl font-bold text-chalk leading-tight">
            Ready to{" "}
            <span className="text-ignite">
              <TypewriterText
                strings={["ship?", "build?", "create?"]}
                typingSpeed={80}
                deletingSpeed={50}
                pauseDuration={2500}
                className="text-ignite"
              />
            </span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-blush text-base sm:text-lg text-center max-w-lg mx-auto mb-14"
        >
          {componentCount}+ animated components. Copy, paste, and ship in minutes.
          No dependencies required.
        </motion.p>

        {/* Terminal + CTA side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Terminal block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-border bg-obsidian/80 backdrop-blur-sm overflow-hidden"
          >
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-ignite/40" />
                <div className="h-2.5 w-2.5 rounded-full bg-blush/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-chalk/20" />
              </div>
              <span className="ml-2 font-mono text-[11px] text-text-faint">
                terminal
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-5 font-mono text-sm space-y-1.5 min-h-[140px]">
              {typedLines.map((line, i) => (
                <div key={i}>
                  <span
                    className={
                      line.startsWith("✓")
                        ? "text-green-400"
                        : line.startsWith("→")
                          ? "text-ignite"
                          : "text-chalk"
                    }
                  >
                    {line}
                  </span>
                </div>
              ))}
              {currentLine < TERMINAL_LINES.length &&
                !typedLines.includes(TERMINAL_LINES[currentLine]?.text) && (
                  <div className="flex items-center">
                    <span className="text-chalk">
                      {TERMINAL_LINES[currentLine].text.slice(0, currentChar)}
                    </span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="inline-block w-[7px] h-[14px] bg-ignite ml-[1px]"
                    />
                  </div>
                )}
            </div>
          </motion.div>

          {/* CTA column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-5"
          >
            <MagneticCursor strength={0.4} radius={250}>
              <Link href="/components" className="block">
                <button className="group flex w-full h-14 items-center justify-center gap-2 rounded-xl bg-ignite px-7 text-sm font-medium text-void transition-all hover:brightness-110 cursor-pointer">
                  Browse Components
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Link>
            </MagneticCursor>

            <MagneticCursor strength={0.3} radius={200}>
              <Link href="/installation" className="block">
                <button className="flex w-full h-14 items-center justify-center gap-2 rounded-xl border border-border bg-obsidian/60 px-7 text-sm font-medium text-chalk transition-colors hover:border-border-light cursor-pointer">
                  Installation Guide
                </button>
              </Link>
            </MagneticCursor>

            {/* Quick copy */}
            <button
              onClick={handleCopy}
              className="group flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-obsidian/40 px-5 py-3.5 font-mono text-sm transition-colors hover:border-border-light cursor-pointer"
            >
              <span className="text-ignite/60">$</span>
              <span className="text-blush group-hover:text-chalk transition-colors">
                npx @praxys/ui init
              </span>
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-text-faint group-hover:text-blush transition-colors" />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Infinite component-name marquee */}
      <div className="mt-24 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee opacity-[0.12]">
          <span className="font-mono text-xs text-chalk tracking-wider mr-8">
            {marqueeText}
          </span>
          <span className="font-mono text-xs text-chalk tracking-wider mr-8">
            {marqueeText}
          </span>
        </div>
      </div>
    </section>
  );
}
