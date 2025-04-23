'use client'

import { useState } from 'react'
import RevealLoader from '@/app/components/ui/reveal-loader'

export default function RevealLoaderDemo() {
  const [key, setKey] = useState(0)

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <RevealLoader
        key={key}
        duration={2.5}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-pixel text-2xl text-ignite">Praxys UI</span>
          <span className="text-sm text-blush">Content has been revealed!</span>
        </div>
      </RevealLoader>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="rounded-lg border border-border px-4 py-2 text-sm text-blush transition-colors hover:text-chalk cursor-pointer"
      >
        Replay
      </button>
    </div>
  )
}
