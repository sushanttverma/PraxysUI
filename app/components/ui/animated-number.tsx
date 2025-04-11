'use client'

import React, { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
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

export default AnimatedNumber
