import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "combobox",
title: "Combobox",
description:
  "A searchable select component with keyboard navigation, multi-select support, and animated dropdown. Features search highlighting, loading state, and customizable options.",
category: "navigation",
dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"],
code: `'use client'

import React, { useState, useRef, useEffect, useCallback, useId, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Check, ChevronDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  mode?: 'single' | 'multiple'
  loading?: boolean
  emptyMessage?: string
  className?: string
}

const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Search...',
  label,
  disabled = false,
  mode = 'single',
  loading = false,
  emptyMessage = 'No results found',
  className,
}) => {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [focusIndex, setFocusIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [inputFocused, setInputFocused] = useState(false)

  // Normalize value to array for easier handling
  const selectedValues = useMemo(() => {
    if (!value) return []
    return Array.isArray(value) ? value : [value]
  }, [value])

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options
    const query = searchQuery.toLowerCase()
    return options.filter((opt) => opt.label.toLowerCase().includes(query))
  }, [options, searchQuery])

  // Get selected option labels
  const selectedOptions = useMemo(() => {
    return options.filter((opt) => selectedValues.includes(opt.value))
  }, [options, selectedValues])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setFocusIndex(-1)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Scroll focused option into view
  useEffect(() => {
    if (open && focusIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]')
      items[focusIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [focusIndex, open])

  const [prevFilteredLength, setPrevFilteredLength] = useState(filteredOptions.length)

  // Reset focus when filtered options change (derived state pattern)
  if (filteredOptions.length !== prevFilteredLength) {
    setPrevFilteredLength(filteredOptions.length)
    if (filteredOptions.length > 0) {
      setFocusIndex(0)
    } else {
      setFocusIndex(-1)
    }
  }

  const openDropdown = useCallback(() => {
    if (disabled) return
    setOpen(true)
    setFocusIndex(filteredOptions.length > 0 ? 0 : -1)
    inputRef.current?.focus()
  }, [disabled, filteredOptions.length])

  const closeDropdown = useCallback(() => {
    setOpen(false)
    setFocusIndex(-1)
    setSearchQuery('')
  }, [])

  const selectOption = useCallback(
    (opt: ComboboxOption) => {
      if (opt.disabled) return

      if (mode === 'single') {
        onChange?.(opt.value)
        closeDropdown()
      } else {
        // Multiple mode
        const newValues = selectedValues.includes(opt.value)
          ? selectedValues.filter((v) => v !== opt.value)
          : [...selectedValues, opt.value]
        onChange?.(newValues)
        setSearchQuery('')
        inputRef.current?.focus()
      }
    },
    [mode, selectedValues, onChange, closeDropdown]
  )

  const removeSelectedOption = useCallback(
    (optValue: string) => {
      if (mode === 'single') {
        onChange?.('')
      } else {
        const newValues = selectedValues.filter((v) => v !== optValue)
        onChange?.(newValues)
      }
    },
    [mode, selectedValues, onChange]
  )

  const clearAll = useCallback(() => {
    onChange?.(mode === 'single' ? '' : [])
    setSearchQuery('')
    inputRef.current?.focus()
  }, [mode, onChange])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
          e.preventDefault()
          openDropdown()
        }
        return
      }

      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          closeDropdown()
          break
        case 'ArrowDown':
          e.preventDefault()
          setFocusIndex((prev) => 
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusIndex((prev) => (prev > 0 ? prev - 1 : 0))
          break
        case 'Enter':
          e.preventDefault()
          if (focusIndex >= 0 && focusIndex < filteredOptions.length) {
            selectOption(filteredOptions[focusIndex])
          }
          break
        case 'Home':
          e.preventDefault()
          setFocusIndex(0)
          break
        case 'End':
          e.preventDefault()
          setFocusIndex(filteredOptions.length - 1)
          break
      }
    },
    [open, focusIndex, filteredOptions, openDropdown, closeDropdown, selectOption]
  )

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return <span>{text}</span>

    const parts = text.split(new RegExp(\`(\${query})\`, 'gi'))
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="font-semibold text-ignite">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    )
  }

  const isFloating = inputFocused || searchQuery.length > 0 || selectedValues.length > 0

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', disabled && 'opacity-40 pointer-events-none', className)}
    >
      {/* Main input wrapper */}
      <div
        className={cn(
          'relative flex flex-col rounded-lg',
          mode === 'multiple' && selectedOptions.length > 0 ? 'min-h-[44px]' : 'h-11'
        )}
      >
        {/* Animated border / focus ring */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={false}
          animate={{
            boxShadow: open || inputFocused
              ? '0 0 0 1.5px rgba(232,78,45,0.6), 0 0 0 4px rgba(232,78,45,0.1)'
              : '0 0 0 1px rgba(255,255,255,0.08)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />

        {/* Background */}
        <div className="absolute inset-0 rounded-lg bg-obsidian pointer-events-none" />

        {/* Floating label */}
        {label && (
          <motion.label
            htmlFor={id}
            className={cn(
              'absolute z-[2] pointer-events-none origin-left px-1 rounded-sm left-10',
              (open || inputFocused) ? 'text-ignite' : 'text-text-faint'
            )}
            initial={false}
            animate={
              isFloating
                ? {
                    y: -32,
                    x: -24,
                    scale: 0.85,
                    opacity: 1,
                  }
                : {
                    y: -12,
                    x: 0,
                    scale: 1,
                    opacity: 1,
                  }
            }
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            style={{ top: '50%' }}
          >
            <span className={cn(isFloating && 'bg-obsidian px-1')}>
              {label}
            </span>
          </motion.label>
        )}

        {/* Content wrapper */}
        <div className="relative z-[1] flex flex-wrap items-center gap-1.5 px-3.5 py-2">
          {/* Search icon */}
          <span
            className={cn(
              'flex items-center justify-center text-text-faint transition-colors shrink-0',
              (open || inputFocused) && 'text-ignite'
            )}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </span>

          {/* Selected chips (multiple mode) */}
          {mode === 'multiple' && (
            <AnimatePresence mode="popLayout">
              {selectedOptions.map((opt) => (
                <motion.span
                  key={opt.value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-ignite/10 border border-ignite/30 text-xs text-ignite"
                >
                  {opt.label}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeSelectedOption(opt.value)
                    }}
                    className="shrink-0 rounded-full p-0.5 transition-colors hover:bg-ignite/20"
                    aria-label={\`Remove \${opt.label}\`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
          )}

          {/* Input field */}
          <input
            ref={inputRef}
            id={id}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={\`\${id}-listbox\`}
            aria-autocomplete="list"
            aria-activedescendant={
              focusIndex >= 0 && focusIndex < filteredOptions.length
                ? \`\${id}-option-\${filteredOptions[focusIndex].value}\`
                : undefined
            }
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              if (!open) openDropdown()
            }}
            onFocus={() => {
              setInputFocused(true)
              openDropdown()
            }}
            onBlur={() => setInputFocused(false)}
            onKeyDown={handleKeyDown}
            disabled={disabled || loading}
            placeholder={
              isFloating
                ? mode === 'single' && selectedOptions.length > 0
                  ? selectedOptions[0].label
                  : selectedOptions.length > 0
                    ? ''
                    : placeholder
                : undefined
            }
            className={cn(
              'flex-1 min-w-[100px] bg-transparent outline-none text-sm text-chalk placeholder:text-text-faint',
              label && isFloating && 'pt-1'
            )}
          />

          {/* Clear button */}
          {selectedValues.length > 0 && !loading && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation()
                clearAll()
              }}
              className="shrink-0 p-0.5 rounded-full text-text-faint hover:text-chalk hover:bg-chalk/10 transition-colors"
              aria-label="Clear selection"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}

          {/* Dropdown indicator */}
          <motion.span
            className="shrink-0 flex items-center text-text-faint"
            initial={false}
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </div>
      </div>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={listRef}
            id={\`\${id}-listbox\`}
            role="listbox"
            aria-label={label || placeholder}
            aria-multiselectable={mode === 'multiple'}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{ transformOrigin: 'top' }}
            className="absolute z-50 mt-1.5 w-full max-h-60 overflow-auto rounded-lg border border-border bg-obsidian py-1 shadow-xl"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2 px-3.5 py-8 text-sm text-text-faint">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option, i) => {
                const isSelected = selectedValues.includes(option.value)
                const isFocused = focusIndex === i
                const isDisabled = option.disabled

                return (
                  <div
                    key={option.value}
                    id={\`\${id}-option-\${option.value}\`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={isDisabled}
                    onClick={() => !isDisabled && selectOption(option)}
                    onMouseEnter={() => !isDisabled && setFocusIndex(i)}
                    className={cn(
                      'flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors',
                      isDisabled
                        ? 'opacity-40 cursor-not-allowed'
                        : 'cursor-pointer',
                      !isDisabled && isSelected && 'text-ignite',
                      !isDisabled && !isSelected && 'text-chalk',
                      !isDisabled && isFocused && 'bg-ignite/10',
                      !isDisabled && !isFocused && 'hover:bg-ignite/5'
                    )}
                  >
                    {/* Selection indicator */}
                    {mode === 'multiple' ? (
                      <span
                        className={cn(
                          'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                          isSelected
                            ? 'border-ignite bg-ignite/20'
                            : 'border-border'
                        )}
                      >
                        <AnimatePresence>
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                            >
                              <Check className="h-3 w-3 text-ignite" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    ) : (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                        <AnimatePresence>
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                            >
                              <Check className="h-4 w-4 text-ignite" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    )}

                    {/* Option label with highlighting */}
                    <span className="flex-1">
                      {highlightMatch(option.label, searchQuery)}
                    </span>
                  </div>
                )
              })
            ) : (
              <div className="px-3.5 py-8 text-center text-sm text-text-faint">
                {emptyMessage}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Combobox`,
