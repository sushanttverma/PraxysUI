'use client'

import { useState, useCallback } from 'react'
import InfiniteScroll from '@/app/components/ui/infinite-scroll'

function generateItems(start: number, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: `Item ${start + i + 1}`,
  }))
}

export default function InfiniteScrollDemo() {
  const [items, setItems] = useState(() => generateItems(0, 10))
  const [hasMore, setHasMore] = useState(true)

  const loadMore = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setItems((prev) => {
      const next = [...prev, ...generateItems(prev.length, 5)]
      if (next.length >= 40) setHasMore(false)
      return next
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full rounded-xl border border-border bg-obsidian overflow-hidden">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-sm font-medium text-chalk">Feed</h3>
          <p className="text-xs text-text-faint">{items.length} items loaded</p>
        </div>

        <div className="max-h-80 overflow-y-auto">
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ignite/10 text-xs font-bold text-ignite">
                  {item.id + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-chalk">{item.title}</p>
                  <p className="text-xs text-text-faint">
                    Scroll down to load more items
                  </p>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  )
}
