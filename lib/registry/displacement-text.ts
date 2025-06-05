import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "displacement-text",
title: "3D Displacement Text",
description:
  "Mouse-reactive 3D text with depth shadows that follows cursor movement, creating a dramatic displacement effect.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DisplacementTextProps {
  text: string
  className?: string
  fontSize?: number
  color?: string
  shadowColor?: string
  depth?: number
}

const DisplacementText: React.FC<DisplacementTextProps> = ({
  text,
  className = '',
  fontSize = 64,
  color = 'var(--color-chalk)',
  shadowColor = 'var(--color-ignite)',
  depth = 12,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(springY, [0, 1], [depth, -depth])
  const rotateY = useTransform(springX, [0, 1], [-depth, depth])

  const shadowX = useTransform(springX, [0, 1], [depth, -depth])
  const shadowY = useTransform(springY, [0, 1], [depth, -depth])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
const rect = ref.current?.getBoundingClientRect()
if (!rect) return
mouseX.set((e.clientX - rect.left) / rect.width)
mouseY.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
mouseX.set(0.5)
mouseY.set(0.5)
  }

  return (
<div
  ref={ref}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  className={cn(
    'flex items-center justify-center cursor-crosshair select-none',
    className
  )}
  style={{ perspective: '800px' }}
>
  <motion.span
    className="font-pixel font-bold"
    style={{
      fontSize,
      color,
      rotateX,
      rotateY,
      textShadow: useTransform(
        [shadowX, shadowY],
        ([x, y]) =>
          \`\${x}px \${y}px 0px \${shadowColor}, \${Number(x) * 2}px \${Number(y) * 2}px 0px \${shadowColor}40\`
      ),
      transformStyle: 'preserve-3d',
    }}
  >
    {text}
  </motion.span>
</div>
  )
}

export default DisplacementText`,
usage: `import DisplacementText from "@/app/components/ui/displacement-text"

export function Demo() {
  return (
<DisplacementText
  text="PRAXYS"
  fontSize={72}
  depth={15}
/>
  )
}`,
props: [
  {
    name: "text",
    type: "string",
    default: "—",
    description: "The text to display.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "fontSize",
    type: "number",
    default: "64",
    description: "Font size in pixels.",
  },
  {
    name: "color",
    type: "string",
    default: "'var(--color-chalk)'",
    description: "Text color.",
  },
  {
    name: "shadowColor",
    type: "string",
    default: "'var(--color-ignite)'",
    description: "Color of the 3D shadow.",
  },
  {
    name: "depth",
    type: "number",
    default: "12",
    description: "Maximum rotation and shadow offset in pixels/degrees.",
  },
],
playground: {
  controls: [
    { name: "text", label: "Text", type: "text", default: "PRAXYS" },
    { name: "fontSize", label: "Font Size", type: "number", default: 64, min: 24, max: 120, step: 4 },
    { name: "depth", label: "Depth", type: "number", default: 12, min: 0, max: 30, step: 1 },
    { name: "color", label: "Text Color", type: "color", default: "#F2ECE2" },
    { name: "shadowColor", label: "Shadow Color", type: "color", default: "#E84E2D" },
  ],
},
component: () => import("@/app/components/ui/displacement-text"),
demo: () => import("@/app/components/demos/displacement-text-demo"),
};

export default entry;
