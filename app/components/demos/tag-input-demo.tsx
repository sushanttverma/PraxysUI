'use client'

import { useState } from 'react'
import TagInput from '@/app/components/ui/tag-input'

export default function TagInputDemo() {
  const [tags, setTags] = useState(['react', 'nextjs', 'tailwind'])

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Controlled */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Controlled
          </p>
          <TagInput
            tags={tags}
            onChange={setTags}
            placeholder="Add a tag..."
            maxTags={8}
          />
          <p className="mt-2 text-xs text-text-faint">
            Press Enter or comma to add. Backspace to remove last.
          </p>
        </div>

        <div className="h-px bg-border" />

        {/* Uncontrolled */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Uncontrolled
          </p>
          <TagInput placeholder="Type and press Enter..." maxTags={5} />
        </div>

        <div className="h-px bg-border" />

        {/* Output */}
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-faint">
            Current tags
          </p>
          <pre className="rounded-lg bg-void p-3 text-xs text-blush">
            {JSON.stringify(tags, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
