"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";
import Link from "next/link";
import { COMPONENT_COUNT } from "@/lib/site-stats";

export default function HeroVoid() {
  const [copied, setCopied] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x: cx * 12, y: cy * 12 });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("npx @praxys/ui init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden" style={{ background: "var(--color-void)" }}>
      {/* Perspective grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mouse.x}px, ${mouse.y}px)`,
          transition: "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        <div
          className="absolute inset-[-80px]"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-border) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 70% 50% at 50% 50%, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 50%, black 20%, transparent 80%)",
            opacity: 0.5,
          }}
        />
      </div>

      {/* Corner stats */}
      <span className="absolute top-8 right-8 font-mono text-[11px] tracking-wider z-10" style={{ color: "var(--color-text-faint)" }}>
        {COMPONENT_COUNT}+ components
      </span>
      <span className="absolute bottom-8 left-8 font-mono text-[11px] tracking-wider z-10" style={{ color: "var(--color-text-faint)" }}>
        open source
      </span>

      {/* Center content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Title with bisecting line */}
        <div className="relative flex items-center justify-center">
          {/* Horizontal bisecting line */}

          <h1
            className="font-pixel text-[14vw] md:text-[12vw] leading-none tracking-tight select-none"
            style={{ color: "var(--color-chalk)" }}
          >
            Praxys
          </h1>
        </div>

        <motion.p
          className="mt-4 text-base md:text-lg tracking-wide"
          style={{ color: "var(--color-blush)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Components that move.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link href="/components">
            <button
              className="group flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all hover:brightness-110 cursor-pointer"
              style={{ background: "var(--color-ignite)", color: "var(--color-void)" }}
            >
              Enter the library
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Link>

          <button
            onClick={handleCopy}
            className="group inline-flex items-center gap-2.5 font-mono text-xs tracking-wide cursor-pointer bg-transparent border-none"
            style={{ color: "var(--color-text-faint)" }}
          >
            <span style={{ color: "var(--color-ignite)", opacity: 0.5 }}>$</span>
            npx @praxys/ui init
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3 opacity-40 group-hover:opacity-80 transition-opacity" />
            )}
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll hint — pulsing line */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-px h-8"
          style={{ background: `linear-gradient(to bottom, var(--color-text-faint), transparent)` }}
          animate={{ opacity: [0.6, 0.15, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
