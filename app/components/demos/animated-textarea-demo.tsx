'use client'

import { useState } from 'react'
import AnimatedTextarea from '@/app/components/ui/animated-textarea'

export default function AnimatedTextareaDemo() {
  const [autoText, setAutoText] = useState('')
  const [counterText, setCounterText] = useState('')
  const [errorText, setErrorText] = useState('')

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Auto-resize */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Auto-Resize
          </p>
          <AnimatedTextarea
            label="Bio"
            placeholder="Tell us about yourself..."
            value={autoText}
            onChange={(e) => setAutoText(e.target.value)}
            autoResize
          />
        </div>

        <div className="h-px bg-border" />

        {/* Character counter */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Character Counter
          </p>
          <AnimatedTextarea
            label="Feedback"
            placeholder="Share your feedback (max 200 chars)"
            value={counterText}
            onChange={(e) => setCounterText(e.target.value)}
            maxLength={200}
            rows={3}
          />
        </div>

        <div className="h-px bg-border" />

        {/* Error state */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Error State
          </p>
          <AnimatedTextarea
            label="Description"
            placeholder="Required field"
            value={errorText}
            onChange={(e) => setErrorText(e.target.value)}
            error={errorText.length === 0 ? 'This field is required' : undefined}
            rows={3}
          />
        </div>

        <div className="h-px bg-border" />

        {/* Disabled */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Disabled
          </p>
          <AnimatedTextarea
            label="Notes"
            value="This textarea is disabled and cannot be edited."
            disabled
            onChange={() => {}}
            rows={2}
          />
        </div>
      </div>
    </div>
  )
}
