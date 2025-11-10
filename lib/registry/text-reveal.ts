import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "text-reveal",
title: "Text Reveal",
description:
  "A scroll-triggered word-by-word text reveal that fades each word up with a stagger as it enters the viewport.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  children: string
  className?: string
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
}) => {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' })
  const words = children.split(' ')

  return (
    <p ref={ref} className={cn('flex flex-wrap', className)}>
      {words.map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.2, 0.65, 0.3, 0.9],
              delay: i * 0.04,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  )
}

export default TextReveal`,
usage: `import TextReveal from "@/app/components/ui/text-reveal"

export function Demo() {
  return (
<TextReveal className="text-3xl font-bold text-chalk">
  Build stunning interfaces with Praxys UI
</TextReveal>
  )
}`,
props: [
  {
    name: "children",
    type: "string",
    default: "—",
    description: "The text content to reveal word by word.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
],
playground: {
  controls: [],
  defaults: {
    children: "Build stunning interfaces with Praxys UI",
  },
},
component: () => import("@/app/components/ui/text-reveal"),
demo: () => import("@/app/components/demos/text-reveal-demo"),
};

export default entry;
