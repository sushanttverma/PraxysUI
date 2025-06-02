'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface InfiniteScrollProps {
  loadMore: () => void | Promise<void>
  hasMore: boolean
  loader?: React.ReactNode
  threshold?: number
  children: React.ReactNode
  className?: string
}

const DefaultLoader: React.FC = () => (
  <div className="flex items-center justify-center gap-2 py-6">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="h-2 w-2 rounded-full bg-ignite"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.15,
        }}
      />
    ))}
  </div>
)

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  hasMore,
  loader,
  threshold = 200,
  children,
  className,
}) => {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const loadMoreRef = useRef(loadMore)
  loadMoreRef.current = loadMore

  const triggerLoad = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      await loadMoreRef.current()
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          triggerLoad()
        }
      },
      { rootMargin: `0px 0px ${threshold}px 0px` }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, threshold, triggerLoad])

  return (
    <div className={cn('w-full', className)}>
      {children}

      {hasMore && (
        <div ref={sentinelRef}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {loader ?? <DefaultLoader />}
          </motion.div>
        </div>
      )}

      {!hasMore && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-4 text-center text-sm text-text-faint"
        >
          No more items
        </motion.p>
      )}
    </div>
  )
}

export default InfiniteScroll
