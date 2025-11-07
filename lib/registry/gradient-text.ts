import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "gradient-text",
title: "Gradient Text",
description:
  "Animated gradient text with flowing colors that shift across the text using an animated background-position.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: string
  colors?: string[]
  speed?: number
  className?: string
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors = ['#E84E2D', '#C9958A', '#8B5CF6'],
  speed = 3,
  className = '',
}) => {
  const gradient = colors.join(', ')

  return (
    <motion.span
      className={cn('inline-block bg-clip-text text-transparent', className)}
      style={{
        backgroundImage: \`linear-gradient(90deg, \${gradient}, \${colors[0]})\`,
        backgroundSize: '200% 100%',
      }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{
        duration: speed,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      {children}
    </motion.span>
  )
}

export default GradientText`,
usage: `import GradientText from "@/app/components/ui/gradient-text"

export function Demo() {
  return (
<h1 className="text-4xl font-bold">
  <GradientText>Hello World</GradientText>
</h1>
  )
}`,
props: [
  {
    name: "children",
    type: "string",
    default: "—",
    description: "The text content to display with the gradient effect.",
  },
  {
    name: "colors",
    type: "string[]",
    default: "['#E84E2D', '#C9958A', '#8B5CF6']",
    description: "Array of color stops for the gradient.",
  },
  {
    name: "speed",
    type: "number",
    default: "3",
    description: "Duration in seconds for one full gradient animation cycle.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
],
playground: {
  controls: [
    { name: "speed", label: "Speed (s)", type: "number", default: 3, min: 0.5, max: 10, step: 0.5 },
  ],
  defaults: {
    children: "Praxys UI Components",
  },
},
component: () => import("@/app/components/ui/gradient-text"),
demo: () => import("@/app/components/demos/gradient-text-demo"),
};

export default entry;
