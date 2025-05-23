'use client'

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
      className={cn(
        'relative overflow-hidden rounded-xl border border-border bg-obsidian',
        className
      )}
      style={{ height }}
    >
      {layers.map((layer, index) => (
        <ParallaxLayerItem
          key={index}
          layer={layer}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  )
}

export default ParallaxScroll
