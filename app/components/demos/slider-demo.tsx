'use client'

import { useState } from 'react'
import Slider from '@/app/components/ui/slider'

export default function SliderDemo() {
  const [volume, setVolume] = useState(65)
  const [price, setPrice] = useState(250)
  const [percentage, setPercentage] = useState(75)

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-8 rounded-xl border border-border bg-obsidian p-6">
        {/* Volume slider */}
        <div>
          <p className="mb-4 text-sm font-medium text-chalk">
            Volume Control
          </p>
          <Slider
            value={volume}
            onChange={setVolume}
            min={0}
            max={100}
            step={1}
            showValue={true}
            showLabels={true}
          />
          <p className="mt-3 text-center text-sm text-text-faint">
            Current volume: <span className="text-ignite font-semibold">{volume}%</span>
          </p>
        </div>

        <div className="h-px bg-border" />

        {/* Price range slider */}
        <div>
          <p className="mb-4 text-sm font-medium text-chalk">
            Price Range
          </p>
          <Slider
            value={price}
            onChange={setPrice}
            min={0}
            max={1000}
            step={50}
            showValue={true}
            showLabels={true}
          />
          <p className="mt-3 text-center text-sm text-text-faint">
            Selected price: <span className="text-ignite font-semibold">${price}</span>
          </p>
        </div>

        <div className="h-px bg-border" />

        {/* Percentage slider with tooltip */}
        <div>
          <p className="mb-4 text-sm font-medium text-chalk">
            Percentage (with value tooltip)
          </p>
          <Slider
            value={percentage}
            onChange={setPercentage}
            min={0}
            max={100}
            step={1}
            showValue={true}
            showLabels={true}
          />
          <p className="mt-3 text-center text-sm text-text-faint">
            Current percentage: <span className="text-ignite font-semibold">{percentage}%</span>
          </p>
        </div>

        <div className="h-px bg-border" />

        {/* Summary */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Summary
          </p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-text-faint">Volume:</span>
              <span className="text-chalk font-medium">{volume}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-faint">Price:</span>
              <span className="text-chalk font-medium">${price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-faint">Percentage:</span>
              <span className="text-chalk font-medium">{percentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
