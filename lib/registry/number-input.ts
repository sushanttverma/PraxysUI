import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "number-input",
title: "Number Input",
description:
  "Numeric stepper with animated +/- buttons, spring scale on press, configurable min/max/step, three sizes, and disabled state.",
category: "buttons",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type NumberInputSize = 'sm' | 'md' | 'lg'

interface NumberInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  size?: NumberInputSize
  disabled?: boolean
  className?: string
}

const sizeStyles: Record<NumberInputSize, { wrapper: string; input: string; button: string }> = {
  sm: { wrapper: 'h-8', input: 'text-xs w-10', button: 'w-7 text-xs' },
  md: { wrapper: 'h-10', input: 'text-sm w-14', button: 'w-9 text-sm' },
  lg: { wrapper: 'h-12', input: 'text-base w-16', button: 'w-10 text-base' },
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  size = 'md',
  disabled = false,
  className,
}) => {
  const styles = sizeStyles[size]

  const decrement = () => {
    const next = value - step
    if (next >= min) onChange(next)
  }

  const increment = () => {
    const next = value + step
    if (next <= max) onChange(next)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value)
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      onChange(parsed)
    }
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg border border-border bg-void overflow-hidden',
        styles.wrapper,
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      <motion.button
        whileTap={{ scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={decrement}
        disabled={disabled || value <= min}
        className={cn(
          'flex items-center justify-center border-r border-border text-text-faint hover:text-blush hover:bg-obsidian transition-colors h-full',
          styles.button
        )}
        aria-label="Decrement"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.button>

      <input
        type="text"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          'bg-transparent text-center text-chalk font-medium outline-none h-full',
          styles.input
        )}
      />

      <motion.button
        whileTap={{ scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={increment}
        disabled={disabled || value >= max}
        className={cn(
          'flex items-center justify-center border-l border-border text-text-faint hover:text-blush hover:bg-obsidian transition-colors h-full',
          styles.button
        )}
        aria-label="Increment"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
          <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.button>
    </div>
  )
}

export default NumberInput`,
usage: `import NumberInput from "@/app/components/ui/number-input"
import { useState } from "react"

export function Demo() {
  const [value, setValue] = useState(5)
  return (
    <NumberInput value={value} onChange={setValue} min={0} max={100} step={1} />
  )
}`,
props: [
  {
    name: "value",
    type: "number",
    default: "—",
    description: "Current numeric value.",
  },
  {
    name: "onChange",
    type: "(value: number) => void",
    default: "—",
    description: "Callback when value changes.",
  },
  {
    name: "min",
    type: "number",
    default: "-Infinity",
    description: "Minimum allowed value.",
  },
  {
    name: "max",
    type: "number",
    default: "Infinity",
    description: "Maximum allowed value.",
  },
  {
    name: "step",
    type: "number",
    default: "1",
    description: "Increment/decrement step.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "Input size.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the input.",
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
    { name: "size", label: "Size", type: "select", default: "md", options: ["sm", "md", "lg"] },
    { name: "min", label: "Min", type: "number", default: 0, min: -100, max: 100 },
    { name: "max", label: "Max", type: "number", default: 100, min: 0, max: 1000 },
    { name: "step", label: "Step", type: "number", default: 1, min: 1, max: 50 },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
  defaults: {
  },
},
component: () => import("@/app/components/ui/number-input"),
demo: () => import("@/app/components/demos/number-input-demo"),
};

export default entry;
