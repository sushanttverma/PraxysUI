import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "morphing-text",
title: "Morphing Text",
description:
  "Text that morphs between words using a blur crossfade effect, creating smooth character interpolation transitions.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

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
  <motion.span
    className="inline-block"
    animate={{
      opacity: morphing ? 0 : 1,
      filter: morphing ? 'blur(8px)' : 'blur(0px)',
    }}
    transition={{ duration: durationSec, ease: 'easeInOut' }}
  >
    {words[index]}
  </motion.span>
  <motion.span
    className="absolute inset-0 inline-block"
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

export default MorphingText`,
usage: `import MorphingText from "@/app/components/ui/morphing-text"

export function Demo() {
  return (
<h1 className="text-4xl font-bold text-chalk">
  We make it{" "}
  <MorphingText
    words={["simple", "beautiful", "powerful", "fast"]}
    className="text-ignite"
  />
</h1>
  )
}`,
props: [
  {
    name: "words",
    type: "string[]",
    default: "—",
    description: "Array of words to morph between.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "interval",
    type: "number",
    default: "3000",
    description: "Time between morphs in milliseconds.",
  },
  {
    name: "morphDuration",
    type: "number",
    default: "1500",
    description: "Duration of the morph transition in milliseconds.",
  },
],
playground: {
  controls: [
    { name: "interval", label: "Interval (ms)", type: "number", default: 3000, min: 1000, max: 8000, step: 250 },
    { name: "morphDuration", label: "Morph Duration (ms)", type: "number", default: 1500, min: 300, max: 3000, step: 100 },
  ],
  defaults: {
    words: ["simple", "beautiful", "powerful", "fast"],
  },
},
component: () => import("@/app/components/ui/morphing-text"),
demo: () => import("@/app/components/demos/morphing-text-demo"),
};

export default entry;
