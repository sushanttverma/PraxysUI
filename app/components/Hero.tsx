"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Copy, Check } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("npx praxys-ui init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, var(--hero-glow-primary), var(--hero-glow-primary-mid) 40%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 50%, var(--hero-glow-secondary), transparent 60%)",
        }}
      />

      {/* Version badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="mb-8 flex items-center gap-2 rounded-full border border-border bg-obsidian px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-ignite" />
          <span className="text-xs font-medium text-blush">
            Praxys UI 1.2
          </span>
          <span className="text-blush/40">|</span>
          <span className="text-xs text-blush/70">Now Available</span>
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-4xl text-center font-pixel text-5xl font-bold leading-[1.1] tracking-tight text-chalk md:text-7xl"
      >
        Build beautiful interfaces{" "}
        <span className="relative">
          <span className="bg-gradient-to-r from-ignite to-blush bg-clip-text text-transparent">
            with precision
          </span>
        </span>{" "}
        and speed
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-6 max-w-2xl text-center text-lg leading-relaxed text-blush md:text-xl"
      >
        A curated collection of beautifully crafted, animated React components.
        Copy, paste, and customize. Open source and free.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <Link
          href="/docs/components-overview"
          className="group flex h-12 items-center gap-2 rounded-xl bg-ignite px-7 text-sm font-medium text-void transition-all hover:brightness-110"
        >
          Browse Components
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/docs"
          className="flex h-12 items-center rounded-xl border border-border px-7 text-sm font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
        >
          Documentation
        </Link>
      </motion.div>

      {/* Install command */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="mt-8"
      >
        <button
          onClick={copyCommand}
          className="group flex items-center gap-3 rounded-lg border border-border bg-obsidian px-4 py-2 font-mono text-sm text-blush transition-colors hover:border-border-light cursor-pointer"
          aria-label={copied ? "Copied to clipboard" : "Copy install command"}
        >
          <span className="text-text-faint select-none">$</span>
          <span>npx praxys-ui init</span>
          {copied ? (
            <Check className="h-3.5 w-3.5 text-ignite" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-text-faint transition-colors group-hover:text-blush" />
          )}
        </button>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
}
