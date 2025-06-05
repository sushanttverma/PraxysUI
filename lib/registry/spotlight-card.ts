import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "spotlight-card",
title: "Spotlight Card",
description:
  "A card with a radial spotlight that follows the cursor, creating a flashlight reveal effect.",
category: "cards",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  spotlightSize?: number
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className,
  spotlightColor = 'rgba(232, 78, 45, 0.15)',
  spotlightSize = 300,
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
\${spotlightSize}px circle at \${mouseX}px \${mouseY}px,
\${spotlightColor},
transparent 80%
  )\`

  return (
<div
  ref={ref}
  onMouseMove={handleMouseMove}
  className={cn('group relative rounded-xl border border-border bg-obsidian overflow-hidden', className)}
>
  <motion.div
    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    style={{ background }}
  />
  <div className="relative z-10 p-6">{children}</div>
</div>
  )
}

export default SpotlightCard`,
usage: `import SpotlightCard from "@/app/components/ui/spotlight-card"

export function Demo() {
  return (
<SpotlightCard>
  <h3 className="font-pixel text-lg text-chalk">Card Title</h3>
  <p className="mt-2 text-sm text-blush">Hover to see the spotlight effect.</p>
</SpotlightCard>
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
    name: "spotlightColor",
    type: "string",
    default: "'rgba(232, 78, 45, 0.15)'",
    description: "Color of the spotlight radial gradient.",
  },
  {
    name: "spotlightSize",
    type: "number",
    default: "300",
    description: "Diameter of the spotlight in pixels.",
  },
],
playground: {
  controls: [
    { name: "spotlightColor", label: "Spotlight Color", type: "color", default: "rgba(232, 78, 45, 0.15)" },
    { name: "spotlightSize", label: "Spotlight Size (px)", type: "number", default: 300, min: 100, max: 600, step: 50 },
  ],
},
component: () => import("@/app/components/ui/spotlight-card"),
demo: () => import("@/app/components/demos/spotlight-card-demo"),
};

export default entry;
