'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  label?: string
  gradient?: boolean
  className?: string
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  gradient = false,
  className,
}) => {
  const isHorizontal = orientation === 'horizontal'

  const lineClasses = cn(
    gradient
      ? 'from-transparent via-ignite/40 to-transparent'
      : 'from-transparent via-border-light to-transparent',
    isHorizontal ? 'h-px w-full bg-gradient-to-r' : 'w-px h-full bg-gradient-to-b'
  )

  if (!isHorizontal) {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('inline-flex self-stretch', className)}
      >
        <motion.div
          className={lineClasses}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ originY: 0.5 }}
        />
      </div>
    )
  }

  // Horizontal divider
  if (!label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn('w-full', className)}
      >
        <motion.div
          className={lineClasses}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ originX: 0.5 }}
        />
      </div>
    )
  }

  // Horizontal divider with centered label
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn('flex items-center w-full', className)}
    >
      <motion.div
        className={lineClasses}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ originX: 1 }}
      />
      <motion.span
        className="shrink-0 px-3 text-xs text-text-faint select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.1 }}
      >
        {label}
      </motion.span>
      <motion.div
        className={lineClasses}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ originX: 0 }}
      />
    </div>
  )
}

export default Divider
