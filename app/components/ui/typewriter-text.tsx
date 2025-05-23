'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TypewriterTextProps {
  strings: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
  cursorColor?: string
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  strings,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 1500,
  className = '',
  cursorColor = 'var(--color-ignite)',
}) => {
  const [stringIndex, setStringIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  const currentString = strings[stringIndex]

  const handleTyping = useCallback(() => {
    if (phase === 'typing') {
      if (text.length < currentString.length) {
        const timeout = setTimeout(() => {
          setText(currentString.slice(0, text.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        setPhase('pausing')
      }
    }

    if (phase === 'pausing') {
      const timeout = setTimeout(() => {
        setPhase('deleting')
      }, pauseDuration)
      return () => clearTimeout(timeout)
    }

    if (phase === 'deleting') {
      if (text.length > 0) {
        const timeout = setTimeout(() => {
          setText(text.slice(0, -1))
        }, deletingSpeed)
        return () => clearTimeout(timeout)
      } else {
        setStringIndex((prev) => (prev + 1) % strings.length)
        setPhase('typing')
      }
    }
  }, [phase, text, currentString, typingSpeed, deletingSpeed, pauseDuration, strings.length])

  useEffect(() => {
    const cleanup = handleTyping()
    return cleanup
  }, [handleTyping])

  return (
    <span className={cn('inline', className)}>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.53,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{ color: cursorColor }}
        className="inline"
      >
        |
      </motion.span>
    </span>
  )
}

export default TypewriterText
