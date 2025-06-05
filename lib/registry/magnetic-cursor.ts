import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "magnetic-cursor",
title: "Magnetic Cursor",
description:
  "A wrapper that creates a magnetic pull effect, attracting elements toward the cursor with configurable strength and radius.",
category: "visual",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticCursorProps {
  children: React.ReactNode
  className?: string
  strength?: number
  radius?: number
  springConfig?: { stiffness?: number; damping?: number }
}

const MagneticCursor: React.FC<MagneticCursorProps> = ({
  children,
  className = '',
  strength = 0.3,
  radius = 200,
  springConfig,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const xMotion = useMotionValue(0)
  const yMotion = useMotionValue(0)

  const springOpts = {
stiffness: springConfig?.stiffness ?? 150,
damping: springConfig?.damping ?? 15,
  }

  const x = useSpring(xMotion, springOpts)
  const y = useSpring(yMotion, springOpts)

  const handleMouseMove = useCallback(
(e: React.MouseEvent<HTMLDivElement>) => {
  if (!ref.current) return
  const rect = ref.current.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const distX = e.clientX - centerX
  const distY = e.clientY - centerY
  const distance = Math.sqrt(distX * distX + distY * distY)

  if (distance < radius) {
    xMotion.set(distX * strength)
    yMotion.set(distY * strength)
  } else {
    xMotion.set(0)
    yMotion.set(0)
  }
},
[radius, strength, xMotion, yMotion]
  )

  const handleMouseLeave = useCallback(() => {
xMotion.set(0)
yMotion.set(0)
  }, [xMotion, yMotion])

  return (
<motion.div
  ref={ref}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  style={{ x, y }}
  className={cn(className)}
>
  {children}
</motion.div>
  )
}

export default MagneticCursor`,
usage: `import MagneticCursor from "@/app/components/ui/magnetic-cursor"

export function Demo() {
  return (
<MagneticCursor strength={0.4} radius={150}>
  <button className="rounded-lg bg-ignite/10 border border-ignite/30 px-6 py-3 text-chalk">
    Hover near me
  </button>
</MagneticCursor>
  )
}`,
props: [
  {
    name: "children",
    type: "React.ReactNode",
    default: "—",
    description: "The element to apply the magnetic effect to.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "strength",
    type: "number",
    default: "0.3",
    description: "Magnetic pull strength (0 = none, 1 = follows cursor fully).",
  },
  {
    name: "radius",
    type: "number",
    default: "200",
    description: "Pixel radius of the magnetic field.",
  },
  {
    name: "springConfig",
    type: "{ stiffness?: number; damping?: number }",
    default: "{ stiffness: 150, damping: 15 }",
    description: "Spring physics configuration for the animation.",
  },
],
playground: {
  controls: [
    { name: "strength", label: "Strength", type: "number", default: 0.3, min: 0.05, max: 1, step: 0.05 },
    { name: "radius", label: "Radius (px)", type: "number", default: 200, min: 50, max: 500, step: 25 },
  ],
},
component: () => import("@/app/components/ui/magnetic-cursor"),
demo: () => import("@/app/components/demos/magnetic-cursor-demo"),
};

export default entry;
