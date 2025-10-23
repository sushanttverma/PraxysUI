'use client'

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
        transition={{ type: 'spring' as const, stiffness: 400, damping: 20 }}
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
        transition={{ type: 'spring' as const, stiffness: 400, damping: 20 }}
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

export default NumberInput
