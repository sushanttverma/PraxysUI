'use client'

import GlowBorderCard from '@/app/components/ui/glow-border-card'

export default function GlowBorderCardDemo() {
  return (
    <div className="flex items-center justify-center py-8">
      <GlowBorderCard className="max-w-sm">
        <h3 className="text-lg font-semibold text-chalk">Glow Border Card</h3>
        <p className="mt-2 text-sm text-blush">
          Hover over this card to see the animated glow effect that follows your cursor.
        </p>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-ignite/10 px-3 py-1 text-xs text-ignite">
            Interactive
          </span>
          <span className="rounded-full bg-blush/10 px-3 py-1 text-xs text-blush">
            Animated
          </span>
        </div>
      </GlowBorderCard>
    </div>
  )
}
