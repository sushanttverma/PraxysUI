'use client'

import { useState } from 'react'
import Sheet from '@/app/components/ui/sheet'

type SheetSide = 'left' | 'right' | 'top' | 'bottom'

export default function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [side, setSide] = useState<SheetSide>('right')

  const openSheet = (s: SheetSide) => {
    setSide(s)
    setOpen(true)
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Open From Each Side
          </p>
          <div className="grid grid-cols-2 gap-3">
            {(['left', 'right', 'top', 'bottom'] as const).map((s) => (
              <button
                key={s}
                onClick={() => openSheet(s)}
                className="rounded-lg border border-border bg-obsidian px-4 py-2.5 text-sm font-medium text-chalk transition-colors hover:border-ignite/40 hover:bg-ignite/5 hover:text-ignite capitalize"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-border" />

        <p className="text-xs text-text-faint text-center">
          Click a button above to open a sheet from that side. Press <kbd className="px-1.5 py-0.5 rounded bg-void text-chalk text-[11px] font-mono">Esc</kbd> or click the backdrop to close.
        </p>
      </div>

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        side={side}
        title={`Sheet from ${side}`}
      >
        <div className="space-y-4">
          <p className="text-sm text-chalk">
            This sheet slides in from the <span className="text-ignite font-semibold">{side}</span> side.
          </p>
          <p className="text-sm text-text-faint leading-relaxed">
            Sheets are great for navigation menus, filters, settings panels, or any content that should overlay the main page without fully replacing it.
          </p>
          <div className="rounded-lg border border-border bg-void/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-text-faint mb-2">
              Placeholder Content
            </p>
            <p className="text-sm text-text-faint">
              You can put any content here — forms, lists, navigation links, or detailed information panels.
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-full rounded-lg bg-ignite/10 border border-ignite/30 px-4 py-2.5 text-sm font-medium text-ignite transition-colors hover:bg-ignite/20"
          >
            Close Sheet
          </button>
        </div>
      </Sheet>
    </div>
  )
}
