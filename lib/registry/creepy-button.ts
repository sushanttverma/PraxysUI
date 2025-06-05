import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "creepy-button",
title: "Creepy Button",
description:
  "A horror-inspired button with flickering background, dripping accent line, and staggered glitchy text animation on hover.",
category: "buttons",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CreepyButtonProps {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

const CreepyButton: React.FC<CreepyButtonProps> = ({
  children = 'Enter',
  className = '',
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const letters = typeof children === 'string' ? children.split('') : []

  return (
<motion.button
  onHoverStart={() => setIsHovered(true)}
  onHoverEnd={() => setIsHovered(false)}
  onClick={onClick}
  whileTap={{ scale: 0.97 }}
  className={cn(
    'group relative px-8 py-3 rounded-lg cursor-pointer overflow-hidden',
    'bg-void border border-ignite/20',
    'transition-shadow duration-500',
    isHovered && 'shadow-[0_0_30px_-5px_rgba(232,78,45,0.4)]',
    className
  )}
>
  {/* Flickering background */}
  <motion.div
    className="absolute inset-0 bg-ignite/5"
    animate={
      isHovered
        ? { opacity: [0, 0.15, 0, 0.1, 0, 0.2, 0] }
        : { opacity: 0 }
    }
    transition={
      isHovered
        ? { duration: 0.8, repeat: Infinity, ease: 'linear' }
        : {}
    }
  />

  {/* Drip line from top */}
  <motion.div
    className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-ignite to-transparent"
    initial={{ height: 0, opacity: 0 }}
    animate={
      isHovered
        ? { height: '100%', opacity: [0, 1, 0.5] }
        : { height: 0, opacity: 0 }
    }
    transition={{ duration: 1.2, ease: 'easeIn' }}
  />

  {/* Text with creepy stagger */}
  <span className="relative z-10 flex items-center justify-center font-medium tracking-wider">
    {letters.length > 0
      ? letters.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block text-chalk"
            animate={
              isHovered
                ? {
                    y: [0, -2, 1, -1, 0],
                    opacity: [1, 0.4, 1, 0.6, 1],
                    color: [
                      'var(--color-chalk)',
                      'var(--color-ignite)',
                      'var(--color-chalk)',
                    ],
                  }
                : { y: 0, opacity: 1 }
            }
            transition={
              isHovered
                ? {
                    duration: 0.6,
                    delay: i * 0.05,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }
                : {}
            }
          >
            {char === ' ' ? '\\u00A0' : char}
          </motion.span>
        ))
      : children}
  </span>

  {/* Corner accents */}
  <motion.span
    className="absolute top-0 left-0 h-2 w-2 border-t border-l border-ignite/50"
    animate={isHovered ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
    transition={isHovered ? { duration: 1.5, repeat: Infinity } : {}}
  />
  <motion.span
    className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-ignite/50"
    animate={isHovered ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
    transition={
      isHovered ? { duration: 1.5, repeat: Infinity, delay: 0.5 } : {}
    }
  />
</motion.button>
  )
}

export default CreepyButton`,
usage: `import CreepyButton from "@/app/components/ui/creepy-button"

export function Demo() {
  return (
<CreepyButton onClick={() => console.log('clicked')}>
  Enter
</CreepyButton>
  )
}`,
props: [
  {
    name: "children",
    type: "React.ReactNode",
    default: "'Enter'",
    description: "The content displayed inside the button.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes to apply.",
  },
  {
    name: "onClick",
    type: "() => void",
    default: "—",
    description: "Click handler function.",
  },
],
playground: {
  controls: [
    { name: "children", label: "Label", type: "text", default: "Enter" },
  ],
},
component: () => import("@/app/components/ui/creepy-button"),
demo: () => import("@/app/components/demos/creepy-button-demo"),
};

export default entry;
