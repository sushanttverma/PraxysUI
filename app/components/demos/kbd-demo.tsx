'use client'

import Kbd from '@/app/components/ui/kbd'

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Single keys */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Single keys
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Space</Kbd>
            <Kbd>Shift</Kbd>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Keyboard shortcuts */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Shortcuts
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blush">Copy</span>
              <div className="flex items-center gap-1">
                <Kbd>Ctrl</Kbd>
                <span className="text-xs text-text-faint">+</span>
                <Kbd>C</Kbd>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blush">Paste</span>
              <div className="flex items-center gap-1">
                <Kbd>Ctrl</Kbd>
                <span className="text-xs text-text-faint">+</span>
                <Kbd>V</Kbd>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blush">Search</span>
              <div className="flex items-center gap-1">
                <Kbd>Ctrl</Kbd>
                <span className="text-xs text-text-faint">+</span>
                <Kbd>K</Kbd>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blush">Save</span>
              <div className="flex items-center gap-1">
                <Kbd>Ctrl</Kbd>
                <span className="text-xs text-text-faint">+</span>
                <Kbd>S</Kbd>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Inline usage */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Inline usage
          </p>
          <p className="text-sm text-blush">
            Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open the command menu,
            or <Kbd>Esc</Kbd> to close it.
          </p>
        </div>
      </div>
    </div>
  )
}
