import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "blur-text",
title: "Blur Text",
description:
  "Viewport-triggered blur reveal animation for words or letters with configurable direction and stagger.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import { motion, type Easing } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

type BlurTextProps = {
  text?: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  threshold?: number
  rootMargin?: string
  animationFrom?: Record<string, string | number>
  animationTo?: Array<Record<string, string | number>>
  easing?: Easing | Easing[]
  onAnimationComplete?: () => void
  stepDuration?: number
}

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))])
  const keyframes: Record<string, Array<string | number>> = {}
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])]
  })
  return keyframes
}

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(ref.current as Element)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const defaultFrom = useMemo(
    () => (direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 }),
    [direction]
  )

  const defaultTo = useMemo(
    () => [
      { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo
  const stepCount = toSnapshots.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)))

  return (
    <p ref={ref} className={\`flex flex-wrap \${className}\`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots)
        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={{
              duration: totalDuration,
              times,
              delay: (index * delay) / 1000,
              ease: easing,
            }}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
          >
            {segment === ' ' ? '\\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\\u00A0'}
          </motion.span>
        )
      })}
    </p>
  )
}

export default BlurText`,
usage: `import BlurText from "@/app/components/ui/blur-text"

export function Demo() {
  return (
    <BlurText
      text="Praxys ships polished motion UI."
      animateBy="words"
      direction="top"
      delay={120}
      className="text-4xl font-bold text-chalk"
    />
  )
}`,
props: [
  { name: "text", type: "string", default: "''", description: "Text content to animate." },
  { name: "delay", type: "number", default: "200", description: "Stagger delay per segment in milliseconds." },
  { name: "className", type: "string", default: "''", description: "Additional classes for the wrapper element." },
  { name: "animateBy", type: "'words' | 'letters'", default: "'words'", description: "Split animation by words or letters." },
  { name: "direction", type: "'top' | 'bottom'", default: "'top'", description: "Initial movement direction." },
  { name: "threshold", type: "number", default: "0.1", description: "IntersectionObserver threshold." },
  { name: "rootMargin", type: "string", default: "'0px'", description: "IntersectionObserver rootMargin." },
  { name: "animationFrom", type: "Record<string, string | number>", default: "auto", description: "Initial keyframe values." },
  { name: "animationTo", type: "Array<Record<string, string | number>>", default: "auto", description: "Animation keyframe snapshots." },
  { name: "easing", type: "Easing | Easing[]", default: "(t) => t", description: "Framer Motion easing value." },
  { name: "stepDuration", type: "number", default: "0.35", description: "Duration of each keyframe step in seconds." },
  { name: "onAnimationComplete", type: "() => void", default: "undefined", description: "Callback after final segment finishes." },
],
playground: {
  controls: [
    { name: "text", label: "Text", type: "text", default: "Praxys ships polished motion UI." },
    { name: "delay", label: "Delay (ms)", type: "number", default: 120, min: 20, max: 400, step: 10 },
    { name: "animateBy", label: "Animate By", type: "select", default: "words", options: ["words", "letters"] },
    { name: "direction", label: "Direction", type: "select", default: "top", options: ["top", "bottom"] },
    { name: "stepDuration", label: "Step Duration (s)", type: "number", default: 0.35, min: 0.1, max: 1, step: 0.05 },
  ],
  defaults: {
    className: "justify-center text-center text-4xl font-bold text-chalk sm:text-5xl",
  },
},
component: () => import("@/app/components/ui/blur-text"),
demo: () => import("@/app/components/demos/blur-text-demo"),
};

export default entry;
