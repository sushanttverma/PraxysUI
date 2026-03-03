'use client'

import { useRef } from 'react'
import ScrollProgress from '@/app/components/ui/scroll-progress'

const sections = [
  { id: 'sp-intro', label: 'Intro' },
  { id: 'sp-features', label: 'Features' },
  { id: 'sp-details', label: 'Details' },
  { id: 'sp-outro', label: 'Outro' },
]

export default function ScrollProgressDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full rounded-xl border border-border overflow-hidden">
      {/* Bar sits above the scroll container — never scrolls, always visible */}
      <ScrollProgress
        position="top"
        color="#6366f1"
        thickness={3}
        containerRef={containerRef}
      />

      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="relative h-[420px] overflow-y-auto bg-obsidian scroll-smooth overscroll-contain"
      >
        {/* Section dot navigator */}
        <div className="sticky top-4 float-right mr-4 z-10 flex flex-col items-end gap-3">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              className="group flex items-center gap-2"
              onClick={() => {
                const el = containerRef.current?.querySelector(`#${s.id}`) as HTMLElement | null
                if (el && containerRef.current) {
                  containerRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
                }
              }}
            >
              <span className="text-xs text-blush group-hover:text-chalk transition-colors opacity-0 group-hover:opacity-100">
                {s.label}
              </span>
              <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-indigo-400 transition-colors" />
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-8 py-6 pr-12">
          <section id="sp-intro" className="min-h-[300px] flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-chalk mb-2">Introduction</h3>
            <p className="text-sm text-blush leading-relaxed">
              Scroll Progress tracks how far a user has read through your content.
              It renders a thin bar at the top of the container that fills from left
              to right as you scroll, driven by a spring for smooth, physical motion.
            </p>
            <p className="text-sm text-blush leading-relaxed mt-3">
              Use it on blog posts, documentation pages, or anywhere users read
              long-form content. It gives immediate visual feedback on reading
              progress without cluttering the UI.
            </p>
          </section>

          <section id="sp-features" className="min-h-[300px] flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-chalk mb-2">Features</h3>
            <ul className="space-y-2 text-sm text-blush">
              <li>• Spring-based animation — no lerp, no janky CSS transitions</li>
              <li>• Scoped to any scroll container via <code className="text-indigo-300">containerRef</code></li>
              <li>• Two positions: top bar or right-side section dots</li>
              <li>• Section dot navigator with smooth scroll on click</li>
              <li>• Fully customisable color and thickness</li>
            </ul>
          </section>

          <section id="sp-details" className="min-h-[300px] flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-chalk mb-2">Implementation</h3>
            <p className="text-sm text-blush leading-relaxed">
              Built on Framer Motion&apos;s <code className="text-indigo-300">useScroll</code> and{' '}
              <code className="text-indigo-300">useSpring</code>. The progress value is derived
              from <code className="text-indigo-300">scrollYProgress</code> and fed through a
              spring with configurable stiffness and damping.
            </p>
            <p className="text-sm text-blush leading-relaxed mt-3">
              Section detection uses <code className="text-indigo-300">IntersectionObserver</code>{' '}
              with granular thresholds so the active dot updates precisely as each section enters view.
            </p>
          </section>

          <section id="sp-outro" className="min-h-[280px] flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-chalk mb-2">That&apos;s it</h3>
            <p className="text-sm text-blush leading-relaxed">
              Drop <code className="text-indigo-300">{'<ScrollProgress />'}</code> above your
              scrollable container. Pass a <code className="text-indigo-300">containerRef</code> to
              scope it, or omit it to track the full page scroll.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
