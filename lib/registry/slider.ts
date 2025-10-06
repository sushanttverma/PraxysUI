import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "slider",
title: "Slider",
description:
  "An accessible animated slider with drag interaction, keyboard navigation, tooltip value display, and spring animations.",
category: "buttons",
isNew: true,
dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"],
code: `'use client'

import React, { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SliderProps {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  showLabels?: boolean
  disabled?: boolean
  className?: string
}

const Slider: React.FC<SliderProps> = ({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  showLabels = true,
  disabled = false,
  className,
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const percentage = ((value - min) / (max - min)) * 100

  const updateValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current || disabled) return

      const rect = trackRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const percent = x / rect.width
      let newValue = min + percent * (max - min)

      // Apply step
      if (step > 0) {
        newValue = Math.round(newValue / step) * step
      }

      // Clamp to min/max
      newValue = Math.max(min, Math.min(max, newValue))

      onChange?.(newValue)
    },
    [min, max, step, disabled, onChange]
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return

      setIsDragging(true)
      setShowTooltip(true)

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      updateValue(clientX)
    },
    [disabled, updateValue]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      updateValue(clientX)
    },
    [isDragging, updateValue]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setTimeout(() => setShowTooltip(false), 200)
  }, [])

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchend', handleMouseUp)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('touchmove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchend', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return

      let newValue = value
      const largeStep = (max - min) / 10

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault()
          newValue = Math.min(max, value + step)
          break
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault()
          newValue = Math.max(min, value - step)
          break
        case 'PageUp':
          e.preventDefault()
          newValue = Math.min(max, value + largeStep)
          break
        case 'PageDown':
          e.preventDefault()
          newValue = Math.max(min, value - largeStep)
          break
        case 'Home':
          e.preventDefault()
          newValue = min
          break
        case 'End':
          e.preventDefault()
          newValue = max
          break
        default:
          return
      }

      onChange?.(newValue)
    },
    [disabled, value, min, max, step, onChange]
  )

  return (
    <div className={cn('relative w-full', className)}>
      {/* Labels */}
      {showLabels && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-text-faint">{min}</span>
          <span className="text-xs text-text-faint">{max}</span>
        </div>
      )}

      {/* Track container */}
      <div
        ref={trackRef}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => !disabled && setShowTooltip(true)}
        onMouseLeave={() => !isDragging && setShowTooltip(false)}
        className={cn(
          'relative h-10 flex items-center group',
          disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
          'focus-visible:outline-none'
        )}
      >
        {/* Background track */}
        <div className="absolute inset-x-0 h-1.5 bg-obsidian border border-border rounded-full" />

        {/* Filled track */}
        <motion.div
          className="absolute left-0 h-1.5 bg-ignite/30 border border-ignite/50 rounded-full"
          initial={false}
          animate={{ width: \`\${percentage}%\` }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />

        {/* Thumb */}
        <motion.div
          className={cn(
            'absolute w-5 h-5 -ml-2.5 rounded-full shadow-lg',
            'bg-chalk border-2 border-ignite',
            !disabled && 'hover:scale-110',
            isDragging && 'scale-110',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite/40'
          )}
          initial={false}
          animate={{
            left: \`\${percentage}%\`,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            mass: 0.8,
          }}
          style={{
            cursor: disabled ? 'not-allowed' : 'grab',
          }}
        />

        {/* Value tooltip */}
        {showValue && (showTooltip || isDragging) && (
          <motion.div
            className="absolute -top-10 left-0 -ml-8 px-2.5 py-1 bg-obsidian border border-border rounded-md shadow-lg pointer-events-none"
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              left: \`\${percentage}%\`,
            }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{
              opacity: { duration: 0.15 },
              scale: { type: 'spring', stiffness: 400, damping: 25 },
              left: { type: 'spring', stiffness: 500, damping: 30 },
            }}
          >
            <span className="text-xs font-medium text-chalk">{value.toFixed(step < 1 ? 2 : 0)}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-obsidian border-r border-b border-border rotate-45" />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Slider`,
usage: `import Slider from "@/app/components/ui/slider"

export function Demo() {
  const [value, setValue] = React.useState(50)

  return (
    <Slider
      value={value}
      onChange={setValue}
      min={0}
      max={100}
      step={1}
      showValue
      showLabels
    />
  )
}`,
props: [
  {
    name: "value",
    type: "number",
    default: "50",
    description: "Current value of the slider.",
  },
  {
    name: "onChange",
    type: "(value: number) => void",
    default: "undefined",
    description: "Callback when the slider value changes.",
  },
  {
    name: "min",
    type: "number",
    default: "0",
    description: "Minimum value of the slider.",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "Maximum value of the slider.",
  },
  {
    name: "step",
    type: "number",
    default: "1",
    description: "Step increment for the slider.",
  },
  {
    name: "showValue",
    type: "boolean",
    default: "true",
    description: "Whether to show the value tooltip.",
  },
  {
    name: "showLabels",
    type: "boolean",
    default: "true",
    description: "Whether to show min/max labels.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the slider.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
],
playground: {
  controls: [
    { name: "value", label: "Value", type: "number", default: 50 },
    { name: "min", label: "Min", type: "number", default: 0 },
    { name: "max", label: "Max", type: "number", default: 100 },
    { name: "step", label: "Step", type: "number", default: 1 },
    { name: "showValue", label: "Show Value", type: "boolean", default: true },
    { name: "showLabels", label: "Show Labels", type: "boolean", default: true },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
},
component: () => import("@/app/components/ui/slider"),
demo: () => import("@/app/components/demos/slider-demo"),
};

export default entry;
