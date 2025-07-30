'use client'

import Alert from '@/app/components/ui/alert'

export default function AlertDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* All variants */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Variants
          </p>
          <div className="space-y-3">
            <Alert variant="info" title="Information">
              A new software update is available. See what&apos;s new in version 3.0.
            </Alert>
            <Alert variant="success" title="Success">
              Your changes have been saved successfully.
            </Alert>
            <Alert variant="warning" title="Warning">
              Your trial expires in 3 days. Upgrade now to keep your data.
            </Alert>
            <Alert variant="error" title="Error">
              Unable to connect to the server. Please check your internet connection.
            </Alert>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Dismissible */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Dismissible
          </p>
          <Alert variant="info" title="Heads up!" dismissible>
            This alert can be dismissed by clicking the close button on the right.
          </Alert>
        </div>

        <div className="h-px bg-border" />

        {/* Without title */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Without Title
          </p>
          <Alert variant="success">
            Operation completed — no further action is needed.
          </Alert>
        </div>
      </div>
    </div>
  )
}
