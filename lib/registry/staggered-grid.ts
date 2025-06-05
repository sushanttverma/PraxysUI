import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "staggered-grid",
title: "Staggered Grid",
description:
  "A grid layout where children animate in with a staggered fade-up effect as they enter the viewport.",
category: "cards",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StaggeredGridProps {
  children: React.ReactNode[]
  className?: string
  columns?: number
  staggerDelay?: number
}

const StaggeredGrid: React.FC<StaggeredGridProps> = ({
  children,
  className = '',
  columns = 3,
  staggerDelay = 0.08,
}) => {
  return (
<div
  className={cn('grid gap-4', className)}
  style={{
    gridTemplateColumns: \`repeat(\${columns}, minmax(0, 1fr))\`,
  }}
>
  {React.Children.map(children, (child, i) => (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: i * staggerDelay,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
    >
      {child}
    </motion.div>
  ))}
</div>
  )
}

export default StaggeredGrid`,
usage: `import StaggeredGrid from "@/app/components/ui/staggered-grid"

export function Demo() {
  return (
<StaggeredGrid columns={3}>
  {[1, 2, 3, 4, 5, 6].map((n) => (
    <div key={n} className="rounded-lg border border-border bg-obsidian p-6 text-chalk">
      Item {n}
    </div>
  ))}
</StaggeredGrid>
  )
}`,
props: [
  {
    name: "children",
    type: "React.ReactNode[]",
    default: "—",
    description: "Array of child elements to render in the grid.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "columns",
    type: "number",
    default: "3",
    description: "Number of grid columns.",
  },
  {
    name: "staggerDelay",
    type: "number",
    default: "0.08",
    description: "Delay between each child animation in seconds.",
  },
],
playground: {
  controls: [
    { name: "columns", label: "Columns", type: "number", default: 3, min: 1, max: 6, step: 1 },
    { name: "staggerDelay", label: "Stagger Delay", type: "number", default: 0.08, min: 0.01, max: 0.5, step: 0.01 },
  ],
},
component: () => import("@/app/components/ui/staggered-grid"),
demo: () => import("@/app/components/demos/staggered-grid-demo"),
};

export default entry;
