'use client'

import React, { useState, useRef, useEffect, useCallback, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AutocompleteOption {
  value: string
  label: string
}

interface AutocompleteProps {
  onSelect?: (option: AutocompleteOption) => void
  onSearch: (query: string) => Promise<AutocompleteOption[]>
  placeholder?: string
  label?: string
  loading?: boolean
  debounceMs?: number
  disabled?: boolean
  className?: string
}

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
)

const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={className}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </motion.svg>
)

const highlightMatch = (text: string, query: string) => {
  if (!query) return text
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="text-ignite font-semibold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  onSelect,
  onSearch,
  placeholder = 'Search...',
  label,
  loading: externalLoading = false,
  debounceMs = 300,
  disabled = false,
  className,
}) => {
  const id = useId()
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<AutocompleteOption[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [internalLoading, setInternalLoading] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const isLoading = externalLoading || internalLoading

  const handleOptionSelect = useCallback(
    (option: AutocompleteOption) => {
      setInputValue(option.label)
      onSelect?.(option)
      setIsOpen(false)
      setFocusedIndex(-1)
    },
    [onSelect]
  )

  // Debounced search
  const performSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setOptions([])
        setIsOpen(false)
        return
      }

      setInternalLoading(true)
      try {
        const results = await onSearch(query)
        setOptions(results)
        setIsOpen(results.length > 0)
        setFocusedIndex(-1)
      } catch (error) {
        console.error('Search error:', error)
        setOptions([])
        setIsOpen(false)
      } finally {
        setInternalLoading(false)
      }
    },
    [onSearch]
  )

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (inputValue) {
      debounceTimerRef.current = setTimeout(() => {
        performSearch(inputValue)
      }, debounceMs)
    } else {
      setOptions([])
      setIsOpen(false)
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [inputValue, debounceMs, performSearch])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' && options.length > 0) {
          e.preventDefault()
          setIsOpen(true)
          setFocusedIndex(0)
        }
        return
      }

      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          setFocusedIndex(-1)
          break
        case 'ArrowDown':
          e.preventDefault()
          setFocusedIndex((prev) => (prev + 1) % options.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusedIndex((prev) => (prev - 1 + options.length) % options.length)
          break
        case 'Enter':
          e.preventDefault()
          if (focusedIndex >= 0 && options[focusedIndex]) {
            handleOptionSelect(options[focusedIndex])
          }
          break
      }
    },
    [isOpen, options, focusedIndex, handleOptionSelect]
  )

  const handleFocus = useCallback(() => {
    setFocused(true)
    if (inputValue && options.length > 0) {
      setIsOpen(true)
    }
  }, [inputValue, options.length])

  const handleBlur = useCallback(() => {
    setFocused(false)
  }, [])

  const isFloating = focused || inputValue.length > 0

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {/* Input wrapper */}
      <div className="relative">
        <div
          className={cn(
            'relative flex items-center rounded-lg h-11',
            disabled && 'opacity-40 pointer-events-none'
          )}
        >
          {/* Animated border / focus ring */}
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={false}
            animate={{
              boxShadow: focused
                ? '0 0 0 1.5px rgba(232,78,45,0.6), 0 0 0 4px rgba(232,78,45,0.1)'
                : '0 0 0 1px rgba(255,255,255,0.08)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />

          {/* Background */}
          <div className="absolute inset-0 rounded-lg bg-obsidian pointer-events-none" />

          {/* Search icon */}
          <span
            className={cn(
              'absolute left-3 flex items-center justify-center text-text-faint transition-colors z-10',
              focused && 'text-ignite'
            )}
          >
            <SearchIcon className="h-4 w-4" />
          </span>

          {/* Native input */}
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={isFloating ? placeholder : undefined}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={`${id}-listbox`}
            aria-autocomplete="list"
            className={cn(
              'relative z-[1] w-full h-full bg-transparent outline-none rounded-lg text-chalk placeholder:text-text-faint',
              'text-sm px-3.5 pl-10 pr-10',
              label && isFloating && 'pt-3'
            )}
          />

          {/* Floating label */}
          {label && (
            <motion.label
              htmlFor={id}
              className={cn(
                'absolute z-[2] pointer-events-none origin-left px-1 rounded-sm left-10',
                focused ? 'text-ignite' : 'text-text-faint'
              )}
              initial={false}
              animate={
                isFloating
                  ? {
                      y: -20,
                      x: -24,
                      scale: 0.85,
                      opacity: 1,
                    }
                  : {
                      y: 0,
                      x: 0,
                      scale: 1,
                      opacity: 1,
                    }
              }
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              style={{ top: '50%', translateY: '-50%' }}
            >
              <span className={cn(isFloating && 'bg-obsidian px-1')}>
                {label}
              </span>
            </motion.label>
          )}

          {/* Loading spinner */}
          {isLoading && (
            <span className="absolute right-3 flex items-center justify-center text-ignite z-10">
              <LoadingSpinner className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && !isLoading && options.length > 0 && (
          <motion.div
            id={`${id}-listbox`}
            role="listbox"
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-border bg-obsidian py-1 shadow-xl"
          >
            {options.map((option, index) => {
              const isFocused = focusedIndex === index

              return (
                <motion.div
                  key={option.value}
                  role="option"
                  aria-selected={isFocused}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleOptionSelect(option)
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={cn(
                    'px-3.5 py-2.5 text-sm cursor-pointer transition-colors',
                    isFocused ? 'bg-ignite/10 text-chalk' : 'text-chalk hover:bg-ignite/5'
                  )}
                  whileHover={{ x: 2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  {highlightMatch(option.label, inputValue)}
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      <AnimatePresence>
        {isOpen && !isLoading && inputValue && options.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-obsidian py-6 shadow-xl"
          >
            <p className="text-center text-sm text-text-faint">No results found</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Autocomplete
