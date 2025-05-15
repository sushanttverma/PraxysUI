'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BookPage {
  title: string
  content: React.ReactNode
}

interface InteractiveBookProps {
  pages: BookPage[]
  className?: string
  width?: number
  height?: number
}

const InteractiveBook: React.FC<InteractiveBookProps> = ({
  pages,
  className = '',
  width = 320,
  height = 420,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(1)

  const goNext = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1)
      setCurrentPage((p) => p + 1)
    }
  }

  const goPrev = () => {
    if (currentPage > 0) {
      setDirection(-1)
      setCurrentPage((p) => p - 1)
    }
  }

  const page = pages[currentPage]

  const variants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 45 : -45,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -45 : 45,
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* Book */}
      <div
        className="relative overflow-hidden rounded-xl border border-border bg-obsidian shadow-xl w-full"
        style={{
          maxWidth: width,
          aspectRatio: `${width}/${height}`,
          perspective: '1200px',
        }}
      >
        {/* Spine accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-ignite/30 via-ignite/10 to-ignite/30" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            className="absolute inset-0 flex flex-col p-8 pl-10"
            style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
          >
            {/* Page number */}
            <span className="mb-2 font-pixel text-xs text-ignite/40">
              {currentPage + 1} / {pages.length}
            </span>

            {/* Title */}
            <h3 className="font-pixel text-lg font-bold text-chalk leading-snug">
              {page.title}
            </h3>

            {/* Content */}
            <div className="mt-4 flex-1 overflow-auto text-sm leading-relaxed text-blush">
              {page.content}
            </div>

            {/* Page corner fold */}
            <div className="absolute bottom-0 right-0 h-6 w-6">
              <div className="absolute bottom-0 right-0 h-0 w-0 border-b-[24px] border-r-[24px] border-b-border/20 border-r-obsidian" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-blush transition-colors hover:text-chalk disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          ← Prev
        </button>
        <div className="flex gap-1">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentPage ? 1 : -1)
                setCurrentPage(i)
              }}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                i === currentPage
                  ? 'w-4 bg-ignite'
                  : 'w-1.5 bg-border hover:bg-blush/50'
              )}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          disabled={currentPage === pages.length - 1}
          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-blush transition-colors hover:text-chalk disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default InteractiveBook
