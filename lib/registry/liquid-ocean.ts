import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "liquid-ocean",
title: "Liquid Ocean",
description:
  "Animated layered SVG waves with configurable colors, wave count, and speed for a mesmerizing ocean effect.",
category: "visual",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LiquidOceanProps {
  className?: string
  color?: string
  waveCount?: number
  speed?: number
}

const LiquidOcean: React.FC<LiquidOceanProps> = ({
  className = '',
  color = 'var(--color-ignite)',
  waveCount = 4,
  speed = 6,
}) => {
  return (
<div
  className={cn(
    'relative w-full h-64 overflow-hidden rounded-xl bg-obsidian border border-border',
    className
  )}
>
  {Array.from({ length: waveCount }).map((_, i) => {
    const opacity = 0.08 + i * 0.04
    const yOffset = 40 + i * 20
    const dur = speed + i * 1.5

    return (
      <motion.div
        key={i}
        className="absolute left-0 right-0"
        style={{
          bottom: 0,
          height: \`\${yOffset}%\`,
        }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-[200%] h-full"
        >
          <motion.path
            d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z"
            fill={color}
            fillOpacity={opacity}
            animate={{ x: [0, -600] }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </svg>
      </motion.div>
    )
  })}

  {/* Surface shimmer */}
  <motion.div
    className="absolute inset-0"
    style={{
      background: \`linear-gradient(180deg, transparent 40%, \${color}08 100%)\`,
    }}
    animate={{ opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: speed, repeat: Infinity, ease: 'easeInOut' }}
  />
</div>
  )
}

export default LiquidOcean`,
usage: `import LiquidOcean from "@/app/components/ui/liquid-ocean"

export function Demo() {
  return <LiquidOcean waveCount={4} speed={6} />
}`,
props: [
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "color",
    type: "string",
    default: "'var(--color-ignite)'",
    description: "Color of the waves.",
  },
  {
    name: "waveCount",
    type: "number",
    default: "4",
    description: "Number of wave layers.",
  },
  {
    name: "speed",
    type: "number",
    default: "6",
    description: "Base animation speed in seconds.",
  },
],
playground: {
  controls: [
    { name: "waveCount", label: "Wave Count", type: "number", default: 4, min: 1, max: 8, step: 1 },
    { name: "speed", label: "Speed (s)", type: "number", default: 6, min: 2, max: 15, step: 0.5 },
    { name: "color", label: "Wave Color", type: "color", default: "#E84E2D" },
  ],
},
component: () => import("@/app/components/ui/liquid-ocean"),
demo: () => import("@/app/components/demos/liquid-ocean-demo"),
};

export default entry;
