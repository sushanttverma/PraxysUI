import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "aurora",
title: "Aurora",
description:
  "Aurora borealis gradient background effect with smoothly animated blurred color blobs.",
category: "visual",
isNew: true,
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AuroraProps {
  colors?: string[]
  speed?: number
  blur?: number
  className?: string
  children?: React.ReactNode
}

const blobPaths = [
  { x: ['0%', '40%', '10%', '0%'], y: ['0%', '30%', '60%', '0%'] },
  { x: ['60%', '20%', '50%', '60%'], y: ['20%', '60%', '10%', '20%'] },
  { x: ['30%', '60%', '20%', '30%'], y: ['50%', '10%', '40%', '50%'] },
]

const Aurora: React.FC<AuroraProps> = ({
  colors = ['#22c55e', '#7B61FF', '#06b6d4', '#a855f7'],
  speed = 10,
  blur = 120,
  className = '',
  children,
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border bg-void',
        className
      )}
    >
      <div className="absolute inset-0" style={{ filter: \\\`blur(\\\${blur}px)\\\` }}>
        {colors.map((color, i) => {
          const path = blobPaths[i % blobPaths.length]
          const duration = speed * (0.8 + (i % 3) * 0.2)
          return (
            <motion.div
              key={i}
              className="absolute h-[50%] w-[70%] rounded-full"
              style={{
                background: \\\`radial-gradient(ellipse at center, \\\${color} 0%, transparent 70%)\\\`,
                opacity: 0.5,
              }}
              animate={{
                x: path.x,
                y: path.y,
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default Aurora`,
usage: `import Aurora from "@/app/components/ui/aurora"

export function Demo() {
  return (
    <Aurora className="h-64 w-full">
      <div className="flex h-full items-center justify-center">
        <p className="text-2xl text-chalk">Aurora Borealis</p>
      </div>
    </Aurora>
  )
}`,
props: [
  {
    name: "colors",
    type: "string[]",
    default: "['#22c55e', '#7B61FF', '#06b6d4', '#a855f7']",
    description: "Array of colors for the aurora blobs.",
  },
  {
    name: "speed",
    type: "number",
    default: "10",
    description: "Base animation speed in seconds.",
  },
  {
    name: "blur",
    type: "number",
    default: "120",
    description: "Blur amount in pixels.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "\u2014",
    description: "Content to display on top of the aurora.",
  },
],
playground: {
  controls: [
    { name: "speed", label: "Speed (s)", type: "number", default: 10, min: 3, max: 25, step: 1 },
    { name: "blur", label: "Blur (px)", type: "number", default: 120, min: 40, max: 200, step: 10 },
  ],
},
component: () => import("@/app/components/ui/aurora"),
demo: () => import("@/app/components/demos/aurora-demo"),
};

export default entry;
