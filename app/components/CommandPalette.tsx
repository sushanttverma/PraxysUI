'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, FileText, Box, ArrowRight } from 'lucide-react'
import { sidebarGroups } from '@/lib/registry'

interface SearchItem {
  slug: string
  title: string
  group: string
  href: string
}

// Build flat search list from sidebar groups
const searchItems: SearchItem[] = sidebarGroups.flatMap((group) =>
  group.items.map((item) => ({
    slug: item.slug,
    title: item.title,
    group: group.title,
    href: item.slug === 'introduction' ? '/docs' : `/docs/${item.slug}`,
  }))
)

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  if (t.includes(q)) return true

  // Simple character-by-character fuzzy match
  let qi = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++
  }
  return qi === q.length
}

function scoreMatch(query: string, text: string): number {
  const q = query.toLowerCase()
  const t = text.toLowerCase()

  // Exact match
  if (t === q) return 100
  // Starts with
  if (t.startsWith(q)) return 80
  // Contains substring
  if (t.includes(q)) return 60
  // Fuzzy match
  return 30
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const results = query.trim()
    ? searchItems
        .filter((item) => fuzzyMatch(query, item.title) || fuzzyMatch(query, item.slug))
        .sort((a, b) => scoreMatch(query, b.title) - scoreMatch(query, a.title))
        .slice(0, 12)
    : searchItems.slice(0, 12)

  const openPalette = useCallback(() => {
    setOpen(true)
    setQuery('')
    setSelectedIndex(0)
  }, [])

  const closePalette = useCallback(() => {
    setOpen(false)
    setQuery('')
    setSelectedIndex(0)
  }, [])

  const navigate = useCallback(
    (href: string) => {
      closePalette()
      router.push(href)
    },
    [closePalette, router]
  )

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (open) {
          closePalette()
        } else {
          openPalette()
        }
      }
      if (e.key === 'Escape' && open) {
        closePalette()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, openPalette, closePalette])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.querySelector('[data-selected="true"]')
      selected?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => (i < results.length - 1 ? i + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => (i > 0 ? i - 1 : results.length - 1))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      navigate(results[selectedIndex].href)
    }
  }

  return (
    <>
      {/* Trigger */}
      <button
        onClick={openPalette}
        aria-haspopup="dialog"
        className="flex h-9 items-center gap-2 rounded-lg border border-border bg-obsidian px-3 text-sm text-text-faint transition-colors hover:border-border-light hover:text-blush cursor-pointer"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search...</span>
        <kbd className="ml-4 rounded border border-border bg-void px-1.5 py-0.5 font-mono text-[10px] text-text-faint">
          Ctrl K
        </kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-void/60 backdrop-blur-sm"
              onClick={closePalette}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              aria-label="Search components and pages"
              className="fixed left-1/2 top-[15vh] z-50 w-[90vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-obsidian shadow-2xl"
              onKeyDown={(e: React.KeyboardEvent) => {
                // Focus trap: prevent Tab from escaping the dialog
                if (e.key === 'Tab') {
                  e.preventDefault()
                }
              }}
            >
              {/* Input */}
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="h-4 w-4 shrink-0 text-blush" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search components, pages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  role="combobox"
                  aria-expanded={results.length > 0}
                  aria-controls="command-palette-list"
                  aria-activedescendant={results[selectedIndex] ? `command-item-${results[selectedIndex].slug}` : undefined}
                  aria-autocomplete="list"
                  className="h-12 flex-1 bg-transparent text-sm text-chalk placeholder:text-text-faint outline-none"
                />
                <kbd className="rounded border border-border bg-void px-1.5 py-0.5 font-mono text-[10px] text-text-faint">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div ref={listRef} id="command-palette-list" role="listbox" aria-label="Search results" className="max-h-[50vh] overflow-y-auto p-2">
                {results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-text-faint">
                    No results found for &quot;{query}&quot;
                  </div>
                ) : (
                  results.map((item, i) => (
                    <button
                      key={item.slug}
                      id={`command-item-${item.slug}`}
                      role="option"
                      aria-selected={i === selectedIndex}
                      data-selected={i === selectedIndex}
                      onClick={() => navigate(item.href)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                        i === selectedIndex
                          ? 'bg-ignite/10 text-chalk'
                          : 'text-blush hover:text-chalk'
                      }`}
                    >
                      {item.group === 'Components' ? (
                        <Box className="h-4 w-4 shrink-0 text-ignite/60" />
                      ) : (
                        <FileText className="h-4 w-4 shrink-0 text-blush/40" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="font-medium">{item.title}</span>
                        <span className="ml-2 text-xs text-text-faint">
                          {item.group}
                        </span>
                      </div>
                      {i === selectedIndex && (
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ignite/60" />
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Footer hints */}
              <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-[10px] text-text-faint">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-void px-1 py-0.5 font-mono">
                    ↑↓
                  </kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-void px-1 py-0.5 font-mono">
                    ↵
                  </kbd>
                  Open
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-void px-1 py-0.5 font-mono">
                    esc
                  </kbd>
                  Close
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
