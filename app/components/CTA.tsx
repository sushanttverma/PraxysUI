"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border bg-obsidian p-12 text-center md:p-20"
        >
          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 80% at 50% 0%, var(--cta-glow), transparent 70%)",
            }}
          />

          <h2 className="relative font-pixel text-3xl font-bold text-chalk md:text-5xl">
            Start building{" "}
            <span className="text-ignite">today</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-blush">
            Grab the components you need and ship faster. No lock-in, no
            dependencies, just clean code.
          </p>

          <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/docs/components-overview"
              className="group flex h-12 items-center gap-2 rounded-xl bg-ignite px-7 text-sm font-medium text-void transition-all hover:brightness-110"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/docs"
              className="flex h-12 items-center rounded-xl border border-border px-7 text-sm font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
            >
              Read the Docs
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
