'use client'

import PerspectiveGrid from '@/app/components/ui/perspective-grid'

export default function PerspectiveGridDemo() {
  return (
    <div className="py-8">
      <PerspectiveGrid columns={3} tiltAmount={8}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex h-32 items-center justify-center rounded-xl border border-border bg-obsidian text-sm font-medium text-blush shadow-lg"
          >
            Card {i + 1}
          </div>
        ))}
      </PerspectiveGrid>
    </div>
  )
}
