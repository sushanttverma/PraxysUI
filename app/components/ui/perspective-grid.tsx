'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PerspectiveGridProps {
  children: React.ReactNode[]
  className?: string
  columns?: number
  tiltAmount?: number
}

const PerspectiveGrid: React.FC<PerspectiveGridProps> = ({
  children,
  className = '',
  columns = 3,
  tiltAmount = 8,
}) => {
  return (
    <div
      className={cn('grid gap-4', className)}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(min(200px, 100%), 1fr))`,
        perspective: '1000px',
      }}
    >
      {React.Children.map(children, (child, i) => (
        <PerspectiveItem key={i} tiltAmount={tiltAmount} index={i}>
          {child}
        </PerspectiveItem>
      ))}
    </div>
  )
}

function PerspectiveItem({
  children,
  tiltAmount,
  index,
}: {
  children: React.ReactNode
  tiltAmount: number
  index: number
}) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        rotateX: hovered ? tiltAmount : 0,
        rotateY: hovered ? -tiltAmount : 0,
        scale: hovered ? 1.02 : 1,
      }}
      style={{ transformStyle: 'preserve-3d' }}
      className="cursor-pointer transition-shadow duration-300"
    >
      {children}
    </motion.div>
  )
}

export default PerspectiveGrid