usage: `import Combobox from "@/app/components/ui/combobox"
import { useState } from "react"

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
]

export function Demo() {
  const [value, setValue] = useState("")

  return (
    <Combobox
      label="Framework"
      placeholder="Select framework..."
      options={options}
      value={value}
      onChange={setValue}
    />
  )
}`,
props: [
  {
    name: "options",
    type: "ComboboxOption[]",
    default: "[]",
    description: "Array of options with value, label, and optional disabled flag.",
  },
  {
    name: "value",
    type: "string | string[]",
    default: "undefined",
    description: "Selected value(s). String for single mode, array for multiple.",
  },
  {
    name: "onChange",
    type: "(value: string | string[]) => void",
    default: "undefined",
    description: "Callback fired when selection changes.",
  },
  {
    name: "placeholder",
    type: "string",
    default: "'Search...'",
    description: "Placeholder text for the search input.",
  },
  {
    name: "label",
    type: "string",
    default: "undefined",
    description: "Label text displayed above the input.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the combobox.",
  },
  {
    name: "mode",
    type: "'single' | 'multiple'",
    default: "'single'",
    description: "Selection mode: single or multiple.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Shows loading spinner instead of search icon.",
  },
  {
    name: "emptyMessage",
    type: "string",
    default: "'No results found'",
    description: "Message displayed when no options match the search.",
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
    { name: "label", label: "Label", type: "text", default: "Framework" },
    { name: "placeholder", label: "Placeholder", type: "text", default: "Select framework..." },
    { name: "mode", label: "Mode", type: "select", default: "single", options: ["single", "multiple"] },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
    { name: "loading", label: "Loading", type: "boolean", default: false },
  ],
  defaults: {
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
      { value: "next", label: "Next.js" },
    ],
  },
},
component: () => import("@/app/components/ui/combobox"),
demo: () => import("@/app/components/demos/combobox-demo"),
};

export default entry;
