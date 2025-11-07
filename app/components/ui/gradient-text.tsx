'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: string
  colors?: string[]
  speed?: number
  className?: string
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors = ['#E84E2D', '#C9958A', '#8B5CF6'],
  speed = 3,
  className = '',
}) => {
  const gradient = colors.join(', ')

  return (
    <motion.span
      className={cn('inline-block bg-clip-text text-transparent', className)}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradient}, ${colors[0]})`,
        backgroundSize: '200% 100%',
      }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{
        duration: speed,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      {children}
    </motion.span>
  )
}

export default GradientText
