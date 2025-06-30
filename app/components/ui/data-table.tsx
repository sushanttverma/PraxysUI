'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Column<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Column<T>[]
  data: T[]
  striped?: boolean
  hoverable?: boolean
  className?: string
}

type SortDir = 'asc' | 'desc' | null

function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  striped = true,
  hoverable = true,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? null : 'asc')
      if (sortDir === 'desc') setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return data
    return [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal == null || bVal == null) return 0
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [data, sortKey, sortDir])

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border',
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-obsidian">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-faint',
                    col.sortable && 'cursor-pointer select-none hover:text-blush transition-colors'
                  )}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span className="flex flex-col">
                        <ChevronUp
                          className={cn(
                            'h-2.5 w-2.5 -mb-0.5',
                            sortKey === col.key && sortDir === 'asc'
                              ? 'text-ignite'
                              : 'text-text-faint/30'
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            'h-2.5 w-2.5',
                            sortKey === col.key && sortDir === 'desc'
                              ? 'text-ignite'
                              : 'text-text-faint/30'
                          )}
                        />
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {sorted.map((row, i) => (
                <motion.tr
                  key={JSON.stringify(row)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    'border-b border-border/50 last:border-0',
                    striped && i % 2 === 1 && 'bg-obsidian/30',
                    hoverable && 'hover:bg-obsidian/60 transition-colors'
                  )}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-blush">
                      {col.render
                        ? col.render(row)
                        : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {sorted.length === 0 && (
        <div className="flex h-24 items-center justify-center text-sm text-text-faint">
          No data
        </div>
      )}
    </div>
  )
}

export default DataTable
