import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "toggle-group",
title: "Toggle Group",
description:
  "Segmented control / button group toggle with spring-animated selection indicator using layoutId, three sizes (sm/md/lg), and smooth transitions.",
category: "buttons",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type ToggleGroupSize = 'sm' | 'md' | 'lg'

interface ToggleGroupProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  size?: ToggleGroupSize
  className?: string
}

const sizeStyles: Record<ToggleGroupSize, string> = {
  sm: 'text-xs px-2.5 py-1',
  md: 'text-sm px-4 py-1.5',
  lg: 'text-base px-5 py-2',
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options,
  value,
  onChange,
  size = 'md',
  className,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 rounded-lg border border-border bg-void p-1',
        className
      )}
    >
      {options.map((option) => {
        const isSelected = option === value
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={cn(
              'relative rounded-md font-medium transition-colors',
              sizeStyles[size],
              isSelected ? 'text-chalk' : 'text-text-faint hover:text-blush'
            )}
          >
            {isSelected && (
              <motion.span
                layoutId="toggle-group-indicator"
                className="absolute inset-0 rounded-md bg-obsidian border border-border"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{option}</span>
          </button>
        )
      })}
    </div>
  )
}

export default ToggleGroup`,
usage: `import ToggleGroup from "@/app/components/ui/toggle-group"
import { useState } from "react"

export function Demo() {
  const [value, setValue] = useState("Grid")
  return (
    <ToggleGroup
      options={["List", "Grid", "Board"]}
      value={value}
      onChange={setValue}
    />
  )
}`,
props: [
  {
    name: "options",
    type: "string[]",
    default: "—",
    description: "Array of option labels.",
  },
  {
    name: "value",
    type: "string",
    default: "—",
    description: "Currently selected option.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    default: "—",
    description: "Callback when selection changes.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "Size of the toggle buttons.",
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
  ],
  defaults: {
    options: ["List", "Grid", "Board"],
  },
},
component: () => import("@/app/components/ui/toggle-group"),
demo: () => import("@/app/components/demos/toggle-group-demo"),
};

export default entry;
