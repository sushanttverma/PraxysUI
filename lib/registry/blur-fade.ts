import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "blur-fade",
title: "Blur Fade",
description:
  "Blur + fade entrance animation wrapper that blurs children in from a configurable direction.",
category: "visual",
isNew: true,
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BlurFadeProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

const directionOffset: Record<string, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
}

const BlurFade: React.FC<BlurFadeProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className = '',
}) => {
  const offset = directionOffset[direction] ?? directionOffset.up

  return (
    <motion.div
      className={cn(className)}
      initial={{
        opacity: 0,
        filter: 'blur(12px)',
        x: offset.x,
        y: offset.y,
      }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)',
        x: 0,
        y: 0,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export default BlurFade`,
usage: `import BlurFade from "@/app/components/ui/blur-fade"

export function Demo() {
  return (
    <BlurFade delay={0.2} direction="up">
      <h2 className="text-2xl text-chalk">Hello World</h2>
    </BlurFade>
  )
}`,
props: [
  {
    name: "children",
    type: "React.ReactNode",
    default: "\u2014",
    description: "Content to animate in.",
  },
  {
    name: "delay",
    type: "number",
    default: "0",
    description: "Animation delay in seconds.",
  },
  {
    name: "duration",
    type: "number",
    default: "0.5",
    description: "Animation duration in seconds.",
  },
  {
    name: "direction",
    type: "'up' | 'down' | 'left' | 'right'",
    default: "'up'",
    description: "Direction the content enters from.",
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
    { name: "delay", label: "Delay (s)", type: "number", default: 0, min: 0, max: 2, step: 0.1 },
    { name: "duration", label: "Duration (s)", type: "number", default: 0.5, min: 0.1, max: 3, step: 0.1 },
    { name: "direction", label: "Direction", type: "select", default: "up", options: ["up", "down", "left", "right"] },
  ],
},
component: () => import("@/app/components/ui/blur-fade"),
demo: () => import("@/app/components/demos/blur-fade-demo"),
};

export default entry;
