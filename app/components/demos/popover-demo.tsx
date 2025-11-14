'use client'

import Popover from '@/app/components/ui/popover'

export default function PopoverDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-16 w-full max-w-lg mx-auto gap-6">
      <Popover
        trigger={
          <button
            type="button"
            className="rounded-lg bg-ignite px-4 py-2 text-sm font-medium text-chalk transition-opacity hover:opacity-90"
          >
            Click me
          </button>
        }
        side="bottom"
        align="center"
      >
        <div className="w-56">
          <h4 className="mb-1 text-sm font-semibold text-chalk">Popover Title</h4>
          <p className="text-xs leading-relaxed text-blush">
            This is a floating popover with an arrow indicator. Click outside to close.
          </p>
        </div>
      </Popover>
    </div>
  )
}
