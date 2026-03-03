'use client'

import { useState } from 'react'
import AlertDialog from '@/app/components/ui/alert-dialog'

export default function AlertDialogDemo() {
  const [defaultOpen, setDefaultOpen] = useState(false)
  const [destructiveOpen, setDestructiveOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 w-full max-w-lg mx-auto">
      <div className="flex gap-3">
        <button
          onClick={() => setDefaultOpen(true)}
          className="rounded-lg border border-border bg-obsidian px-5 py-2.5 text-sm font-medium text-chalk transition-colors hover:bg-ignite/10 hover:border-ignite"
        >
          Confirm Action
        </button>
        <button
          onClick={() => setDestructiveOpen(true)}
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
        >
          Delete Item
        </button>
      </div>

      <AlertDialog
        open={defaultOpen}
        onConfirm={() => setDefaultOpen(false)}
        onCancel={() => setDefaultOpen(false)}
        title="Are you sure?"
        description="This action will save your changes and update the record. You can modify it again later."
        confirmLabel="Save Changes"
        cancelLabel="Go Back"
      />

      <AlertDialog
        open={destructiveOpen}
        onConfirm={() => setDestructiveOpen(false)}
        onCancel={() => setDestructiveOpen(false)}
        title="Delete this item?"
        description="This action cannot be undone. The item and all associated data will be permanently removed."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
      />
    </div>
  )
}
