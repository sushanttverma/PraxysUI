'use client'

import { useState } from 'react'
import BlurFade from '@/app/components/ui/blur-fade'

export default function BlurFadeDemo() {
  const [key, setKey] = useState(0)

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div key={key} className="flex flex-col items-center gap-4">
        <BlurFade delay={0} direction="up">
          <h2 className="font-pixel text-2xl text-chalk">Blur Fade</h2>
        </BlurFade>
        <BlurFade delay={0.2} direction="up">
          <p className="text-blush">Content fades in with a blur effect</p>
        </BlurFade>
        <BlurFade delay={0.4} direction="up">
          <span className="rounded-lg border border-border bg-obsidian px-4 py-2 text-sm text-text-faint">
            Stagger each element with delay
          </span>
        </BlurFade>
      </div>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="rounded-lg border border-border px-4 py-2 text-sm text-blush transition-colors hover:text-chalk cursor-pointer"
      >
        Replay
      </button>
    </div>
  )
}
