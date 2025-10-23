'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onClear?: () => void
  loading?: boolean
  className?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  onClear,
  loading = false,
  className,
}) => {
  const handleClear = () => {
    onChange('')
    onClear?.()
  }

  return (
    <div
      className={cn(
        'relative flex items-center rounded-lg border border-border bg-void transition-colors focus-within:border-ignite/50',
        className
      )}
    >
      <div className="flex items-center justify-center pl-3">
        {loading ? (
          <motion.svg
            className="h-4 w-4 text-text-faint"
            viewBox="0 0 16 16"
            fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
          </motion.svg>
        ) : (
          <motion.svg
            className="h-4 w-4 text-text-faint"
            viewBox="0 0 16 16"
            fill="none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
          >
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </motion.svg>
        )}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent px-3 py-2.5 text-sm text-chalk placeholder:text-text-faint outline-none"
      />

      <AnimatePresence>
        {value.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            onClick={handleClear}
            className="mr-2 flex items-center justify-center rounded-full p-1 text-text-faint hover:text-blush hover:bg-obsidian transition-colors"
            aria-label="Clear search"
          >
            <svg className="h-3 w-3" viewBox="0 0 10 10" fill="none">
              <path d="M2.5 2.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchInput
