"use client";

import { useEffect, useRef, useState } from "react";
import { COMPONENT_COUNT, TOOL_COUNT } from "@/lib/site-stats";

const stats = [
  { value: COMPONENT_COUNT, suffix: "+", label: "Components" },
  { value: TOOL_COUNT, suffix: "", label: "Tools" },
  { value: 0, suffix: "", label: "Dependencies" },
  { value: 100, suffix: "%", label: "Open Source" },
];

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0) return;
    let raf: number;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1200, 1);
          setCount(Math.floor(t * value));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-6 py-8 sm:px-10 sm:py-10">
      <span className="font-pixel text-4xl font-bold tabular-nums text-[var(--color-chalk)] sm:text-5xl md:text-6xl">
        {count}{suffix}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
        {label}
      </span>
    </div>
  );
}

export default function PulseNumbers() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-obsidian)]">
      <div className="mx-auto grid max-w-5xl grid-cols-2 sm:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={i < stats.length - 1 ? "border-r border-[var(--color-border)] sm:border-r" : ""}
          >
            <StatItem {...s} />
          </div>
        ))}
      </div>
    </section>
  );
}
