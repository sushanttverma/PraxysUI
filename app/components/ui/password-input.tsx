'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type PasswordInputSize = 'sm' | 'md' | 'lg'

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  size?: PasswordInputSize
  className?: string
}

const sizeStyles: Record<PasswordInputSize, string> = {
  sm: 'text-xs py-1.5 pl-3 pr-8',
  md: 'text-sm py-2.5 pl-3 pr-10',
  lg: 'text-base py-3 pl-4 pr-11',
}

const iconSizes: Record<PasswordInputSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = 'Enter password',
  size = 'md',
  className,
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className={cn('relative', className)}>
      <input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg border border-border bg-void text-chalk placeholder:text-text-faint outline-none transition-colors focus:border-ignite/50',
          sizeStyles[size]
        )}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-faint hover:text-blush transition-colors"
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {visible ? (
            <motion.svg
              key="eye-open"
              className={iconSizes[size]}
              viewBox="0 0 20 20"
              fill="none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <path d="M10 4C5 4 1.7 8.3 1 10c.7 1.7 4 6 9 6s8.3-4.3 9-6c-.7-1.7-4-6-9-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
            </motion.svg>
          ) : (
            <motion.svg
              key="eye-closed"
              className={iconSizes[size]}
              viewBox="0 0 20 20"
              fill="none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <path d="M10 4C5 4 1.7 8.3 1 10c.7 1.7 4 6 9 6s8.3-4.3 9-6c-.7-1.7-4-6-9-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 17L17 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}

export default PasswordInput
