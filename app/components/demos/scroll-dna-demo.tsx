'use client'

import { useRef } from 'react'
import ScrollDNA from '@/app/components/ui/scroll-dna'

const SECTIONS = [
  { id: 'sb-intro', label: '#1 Who we are', code: 'const team = ["design", "eng"]' },
  { id: 'sb-features', label: '#2 Features', code: 'const features = [...new Set()]' },
  { id: 'sb-how', label: '#3 How we do it', code: 'export async function build()' },
  { id: 'sb-pricing', label: '#4 Pricing', code: 'const pricing = ["free", "pro"]' },
  { id: 'sb-support', label: '#5 Support', code: 'const support = "24/7 live"' },
]

function SectionBlock({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="px-6 py-16">
      <h2 className="text-lg font-bold text-chalk font-pixel mb-4">{title}</h2>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-3 rounded bg-border/30" style={{ width: `${80 - i * 12}%` }} />
        ))}
      </div>
      <div className="mt-6 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-3 rounded bg-border/20" style={{ width: `${90 - i * 8}%` }} />
        ))}
      </div>
    </section>
  )
}

export default function ScrollDNADemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full rounded-xl border border-border overflow-hidden bg-void">
      <div
        ref={containerRef}
        className="relative h-[480px] overflow-y-auto scrollbar-thin"
      >
        <SectionBlock id="sb-intro" title="#1 Who we are" />
        <SectionBlock id="sb-features" title="#2 Features" />
        <SectionBlock id="sb-how" title="#3 How we do it" />
        <SectionBlock id="sb-pricing" title="#4 Pricing" />
        <SectionBlock id="sb-support" title="#5 Support" />
      </div>

      {/* Absolutely positioned inside the demo container */}
      <div className="absolute bottom-4 right-4 z-50">
        <ScrollDNA
          sections={SECTIONS}
          color="#E84E2D"
          barCount={28}
          containerRef={containerRef}
        />
      </div>
    </div>
  )
}
