'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SocialLink {
  icon: React.ReactNode
  href: string
  label: string
}

interface SocialFlipButtonProps {
  frontLabel?: string
  links: SocialLink[]
  className?: string
}

const SocialFlipButton: React.FC<SocialFlipButtonProps> = ({
  frontLabel = 'Follow',
  links,
  className = '',
}) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className="relative h-10" style={{ perspective: '600px' }}>
        <AnimatePresence mode="wait">
          {!flipped ? (
            <motion.button
              key="front"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex h-10 items-center gap-2 rounded-lg border border-border bg-obsidian px-5 text-sm font-medium text-chalk cursor-pointer"
              style={{ transformOrigin: 'center center' }}
            >
              {frontLabel}
            </motion.button>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex h-10 items-center gap-1 rounded-lg border border-ignite/30 bg-ignite/10 px-2"
              style={{ transformOrigin: 'center center' }}
            >
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-chalk transition-colors hover:bg-ignite/20 hover:text-ignite"
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SocialFlipButton
