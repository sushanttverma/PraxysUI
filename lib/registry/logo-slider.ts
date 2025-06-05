import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "logo-slider",
title: "Logo Slider",
description:
  "An infinite-scrolling marquee of logos or brand icons with fade edges, pause-on-hover, configurable speed, and bidirectional support.",
category: "media",
dependencies: ["clsx", "tailwind-merge"],
code: `'use client'

import React, { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface LogoSliderProps {
  logos: React.ReactNode[]
  speed?: number
  pauseOnHover?: boolean
  direction?: 'left' | 'right'
  gap?: number
  className?: string
}

const LogoSlider: React.FC<LogoSliderProps> = ({
  logos,
  speed = 30,
  pauseOnHover = true,
  direction = 'left',
  gap = 48,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)

  useEffect(() => {
if (scrollRef.current) {
  const firstSet = scrollRef.current.querySelector('[data-logo-set="0"]')
  if (firstSet) {
    setContentWidth(firstSet.scrollWidth)
  }
}
  }, [logos, gap])

  const duration = contentWidth > 0 ? contentWidth / speed : 20

  return (
<div
  ref={containerRef}
  className={cn(
    'group relative w-full overflow-hidden',
    className
  )}
>
  {/* Fade edges */}
  <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-void to-transparent" />
  <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-void to-transparent" />

  <div
    ref={scrollRef}
    className="flex w-max"
    style={{
      animationName: 'logo-slide',
      animationDuration: \\\`\\\${duration}s\\\`,
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationDirection: direction === 'right' ? 'reverse' : 'normal',
      animationPlayState: 'running',
      gap: \\\`\\\${gap}px\\\`,
    }}
    onMouseEnter={(e) => {
      if (pauseOnHover) {
        ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
      }
    }}
    onMouseLeave={(e) => {
      if (pauseOnHover) {
        ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
      }
    }}
  >
    {/* First set */}
    <div
      data-logo-set="0"
      className="flex shrink-0 items-center"
      style={{ gap: \\\`\\\${gap}px\\\` }}
    >
      {logos.map((logo, i) => (
        <div
          key={i}
          className="flex shrink-0 items-center justify-center px-2 opacity-50 transition-opacity duration-300 hover:opacity-100"
        >
          {logo}
        </div>
      ))}
    </div>

    {/* Duplicate for seamless loop */}
    <div
      data-logo-set="1"
      className="flex shrink-0 items-center"
      style={{ gap: \\\`\\\${gap}px\\\` }}
    >
      {logos.map((logo, i) => (
        <div
          key={i}
          className="flex shrink-0 items-center justify-center px-2 opacity-50 transition-opacity duration-300 hover:opacity-100"
        >
          {logo}
        </div>
      ))}
    </div>
  </div>

  <style jsx>{\\\`
    @keyframes logo-slide {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
  \\\`}</style>
</div>
  )
}

export default LogoSlider`,
usage: `import LogoSlider from '@/components/ui/logo-slider'

const logos = [
  <span className="text-lg font-bold">Vercel</span>,
  <span className="text-lg font-bold">Next.js</span>,
  <span className="text-lg font-bold">React</span>,
  <span className="text-lg font-bold">Tailwind</span>,
]

<LogoSlider logos={logos} speed={35} pauseOnHover />`,
props: [
  {
    name: "logos",
    type: "ReactNode[]",
    default: "—",
    description: "Array of React nodes (text, images, SVGs) to display in the slider.",
  },
  {
    name: "speed",
    type: "number",
    default: "30",
    description: "Scroll speed in pixels per second.",
  },
  {
    name: "pauseOnHover",
    type: "boolean",
    default: "true",
    description: "Whether the slider pauses when hovered.",
  },
  {
    name: "direction",
    type: "'left' | 'right'",
    default: "'left'",
    description: "Scroll direction of the marquee.",
  },
  {
    name: "gap",
    type: "number",
    default: "48",
    description: "Gap between logos in pixels.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes for the outer container.",
  },
],
playground: {
  controls: [
    { name: "speed", label: "Speed (px/s)", type: "number", default: 30, min: 10, max: 100, step: 5 },
    { name: "pauseOnHover", label: "Pause on Hover", type: "boolean", default: true },
    { name: "direction", label: "Direction", type: "select", default: "left", options: ["left", "right"] },
    { name: "gap", label: "Gap (px)", type: "number", default: 48, min: 16, max: 96, step: 8 },
  ],
  defaults: {
    logos: ["Vercel", "Next.js", "React", "Tailwind", "TypeScript", "Prisma"],
  },
},
component: () => import("@/app/components/ui/logo-slider"),
demo: () => import("@/app/components/demos/logo-slider-demo"),
};

export default entry;
