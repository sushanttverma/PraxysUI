'use client'

import { useState } from 'react'
import BlurText from '@/app/components/ui/blur-text'

export default function BlurTextDemo() {
  const [key, setKey] = useState(0)
  const [animateBy, setAnimateBy] = useState<'words' | 'letters'>('words')
  const [direction, setDirection] = useState<'top' | 'bottom'>('top')
  const [delay, setDelay] = useState(120)

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="relative min-h-[240px] overflow-hidden rounded-xl border border-border bg-void p-6">
        <button
          onClick={() => setKey((k) => k + 1)}
          className="absolute right-3 top-3 rounded-md border border-border bg-obsidian px-2 py-1 text-xs text-chalk hover:border-ignite/40"
        >
          Replay
        </button>
        <div className="flex min-h-[180px] items-center justify-center">
          <BlurText
            key={key}
            text="Praxys ships polished motion UI."
            animateBy={animateBy}
            direction={direction}
            delay={delay}
            className="justify-center text-center text-4xl font-bold text-chalk sm:text-5xl"
          />
        </div>
      </div>

      <div className="grid gap-3 rounded-xl border border-border bg-obsidian/40 p-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-blush">
          Animate By
          <select
            value={animateBy}
            onChange={(e) => {
              setAnimateBy(e.target.value as 'words' | 'letters')
              setKey((k) => k + 1)
            }}
            className="rounded-md border border-border bg-void px-2 py-1.5 text-chalk"
          >
            <option value="words">words</option>
            <option value="letters">letters</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs text-blush">
          Direction
          <select
            value={direction}
            onChange={(e) => {
              setDirection(e.target.value as 'top' | 'bottom')
              setKey((k) => k + 1)
            }}
            className="rounded-md border border-border bg-void px-2 py-1.5 text-chalk"
          >
            <option value="top">top</option>
            <option value="bottom">bottom</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs text-blush">
          Delay ({delay}ms)
          <input
            type="range"
            min={40}
            max={300}
            step={10}
            value={delay}
            onChange={(e) => {
              setDelay(Number(e.target.value))
              setKey((k) => k + 1)
            }}
            className="accent-ignite"
          />
        </label>
      </div>
    </div>
  )
}
