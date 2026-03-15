'use client'

import { useRef } from 'react'
import ScrollReveal from '@/app/components/ui/scroll-reveal'

export default function ScrollRevealDemo() {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null)

  return (
    <div ref={scrollAreaRef} className="h-[420px] overflow-y-auto rounded-xl border border-border bg-void p-8">
      <div className="mx-auto max-w-3xl py-20">
        <ScrollReveal
          scrollContainerRef={scrollAreaRef}
          baseOpacity={0.15}
          baseRotation={4}
          blurStrength={6}
          containerClassName="my-0"
          textClassName="text-chalk"
        >
          Praxys helps teams ship tactile interfaces with expressive motion, careful typography, and components that feel
          handcrafted.
        </ScrollReveal>
      </div>
      <div className="h-[420px]" />
    </div>
  )
}
