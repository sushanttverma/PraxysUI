'use client'

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
        ref.current.textContent = `${prefix}${formatted}${suffix}`
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

export default AnimatedCounter
