'use client'

import { useRef, useState } from 'react'
import VariableProximity from '@/app/components/ui/variable-proximity'

export default function VariableProximityDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [radius, setRadius] = useState(120)
  const [falloff, setFalloff] = useState<'linear' | 'exponential' | 'gaussian'>('gaussian')

  return (
    <div className="flex flex-col gap-4 py-2">
      <div ref={containerRef} className="flex min-h-[260px] items-center justify-center rounded-xl border border-border bg-void p-6">
        <VariableProximity
          label="Praxys Variable Proximity"
          fromFontVariationSettings="'wght' 380, 'opsz' 9"
          toFontVariationSettings="'wght' 900, 'opsz' 40"
          containerRef={containerRef}
          radius={radius}
          falloff={falloff}
          className="text-center text-4xl text-chalk sm:text-6xl"
        />
      </div>

      <div className="grid gap-3 rounded-xl border border-border bg-obsidian/40 p-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-blush">
          Radius ({radius}px)
          <input
            type="range"
            min={40}
            max={240}
            step={2}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="accent-ignite"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-blush">
          Falloff
          <select
            value={falloff}
            onChange={(e) => setFalloff(e.target.value as 'linear' | 'exponential' | 'gaussian')}
            className="rounded-md border border-border bg-void px-2 py-1.5 text-chalk"
          >
            <option value="linear">linear</option>
            <option value="exponential">exponential</option>
            <option value="gaussian">gaussian</option>
          </select>
        </label>
      </div>
    </div>
  )
}
