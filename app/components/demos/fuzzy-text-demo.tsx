'use client'

import { useState } from 'react'
import FuzzyText from '@/app/components/ui/fuzzy-text'

export default function FuzzyTextDemo() {
  const [hoverIntensity, setHoverIntensity] = useState(0.5)
  const [baseIntensity, setBaseIntensity] = useState(0.18)
  const [fuzzRange, setFuzzRange] = useState(30)

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl border border-border bg-void p-6">
        <FuzzyText
          fontSize="clamp(2.6rem, 8vw, 5.8rem)"
          fontWeight={900}
          color="#F8F8F2"
          baseIntensity={baseIntensity}
          hoverIntensity={hoverIntensity}
          fuzzRange={fuzzRange}
          className="max-w-full"
        >
          Praxys
        </FuzzyText>
      </div>

      <div className="grid gap-3 rounded-xl border border-border bg-obsidian/40 p-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-blush">
          Base ({baseIntensity.toFixed(2)})
          <input
            type="range"
            min={0.02}
            max={0.4}
            step={0.01}
            value={baseIntensity}
            onChange={(e) => setBaseIntensity(Number(e.target.value))}
            className="accent-ignite"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-blush">
          Hover ({hoverIntensity.toFixed(2)})
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.01}
            value={hoverIntensity}
            onChange={(e) => setHoverIntensity(Number(e.target.value))}
            className="accent-ignite"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-blush">
          Range ({fuzzRange})
          <input
            type="range"
            min={8}
            max={60}
            step={1}
            value={fuzzRange}
            onChange={(e) => setFuzzRange(Number(e.target.value))}
            className="accent-ignite"
          />
        </label>
      </div>
    </div>
  )
}
