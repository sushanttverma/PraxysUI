'use client'

import { useState } from 'react'
import ToggleGroup from '@/app/components/ui/toggle-group'

export default function ToggleGroupDemo() {
  const [view, setView] = useState('Grid')
  const [size, setSize] = useState('Monthly')

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Sizes */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Small
          </p>
          <ToggleGroup
            options={['List', 'Grid', 'Board']}
            value={view}
            onChange={setView}
            size="sm"
          />
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Medium
          </p>
          <ToggleGroup
            options={['List', 'Grid', 'Board']}
            value={view}
            onChange={setView}
            size="md"
          />
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Large
          </p>
          <ToggleGroup
            options={['Weekly', 'Monthly', 'Yearly']}
            value={size}
            onChange={setSize}
            size="lg"
          />
        </div>
      </div>
    </div>
  )
}
