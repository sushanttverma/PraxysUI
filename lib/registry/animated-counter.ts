import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "animated-counter",
title: "Animated Counter",
description:
  "A number counter that animates from one value to another using spring physics, triggered when scrolled into view. Supports prefix, suffix, and decimal formatting.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(from)
  const springValue = useSpring(motionValue, {
damping: 40,
stiffness: 80,
duration: duration * 1000,
  })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
if (isInView) {
  motionValue.set(to)
}
  }, [isInView, to, motionValue])

  useEffect(() => {
const unsubscribe = springValue.on('change', (latest) => {
  if (ref.current) {
    const formatted = latest.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
    ref.current.textContent = \`\${prefix}\${formatted}\${suffix}\`
  }
})
return unsubscribe
  }, [springValue, prefix, suffix, decimals])

  const initial = from.toLocaleString(undefined, {
minimumFractionDigits: decimals,
maximumFractionDigits: decimals,
  })

  return (
<span
  ref={ref}
  className={cn(
    'text-4xl font-bold tabular-nums text-chalk',
    className
  )}
>
  {prefix}{initial}{suffix}
</span>
  )
}

export default AnimatedCounter`,
usage: `import AnimatedCounter from "@/app/components/ui/animated-counter"

export function Demo() {
  return (
<div className="flex gap-8">
  <AnimatedCounter to={1234} />
  <AnimatedCounter to={99.9} decimals={1} suffix="%" />
  <AnimatedCounter to={50000} prefix="$" />
</div>
  )
}`,
props: [
  {
    name: "from",
    type: "number",
    default: "0",
    description: "Starting value for the counter.",
  },
  {
    name: "to",
    type: "number",
    default: "—",
    description: "Target value to animate to.",
  },
  {
    name: "duration",
    type: "number",
    default: "2",
    description: "Animation duration in seconds.",
  },
  {
    name: "prefix",
    type: "string",
    default: "''",
    description: "Text to prepend to the number (e.g. '$').",
  },
  {
    name: "suffix",
    type: "string",
    default: "''",
    description: "Text to append to the number (e.g. '%').",
  },
  {
    name: "decimals",
    type: "number",
    default: "0",
    description: "Number of decimal places to display.",
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
    { name: "to", label: "Target Value", type: "number", default: 1234, min: 0, max: 100000, step: 1 },
    { name: "from", label: "From", type: "number", default: 0, min: 0, max: 100000, step: 1 },
    { name: "duration", label: "Duration (s)", type: "number", default: 2, min: 0.5, max: 10, step: 0.5 },
    { name: "prefix", label: "Prefix", type: "text", default: "" },
    { name: "suffix", label: "Suffix", type: "text", default: "" },
    { name: "decimals", label: "Decimals", type: "number", default: 0, min: 0, max: 4, step: 1 },
  ],
},
component: () => import("@/app/components/ui/animated-counter"),
demo: () => import("@/app/components/demos/animated-counter-demo"),
};

export default entry;
