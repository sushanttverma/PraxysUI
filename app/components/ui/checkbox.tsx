'use client'

import React, { useId, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
  error?: string
  className?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  error,
  className,
}) => {
  const id = useId()

  const handleToggle = useCallback(() => {
    if (disabled) return
    onChange?.(!checked)
  }, [disabled, checked, onChange])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleToggle()
      }
    },
    [handleToggle]
  )

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'flex items-start gap-3 select-none',
          disabled ? 'opacity-40 pointer-events-none' : 'cursor-pointer'
        )}
        onClick={handleToggle}
      >
        {/* Custom checkbox */}
        <motion.div
          role="checkbox"
          aria-checked={checked}
          aria-disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          className={cn(
            'relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors mt-0.5',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite/40',
            checked
              ? 'border-ignite bg-ignite/20'
              : error
                ? 'border-red-500/50 bg-obsidian'
                : 'border-border bg-obsidian hover:border-border-light'
          )}
          initial={false}
          animate={{
            scale: checked ? [1, 1.15, 1] : 1,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          <AnimatePresence>
            {checked && (
              <motion.svg
                viewBox="0 0 14 14"
                fill="none"
                className="h-3.5 w-3.5 text-ignite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <motion.path
                  d="M3 7.5L5.5 10L11 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  exit={{ pathLength: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                    mass: 0.8,
                  }}
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Label */}
        {label && (
          <span className="text-sm text-chalk leading-snug">{label}</span>
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="mt-1.5 ml-8 text-xs text-ignite"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Checkbox
