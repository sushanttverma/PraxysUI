'use client'

import { useState } from 'react'
import RangeSlider from '@/app/components/ui/range-slider'

export default function RangeSliderDemo() {
  const [price, setPrice] = useState<[number, number]>([20, 80])
  const [age, setAge] = useState<[number, number]>([18, 65])

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Price Range ($0 - $100)
          </p>
          <RangeSlider
            min={0}
            max={100}
            step={5}
            value={price}
            onChange={setPrice}
          />
          <p className="mt-1 text-xs text-text-faint">
            Selected: ${price[0]} - ${price[1]}
          </p>
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Age Range (0 - 100)
          </p>
          <RangeSlider
            min={0}
            max={100}
            step={1}
            value={age}
            onChange={setAge}
          />
          <p className="mt-1 text-xs text-text-faint">
            Selected: {age[0]} - {age[1]} years
          </p>
        </div>
      </div>
    </div>
  )
}
