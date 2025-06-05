import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "animated-number",
title: "Animated Number",
description:
  "Smoothly animates between number values with a spring transition.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedNumberProps {
  value: number
  className?: string
  duration?: number
  formatFn?: (n: number) => string
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  className = '',
  duration = 1.5,
  formatFn = (n) => Math.round(n).toLocaleString(),
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
damping: 30,
stiffness: 100,
duration: duration * 1000,
  })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
if (isInView) {
  motionValue.set(value)
}
  }, [isInView, value, motionValue])

  useEffect(() => {
const unsubscribe = springValue.on('change', (latest) => {
  if (ref.current) {
    ref.current.textContent = formatFn(latest)
  }
})
return unsubscribe
  }, [springValue, formatFn])

  return (
<span ref={ref} className={cn('tabular-nums', className)}>
  0
</span>
  )
}

export default AnimatedNumber`,
usage: `import AnimatedNumber from "@/app/components/ui/animated-number"

export function Demo() {
  return (
<div className="text-5xl font-bold text-chalk">
  <AnimatedNumber value={1234} />
</div>
  )
}`,
props: [
  {
    name: "value",
    type: "number",
    default: "—",
    description: "The target number to animate to.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "duration",
    type: "number",
    default: "1.5",
    description: "Animation duration in seconds.",
  },
  {
    name: "formatFn",
    type: "(n: number) => string",
    default: "Math.round(n).toLocaleString()",
    description: "Custom format function for the displayed number.",
  },
],
playground: {
  controls: [
    { name: "value", label: "Target Value", type: "number", default: 1234, min: 0, max: 99999, step: 1 },
    { name: "duration", label: "Duration (s)", type: "number", default: 1.5, min: 0.5, max: 5, step: 0.5 },
  ],
},
component: () => import("@/app/components/ui/animated-number"),
demo: () => import("@/app/components/demos/animated-number-demo"),
};

export default entry;
