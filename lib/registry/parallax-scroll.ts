import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "parallax-scroll",
title: "Parallax Scroll",
description:
  "Scroll-driven parallax layers with configurable speed multipliers for creating depth effects.",
category: "visual",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxLayer {
  content: React.ReactNode
  speed?: number
}

interface ParallaxScrollProps {
  layers: ParallaxLayer[]
  className?: string
  height?: string
}

const ParallaxLayerItem: React.FC<{
  layer: ParallaxLayer
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}> = ({ layer, scrollYProgress }) => {
  const { content, speed = 0.5 } = layer
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100])

  return (
<motion.div className="absolute inset-0 flex items-center justify-center" style={{ y }}>
  {content}
</motion.div>
  )
}

const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  layers,
  className = '',
  height = '400px',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
target: ref,
offset: ['start end', 'end start'],
  })

  return (
<div
  ref={ref}
  className={cn('relative overflow-hidden rounded-xl border border-border bg-obsidian', className)}
  style={{ height }}
>
  {layers.map((layer, index) => (
    <ParallaxLayerItem key={index} layer={layer} scrollYProgress={scrollYProgress} />
  ))}
</div>
  )
}

export default ParallaxScroll`,
usage: `import ParallaxScroll from "@/app/components/ui/parallax-scroll"

export function Demo() {
  return (
<ParallaxScroll
  height="300px"
  layers={[
    { speed: 0.2, content: <div className="text-8xl text-ignite/10">BG</div> },
    { speed: 0.8, content: <p className="text-chalk">Scroll me</p> },
  ]}
/>
  )
}`,
props: [
  {
    name: "layers",
    type: "ParallaxLayer[]",
    default: "—",
    description: "Array of layers with content and speed multiplier.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "height",
    type: "string",
    default: "'400px'",
    description: "Height of the parallax container.",
  },
],
playground: {
  controls: [
    { name: "height", label: "Height", type: "text", default: "300px" },
  ],
  defaults: {
    layers: [
      { speed: 0.2, content: "Background Layer" },
      { speed: 0.5, content: "Middle Layer" },
      { speed: 0.8, content: "Foreground Layer" },
    ],
  },
},
component: () => import("@/app/components/ui/parallax-scroll"),
demo: () => import("@/app/components/demos/parallax-scroll-demo"),
};

export default entry;
