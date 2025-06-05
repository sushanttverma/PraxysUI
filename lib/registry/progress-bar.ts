import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "progress-bar",
title: "Progress Bar",
description:
  "An animated progress bar with multiple sizes, optional label and value display, custom colors, and candy-stripe animation.",
category: "visual",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type ProgressSize = 'sm' | 'md' | 'lg'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  color?: string
  size?: ProgressSize
  animated?: boolean
  className?: string
}

const sizeStyles: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  color,
  size = 'md',
  animated = true,
  className,
}) => {
  const clamped = Math.min(Math.max(value, 0), max)
  const percent = Math.round((clamped / max) * 100)

  return (
<div className={cn('w-full', className)}>
  {/* Label row */}
  {(label || showValue) && (
    <div className="mb-1.5 flex items-center justify-between text-xs">
      {label && <span className="font-medium text-chalk">{label}</span>}
      {showValue && <span className="text-blush">{percent}%</span>}
    </div>
  )}

  {/* Track */}
  <div
    className={cn(
      'w-full overflow-hidden rounded-full border border-border bg-void',
      sizeStyles[size]
    )}
  >
    {/* Fill */}
    <motion.div
      className={cn(
        'relative h-full rounded-full',
        !color && 'bg-ignite'
      )}
      style={color ? { backgroundColor: color } : undefined}
      initial={{ width: 0 }}
      animate={{ width: \`\${percent}%\` }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Animated stripes */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage:
              'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
            backgroundSize: '16px 16px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '16px 0px'] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </motion.div>
  </div>
</div>
  )
}

export default ProgressBar`,
usage: `import ProgressBar from "@/app/components/ui/progress-bar"

export function Demo() {
  return (
<ProgressBar
  value={65}
  label="Upload Progress"
  showValue
  size="md"
/>
  )
}`,
props: [
  {
    name: "value",
    type: "number",
    default: "—",
    description: "Current progress value.",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "Maximum value for the progress bar.",
  },
  {
    name: "label",
    type: "string",
    default: "undefined",
    description: "Text label displayed above the bar.",
  },
  {
    name: "showValue",
    type: "boolean",
    default: "false",
    description: "Show the percentage value next to the label.",
  },
  {
    name: "color",
    type: "string",
    default: "undefined",
    description: "Custom background color for the fill. Defaults to ignite.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "Height of the progress bar.",
  },
  {
    name: "animated",
    type: "boolean",
    default: "true",
    description: "Show animated candy-stripe overlay.",
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
    { name: "value", label: "Value", type: "number", default: 65, min: 0, max: 100, step: 1 },
    { name: "max", label: "Max", type: "number", default: 100, min: 1, max: 200, step: 1 },
    { name: "label", label: "Label", type: "text", default: "Upload Progress" },
    { name: "showValue", label: "Show Value", type: "boolean", default: true },
    { name: "size", label: "Size", type: "select", default: "md", options: ["sm", "md", "lg"] },
    { name: "animated", label: "Animated Stripes", type: "boolean", default: true },
  ],
},
component: () => import("@/app/components/ui/progress-bar"),
demo: () => import("@/app/components/demos/progress-bar-demo"),
};

export default entry;
