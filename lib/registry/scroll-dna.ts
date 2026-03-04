import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "scroll-dna",
  title: "Scroll DNA",
  description:
    "A DNA-strand scroll navigator with interactive scrubbing. Click any bar to jump, drag to scrub, section dots mark waypoints, and a floating card shows context + copyable code. Praxys Signature.",
  category: "navigation",
  isNew: true,
  isSignature: true,
  dependencies: ["framer-motion", "lucide-react", "clsx", "tailwind-merge"],
  code: `'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Section {
  id: string
  label: string
  code?: string
}

interface ScrollDNAProps {
  sections?: Section[]
  barCount?: number
  color?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  containerRef?: React.RefObject<any>
  className?: string
}

function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

const ScrollDNA: React.FC<ScrollDNAProps> = ({
  sections = [],
  barCount = 32,
  color = '#E84E2D',
  containerRef,
  className,
}) => {
  const { scrollYProgress } = useScroll(
    containerRef ? { container: containerRef } : undefined
  )
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  })

  const barHeights = React.useMemo(
    () =>
      Array.from({ length: barCount }, (_, i) =>
        Math.round(8 + seeded(i * 3 + 7) * 24)
      ),
    [barCount]
  )

  const sectionPositions = React.useMemo(
    () =>
      sections.length > 1
        ? sections.map((_, i) =>
            Math.round((i / (sections.length - 1)) * (barCount - 1))
          )
        : sections.length === 1
          ? [Math.round(barCount / 2)]
          : [],
    [sections, barCount]
  )

  const filledBars = useTransform(smoothProgress, (p: number) =>
    Math.round(p * barCount)
  )
  const [filled, setFilled] = useState(0)

  useEffect(() => {
    const unsub = filledBars.on('change', (v: number) => setFilled(v))
    return unsub
  }, [filledBars])

  const [activeSection, setActiveSection] = useState<Section | null>(
    sections.length > 0 ? sections[0] : null
  )
  const [copied, setCopied] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = containerRef?.current
    if (el) {
      const handleScroll = () => setScrolled(el.scrollTop > 50)
      el.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
      return () => el.removeEventListener('scroll', handleScroll)
    }
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [containerRef])

  useEffect(() => {
    if (sections.length === 0) return
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section)
        },
        {
          threshold: 0.3,
          rootMargin: '-10% 0px -10% 0px',
          ...(containerRef?.current ? { root: containerRef.current } : {}),
        }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  const handleCopy = () => {
    if (!activeSection?.code) return
    navigator.clipboard.writeText(activeSection.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const scrollToProgress = useCallback(
    (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress))
      const el = containerRef?.current
      if (el) {
        const maxScroll = el.scrollHeight - el.clientHeight
        el.scrollTo({ top: clamped * maxScroll, behavior: 'smooth' })
      } else {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight
        window.scrollTo({ top: clamped * maxScroll, behavior: 'smooth' })
      }
    },
    [containerRef]
  )

  const handleBarClick = useCallback(
    (barIndex: number) => {
      const sectionIdx = sectionPositions.indexOf(barIndex)
      if (sectionIdx >= 0 && sections[sectionIdx]) {
        const el = document.getElementById(sections[sectionIdx].id)
        if (el) {
          const container = containerRef?.current
          if (container) {
            container.scrollTo({
              top: el.offsetTop - container.offsetTop,
              behavior: 'smooth',
            })
          } else {
            el.scrollIntoView({ behavior: 'smooth' })
          }
          return
        }
      }
      scrollToProgress(barIndex / (barCount - 1))
    },
    [sectionPositions, sections, containerRef, scrollToProgress, barCount]
  )

  const barcodeRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleDragMove = useCallback(
    (clientX: number) => {
      const bar = barcodeRef.current
      if (!bar) return
      const rect = bar.getBoundingClientRect()
      const progress = (clientX - rect.left) / rect.width
      const clamped = Math.max(0, Math.min(1, progress))
      const el = containerRef?.current
      if (el) {
        const maxScroll = el.scrollHeight - el.clientHeight
        el.scrollTo({ top: clamped * maxScroll })
      } else {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight
        window.scrollTo({ top: clamped * maxScroll })
      }
    },
    [containerRef]
  )

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      e.preventDefault()
      handleDragMove(e.clientX)
    }
    const onMouseUp = () => {
      isDragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return
      handleDragMove(e.touches[0].clientX)
    }
    const onTouchEnd = () => {
      isDragging.current = false
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [handleDragMove])

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      isDragging.current = true
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
      const clientX =
        'touches' in e ? e.touches[0].clientX : e.clientX
      handleDragMove(clientX)
    },
    [handleDragMove]
  )

  const isScoped = !!containerRef
  const visible = isScoped || scrolled

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            isScoped
              ? 'flex flex-col items-end gap-3'
              : 'fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3',
            className
          )}
        >
          {activeSection && activeSection.code && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection.id}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="rounded-xl border border-white/[0.08] bg-[#0B0A08]/95 backdrop-blur-md px-4 py-3 min-w-[220px]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {activeSection.label}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
                    aria-label="Copy code"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-green-400" />
                    ) : (
                      <Copy className="h-3 w-3 text-white/30 hover:text-white/60 transition-colors" />
                    )}
                  </button>
                </div>

                <div
                  className="font-mono text-[11px] leading-relaxed rounded-lg px-3 py-2 border"
                  style={{
                    color,
                    opacity: 0.8,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    borderColor: 'rgba(255,255,255,0.05)',
                  }}
                >
                  {activeSection.code}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          <div
            ref={barcodeRef}
            className="flex items-end gap-[3px] px-3 py-2.5 rounded-xl border border-white/[0.08] bg-[#0B0A08]/95 backdrop-blur-md cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            {barHeights.map((height, i) => {
              const isFilled = i <= filled
              const sectionIdx = sectionPositions.indexOf(i)
              const isActiveSection =
                sectionIdx >= 0 && sections[sectionIdx]?.id === activeSection?.id

              return (
                <div
                  key={i}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBarClick(i)
                  }}
                >
                  <motion.div
                    className="rounded-full"
                    style={{
                      width: 3,
                      height,
                      backgroundColor: isFilled ? color : 'rgba(255,255,255,0.1)',
                      opacity: isFilled ? 1 : 0.4,
                      transition: 'background-color 0.15s, opacity 0.15s',
                    }}
                  />
                  {sectionIdx >= 0 && (
                    <div
                      className="mt-1.5 rounded-full transition-all duration-200"
                      style={{
                        width: isActiveSection ? 6 : 4,
                        height: isActiveSection ? 6 : 4,
                        backgroundColor: isActiveSection
                          ? color
                          : 'rgba(255,255,255,0.15)',
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollDNA`,
  usage: `import ScrollDNA from '@/app/components/ui/scroll-dna'

const SECTIONS = [
  { id: 'intro', label: '#1 Intro', code: 'const app = createApp()' },
  { id: 'features', label: '#2 Features', code: 'const features = [...]' },
  { id: 'pricing', label: '#3 Pricing', code: 'const plan = "pro"' },
]

export default function Page() {
  return (
    <>
      <ScrollDNA sections={SECTIONS} color="#E84E2D" />
      <section id="intro">...</section>
      <section id="features">...</section>
      <section id="pricing">...</section>
    </>
  )
}`,
  props: [
    {
      name: "sections",
      type: "Section[]",
      default: "[]",
      description:
        "Array of { id, label, code? }. Each id must match an element on the page. code is shown in the floating card.",
    },
    {
      name: "barCount",
      type: "number",
      default: "32",
      description: "Number of vertical bars in the barcode visualizer.",
    },
    {
      name: "color",
      type: "string",
      default: "'#E84E2D'",
      description: "Fill color for active bars, section dots, and code text.",
    },
    {
      name: "containerRef",
      type: "RefObject<any>",
      default: "undefined",
      description:
        "Scroll container ref. Omit to track window scroll.",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional CSS classes on the root wrapper.",
    },
  ],
  playground: {
    controls: [
      {
        name: "barCount",
        label: "Bar Count",
        type: "number",
        default: 32,
        min: 12,
        max: 48,
        step: 4,
      },
      {
        name: "color",
        label: "Color",
        type: "color",
        default: "#E84E2D",
      },
    ],
  },
  component: () => import("@/app/components/ui/scroll-dna"),
  demo: () => import("@/app/components/demos/scroll-dna-demo"),
};

export default entry;
