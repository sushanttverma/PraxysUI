'use client'

import React, { useState, useRef, useCallback, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextareaProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  disabled?: boolean
  maxLength?: number
  autoResize?: boolean
  className?: string
  rows?: number
}

const AnimatedTextarea: React.FC<AnimatedTextareaProps> = ({
  label,
  placeholder,
  value: controlledValue,
  onChange,
  error,
  disabled = false,
  maxLength,
  autoResize = false,
  className,
  rows = 4,
}) => {
  const id = useId()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [focused, setFocused] = useState(false)
  const [internalValue, setInternalValue] = useState(controlledValue ?? '')

  // Support both controlled and uncontrolled usage
  const isControlled = controlledValue !== undefined && onChange !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInternalValue(e.target.value)
      onChange?.(e)
    },
    [isControlled, onChange]
  )

  const isFloating = focused || value.length > 0
  const charCount = value.length
  const isNearLimit = maxLength ? charCount >= maxLength * 0.9 : false

  // Auto-resize logic
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const el = textareaRef.current
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
  }, [value, autoResize])

  const handleFocus = useCallback(() => setFocused(true), [])
  const handleBlur = useCallback(() => setFocused(false), [])

  return (
    <div className={cn('relative w-full', className)}>
      {/* Textarea wrapper */}
      <div
        className={cn(
          'relative rounded-lg',
          disabled && 'opacity-40 pointer-events-none'
        )}
      >
        {/* Animated border / focus ring */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={false}
          animate={{
            boxShadow: focused
              ? error
                ? '0 0 0 1.5px rgba(232,78,45,0.5), 0 0 0 4px rgba(232,78,45,0.08)'
                : '0 0 0 1.5px rgba(232,78,45,0.6), 0 0 0 4px rgba(232,78,45,0.1)'
              : error
                ? '0 0 0 1.5px rgba(232,78,45,0.5)'
                : '0 0 0 1px rgba(255,255,255,0.08)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />

        {/* Background */}
        <div className="absolute inset-0 rounded-lg bg-obsidian pointer-events-none" />

        {/* Native textarea */}
        <textarea
          ref={textareaRef}
          id={id}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          maxLength={maxLength}
          rows={autoResize ? 1 : rows}
          placeholder={isFloating ? placeholder : undefined}
          aria-invalid={!!error}
          aria-describedby={
            [error ? `${id}-error` : '', maxLength ? `${id}-count` : '']
              .filter(Boolean)
              .join(' ') || undefined
          }
          className={cn(
            'relative z-[1] w-full bg-transparent rounded-lg text-sm text-chalk placeholder:text-text-faint outline-none px-3.5 py-3 resize-none',
            label && isFloating && 'pt-5',
            autoResize && 'overflow-hidden'
          )}
        />

        {/* Floating label */}
        {label && (
          <motion.label
            htmlFor={id}
            className={cn(
              'absolute left-3.5 z-[2] pointer-events-none origin-left px-1 rounded-sm',
              error ? 'text-ignite' : focused ? 'text-ignite' : 'text-text-faint'
            )}
            initial={false}
            animate={
              isFloating
                ? {
                    y: -20,
                    scale: 0.85,
                    opacity: 1,
                  }
                : {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                  }
            }
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            style={{ top: 14, transformOrigin: 'left center' }}
          >
            <span className={cn(isFloating && 'bg-obsidian px-1')}>
              {label}
            </span>
          </motion.label>
        )}
      </div>

      {/* Bottom row: error + character count */}
      <div className="flex items-start justify-between mt-1.5 min-h-[18px]">
        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              id={`${id}-error`}
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="text-xs text-ignite"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Character count */}
        {maxLength != null && (
          <motion.span
            id={`${id}-count`}
            className={cn(
              'ml-auto text-[11px] tabular-nums transition-colors',
              isNearLimit ? 'text-ignite' : 'text-text-faint'
            )}
            initial={false}
            animate={{
              scale: isNearLimit ? [1, 1.05, 1] : 1,
            }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
          >
            {charCount}/{maxLength}
          </motion.span>
        )}
      </div>
    </div>
  )
}

export default AnimatedTextarea
