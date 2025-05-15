'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BentoItem {
  id: string
  title: string
  description: string
  icon?: React.ReactNode
  span?: 'normal' | 'wide' | 'tall'
}

interface ExpandableBentoGridProps {
  items: BentoItem[]
  className?: string
}

const ExpandableBentoGrid: React.FC<ExpandableBentoGridProps> = ({
  items,
  className = '',
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <>
      <div
        className={cn(
          'grid auto-rows-[140px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3',
          className
        )}
      >
        {items.map((item) => {
          const isExpanded = expandedId === item.id
          return (
            <motion.div
              key={item.id}
              layoutId={`bento-${item.id}`}
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className={cn(
                'group relative cursor-pointer rounded-xl border border-border bg-obsidian p-5 overflow-hidden transition-colors hover:border-border-light',
                item.span === 'wide' && 'sm:col-span-2',
                item.span === 'tall' && 'row-span-2'
              )}
            >
              {item.icon && (
                <div className="mb-3 text-ignite">{item.icon}</div>
              )}
              <h3 className="font-pixel text-sm font-semibold text-chalk">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-blush line-clamp-2">
                {item.description}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expandedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-void/60 backdrop-blur-sm"
              onClick={() => setExpandedId(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div
                layoutId={`bento-${expandedId}`}
                className="w-full max-w-lg rounded-xl border border-border bg-obsidian p-8"
              >
                {(() => {
                  const item = items.find((i) => i.id === expandedId)
                  if (!item) return null
                  return (
                    <>
                      {item.icon && (
                        <div className="mb-4 text-ignite">{item.icon}</div>
                      )}
                      <h3 className="font-pixel text-xl font-semibold text-chalk">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-blush">
                        {item.description}
                      </p>
                      <button
                        onClick={() => setExpandedId(null)}
                        className="mt-6 rounded-lg border border-border px-4 py-2 text-sm text-blush transition-colors hover:text-chalk cursor-pointer"
                      >
                        Close
                      </button>
                    </>
                  )
                })()}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ExpandableBentoGrid
