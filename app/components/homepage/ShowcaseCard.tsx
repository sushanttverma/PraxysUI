"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface ShowcaseCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  index: number;
}

export default function ShowcaseCard({
  title,
  description,
  children,
  index,
}: ShowcaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(
    400px circle at ${mouseX}px ${mouseY}px,
    rgba(232, 78, 45, 0.1),
    transparent 80%
  )`;

  function handleMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  // Lazy mount: only render demo when card is near viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative h-full min-h-[400px] rounded-2xl border border-border-light bg-obsidian overflow-hidden"
    >
      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{ background: spotlight }}
      />

      {/* Card header */}
      <div className="relative z-20 px-6 pt-6 sm:px-8 sm:pt-8">
        <span className="font-mono text-[11px] text-ignite/60 mb-1 block">
          0{index + 1}
        </span>
        <h3 className="font-pixel text-lg sm:text-xl text-chalk mb-1">
          {title}
        </h3>
        <p className="text-sm text-blush max-w-md">{description}</p>
      </div>

      {/* Demo area — takes all remaining space */}
      <div className="relative z-20 mx-6 mb-6 mt-4 sm:mx-8 sm:mb-8 rounded-xl bg-void/50 border border-border overflow-hidden h-[260px]">
        {isVisible ? (
          children
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-ignite/20 border-t-ignite animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
