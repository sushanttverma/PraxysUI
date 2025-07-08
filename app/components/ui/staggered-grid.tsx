'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StaggeredGridProps {
  children: React.ReactNode[]
  className?: string
  columns?: number
  staggerDelay?: number
}

const StaggeredGrid: React.FC<StaggeredGridProps> = ({
  children,
  className = '',
  columns = 3,
  staggerDelay = 0.08,
}) => {
  return (
    <div
      className={cn('grid gap-4', className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.5,
            delay: i * staggerDelay,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

export default StaggeredGrid
