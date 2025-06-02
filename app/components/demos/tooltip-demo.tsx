'use client'

import Tooltip from '@/app/components/ui/tooltip'

export default function TooltipDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-16 w-full max-w-lg mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <Tooltip content="Tooltip on top" position="top">
          <button className="rounded-lg border border-border bg-obsidian px-4 py-2 text-sm font-medium text-chalk transition-colors hover:bg-ignite/10 hover:border-ignite">
            Top
          </button>
        </Tooltip>

        <Tooltip content="Tooltip on bottom" position="bottom">
          <button className="rounded-lg border border-border bg-obsidian px-4 py-2 text-sm font-medium text-chalk transition-colors hover:bg-ignite/10 hover:border-ignite">
            Bottom
          </button>
        </Tooltip>

        <Tooltip content="Tooltip on left" position="left">
          <button className="rounded-lg border border-border bg-obsidian px-4 py-2 text-sm font-medium text-chalk transition-colors hover:bg-ignite/10 hover:border-ignite">
            Left
          </button>
        </Tooltip>

        <Tooltip content="Tooltip on right" position="right">
          <button className="rounded-lg border border-border bg-obsidian px-4 py-2 text-sm font-medium text-chalk transition-colors hover:bg-ignite/10 hover:border-ignite">
            Right
          </button>
        </Tooltip>
      </div>
    </div>
  )
}
