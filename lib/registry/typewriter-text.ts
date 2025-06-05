import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "typewriter-text",
title: "Typewriter Text",
description:
  "An animated typing effect that cycles through strings, typing and deleting characters with a blinking cursor.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

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

export default TypewriterText`,
usage: `import TypewriterText from "@/app/components/ui/typewriter-text"

export function Demo() {
  return (
<div className="text-2xl font-bold text-chalk">
  I build{" "}
  <TypewriterText
    strings={["websites", "components", "experiences"]}
    className="text-ignite"
  />
</div>
  )
}`,
props: [
  {
    name: "strings",
    type: "string[]",
    default: "—",
    description: "Array of strings to cycle through.",
  },
  {
    name: "typingSpeed",
    type: "number",
    default: "80",
    description: "Milliseconds per character when typing.",
  },
  {
    name: "deletingSpeed",
    type: "number",
    default: "50",
    description: "Milliseconds per character when deleting.",
  },
  {
    name: "pauseDuration",
    type: "number",
    default: "1500",
    description: "Pause duration in ms after finishing a string.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "cursorColor",
    type: "string",
    default: "'var(--color-ignite)'",
    description: "Color of the blinking cursor.",
  },
],
playground: {
  controls: [
    { name: "typingSpeed", label: "Typing Speed (ms)", type: "number", default: 80, min: 20, max: 200, step: 10 },
    { name: "deletingSpeed", label: "Deleting Speed (ms)", type: "number", default: 50, min: 10, max: 150, step: 10 },
    { name: "pauseDuration", label: "Pause (ms)", type: "number", default: 1500, min: 500, max: 5000, step: 250 },
    { name: "cursorColor", label: "Cursor Color", type: "color", default: "#E84E2D" },
  ],
  defaults: {
    strings: ["websites", "components", "experiences", "interfaces"],
  },
},
component: () => import("@/app/components/ui/typewriter-text"),
demo: () => import("@/app/components/demos/typewriter-text-demo"),
};

export default entry;
