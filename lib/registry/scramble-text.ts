import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "scramble-text",
title: "Scramble Text",
description:
  "A text decode/scramble effect that reveals text character by character with random characters in between.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

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

export default ScrambleText`,
usage: `import ScrambleText from "@/app/components/ui/scramble-text"

export function Demo() {
  return (
<h1 className="text-3xl font-bold text-chalk">
  <ScrambleText text="Hello World" />
</h1>
  )
}`,
props: [
  {
    name: "text",
    type: "string",
    default: "—",
    description: "The text to reveal with the scramble effect.",
  },
  {
    name: "speed",
    type: "number",
    default: "50",
    description: "Milliseconds per character reveal.",
  },
  {
    name: "characters",
    type: "string",
    default: "'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'",
    description: "Character set to use for the scramble effect.",
  },
  {
    name: "trigger",
    type: "boolean",
    default: "true",
    description: "When set to true, starts the scramble animation.",
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
    { name: "speed", label: "Speed (ms)", type: "number", default: 50, min: 10, max: 200, step: 10 },
    { name: "trigger", label: "Trigger", type: "boolean", default: true },
  ],
  defaults: {
    text: "Decode the future",
  },
},
component: () => import("@/app/components/ui/scramble-text"),
demo: () => import("@/app/components/demos/scramble-text-demo"),
};

export default entry;
