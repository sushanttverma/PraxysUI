'use client'

import { useState } from 'react'
import SplitText from '@/app/components/ui/split-text'

export default function SplitTextDemo() {
  const [previewKey, setPreviewKey] = useState(0)
  const [delay, setDelay] = useState(50)
  const [duration, setDuration] = useState(1.25)
  const [splitType, setSplitType] = useState<'chars' | 'words' | 'lines' | 'words, chars'>('chars')
  const [ease, setEase] = useState<'power3.out' | 'bounce.out' | 'elastic.out(1, 0.3)'>('power3.out')

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="relative min-h-[400px] overflow-hidden rounded-xl border border-border bg-void p-6">
        <button
          onClick={() => setPreviewKey((k) => k + 1)}
          className="absolute right-3 top-3 rounded-md border border-border bg-obsidian px-2 py-1 text-xs text-chalk hover:border-ignite/40"
        >
          Replay
        </button>

        <div className="flex min-h-[340px] items-center justify-center">
          <SplitText
            key={previewKey}
            text="Hello, Praxys."
            delay={delay}
            duration={duration}
            ease={ease}
            splitType={splitType}
            className="text-4xl font-bold text-chalk sm:text-5xl"
          />
        </div>
      </div>

      <div className="grid gap-3 rounded-xl border border-border bg-obsidian/40 p-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-blush">
          Split Type
          <select
            value={splitType}
            onChange={(e) => {
              setSplitType(e.target.value as 'chars' | 'words' | 'lines' | 'words, chars')
              setPreviewKey((k) => k + 1)
            }}
            className="rounded-md border border-border bg-void px-2 py-1.5 text-chalk"
          >
            <option value="chars">chars</option>
            <option value="words">words</option>
            <option value="lines">lines</option>
            <option value="words, chars">words, chars</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs text-blush">
          Ease
          <select
            value={ease}
            onChange={(e) => {
              setEase(e.target.value as 'power3.out' | 'bounce.out' | 'elastic.out(1, 0.3)')
              setPreviewKey((k) => k + 1)
            }}
            className="rounded-md border border-border bg-void px-2 py-1.5 text-chalk"
          >
            <option value="power3.out">power3.out</option>
            <option value="bounce.out">bounce.out</option>
            <option value="elastic.out(1, 0.3)">elastic.out(1, 0.3)</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs text-blush">
          Delay ({delay}ms)
          <input
            type="range"
            min={10}
            max={500}
            step={10}
            value={delay}
            onChange={(e) => {
              setDelay(Number(e.target.value))
              setPreviewKey((k) => k + 1)
            }}
            className="accent-ignite"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-blush">
          Duration ({duration.toFixed(2)}s)
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.1}
            value={duration}
            onChange={(e) => {
              setDuration(Number(e.target.value))
              setPreviewKey((k) => k + 1)
            }}
            className="accent-ignite"
          />
        </label>
      </div>
    </div>
  )
}
