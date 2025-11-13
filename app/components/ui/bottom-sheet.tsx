'use client'

import React, { useCallback } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  snapPoints?: number[]
  className?: string
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  children,
  snapPoints = [0.5, 1],
  className,
}) => {
  const y = useMotionValue(0)
  const backdropOpacity = useTransform(y, [0, 300], [1, 0])

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const velocity = info.velocity.y
      const offset = info.offset.y

      if (velocity > 500 || offset > 150) {
        onClose()
        return
      }

      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800
      const sortedSnaps = [...snapPoints].sort((a, b) => a - b)
      const currentFraction = 1 - offset / windowHeight

      let closestSnap = sortedSnaps[0]
      let minDist = Math.abs(currentFraction - sortedSnaps[0])

      for (const snap of sortedSnaps) {
        const dist = Math.abs(currentFraction - snap)
        if (dist < minDist) {
          minDist = dist
          closestSnap = snap
        }
      }

      y.set(windowHeight * (1 - closestSnap) - windowHeight * (1 - sortedSnaps[sortedSnaps.length - 1]))
    },
    [onClose, snapPoints, y]
  )

  const maxSnap = Math.max(...snapPoints)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-void/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ opacity: backdropOpacity }}
            onClick={onClose}
          />

          <motion.div
            className={cn(
              'absolute bottom-0 left-0 right-0 rounded-t-2xl border-t border-border bg-obsidian shadow-2xl',
              className
            )}
            initial={{ y: '100%' }}
            animate={{ y: `${(1 - maxSnap) * 100}%` }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring' as const, damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ y, height: `${maxSnap * 100}%` }}
          >
            <div className="flex justify-center pb-2 pt-3">
              <div className="h-1.5 w-10 rounded-full bg-border" />
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-8">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default BottomSheet
