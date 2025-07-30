'use client'

import React, { useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  size?: 'sm' | 'md'
  className?: string
}

const sizeConfig = {
  sm: {
    button: 'h-8 min-w-8 text-xs px-2',
    gap: 'gap-1',
    arrow: 'h-3 w-3',
    ellipsis: 'h-8 min-w-6 text-xs',
  },
  md: {
    button: 'h-10 min-w-10 text-sm px-3',
    gap: 'gap-1.5',
    arrow: 'h-4 w-4',
    ellipsis: 'h-10 min-w-8 text-sm',
  },
}

function buildPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | 'left-ellipsis' | 'right-ellipsis')[] {
  // Always show first and last page
  const totalSlots = siblingCount * 2 + 5 // siblings + first + last + current + 2 ellipsis slots

  // If total pages fit in all slots, show them all
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const showLeftEllipsis = leftSiblingIndex > 2
  const showRightEllipsis = rightSiblingIndex < totalPages - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    // Show left side expanded
    const leftCount = siblingCount * 2 + 3
    const leftRange = Array.from({ length: leftCount }, (_, i) => i + 1)
    return [...leftRange, 'right-ellipsis', totalPages]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    // Show right side expanded
    const rightCount = siblingCount * 2 + 3
    const rightRange = Array.from(
      { length: rightCount },
      (_, i) => totalPages - rightCount + 1 + i
    )
    return [1, 'left-ellipsis', ...rightRange]
  }

  // Both ellipses
  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  )
  return [1, 'left-ellipsis', ...middleRange, 'right-ellipsis', totalPages]
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  size = 'md',
  className,
}) => {
  const config = sizeConfig[size]

  const pages = useMemo(
    () => buildPageRange(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount]
  )

  const goToPrev = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }, [currentPage, onPageChange])

  const goToNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }, [currentPage, totalPages, onPageChange])

  if (totalPages <= 0) return null

  return (
    <nav aria-label="Pagination" className={cn('flex items-center', config.gap, className)}>
      {/* Previous button */}
      <button
        type="button"
        onClick={goToPrev}
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
        className={cn(
          'relative flex items-center justify-center rounded-lg border border-border bg-obsidian text-chalk transition-colors',
          'hover:border-border-light hover:text-ignite',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite/40',
          'disabled:opacity-30 disabled:pointer-events-none',
          config.button
        )}
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={config.arrow}
        >
          <path d="M10 12L6 8l4-4" />
        </svg>
      </button>

      {/* Page buttons */}
      {pages.map((page) => {
        if (page === 'left-ellipsis' || page === 'right-ellipsis') {
          return (
            <span
              key={page}
              className={cn(
                'flex items-center justify-center text-text-faint select-none',
                config.ellipsis
              )}
              aria-hidden="true"
            >
              &hellip;
            </span>
          )
        }

        const isActive = page === currentPage

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'relative flex items-center justify-center rounded-lg transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite/40',
              isActive
                ? 'text-chalk font-medium'
                : 'border border-border bg-obsidian text-text-faint hover:border-border-light hover:text-chalk',
              config.button
            )}
          >
            {/* Animated active background indicator */}
            {isActive && (
              <motion.div
                layoutId="pagination-active"
                className="absolute inset-0 rounded-lg bg-ignite/20 border border-ignite/40"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-[1]">{page}</span>
          </button>
        )
      })}

      {/* Next button */}
      <button
        type="button"
        onClick={goToNext}
        disabled={currentPage >= totalPages}
        aria-label="Go to next page"
        className={cn(
          'relative flex items-center justify-center rounded-lg border border-border bg-obsidian text-chalk transition-colors',
          'hover:border-border-light hover:text-ignite',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite/40',
          'disabled:opacity-30 disabled:pointer-events-none',
          config.button
        )}
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={config.arrow}
        >
          <path d="M6 4l4 4-4 4" />
        </svg>
      </button>
    </nav>
  )
}

export default Pagination
