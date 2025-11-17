'use client'

import ContextMenu from '@/app/components/ui/context-menu'

export default function ContextMenuDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-lg mx-auto">
      <ContextMenu
        items={[
          { label: 'Cut', onClick: () => {} },
          { label: 'Copy', onClick: () => {} },
          { label: 'Paste', onClick: () => {} },
          { label: '', divider: true },
          { label: 'Select All', onClick: () => {} },
          { label: '', divider: true },
          { label: 'Delete', disabled: true },
        ]}
      >
        <div className="flex h-48 w-full items-center justify-center rounded-xl border border-dashed border-border bg-void text-sm text-text-faint">
          Right-click in this area
        </div>
      </ContextMenu>
    </div>
  )
}
