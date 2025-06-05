import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "gradient-mesh",
title: "Gradient Mesh",
description:
  "Animated multi-color gradient mesh background with smooth transitions between color states.",
category: "visual",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientMeshProps {
  className?: string
  colors?: string[]
  speed?: number
  blur?: number
  children?: React.ReactNode
}

const blobKeyframes = [
  { x: ['0%', '30%', '10%', '0%'], y: ['0%', '20%', '40%', '0%'] },
  { x: ['60%', '30%', '50%', '60%'], y: ['10%', '50%', '20%', '10%'] },
  { x: ['20%', '50%', '10%', '20%'], y: ['50%', '10%', '30%', '50%'] },
  { x: ['40%', '10%', '60%', '40%'], y: ['30%', '60%', '0%', '30%'] },
]

const durationMultipliers = [1, 1.3, 0.9, 1.1]

const GradientMesh: React.FC<GradientMeshProps> = ({
  className = '',
  colors = ['#E84E2D', '#C9958A', '#F2ECE2', '#0B0A08'],
  speed = 8,
  blur = 100,
  children,
}) => {
  return (
<div className={cn('relative overflow-hidden rounded-xl border border-border', className)}>
  <div className="absolute inset-0" style={{ filter: \\\`blur(\\\${blur}px)\\\` }}>
    {colors.map((color, i) => {
      const keyframe = blobKeyframes[i % blobKeyframes.length]
      const duration = speed * durationMultipliers[i % durationMultipliers.length]
      return (
        <motion.div
          key={i}
          className="absolute h-[60%] w-[60%] rounded-full"
          style={{ background: \\\`radial-gradient(circle, \\\${color} 0%, transparent 70%)\\\` }}
          animate={{ x: keyframe.x, y: keyframe.y }}
          transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      )
    })}
  </div>
  <div className="relative z-10">{children}</div>
</div>
  )
}

export default GradientMesh`,
usage: `import GradientMesh from "@/app/components/ui/gradient-mesh"

export function Demo() {
  return (
<GradientMesh className="h-64 w-full">
  <div className="flex h-full items-center justify-center">
    <p className="font-pixel text-2xl text-chalk">Gradient Mesh</p>
  </div>
</GradientMesh>
  )
}`,
props: [
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "colors",
    type: "string[]",
    default: "['#E84E2D', '#C9958A', '#F2ECE2', '#0B0A08']",
    description: "Array of colors for the gradient blobs.",
  },
  {
    name: "speed",
    type: "number",
    default: "8",
    description: "Base animation speed in seconds.",
  },
  {
    name: "blur",
    type: "number",
    default: "100",
    description: "Blur amount in pixels.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "—",
    description: "Content to display on top of the mesh.",
  },
],
playground: {
  controls: [
    { name: "speed", label: "Speed (s)", type: "number", default: 8, min: 2, max: 20, step: 1 },
    { name: "blur", label: "Blur (px)", type: "number", default: 100, min: 20, max: 200, step: 10 },
  ],
},
component: () => import("@/app/components/ui/gradient-mesh"),
demo: () => import("@/app/components/demos/gradient-mesh-demo"),
};

export default entry;
