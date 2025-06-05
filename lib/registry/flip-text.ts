import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "flip-text",
title: "Flip Text",
description:
  "Characters flip in one-by-one with a smooth 3D rotation, great for headings and titles.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
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
  staggerDelay = 0.05,
  duration = 0.5,
}) => {
  return (
<span className={cn('inline-flex overflow-hidden', className)}>
  {text.split('').map((char, i) => (
    <motion.span
      key={i}
      className="inline-block"
      initial={{ rotateX: 90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{
        delay: i * staggerDelay,
        duration,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
      style={{ transformOrigin: 'bottom', display: 'inline-block' }}
    >
      {char === ' ' ? '\\u00A0' : char}
    </motion.span>
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
    default: "0.05",
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
    { name: "staggerDelay", label: "Stagger Delay", type: "number", default: 0.05, min: 0.01, max: 0.3, step: 0.01 },
    { name: "duration", label: "Duration", type: "number", default: 0.5, min: 0.1, max: 2, step: 0.1 },
  ],
},
component: () => import("@/app/components/ui/flip-text"),
demo: () => import("@/app/components/demos/flip-text-demo"),
};

export default entry;
