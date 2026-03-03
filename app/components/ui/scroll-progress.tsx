'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useScroll } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Section {
  id: string
  label: string
}

interface ScrollProgressProps {
  /** 'top' renders a horizontal bar fixed to the top of the viewport */
  position?: 'top' | 'right'
  /** Height of the top bar (px) or width of the right sidebar indicator */
  thickness?: number
  /** Color of the filled progress */
  color?: string
  /** Show dot-markers for each section on the right rail */
  sections?: Section[]
  /** Container ref to scope scroll to — defaults to window */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  containerRef?: React.RefObject<any>
  className?: string
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  position = 'top',
  thickness = 3,
  color = '#6366f1',
  sections = [],
  containerRef,
  className,
}) => {
  const { scrollYProgress } = useScroll(
    containerRef ? { container: containerRef } : undefined
  )

  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  // Track which section is active
  const [activeSection, setActiveSection] = useState<string | null>(
    sections.length > 0 ? sections[0].id : null
  )

  useEffect(() => {
    if (sections.length === 0) return

    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id)
          }
        },
        { threshold: Array.from({ length: 11 }, (_, i) => i / 10), rootMargin: '-10% 0px -10% 0px' }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  if (position === 'top') {
    // When scoped to a container: render as a plain block element placed *above*
    // the scrollable div by the user — scaleX still tracks containerRef scroll.
    // When tracking window: use fixed so it stays pinned to the viewport.
    const isScoped = !!containerRef
    return (
      <motion.div
        className={cn(
          'origin-left z-50',
          isScoped ? 'w-full block' : 'fixed top-0 left-0 right-0',
          className
        )}
        style={{
          height: thickness,
          background: color,
          scaleX,
        }}
      />
    )
  }

  // Right side indicator
  return (
    <div
      className={cn(
        'fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1',
        className
      )}
    >
      {/* Track */}
      <div
        className="relative rounded-full overflow-hidden bg-white/10"
        style={{ width: thickness, height: sections.length > 0 ? 'auto' : 120 }}
      >
        {sections.length === 0 && (
          <>
            <div className="w-full h-full" />
            <motion.div
              className="absolute top-0 left-0 w-full origin-top rounded-full"
              style={{ height: 120, scaleY, background: color }}
            />
          </>
        )}
      </div>

      {/* Section dots */}
      {sections.length > 0 && (
        <div className="flex flex-col items-center gap-3">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group relative flex items-center justify-end gap-2"
                aria-label={`Scroll to ${section.label}`}
              >
                {/* Label tooltip */}
                <motion.span
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 4 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-medium text-chalk whitespace-nowrap pointer-events-none"
                  style={{ color: isActive ? color : undefined }}
                >
                  {section.label}
                </motion.span>

                {/* Dot */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.4 : 1,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="rounded-full shrink-0"
                  style={{
                    width: thickness + 3,
                    height: thickness + 3,
                    background: isActive ? color : 'rgba(255,255,255,0.3)',
                  }}
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ScrollProgress
