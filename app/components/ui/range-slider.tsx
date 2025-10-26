'use client'

import React, { useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RangeSliderProps {
  min?: number
  max?: number
  step?: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  className?: string
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className,
}) => {
  const trackRef = useRef<HTMLDivElement>(null)

  const snapToStep = useCallback(
    (val: number) => {
      const snapped = Math.round((val - min) / step) * step + min
      return Math.min(max, Math.max(min, snapped))
    },
    [min, max, step]
  )

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return min
      const rect = trackRef.current.getBoundingClientRect()
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      return snapToStep(min + pct * (max - min))
    },
    [min, max, snapToStep]
  )

  const leftPct = ((value[0] - min) / (max - min)) * 100
  const rightPct = ((value[1] - min) / (max - min)) * 100

  const handleDragLeft = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const currentPx = (value[0] - min) / (max - min) * rect.width
      const newPx = currentPx + info.delta.x
      const pct = Math.max(0, Math.min(1, newPx / rect.width))
      const newVal = snapToStep(min + pct * (max - min))
      if (newVal <= value[1]) {
        onChange([newVal, value[1]])
      }
    },
    [value, min, max, snapToStep, onChange]
  )

  const handleDragRight = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const currentPx = (value[1] - min) / (max - min) * rect.width
      const newPx = currentPx + info.delta.x
      const pct = Math.max(0, Math.min(1, newPx / rect.width))
      const newVal = snapToStep(min + pct * (max - min))
      if (newVal >= value[0]) {
        onChange([value[0], newVal])
      }
    },
    [value, min, max, snapToStep, onChange]
  )

  const handleTrackClick = (e: React.MouseEvent) => {
    const clickedVal = getValueFromPosition(e.clientX)
    const distToLeft = Math.abs(clickedVal - value[0])
    const distToRight = Math.abs(clickedVal - value[1])
    if (distToLeft <= distToRight) {
      onChange([Math.min(clickedVal, value[1]), value[1]])
    } else {
      onChange([value[0], Math.max(clickedVal, value[0])])
    }
  }

  return (
    <div className={cn('w-full py-4', className)}>
      <div className="flex justify-between mb-2">
        <span className="text-xs font-medium text-text-faint">{value[0]}</span>
        <span className="text-xs font-medium text-text-faint">{value[1]}</span>
      </div>
      <div
        ref={trackRef}
        className="relative h-1.5 w-full cursor-pointer rounded-full bg-obsidian border border-border"
        onClick={handleTrackClick}
      >
        {/* Active range fill */}
        <div
          className="absolute top-0 bottom-0 rounded-full bg-ignite/40"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />

        {/* Left thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-ignite border-2 border-void cursor-grab active:cursor-grabbing shadow-lg shadow-ignite/20"
          style={{ left: `${leftPct}%` }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDragLeft}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
        />

        {/* Right thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-ignite border-2 border-void cursor-grab active:cursor-grabbing shadow-lg shadow-ignite/20"
          style={{ left: `${rightPct}%` }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDragRight}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
        />
      </div>
    </div>
  )
}

export default RangeSlider
