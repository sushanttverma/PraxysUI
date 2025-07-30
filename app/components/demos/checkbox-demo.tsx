'use client'

import { useState } from 'react'
import Checkbox from '@/app/components/ui/checkbox'

export default function CheckboxDemo() {
  const [terms, setTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [marketing, setMarketing] = useState(false)
  const [errorChecked, setErrorChecked] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Standard checkboxes */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Preferences
          </p>
          <div className="space-y-3">
            <Checkbox
              label="I agree to the Terms and Conditions"
              checked={terms}
              onChange={setTerms}
            />
            <Checkbox
              label="Subscribe to newsletter"
              checked={newsletter}
              onChange={setNewsletter}
            />
            <Checkbox
              label="Receive marketing emails"
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Current state */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Current State
          </p>
          <div className="space-y-1 text-sm text-text-faint">
            <p>Terms: <span className={terms ? 'text-green-400' : 'text-red-400'}>{terms ? 'Accepted' : 'Not accepted'}</span></p>
            <p>Newsletter: <span className={newsletter ? 'text-green-400' : 'text-red-400'}>{newsletter ? 'Subscribed' : 'Unsubscribed'}</span></p>
            <p>Marketing: <span className={marketing ? 'text-green-400' : 'text-red-400'}>{marketing ? 'Opted in' : 'Opted out'}</span></p>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Error state */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Error State
          </p>
          <Checkbox
            label="You must accept to continue"
            checked={errorChecked}
            onChange={setErrorChecked}
            error={!errorChecked ? 'This field is required' : undefined}
          />
        </div>

        <div className="h-px bg-border" />

        {/* Disabled */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Disabled
          </p>
          <div className="space-y-3">
            <Checkbox label="Disabled unchecked" checked={false} disabled onChange={() => {}} />
            <Checkbox label="Disabled checked" checked={true} disabled onChange={() => {}} />
          </div>
        </div>
      </div>
    </div>
  )
}
