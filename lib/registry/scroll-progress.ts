import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "scroll-progress",
  title: "Scroll Progress",
  description:
    "An animated reading progress indicator with spring physics. Renders a top bar or right-side section dots navigator. Scopes to any scroll container via ref.",
  category: "navigation",
  isNew: true,
  dependencies: ["framer-motion", "clsx", "tailwind-merge"],
  code: `'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useScroll } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Section {
  id: string
  label: string
}

interface ScrollProgressProps {
  position?: 'top' | 'right'
  thickness?: number
  color?: string
  sections?: Section[]
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
          if (entry.isIntersecting) setActiveSection(section.id)
        },
        { threshold: Array.from({ length: 11 }, (_, i) => i / 10), rootMargin: '-10% 0px -10% 0px' }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  if (position === 'top') {
    return (
      <motion.div
        className={cn('fixed top-0 left-0 right-0 z-50 origin-left', className)}
        style={{ height: thickness, background: color, scaleX }}
      />
    )
  }

  return (
    <div
      className={cn(
        'fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1',
        className
      )}
    >
      {sections.length === 0 && (
        <div
          className="relative rounded-full overflow-hidden bg-white/10"
          style={{ width: thickness, height: 120 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full origin-top rounded-full"
            style={{ height: 120, scaleY, background: color }}
          />
        </div>
      )}

      {sections.length > 0 && (
        <div className="flex flex-col items-end gap-3">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                type="button"
                onClick={() =>
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group relative flex items-center justify-end gap-2"
                aria-label={\`Scroll to \${section.label}\`}
              >
                <motion.span
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 4 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-medium whitespace-nowrap pointer-events-none"
                  style={{ color: isActive ? color : 'transparent' }}
                >
                  {section.label}
                </motion.span>

                <motion.div
                  animate={{ scale: isActive ? 1.4 : 1, opacity: isActive ? 1 : 0.4 }}
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

export default ScrollProgress`,
  usage: `import { useRef } from 'react'
import ScrollProgress from '@/app/components/ui/scroll-progress'

// Top bar — tracks full page scroll
export function PageLayout({ children }) {
  return (
    <>
      <ScrollProgress position="top" color="#6366f1" thickness={3} />
      {children}
    </>
  )
}

// Right-side section dots — scoped to a container
export function ArticleLayout() {
  const ref = useRef(null)

  return (
    <div ref={ref} className="h-screen overflow-y-auto">
      <ScrollProgress
        position="right"
        containerRef={ref}
        sections={[
          { id: 'intro', label: 'Intro' },
          { id: 'features', label: 'Features' },
          { id: 'outro', label: 'Outro' },
        ]}
      />
      <section id="intro">...</section>
      <section id="features">...</section>
      <section id="outro">...</section>
    </div>
  )
}`,
  props: [
    {
      name: "position",
      type: "'top' | 'right'",
      default: "'top'",
      description: "Where to render the indicator — top bar or right-side dots.",
    },
    {
      name: "thickness",
      type: "number",
      default: "3",
      description: "Height of the top bar in px, or dot diameter base size.",
    },
    {
      name: "color",
      type: "string",
      default: "'#6366f1'",
      description: "Fill color for the progress bar and active dot.",
    },
    {
      name: "sections",
      type: "Section[]",
      default: "[]",
      description: "Array of { id, label } for right-side section dot navigation.",
    },
    {
      name: "containerRef",
      type: "RefObject<any>",
      default: "undefined",
      description: "Scroll container ref. Omit to track window scroll.",
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
      { name: "position", label: "Position", type: "select", default: "top", options: ["top", "right"] },
      { name: "thickness", label: "Thickness", type: "number", default: 3, min: 1, max: 10, step: 1 },
      { name: "color", label: "Color", type: "color", default: "#6366f1" },
    ],
  },
  component: () => import("@/app/components/ui/scroll-progress"),
  demo: () => import("@/app/components/demos/scroll-progress-demo"),
};

export default entry;
