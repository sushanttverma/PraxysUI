import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "light-lines",
title: "Light Lines",
description:
  "Animated vertical light beams that sweep across a container, creating a dramatic visual effect.",
category: "visual",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LightLinesProps {
  className?: string
  lineCount?: number
  color?: string
  duration?: number
}

const LightLines: React.FC<LightLinesProps> = ({
  className = '',
  lineCount = 5,
  color = 'rgba(232, 78, 45, 0.15)',
  duration = 3,
}) => {
  return (
<div
  className={cn(
    'relative w-full h-64 overflow-hidden rounded-xl bg-obsidian border border-border',
    className
  )}
>
  {Array.from({ length: lineCount }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute top-0 h-full"
      style={{
        width: '1px',
        background: \`linear-gradient(to bottom, transparent, \${color}, transparent)\`,
        left: \`\${((i + 1) / (lineCount + 1)) * 100}%\`,
      }}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scaleY: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay: i * 0.4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  ))}
  {Array.from({ length: lineCount }).map((_, i) => (
    <motion.div
      key={\`glow-\${i}\`}
      className="absolute top-0 h-full"
      style={{
        width: '30px',
        background: \`radial-gradient(ellipse at center, \${color}, transparent)\`,
        left: \`calc(\${((i + 1) / (lineCount + 1)) * 100}% - 15px)\`,
        filter: 'blur(8px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0.6, 0] }}
      transition={{
        duration,
        delay: i * 0.4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  ))}
</div>
  )
}

export default LightLines`,
usage: `import LightLines from "@/app/components/ui/light-lines"

export function Demo() {
  return <LightLines lineCount={5} />
}`,
props: [
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "lineCount",
    type: "number",
    default: "5",
    description: "Number of light beams.",
  },
  {
    name: "color",
    type: "string",
    default: "'rgba(232,78,45,0.15)'",
    description: "Color of the light beams.",
  },
  {
    name: "duration",
    type: "number",
    default: "3",
    description: "Animation cycle duration in seconds.",
  },
],
playground: {
  controls: [
    { name: "lineCount", label: "Line Count", type: "number", default: 5, min: 1, max: 12, step: 1 },
    { name: "color", label: "Color", type: "color", default: "rgba(232, 78, 45, 0.15)" },
    { name: "duration", label: "Duration (s)", type: "number", default: 3, min: 1, max: 10, step: 0.5 },
  ],
},
component: () => import("@/app/components/ui/light-lines"),
demo: () => import("@/app/components/demos/light-lines-demo"),
};

export default entry;
