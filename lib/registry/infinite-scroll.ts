import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "infinite-scroll",
title: "Infinite Scroll",
description:
  "An Intersection Observer-based infinite scroll container with loading state, configurable threshold, and animated default loader.",
category: "navigation",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

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
if (isLoading || !loadMoreRef.current) return
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
  { rootMargin: \`0px 0px \${threshold}px 0px\` }
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

export default InfiniteScroll`,
usage: `import InfiniteScroll from "@/app/components/ui/infinite-scroll"

export function Demo() {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i))
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async () => {
await new Promise((r) => setTimeout(r, 1000))
setItems((prev) => {
  const next = [...prev, ...Array.from({ length: 5 }, (_, i) => prev.length + i)]
  if (next.length >= 40) setHasMore(false)
  return next
})
  }

  return (
<InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
  {items.map((i) => (
    <div key={i} className="border-b border-border p-3">Item {i + 1}</div>
  ))}
</InfiniteScroll>
  )
}`,
props: [
  {
    name: "loadMore",
    type: "() => void | Promise<void>",
    default: "—",
    description: "Callback to load more items when the sentinel enters view.",
  },
  {
    name: "hasMore",
    type: "boolean",
    default: "—",
    description: "Whether more items are available to load.",
  },
  {
    name: "loader",
    type: "React.ReactNode",
    default: "DefaultLoader",
    description: "Custom loading indicator.",
  },
  {
    name: "threshold",
    type: "number",
    default: "200",
    description: "Root margin (in px) for triggering the load before reaching the sentinel.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "—",
    description: "The scrollable content.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
],
playground: {
  controls: [
    { name: "threshold", label: "Threshold (px)", type: "number", default: 200, min: 0, max: 600, step: 50 },
    { name: "hasMore", label: "Has More", type: "boolean", default: true },
  ],
},
component: () => import("@/app/components/ui/infinite-scroll"),
demo: () => import("@/app/components/demos/infinite-scroll-demo"),
};

export default entry;
