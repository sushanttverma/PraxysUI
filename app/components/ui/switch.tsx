'use client'

import React, { useId, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  label,
  size = 'md',
  disabled = false,
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

  // Size variants (container includes padding for thumb)
  const sizeClasses = {
    sm: {
      container: 'w-9 h-5',
      thumb: 'w-3 h-3',
      translateX: 16, // pixels
    },
    md: {
      container: 'w-11 h-6',
      thumb: 'w-4 h-4',
      translateX: 20,
    },
    lg: {
      container: 'w-14 h-8',
      thumb: 'w-6 h-6',
      translateX: 24,
    },
  }

  const sizes = sizeClasses[size]

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        id={id}
        role="switch"
        type="button"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-label={label || 'Toggle switch'}
        tabIndex={disabled ? -1 : 0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          'relative inline-flex items-center shrink-0 rounded-full transition-colors p-1',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite/40',
          checked
            ? 'bg-ignite border-ignite'
            : 'bg-obsidian border-border hover:border-border-light',
          disabled && 'opacity-40 cursor-not-allowed',
          !disabled && 'cursor-pointer',
          sizes.container,
          'border'
        )}
      >
        <motion.span
          className={cn(
            'block rounded-full shadow-md',
            checked ? 'bg-chalk' : 'bg-text-faint',
            sizes.thumb
          )}
          initial={false}
          animate={{
            x: checked ? sizes.translateX : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            mass: 0.8,
          }}
        />
      </button>

      {label && (
        <label
          htmlFor={id}
          className={cn(
            'text-sm text-chalk select-none',
            disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
          )}
          onClick={handleToggle}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default Switch
