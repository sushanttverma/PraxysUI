import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "pixel-transition",
  title: "Pixel Transition",
  description: "A pixelated dissolution effect that transitions between two pieces of content on hover with randomized stagger animations.",
  category: "visual",
  dependencies: ["gsap"],
  code: `'use client'

import React, { useRef, useState, useMemo, useCallback } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

interface PixelTransitionProps {
  firstContent: React.ReactNode
  secondContent: React.ReactNode
  gridSize?: number
  pixelColor?: string
  duration?: number
  className?: string
}

const PixelTransition: React.FC<PixelTransitionProps> = ({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = '#E04E2D',
  duration = 0.35,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pixelRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isActive, setIsActive] = useState(false)

  const totalPixels = gridSize * gridSize
  const cellSize = 100 / gridSize // percentage

  // Pre-compute a shuffled order for stagger animation
  const shuffledIndices = useMemo(() => {
    const indices = Array.from({ length: totalPixels }, (_, i) => i)
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[indices[i], indices[j]] = [indices[j], indices[i]]
    }
    return indices
  }, [totalPixels])

  const animatePixels = useCallback(
    (reveal: boolean) => {
      // Kill any active tweens on pixel elements to prevent overlap
      pixelRefs.current.forEach((el) => {
        if (el) gsap.killTweensOf(el)
      })

      const staggerStep = duration / totalPixels

      shuffledIndices.forEach((pixelIndex, order) => {
        const el = pixelRefs.current[pixelIndex]
        if (!el) return

        gsap.to(el, {
          opacity: reveal ? 1 : 0,
          duration: duration,
          delay: order * staggerStep,
          ease: 'power2.inOut',
        })
      })
    },
    [shuffledIndices, duration, totalPixels]
  )

  const handleEnter = useCallback(() => {
    setIsActive(true)
    animatePixels(true)
  }, [animatePixels])

  const handleLeave = useCallback(() => {
    setIsActive(false)
    animatePixels(false)
  }, [animatePixels])

  const handleTouchToggle = useCallback(() => {
    if (isActive) {
      handleLeave()
    } else {
      handleEnter()
    }
  }, [isActive, handleEnter, handleLeave])

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden select-none', className)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleTouchToggle}
    >
      {/* First content layer (bottom) */}
      <div className="relative z-0 h-full w-full">{firstContent}</div>

      {/* Second content layer (underneath pixels) */}
      <div className="absolute inset-0 z-10">{secondContent}</div>

      {/* Pixel grid overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {Array.from({ length: totalPixels }, (_, i) => {
          const row = Math.floor(i / gridSize)
          const col = i % gridSize
          return (
            <div
              key={i}
              ref={(el) => {
                pixelRefs.current[i] = el
              }}
              style={{
                position: 'absolute',
                top: \`\${row * cellSize}%\`,
                left: \`\${col * cellSize}%\`,
                width: \`\${cellSize + 0.5}%\`,
                height: \`\${cellSize + 0.5}%\`,
                backgroundColor: pixelColor,
                opacity: 0,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default PixelTransition`,
  usage: `<PixelTransition\n  firstContent={<div>Before</div>}\n  secondContent={<div>After</div>}\n  gridSize={7}\n  pixelColor="#E04E2D"\n/>`,
  props: [
    { name: "firstContent", type: "ReactNode", default: "required", description: "Initial displayed content" },
    { name: "secondContent", type: "ReactNode", default: "required", description: "Content revealed on hover" },
    { name: "gridSize", type: "number", default: "7", description: "Grid dimensions (NxN pixels)" },
    { name: "pixelColor", type: "string", default: "'#E04E2D'", description: "Color of animated pixels" },
    { name: "duration", type: "number", default: "0.35", description: "Animation duration per pixel" },
    { name: "className", type: "string", default: "''", description: "Additional CSS classes" },
  ],
  component: () => import("@/app/components/ui/pixel-transition"),
  demo: () => import("@/app/components/demos/pixel-transition-demo"),
};

export default entry;
