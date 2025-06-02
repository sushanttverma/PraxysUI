'use client'

import { useState } from 'react'
import ModalDialog from '@/app/components/ui/modal-dialog'

export default function ModalDialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-lg mx-auto">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-border bg-obsidian px-5 py-2.5 text-sm font-medium text-chalk transition-colors hover:bg-ignite/10 hover:border-ignite"
      >
        Open Modal
      </button>

      <ModalDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Welcome to Praxys"
        description="This is an animated modal dialog with backdrop blur and spring transitions."
      >
        <div className="space-y-4">
          <p className="text-blush">
            Modal dialogs are great for confirmations, forms, or any content that
            requires focused attention from the user.
          </p>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-void p-3">
            <div className="h-10 w-10 rounded-full bg-ignite/20 flex items-center justify-center text-ignite text-lg font-bold">
              P
            </div>
            <div>
              <p className="text-sm font-medium text-chalk">Praxys UI</p>
              <p className="text-xs text-text-faint">Animated React components</p>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-2 text-sm text-blush transition-colors hover:text-chalk"
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md bg-ignite px-4 py-2 text-sm font-medium text-chalk transition-colors hover:bg-ignite/90"
            >
              Continue
            </button>
          </div>
        </div>
      </ModalDialog>
    </div>
  )
}
