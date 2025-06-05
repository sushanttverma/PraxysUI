import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "liquid-metal",
title: "Liquid Metal",
description:
  "A cursor-reactive surface with chrome-like liquid metal reflections that follow mouse movement.",
category: "visual",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LiquidMetalProps {
  className?: string
  children?: React.ReactNode
  baseColor?: string
  highlightColor?: string
}

const LiquidMetal: React.FC<LiquidMetalProps> = ({
  className = '',
  children,
  baseColor = '#1c1a17',
  highlightColor = '#E84E2D',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  const background = useMotionTemplate\`
radial-gradient(circle at \${mouseX}% \${mouseY}%, \${highlightColor}30 0%, transparent 50%),
radial-gradient(circle at \${mouseX}% \${mouseY}%, \${highlightColor}15 0%, transparent 70%),
linear-gradient(135deg, \${baseColor} 0%, \${baseColor}dd 50%, \${baseColor} 100%)
  \`

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
const rect = ref.current?.getBoundingClientRect()
if (!rect) return
mouseX.set(((e.clientX - rect.left) / rect.width) * 100)
mouseY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  function handleMouseLeave() {
mouseX.set(50)
mouseY.set(50)
  }

  return (
<motion.div
  ref={ref}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  className={cn(
    'relative w-full h-64 overflow-hidden rounded-xl border border-border cursor-crosshair',
    className
  )}
  style={{ background }}
>
  {/* Chrome-like reflections */}
  <motion.div
    className="absolute inset-0 opacity-20"
    style={{
      background: useMotionTemplate\`
        linear-gradient(
          \${mouseX}deg,
          transparent 20%,
          \${highlightColor}20 45%,
          \${highlightColor}40 50%,
          \${highlightColor}20 55%,
          transparent 80%
        )
      \`,
    }}
  />

  {/* Content */}
  {children && (
    <div className="relative z-10 flex h-full items-center justify-center">
      {children}
    </div>
  )}
</motion.div>
  )
}

export default LiquidMetal`,
usage: `import LiquidMetal from "@/app/components/ui/liquid-metal"

export function Demo() {
  return (
<LiquidMetal>
  <span className="font-pixel text-2xl text-chalk">
    Move your cursor
  </span>
</LiquidMetal>
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
    name: "children",
    type: "React.ReactNode",
    default: "—",
    description: "Content to display inside the metal surface.",
  },
  {
    name: "baseColor",
    type: "string",
    default: "'#1c1a17'",
    description: "Base background color of the surface.",
  },
  {
    name: "highlightColor",
    type: "string",
    default: "'#E84E2D'",
    description: "Color of the metallic highlight reflections.",
  },
],
playground: {
  controls: [
    { name: "baseColor", label: "Base Color", type: "color", default: "#1c1a17" },
    { name: "highlightColor", label: "Highlight Color", type: "color", default: "#E84E2D" },
  ],
},
component: () => import("@/app/components/ui/liquid-metal"),
demo: () => import("@/app/components/demos/liquid-metal-demo"),
};

export default entry;
