'use client'

import Carousel from '@/app/components/ui/carousel'

const slides = [
  { label: 'Slide 1', color: 'from-ignite/20 to-violet-500/20' },
  { label: 'Slide 2', color: 'from-emerald-500/20 to-cyan-500/20' },
  { label: 'Slide 3', color: 'from-amber-500/20 to-rose-500/20' },
  { label: 'Slide 4', color: 'from-sky-500/20 to-indigo-500/20' },
]

export default function CarouselDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Default */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            With arrows &amp; dots
          </p>
          <Carousel>
            {slides.map((s, i) => (
              <div
                key={i}
                className={`flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br ${s.color}`}
              >
                <span className="text-lg font-medium text-chalk">{s.label}</span>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="h-px bg-border" />

        {/* Auto-play, no arrows */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Auto-play, no arrows
          </p>
          <Carousel autoPlay interval={3000} showArrows={false}>
            {slides.map((s, i) => (
              <div
                key={i}
                className={`flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br ${s.color}`}
              >
                <span className="text-lg font-medium text-chalk">{s.label}</span>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}
