'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Testimonial {
  quote: string
  author: string
  role: string
  avatar?: string
}

interface TestimonialsCardProps {
  testimonials: Testimonial[]
  className?: string
  autoPlay?: boolean
  interval?: number
}

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({
  testimonials,
  className = '',
  autoPlay = true,
  interval = 5000,
}) => {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, next, testimonials.length])

  const t = testimonials[current]

  return (
    <div
      className={cn(
        'relative rounded-xl border border-border bg-obsidian p-8 overflow-hidden',
        className
      )}
    >
      {/* Quote mark */}
      <span className="absolute top-4 right-6 font-pixel text-6xl leading-none text-ignite/10">
        &ldquo;
      </span>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="relative z-10"
        >
          <p className="text-base leading-relaxed text-chalk italic">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-3">
            {t.avatar ? (
              <img
                src={t.avatar}
                alt={t.author}
                className="h-10 w-10 rounded-full border border-border object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-ignite/10 font-pixel text-sm text-ignite">
                {t.author.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-chalk">{t.author}</p>
              <p className="text-xs text-blush">{t.role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      {testimonials.length > 1 && (
        <div className="mt-6 flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                i === current
                  ? 'w-6 bg-ignite'
                  : 'w-1.5 bg-border-light hover:bg-blush/50'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TestimonialsCard
