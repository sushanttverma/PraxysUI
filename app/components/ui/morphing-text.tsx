'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MorphingTextProps {
  words: string[]
  className?: string
  interval?: number
  morphDuration?: number
}

const MorphingText: React.FC<MorphingTextProps> = ({
  words,
  className = '',
  interval = 3000,
  morphDuration = 1500,
}) => {
  const [index, setIndex] = useState(0)
  const [morphing, setMorphing] = useState(false)

  const nextIndex = (index + 1) % words.length

  const startMorph = useCallback(() => {
    setMorphing(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(startMorph, interval)
    return () => clearInterval(timer)
  }, [startMorph, interval])

  useEffect(() => {
    if (!morphing) return

    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % words.length)
      setMorphing(false)
    }, morphDuration)

    return () => clearTimeout(timeout)
  }, [morphing, morphDuration, words.length])

  const durationSec = morphDuration / 1000

  return (
    <span className={cn('relative inline-flex text-center', className)}>
      {/* SVG filter for the blur morph effect */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="morphing-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
        </defs>
      </svg>

      {/* Text A — current word */}
      <motion.span
        className="inline-block"
        aria-hidden={morphing}
        animate={{
          opacity: morphing ? 0 : 1,
          filter: morphing ? 'blur(8px)' : 'blur(0px)',
        }}
        transition={{ duration: durationSec, ease: 'easeInOut' }}
      >
        {words[index]}
      </motion.span>

      {/* Text B — next word, stacked on top */}
      <motion.span
        className="absolute inset-0 inline-block"
        aria-hidden={!morphing}
        animate={{
          opacity: morphing ? 1 : 0,
          filter: morphing ? 'blur(0px)' : 'blur(8px)',
        }}
        transition={{ duration: durationSec, ease: 'easeInOut' }}
      >
        {words[nextIndex]}
      </motion.span>
    </span>
  )
}

export default MorphingText
