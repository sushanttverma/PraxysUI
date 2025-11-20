import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "confetti",
title: "Confetti",
description:
  "Confetti celebration burst effect with physics-based falling particles triggered on demand.",
category: "visual",
isNew: true,
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ConfettiProps {
  trigger?: boolean
  count?: number
  colors?: string[]
  duration?: number
  className?: string
}

interface Particle {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  scale: number
}

const Confetti: React.FC<ConfettiProps> = ({
  trigger = false,
  count = 50,
  colors = ['#E84E2D', '#C9958A', '#F2ECE2', '#FFD700', '#7B61FF'],
  duration = 2,
  className = '',
}) => {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (!trigger) {
      setParticles([])
      return
    }

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 20,
      color: colors[i % colors.length],
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.8,
    }))

    setParticles(newParticles)
  }, [trigger, count, colors])

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 z-50 overflow-hidden',
        className
      )}
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{
              left: \\\`\\\${p.x}%\\\`,
              top: \\\`\\\${p.y}%\\\`,
              width: 10 * p.scale,
              height: 10 * p.scale,
              backgroundColor: p.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            }}
            initial={{
              opacity: 1,
              y: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              y: [0, window?.innerHeight ?? 800],
              x: [0, (Math.random() - 0.5) * 200],
              rotate: [0, p.rotation + 360 * (Math.random() > 0.5 ? 1 : -1)],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: duration + Math.random() * 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Confetti`,
usage: `import Confetti from "@/app/components/ui/confetti"
import { useState } from "react"

export function Demo() {
  const [trigger, setTrigger] = useState(false)

  return (
    <>
      <Confetti trigger={trigger} count={50} />
      <button onClick={() => { setTrigger(false); setTimeout(() => setTrigger(true), 50) }}>
        Celebrate!
      </button>
    </>
  )
}`,
props: [
  {
    name: "trigger",
    type: "boolean",
    default: "false",
    description: "When true, launches the confetti burst.",
  },
  {
    name: "count",
    type: "number",
    default: "50",
    description: "Number of confetti particles.",
  },
  {
    name: "colors",
    type: "string[]",
    default: "['#E84E2D', '#C9958A', '#F2ECE2', '#FFD700', '#7B61FF']",
    description: "Array of particle colors.",
  },
  {
    name: "duration",
    type: "number",
    default: "2",
    description: "Fall animation duration in seconds.",
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
    { name: "count", label: "Count", type: "number", default: 50, min: 10, max: 150, step: 10 },
    { name: "duration", label: "Duration (s)", type: "number", default: 2, min: 1, max: 5, step: 0.5 },
  ],
},
component: () => import("@/app/components/ui/confetti"),
demo: () => import("@/app/components/demos/confetti-demo"),
};

export default entry;
