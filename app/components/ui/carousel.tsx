'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CarouselProps {
  children: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
  className?: string
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  interval = 4000,
  showDots = true,
  showArrows = true,
  className,
}) => {
  const [[current, direction], setCurrent] = useState([0, 0])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = children.length

  const go = useCallback(
    (index: number, dir: number) => {
      setCurrent([((index % total) + total) % total, dir])
    },
    [total]
  )

  const next = useCallback(() => go(current + 1, 1), [current, go])
  const prev = useCallback(() => go(current - 1, -1), [current, go])

  useEffect(() => {
    if (!autoPlay || total <= 1) return
    timerRef.current = setInterval(next, interval)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [autoPlay, interval, next, total])

  if (total === 0) return null

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-xl border border-border bg-obsidian',
        className
      )}
    >
      {/* Slides */}
      <div className="relative aspect-video w-full">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {children[current]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      {showArrows && total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-obsidian/80 text-blush backdrop-blur-sm transition-colors hover:bg-ignite/10 hover:text-chalk"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-obsidian/80 text-blush backdrop-blur-sm transition-colors hover:bg-ignite/10 hover:text-chalk"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && total > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i, i > current ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-2 w-2 rounded-full bg-chalk/30 transition-colors"
            >
              {i === current && (
                <motion.span
                  layoutId="carousel-dot"
                  className="absolute inset-0 rounded-full bg-ignite"
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
