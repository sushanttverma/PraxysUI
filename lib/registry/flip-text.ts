import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "flip-text",
title: "Flip Text",
description:
  "Characters flip in with a smooth 3D rotation on mount and on hover, great for headings and titles.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FlipTextProps {
  text: string
  className?: string
  staggerDelay?: number
  duration?: number
}

const FlipText: React.FC<FlipTextProps> = ({
  text,
  className = '',
  staggerDelay = 0.015,
  duration = 0.5,
}) => {
  const [key, setKey] = useState(0)

  const replay = useCallback(() => {
    setKey((k) => k + 1)
  }, [])

  return (
<span
  className={cn('inline-flex', className)}
  onMouseEnter={replay}
>
  {text.split('').map((char, i) => (
    <span
      key={\`\${key}-\${i}\`}
      className="inline-block [perspective:600px]"
    >
      <motion.span
        className="inline-block"
        initial={{ rotateX: -90 }}
        animate={{ rotateX: 0 }}
        transition={{
          delay: i * staggerDelay,
          duration,
          ease: [0.2, 0.65, 0.3, 0.9],
        }}
        style={{
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          display: 'inline-block',
        }}
      >
        {char === ' ' ? '\\u00A0' : char}
      </motion.span>
    </span>
  ))}
</span>
  )
}

export default FlipText`,
usage: `import FlipText from "@/app/components/ui/flip-text"

export function Demo() {
  return (
<FlipText
  text="Hello World"
  className="text-4xl font-bold text-chalk"
/>
  )
}`,
props: [
  {
    name: "text",
    type: "string",
    default: "—",
    description: "The text to animate.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "staggerDelay",
    type: "number",
    default: "0.015",
    description: "Delay between each character animation (seconds).",
  },
  {
    name: "duration",
    type: "number",
    default: "0.5",
    description: "Duration of each character flip (seconds).",
  },
],
playground: {
  controls: [
    { name: "text", label: "Text", type: "text", default: "Hello World" },
    { name: "staggerDelay", label: "Stagger Delay", type: "number", default: 0.015, min: 0.005, max: 0.1, step: 0.005 },
    { name: "duration", label: "Duration", type: "number", default: 0.5, min: 0.1, max: 2, step: 0.1 },
  ],
},
component: () => import("@/app/components/ui/flip-text"),
demo: () => import("@/app/components/demos/flip-text-demo"),
};

export default entry;
