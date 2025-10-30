'use client'

import { useState } from 'react'
import MentionInput from '@/app/components/ui/mention-input'

const sampleUsers = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
  { id: '4', name: 'Diana' },
  { id: '5', name: 'Eve' },
  { id: '6', name: 'Frank' },
]

export default function MentionInputDemo() {
  const [value, setValue] = useState('')

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Mention Input
          </p>
          <MentionInput
            value={value}
            onChange={setValue}
            users={sampleUsers}
            placeholder="Type @ to mention someone..."
          />
          {value && (
            <p className="mt-2 text-xs text-text-faint">
              Value: <span className="text-blush">{value}</span>
            </p>
          )}
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-1 text-xs text-text-faint">
            Try typing <span className="text-ignite">@</span> followed by a name to see the mention dropdown.
          </p>
        </div>
      </div>
    </div>
  )
}
