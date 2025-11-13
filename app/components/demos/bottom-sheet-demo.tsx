'use client'

import { useState } from 'react'
import BottomSheet from '@/app/components/ui/bottom-sheet'

export default function BottomSheetDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-lg mx-auto">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-ignite px-4 py-2 text-sm font-medium text-chalk transition-opacity hover:opacity-90 cursor-pointer"
      >
        Open Bottom Sheet
      </button>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        snapPoints={[0.4, 0.8]}
      >
        <h3 className="mb-2 text-lg font-semibold text-chalk">Bottom Sheet</h3>
        <p className="text-sm leading-relaxed text-blush">
          Drag the handle down to dismiss, or tap the backdrop. This sheet supports
          snap points at 40% and 80% of the viewport height.
        </p>
        <div className="mt-6 space-y-3">
          {['Option A', 'Option B', 'Option C'].map((label) => (
            <button
              key={label}
              type="button"
              className="w-full rounded-lg border border-border bg-void px-4 py-3 text-left text-sm text-chalk transition-colors hover:bg-ignite/5 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  )
}
