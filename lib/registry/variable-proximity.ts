import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "variable-proximity",
title: "Variable Proximity",
description:
  "Mouse-proximity variable font interpolation per character with configurable radius and falloff curves.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import {
  forwardRef,
  useMemo,
  useRef,
  useEffect,
  type MutableRefObject,
  type CSSProperties,
  type HTMLAttributes,
} from 'react'
import { motion } from 'framer-motion'

function useAnimationFrame(callback: () => void) {
  useEffect(() => {
    let frameId = 0
    const loop = () => {
      callback()
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [callback])
}

function useMousePositionRef(containerRef: MutableRefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = { x: x - rect.left, y: y - rect.top }
      } else {
        positionRef.current = { x, y }
      }
    }

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY)
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0]
      updatePosition(touch.clientX, touch.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [containerRef])

  return positionRef
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string
  fromFontVariationSettings: string
  toFontVariationSettings: string
  containerRef?: MutableRefObject<HTMLElement | null>
  radius?: number
  falloff?: 'linear' | 'exponential' | 'gaussian'
  className?: string
  onClick?: () => void
  style?: CSSProperties
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props

  const fallbackContainerRef = useRef<HTMLElement | null>(null)
  const activeContainerRef = containerRef ?? fallbackContainerRef
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const interpolatedSettingsRef = useRef<string[]>([])
  const mousePositionRef = useMousePositionRef(activeContainerRef)
  const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr: string) =>
      new Map(
        settingsStr
          .split(',')
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.split(' ')
            return [name.replace(/['"]/g, ''), parseFloat(value)]
          })
      )

    const fromSettings = parseSettings(fromFontVariationSettings)
    const toSettings = parseSettings(toFontVariationSettings)

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }))
  }, [fromFontVariationSettings, toFontVariationSettings])

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

  const calculateFalloff = (distance: number) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1)
    switch (falloff) {
      case 'exponential':
        return norm ** 2
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2)
      case 'linear':
      default:
        return norm
    }
  }

  useAnimationFrame(() => {
    const { x, y } = mousePositionRef.current
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) return

    lastPositionRef.current = { x, y }
    const containerRect = activeContainerRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 }

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return

      const rect = letterRef.getBoundingClientRect()
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top
      const distance = calculateDistance(mousePositionRef.current.x, mousePositionRef.current.y, letterCenterX, letterCenterY)

      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings
        return
      }

      const falloffValue = calculateFalloff(distance)
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue
          return \`'\${axis}' \${interpolatedValue}\`
        })
        .join(', ')

      interpolatedSettingsRef.current[index] = newSettings
      letterRef.style.fontVariationSettings = newSettings
    })
  })

  const words = label.split(' ')
  let letterIndex = 0

  return (
    <span
      ref={ref}
      onClick={onClick}
      style={{
        display: 'inline',
        ...style,
      }}
      className={\`\${className} variable-proximity\`}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((letter) => {
            const currentLetterIndex = letterIndex++
            return (
              <motion.span
                key={currentLetterIndex}
                ref={(el) => {
                  letterRefs.current[currentLetterIndex] = el
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex],
                }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            )
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  )
})

VariableProximity.displayName = 'VariableProximity'
export default VariableProximity`,
usage: `import { useRef } from "react"
import VariableProximity from "@/app/components/ui/variable-proximity"

export function Demo() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <div ref={containerRef}>
      <VariableProximity
        label="Praxys Variable Proximity"
        fromFontVariationSettings="'wght' 380, 'opsz' 9"
        toFontVariationSettings="'wght' 900, 'opsz' 40"
        containerRef={containerRef}
        radius={120}
        falloff="gaussian"
        className="text-6xl text-chalk"
      />
    </div>
  )
}`,
props: [
  { name: "label", type: "string", default: "required", description: "Text label split per-character for interpolation." },
  { name: "fromFontVariationSettings", type: "string", default: "required", description: "Base font variation settings string." },
  { name: "toFontVariationSettings", type: "string", default: "required", description: "Target font variation settings string." },
  { name: "containerRef", type: "MutableRefObject<HTMLElement | null>", default: "undefined", description: "Optional reference bounds for mouse coordinates." },
  { name: "radius", type: "number", default: "50", description: "Effect radius around pointer in pixels." },
  { name: "falloff", type: "'linear' | 'exponential' | 'gaussian'", default: "'linear'", description: "Interpolation falloff curve." },
  { name: "className", type: "string", default: "''", description: "Additional classes for wrapper span." },
  { name: "style", type: "CSSProperties", default: "undefined", description: "Inline style overrides." },
],
playground: {
  controls: [
    { name: "label", label: "Label", type: "text", default: "Praxys Variable Proximity" },
    { name: "fromFontVariationSettings", label: "From Settings", type: "text", default: "'wght' 380, 'opsz' 9" },
    { name: "toFontVariationSettings", label: "To Settings", type: "text", default: "'wght' 900, 'opsz' 40" },
    { name: "radius", label: "Radius", type: "number", default: 120, min: 40, max: 240, step: 2 },
    { name: "falloff", label: "Falloff", type: "select", default: "gaussian", options: ["linear", "exponential", "gaussian"] },
  ],
  defaults: {
    className: "text-center text-4xl text-chalk sm:text-6xl",
  },
},
component: () => import("@/app/components/ui/variable-proximity"),
demo: () => import("@/app/components/demos/variable-proximity-demo"),
};

export default entry;
