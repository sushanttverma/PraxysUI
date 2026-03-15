'use client'

import { useState } from 'react'
import ShinyText from '@/app/components/ui/shiny-text'

export default function ShinyTextDemo() {
  const [speed, setSpeed] = useState(2)
  const [spread, setSpread] = useState(120)
  const [yoyo, setYoyo] = useState(false)

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-border bg-void p-6">
        <ShinyText
          text="Praxys"
          speed={speed}
          spread={spread}
          yoyo={yoyo}
          className="text-center text-6xl font-black tracking-tight sm:text-7xl"
          color="#7f7f7f"
          shineColor="#ffffff"
        />
      </div>

      <div className="grid gap-3 rounded-xl border border-border bg-obsidian/40 p-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-blush">
          Speed ({speed.toFixed(1)}s)
          <input
            type="range"
            min={0.8}
            max={5}
            step={0.1}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="accent-ignite"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-blush">
          Spread ({spread}deg)
          <input
            type="range"
            min={60}
            max={170}
            step={1}
            value={spread}
            onChange={(e) => setSpread(Number(e.target.value))}
            className="accent-ignite"
          />
        </label>

        <label className="flex items-center gap-2 text-xs text-blush">
          <input type="checkbox" checked={yoyo} onChange={(e) => setYoyo(e.target.checked)} className="accent-ignite" />
          Yoyo animation
        </label>
      </div>
    </div>
  )
}
