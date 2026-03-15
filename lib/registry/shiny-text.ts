import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "shiny-text",
title: "Shiny Text",
description:
  "Animated shine sweep effect across text with speed, direction, spread, and yoyo controls.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion'

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
  color?: string
  shineColor?: string
  spread?: number
  yoyo?: boolean
  pauseOnHover?: boolean
  direction?: 'left' | 'right'
  delay?: number
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  delay = 0,
}) => {
  const [isPaused, setIsPaused] = useState(false)
  const progress = useMotionValue(0)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)
  const directionRef = useRef(direction === 'left' ? 1 : -1)

  const animationDuration = speed * 1000
  const delayDuration = delay * 1000

  useAnimationFrame((time) => {
    if (disabled || isPaused) {
      lastTimeRef.current = null
      return
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time
      return
    }

    const deltaTime = time - lastTimeRef.current
    lastTimeRef.current = time
    elapsedRef.current += deltaTime

    if (yoyo) {
      const cycleDuration = animationDuration + delayDuration
      const fullCycle = cycleDuration * 2
      const cycleTime = elapsedRef.current % fullCycle

      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100
        progress.set(directionRef.current === 1 ? p : 100 - p)
      } else if (cycleTime < cycleDuration) {
        progress.set(directionRef.current === 1 ? 100 : 0)
      } else if (cycleTime < cycleDuration + animationDuration) {
        const reverseTime = cycleTime - cycleDuration
        const p = 100 - (reverseTime / animationDuration) * 100
        progress.set(directionRef.current === 1 ? p : 100 - p)
      } else {
        progress.set(directionRef.current === 1 ? 0 : 100)
      }
    } else {
      const cycleDuration = animationDuration + delayDuration
      const cycleTime = elapsedRef.current % cycleDuration

      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100
        progress.set(directionRef.current === 1 ? p : 100 - p)
      } else {
        progress.set(directionRef.current === 1 ? 100 : 0)
      }
    }
  })

  useEffect(() => {
    directionRef.current = direction === 'left' ? 1 : -1
    elapsedRef.current = 0
    progress.set(0)
  }, [direction, progress])

  const backgroundPosition = useTransform(progress, (p) => \`\${150 - p * 2}% center\`)

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true)
  }, [pauseOnHover])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false)
  }, [pauseOnHover])

  const gradientStyle: React.CSSProperties = {
    backgroundImage: \`linear-gradient(\${spread}deg, \${color} 0%, \${color} 35%, \${shineColor} 50%, \${color} 65%, \${color} 100%)\`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  return (
    <motion.span
      className={\`inline-block \${className}\`}
      style={{ ...gradientStyle, backgroundPosition }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </motion.span>
  )
}

export default ShinyText`,
usage: `import ShinyText from "@/app/components/ui/shiny-text"

export function Demo() {
  return (
    <ShinyText
      text="Praxys"
      speed={2}
      spread={120}
      yoyo={false}
      className="text-6xl font-black text-chalk"
    />
  )
}`,
props: [
  { name: "text", type: "string", default: "required", description: "Text to render with the shine effect." },
  { name: "disabled", type: "boolean", default: "false", description: "Pauses the shine animation." },
  { name: "speed", type: "number", default: "2", description: "Duration (seconds) of one sweep." },
  { name: "className", type: "string", default: "''", description: "Additional classes for the text span." },
  { name: "color", type: "string", default: "'#b5b5b5'", description: "Base text color in the gradient." },
  { name: "shineColor", type: "string", default: "'#ffffff'", description: "Bright highlight color." },
  { name: "spread", type: "number", default: "120", description: "Gradient angle in degrees." },
  { name: "yoyo", type: "boolean", default: "false", description: "Runs back-and-forth animation cycle." },
  { name: "pauseOnHover", type: "boolean", default: "false", description: "Pauses sweep while hovering." },
  { name: "direction", type: "'left' | 'right'", default: "'left'", description: "Direction of the sweep." },
  { name: "delay", type: "number", default: "0", description: "Delay (seconds) after each cycle." },
],
playground: {
  controls: [
    { name: "text", label: "Text", type: "text", default: "Praxys" },
    { name: "speed", label: "Speed (s)", type: "number", default: 2, min: 0.8, max: 5, step: 0.1 },
    { name: "spread", label: "Spread (deg)", type: "number", default: 120, min: 60, max: 170, step: 1 },
    { name: "direction", label: "Direction", type: "select", default: "left", options: ["left", "right"] },
    { name: "yoyo", label: "Yoyo", type: "boolean", default: false },
    { name: "pauseOnHover", label: "Pause on Hover", type: "boolean", default: false },
  ],
  defaults: {
    className: "text-center text-6xl font-black tracking-tight sm:text-7xl",
    color: "#7f7f7f",
    shineColor: "#ffffff",
  },
},
component: () => import("@/app/components/ui/shiny-text"),
demo: () => import("@/app/components/demos/shiny-text-demo"),
};

export default entry;
