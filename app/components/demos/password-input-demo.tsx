'use client'

import { useState } from 'react'
import PasswordInput from '@/app/components/ui/password-input'

export default function PasswordInputDemo() {
  const [pw1, setPw1] = useState('')
  const [pw2, setPw2] = useState('')
  const [pw3, setPw3] = useState('')

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Small
          </p>
          <PasswordInput value={pw1} onChange={setPw1} size="sm" placeholder="Small password" />
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Medium
          </p>
          <PasswordInput value={pw2} onChange={setPw2} size="md" />
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Large
          </p>
          <PasswordInput value={pw3} onChange={setPw3} size="lg" placeholder="Large password" />
        </div>
      </div>
    </div>
  )
}
