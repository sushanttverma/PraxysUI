'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface ScrambleTextProps {
  text: string
  speed?: number
  characters?: string
  trigger?: boolean
  className?: string
}

const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  speed = 50,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
  trigger = true,
  className = '',
}) => {
  const [display, setDisplay] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)

  const scramble = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    let revealedCount = 0

    const interval = setInterval(() => {
      revealedCount++
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < revealedCount) return text[i]
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join('')
      )

      if (revealedCount >= text.length) {
        clearInterval(interval)
        setDisplay(text)
        setIsAnimating(false)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, characters, isAnimating])

  useEffect(() => {
    if (trigger) {
      const cleanup = scramble()
      return cleanup
    } else {
      setDisplay(text)
    }
  }, [trigger, text]) // eslint-disable-line react-hooks/exhaustive-deps

  return <span className={cn('inline', className)}>{display}</span>
}

export default ScrambleText
