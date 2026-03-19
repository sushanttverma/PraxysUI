"use client";

import { useRef, useCallback, useSyncExternalStore } from "react";
import Aurora from "@/app/components/ui/aurora";
import MorphingText from "@/app/components/ui/morphing-text";
import GlowBorderCard from "@/app/components/ui/glow-border-card";
import Particles from "@/app/components/ui/particles";
import FlipText from "@/app/components/ui/flip-text";
import AnimatedButton from "@/app/components/ui/animated-button";

const noopSubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

function LazyParticles() {
  const isClient = useIsClient();
  if (!isClient) return <div className="w-full h-full bg-[var(--color-void)]" />;
  return (
    <Particles
      count={25}
      size={4}
      color="#E84E2D"
      speed={4}
      className="!border-0 !rounded-none !bg-transparent w-full !h-full"
    />
  );
}

const DEMOS = [
  {
    name: "Aurora",
    render: () => (
      <Aurora
        colors={["#E84E2D", "#C9958A", "#7B61FF"]}
        blur={120}
        speed={10}
        className="!border-0 !rounded-none w-full h-full"
      />
    ),
  },
  {
    name: "MorphingText",
    render: () => (
      <div className="w-full h-full flex items-center justify-center">
        <MorphingText
          words={["Beautiful", "Animated", "Performant"]}
          className="text-4xl font-bold text-chalk font-pixel"
          interval={2500}
        />
      </div>
    ),
  },
  {
    name: "GlowBorderCard",
    render: () => (
      <div className="w-full h-full flex items-center justify-center p-6">
        <GlowBorderCard className="max-w-[300px] w-full">
          <h4 className="text-base font-medium text-chalk mb-2">
            Deploy Complete
          </h4>
          <p className="text-sm text-blush">
            Your app is live at praxys.xyz. 3 components updated, 0 errors.
          </p>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-green-500/10 text-green-400 border border-green-500/20">
              success
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-ignite/10 text-ignite border border-ignite/20">
              v1.0.2
            </span>
          </div>
        </GlowBorderCard>
      </div>
    ),
  },
  {
    name: "Particles",
    render: () => <LazyParticles />,
  },
  {
    name: "FlipText",
    render: () => (
      <div className="w-full h-full flex items-center justify-center">
        <FlipText
          text="Praxys UI"
          className="text-5xl font-bold text-chalk font-pixel"
        />
      </div>
    ),
  },
  {
    name: "AnimatedButton",
    render: () => (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <AnimatedButton className="bg-ignite/20 border-ignite/40 text-chalk px-8 py-3">
          Get Started
        </AnimatedButton>
        <AnimatedButton className="px-8 py-3">
          Browse Components
        </AnimatedButton>
      </div>
    ),
  },
];

export default function HorizontalShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    dragState.current = { isDown: true, startX: e.pageX, scrollLeft: el.scrollLeft };
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none";
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current.isDown || !scrollRef.current) return;
    const dx = e.pageX - dragState.current.startX;
    scrollRef.current.scrollLeft = dragState.current.scrollLeft - dx;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragState.current.isDown = false;
    const el = scrollRef.current;
    if (!el) return;
    el.releasePointerCapture(e.pointerId);
    el.style.cursor = "grab";
    el.style.scrollSnapType = "x mandatory";
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    if (!scrollRef.current || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY;
  }, []);

  return (
    <section className="relative py-20 bg-[var(--color-void)]">
      {/* Header */}
      <div className="px-8 mb-10 flex items-center gap-6">
        <h2 className="font-pixel text-3xl sm:text-4xl text-[var(--color-chalk)] whitespace-nowrap">
          The Library
        </h2>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>
      <p className="px-8 -mt-6 mb-10 font-mono text-sm text-[var(--color-chalk)]/50">
        Drag to explore &rarr;
      </p>

      {/* Gallery */}
      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        className="flex gap-6 px-8 overflow-x-auto cursor-grab select-none"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {DEMOS.map((demo, i) => (
          <div
            key={demo.name}
            className="flex-shrink-0 w-[500px] h-[calc(100vh-12rem)] border border-[var(--color-border)] rounded-sm overflow-hidden flex flex-col transition-transform duration-300"
            style={{ scrollSnapAlign: "center" }}
          >
            {/* Live demo area */}
            <div className="relative flex-1 overflow-hidden bg-[var(--color-void)]">
              {demo.render()}
            </div>

            {/* Card footer */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-[var(--color-border)]">
              <span className="font-pixel text-sm text-[var(--color-chalk)]">
                {demo.name}
              </span>
              <span className="font-mono text-xs text-[var(--color-chalk)]/30">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Hide scrollbar for Webkit */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
