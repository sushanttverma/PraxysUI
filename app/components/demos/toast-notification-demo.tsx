'use client'

import { ToastContainer, useToast } from '@/app/components/ui/toast-notification'

export default function ToastNotificationDemo() {
  const { toasts, addToast, dismissToast } = useToast()

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 py-8">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => addToast('This is a default notification')}
          className="rounded-lg border border-border bg-obsidian px-4 py-2 text-sm text-chalk transition-colors hover:border-border-light cursor-pointer"
        >
          Default
        </button>
        <button
          onClick={() => addToast('Action completed successfully!', 'success')}
          className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-400 transition-colors hover:bg-green-500/20 cursor-pointer"
        >
          Success
        </button>
        <button
          onClick={() => addToast('Something went wrong.', 'error')}
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/20 cursor-pointer"
        >
          Error
        </button>
        <button
          onClick={() => addToast('Please check your input.', 'warning')}
          className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400 transition-colors hover:bg-yellow-500/20 cursor-pointer"
        >
          Warning
        </button>
      </div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} position="top-right" />
    </div>
  )
}
