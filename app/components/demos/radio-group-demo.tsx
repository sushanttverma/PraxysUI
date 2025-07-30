'use client'

import { useState } from 'react'
import RadioGroup from '@/app/components/ui/radio-group'

const planOptions = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
]

const notificationOptions = [
  { value: 'all', label: 'All notifications' },
  { value: 'mentions', label: 'Mentions only' },
  { value: 'none', label: 'None' },
]

export default function RadioGroupDemo() {
  const [plan, setPlan] = useState('free')
  const [notification, setNotification] = useState('all')

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Horizontal */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Plan Selection (Horizontal)
          </p>
          <RadioGroup
            options={planOptions}
            value={plan}
            onChange={setPlan}
            direction="horizontal"
          />
          <p className="mt-3 text-sm text-text-faint">
            Selected plan: <span className="text-ignite font-medium capitalize">{plan}</span>
          </p>
        </div>

        <div className="h-px bg-border" />

        {/* Vertical */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Notification Preference (Vertical)
          </p>
          <RadioGroup
            options={notificationOptions}
            value={notification}
            onChange={setNotification}
            direction="vertical"
          />
          <p className="mt-3 text-sm text-text-faint">
            Preference: <span className="text-ignite font-medium">{notificationOptions.find((o) => o.value === notification)?.label}</span>
          </p>
        </div>

        <div className="h-px bg-border" />

        {/* Disabled */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Disabled
          </p>
          <RadioGroup
            options={[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
              { value: 'c', label: 'Option C' },
            ]}
            value="a"
            onChange={() => {}}
            disabled
          />
        </div>
      </div>
    </div>
  )
}
