'use client'

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
                transition={{ type: 'spring' as const, stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{option}</span>
          </button>
        )
      })}
    </div>
  )
}

export default ToggleGroup
