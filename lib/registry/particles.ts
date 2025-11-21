import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "particles",
title: "Particles",
description:
  "Floating particle background with randomized drift animations that loop infinitely.",
category: "visual",
isNew: true,
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParticlesProps {
  count?: number
  color?: string
  speed?: number
  size?: number
  className?: string
}

const Particles: React.FC<ParticlesProps> = ({
  count = 30,
  color = '#E84E2D',
  speed = 6,
  size = 4,
  className = '',
}) => {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * speed,
        driftX: (Math.random() - 0.5) * 60,
        driftY: (Math.random() - 0.5) * 60,
        scale: 0.5 + Math.random() * 1,
      })),
    [count, speed]
  )

  return (
    <div
      className={cn(
        'relative w-full h-64 overflow-hidden rounded-xl bg-obsidian border border-border',
        className
      )}
    >
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: size * dot.scale,
            height: size * dot.scale,
            backgroundColor: color,
            left: \\\`\\\${dot.x}%\\\`,
            top: \\\`\\\${dot.y}%\\\`,
            opacity: 0.6,
          }}
          animate={{
            x: [0, dot.driftX, -dot.driftX / 2, 0],
            y: [0, dot.driftY, -dot.driftY / 2, 0],
            opacity: [0.2, 0.8, 0.4, 0.2],
          }}
          transition={{
            duration: speed + dot.delay,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default Particles`,
usage: `import Particles from "@/app/components/ui/particles"

export function Demo() {
  return <Particles count={30} color="#E84E2D" speed={6} />
}`,
props: [
  {
    name: "count",
    type: "number",
    default: "30",
    description: "Number of floating particles.",
  },
  {
    name: "color",
    type: "string",
    default: "'#E84E2D'",
    description: "Particle color.",
  },
  {
    name: "speed",
    type: "number",
    default: "6",
    description: "Base animation speed in seconds.",
  },
  {
    name: "size",
    type: "number",
    default: "4",
    description: "Base particle size in pixels.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
],
playground: {
  controls: [
    { name: "count", label: "Count", type: "number", default: 30, min: 5, max: 100, step: 5 },
    { name: "color", label: "Color", type: "color", default: "#E84E2D" },
    { name: "speed", label: "Speed (s)", type: "number", default: 6, min: 2, max: 15, step: 1 },
    { name: "size", label: "Size (px)", type: "number", default: 4, min: 2, max: 12, step: 1 },
  ],
},
component: () => import("@/app/components/ui/particles"),
demo: () => import("@/app/components/demos/particles-demo"),
};

export default entry;
