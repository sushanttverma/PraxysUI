import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "stat-bar",
title: "Stat Bar",
description:
  "Horizontal stat/skill bar with animated spring fill triggered on scroll using useInView.",
category: "cards",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatBarProps {
  label: string
  value: number
  color?: string
  className?: string
  animated?: boolean
}

const StatBar: React.FC<StatBarProps> = ({
  label,
  value,
  color,
  className,
  animated = true,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const clamped = Math.min(Math.max(value, 0), 100)

  return (
    <div ref={ref} className={cn('w-full', className)}>
      {/* Label row */}
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-chalk">{label}</span>
        <span className="tabular-nums text-text-faint">{clamped}%</span>
      </div>

      {/* Track */}
      <div className="h-2.5 w-full overflow-hidden rounded-full border border-border bg-void">
        {/* Fill */}
        <motion.div
          className={cn('h-full rounded-full', !color && 'bg-ignite')}
          style={color ? { backgroundColor: color } : undefined}
          initial={{ width: 0 }}
          animate={
            animated
              ? isInView
                ? { width: \`\${clamped}%\` }
                : { width: 0 }
              : { width: \`\${clamped}%\` }
          }
          transition={
            animated
              ? { type: 'spring', stiffness: 80, damping: 20, mass: 0.8 }
              : { duration: 0 }
          }
        />
      </div>
    </div>
  )
}

export default StatBar`,
usage: `import StatBar from "@/app/components/ui/stat-bar"

export function Demo() {
  return (
    <StatBar label="React" value={92} />
  )
}`,
props: [
  {
    name: "label",
    type: "string",
    default: "—",
    description: "Text label for the stat bar.",
  },
  {
    name: "value",
    type: "number",
    default: "—",
    description: "Fill percentage (0-100).",
  },
  {
    name: "color",
    type: "string",
    default: "undefined",
    description: "Custom fill color. Defaults to ignite.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "animated",
    type: "boolean",
    default: "true",
    description: "Enable spring animation on scroll into view.",
  },
],
playground: {
  controls: [
    { name: "label", label: "Label", type: "text", default: "React" },
    { name: "value", label: "Value", type: "number", default: 92, min: 0, max: 100, step: 1 },
    { name: "color", label: "Color", type: "color", default: "" },
    { name: "animated", label: "Animated", type: "boolean", default: true },
  ],
},
component: () => import("@/app/components/ui/stat-bar"),
demo: () => import("@/app/components/demos/stat-bar-demo"),
};

export default entry;
