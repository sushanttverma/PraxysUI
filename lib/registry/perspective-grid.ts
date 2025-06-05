import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "perspective-grid",
title: "Perspective Grid",
description:
  "A 3D perspective grid that tilts items on hover with smooth spring animations and staggered entrance.",
category: "cards",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PerspectiveGridProps {
  children: React.ReactNode[]
  className?: string
  columns?: number
  tiltAmount?: number
}

const PerspectiveGrid: React.FC<PerspectiveGridProps> = ({
  children,
  className = '',
  columns = 3,
  tiltAmount = 8,
}) => {
  return (
<div
  className={cn('grid gap-4', className)}
  style={{
    gridTemplateColumns: \`repeat(\${columns}, minmax(0, 1fr))\`,
    perspective: '1000px',
  }}
>
  {React.Children.map(children, (child, i) => (
    <PerspectiveItem key={i} tiltAmount={tiltAmount} index={i}>
      {child}
    </PerspectiveItem>
  ))}
</div>
  )
}

function PerspectiveItem({
  children,
  tiltAmount,
  index,
}: {
  children: React.ReactNode
  tiltAmount: number
  index: number
}) {
  const [hovered, setHovered] = React.useState(false)

  return (
<motion.div
  initial={{ opacity: 0, rotateY: -15 }}
  whileInView={{ opacity: 1, rotateY: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  onHoverStart={() => setHovered(true)}
  onHoverEnd={() => setHovered(false)}
  animate={{
    rotateX: hovered ? tiltAmount : 0,
    rotateY: hovered ? -tiltAmount : 0,
    scale: hovered ? 1.02 : 1,
  }}
  style={{ transformStyle: 'preserve-3d' }}
  className="cursor-pointer transition-shadow duration-300"
>
  {children}
</motion.div>
  )
}

export default PerspectiveGrid`,
usage: `import PerspectiveGrid from "@/app/components/ui/perspective-grid"

export function Demo() {
  return (
<PerspectiveGrid columns={3} tiltAmount={8}>
  {[1, 2, 3].map((n) => (
    <div key={n} className="rounded-lg border border-border bg-obsidian p-8 text-center text-chalk">
      Card {n}
    </div>
  ))}
</PerspectiveGrid>
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
    name: "tiltAmount",
    type: "number",
    default: "8",
    description: "Degrees of 3D tilt on hover.",
  },
],
playground: {
  controls: [
    { name: "columns", label: "Columns", type: "number", default: 3, min: 1, max: 6, step: 1 },
    { name: "tiltAmount", label: "Tilt (deg)", type: "number", default: 8, min: 0, max: 25, step: 1 },
  ],
},
component: () => import("@/app/components/ui/perspective-grid"),
demo: () => import("@/app/components/demos/perspective-grid-demo"),
};

export default entry;
