import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "glow-border-card",
title: "Glow Border Card",
description:
  "A card with an animated glowing border that follows cursor movement.",
category: "cards",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowBorderCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

const GlowBorderCard: React.FC<GlowBorderCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(232, 78, 45, 0.35)',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
const rect = ref.current?.getBoundingClientRect()
if (!rect) return
mouseX.set(e.clientX - rect.left)
mouseY.set(e.clientY - rect.top)
  }

  const background = useMotionTemplate\`radial-gradient(
300px circle at \${mouseX}px \${mouseY}px,
\${glowColor},
transparent 80%
  )\`

  return (
<div
  ref={ref}
  onMouseMove={handleMouseMove}
  className={cn(
    'group relative rounded-xl border border-border bg-obsidian p-px overflow-hidden',
    className
  )}
>
  <motion.div
    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    style={{ background }}
  />
  <div className="relative rounded-xl bg-obsidian p-6">
    {children}
  </div>
</div>
  )
}

export default GlowBorderCard`,
usage: `import GlowBorderCard from "@/app/components/ui/glow-border-card"

export function Demo() {
  return (
<GlowBorderCard>
  <h3 className="text-lg font-semibold text-chalk">Card Title</h3>
  <p className="mt-2 text-sm text-blush">
    Hover over this card to see the glow effect.
  </p>
</GlowBorderCard>
  )
}`,
props: [
  {
    name: "children",
    type: "React.ReactNode",
    default: "—",
    description: "Content inside the card.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "glowColor",
    type: "string",
    default: "'rgba(232,78,45,0.35)'",
    description: "Color of the glow effect.",
  },
],
playground: {
  controls: [
    { name: "glowColor", label: "Glow Color", type: "color", default: "rgba(232, 78, 45, 0.35)" },
  ],
  defaults: {
    children: null,
  },
},
component: () => import("@/app/components/ui/glow-border-card"),
demo: () => import("@/app/components/demos/glow-border-card-demo"),
};

export default entry;
