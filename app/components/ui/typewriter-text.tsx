'use client'

import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (text.length < currentString.length) {
        timeout = setTimeout(() => {
          setText(currentString.slice(0, text.length + 1))
        }, typingSpeed)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 0)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => {
        setPhase('deleting')
      }, pauseDuration)
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1))
        }, deletingSpeed)
      } else {
        timeout = setTimeout(() => {
          setStringIndex((prev) => (prev + 1) % strings.length)
          setPhase('typing')
        }, 0)
      }
    }

    return () => clearTimeout(timeout)
  }, [phase, text, currentString, typingSpeed, deletingSpeed, pauseDuration, strings.length])

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
