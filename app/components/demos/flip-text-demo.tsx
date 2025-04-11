'use client'

import FlipText from '@/app/components/ui/flip-text'

export default function FlipTextDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <FlipText text="Praxys UI" className="text-4xl font-bold text-chalk font-pixel" />
      <FlipText
        text="Build stunning interfaces"
        className="text-lg text-blush"
        staggerDelay={0.03}
      />
    </div>
  )
}
