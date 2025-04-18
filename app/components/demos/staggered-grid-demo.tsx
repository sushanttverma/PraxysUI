'use client'

import StaggeredGrid from '@/app/components/ui/staggered-grid'

export default function StaggeredGridDemo() {
  return (
    <div className="py-8">
      <StaggeredGrid columns={3} staggerDelay={0.1}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex h-28 items-center justify-center rounded-xl border border-border bg-obsidian text-sm font-medium text-blush"
          >
            Item {i + 1}
          </div>
        ))}
      </StaggeredGrid>
    </div>
  )
}
