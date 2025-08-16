'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ComponentEntry } from '@/lib/registry'

interface ComponentSelectorProps {
  components: ComponentEntry[]
  selectedComponent: string | null
  onSelectComponent: (slug: string) => void
}

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
)

export default function ComponentSelector({
  components,
  selectedComponent,
  onSelectComponent,
}: ComponentSelectorProps) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(components.map((c) => c.category))
    return ['all', ...Array.from(cats).sort()]
  }, [components])

  // Filter components
  const filteredComponents = useMemo(() => {
    return components.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.slug.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [components, search, categoryFilter])

  return (
    <div className="bg-obsidian border border-border rounded-xl h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-chalk mb-2 md:mb-3 lg:block hidden">Select Component</h2>
        <h2 className="text-sm font-semibold text-chalk mb-2 lg:hidden">Component</h2>
        
        {/* Search */}
        <div className="relative mb-2 md:mb-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-1.5 md:py-2 bg-border/20 border border-border rounded-lg text-xs md:text-sm text-chalk placeholder:text-text-faint focus:outline-none focus:ring-1 focus:ring-ignite"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint">
            <SearchIcon />
          </span>
        </div>

        {/* Category Filter - Horizontal scroll on mobile */}
        <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                'px-2 md:px-2.5 py-0.5 md:py-1 rounded-md text-xs font-medium capitalize transition-colors whitespace-nowrap flex-shrink-0',
                categoryFilter === cat
                  ? 'bg-ignite text-white'
                  : 'bg-border/20 text-text-faint hover:bg-border/40'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {filteredComponents.map((component) => (
            <motion.button
              key={component.slug}
              onClick={() => onSelectComponent(component.slug)}
              className={cn(
                'w-full text-left px-2.5 md:px-3 py-2 md:py-2.5 rounded-lg text-xs md:text-sm transition-colors',
                selectedComponent === component.slug
                  ? 'bg-ignite/10 border border-ignite text-ignite'
                  : 'bg-transparent hover:bg-border/20 text-chalk border border-transparent'
              )}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium leading-tight">{component.title}</div>
              <div className="text-xs text-text-faint mt-0.5 capitalize hidden md:block">
                {component.category}
              </div>
            </motion.button>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-8 md:py-12 text-text-faint text-xs md:text-sm">
            No components found
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 md:p-3 border-t border-border bg-border/5 text-xs text-text-faint">
        {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
