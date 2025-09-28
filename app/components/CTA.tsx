"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const TERMINAL_LINES = [
  { text: "$ npx praxys-ui init", delay: 0 },
  { text: "✓ Installing dependencies...", delay: 1200 },
  { text: "✓ Components added to your project", delay: 2400 },
  { text: "→ Open localhost:3000", delay: 3400 },
];

function TerminalLine({
  text,
  delay,
  onComplete,
}: {
  text: string;
  delay: number;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [started, text, onComplete]);

  if (!started) return null;

  return (
    <div className="font-mono text-sm">
      <span
        className={
          text.startsWith("$")
            ? "text-chalk"
            : text.startsWith("✓")
              ? "text-green-400"
              : "text-ignite"
        }
      >
        {displayed}
      </span>
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="text-chalk"
        >
          ▋
        </motion.span>
      )}
    </div>
  );
}

export default function CTA() {
  const [key, setKey] = useState(0);

  // Replay terminal animation every 12s
  useEffect(() => {
    const timer = setInterval(() => setKey((k) => k + 1), 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side — headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-pixel text-3xl sm:text-4xl md:text-5xl font-bold text-chalk">
              Ready to{" "}
              <span className="text-ignite">ship?</span>
            </h2>
            <p className="mt-4 text-blush max-w-md text-base sm:text-lg">
              Grab the components you need and start building. No lock-in, no
              dependencies — just clean code.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/components"
                className="group flex h-12 items-center gap-2 rounded-xl bg-ignite px-7 text-sm font-medium text-void transition-all hover:brightness-110"
              >
                Browse Components
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/components/install"
                className="flex h-12 items-center rounded-xl border border-border px-7 text-sm font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
              >
                Installation
              </Link>
            </div>
          </motion.div>

          {/* Right side — terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="rounded-2xl border border-border bg-obsidian overflow-hidden">
              {/* Terminal titlebar */}
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-2 font-mono text-[11px] text-text-faint">
                  terminal
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 space-y-2 min-h-[180px]" key={key}>
                {TERMINAL_LINES.map((line, i) => (
                  <TerminalLine
                    key={`${key}-${i}`}
                    text={line.text}
                    delay={line.delay}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
