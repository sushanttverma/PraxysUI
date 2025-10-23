import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "search-input",
title: "Search Input",
description:
  "Search bar with animated search icon, spinning loading indicator, and AnimatePresence clear button that appears when text is entered.",
category: "buttons",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

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
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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

export default SearchInput`,
usage: `import SearchInput from "@/app/components/ui/search-input"
import { useState } from "react"

export function Demo() {
  const [query, setQuery] = useState("")
  return (
    <SearchInput
      value={query}
      onChange={setQuery}
      placeholder="Search components..."
      onClear={() => console.log("Cleared")}
    />
  )
}`,
props: [
  {
    name: "value",
    type: "string",
    default: "—",
    description: "Current search text.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    default: "—",
    description: "Callback when text changes.",
  },
  {
    name: "placeholder",
    type: "string",
    default: "'Search...'",
    description: "Placeholder text.",
  },
  {
    name: "onClear",
    type: "() => void",
    default: "undefined",
    description: "Callback when clear button is clicked.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Show spinning loading indicator instead of search icon.",
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
    { name: "placeholder", label: "Placeholder", type: "text", default: "Search..." },
    { name: "loading", label: "Loading", type: "boolean", default: false },
  ],
  defaults: {
  },
},
component: () => import("@/app/components/ui/search-input"),
demo: () => import("@/app/components/demos/search-input-demo"),
};

export default entry;
