"use client";

import { useEffect, useRef, useState } from "react";
import { COMPONENT_COUNT, TOOL_COUNT } from "@/lib/site-stats";

const stats = [
  { value: COMPONENT_COUNT, suffix: "+", label: "Components" },
  { value: TOOL_COUNT, suffix: "", label: "Tools" },
  { value: 0, suffix: "", label: "Dependencies" },
  { value: 100, suffix: "%", label: "Open Source" },
];

function StatItem({ value, suffix, label, isLast }: { value: number; suffix: string; label: string; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0) return;
    let raf: number;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1200, 1);
        setCount(Math.floor(t * value));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);

  return (
    <div ref={ref} className={`flex-1 flex flex-col items-center justify-center py-10${isLast ? "" : " border-r border-border"}`}>
      <span className="text-6xl font-pixel font-bold text-chalk tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-text-faint font-mono mt-2">
        {label}
      </span>
    </div>
  );
}

export default function PulseNumbers() {
  return (
    <section className="w-full border-y border-border bg-obsidian">
      <div className="flex">
        {stats.map((s, i) => (
          <StatItem key={s.label} {...s} isLast={i === stats.length - 1} />
        ))}
      </div>
    </section>
  );
}
