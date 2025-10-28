'use client'

import CopyButton from '@/app/components/ui/copy-button'

export default function CopyButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Default
          </p>
          <CopyButton text="npm install framer-motion" />
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            With code snippet
          </p>
          <div className="flex items-center gap-2 rounded-lg bg-void px-3 py-2 border border-border">
            <code className="flex-1 text-xs text-blush font-mono">npx praxys-ui add button</code>
            <CopyButton text="npx praxys-ui add button" className="border-0 bg-transparent px-1.5 py-1 hover:bg-obsidian" />
          </div>
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Custom label
          </p>
          <CopyButton text="https://praxys.design">Copy Link</CopyButton>
        </div>
      </div>
    </div>
  )
}
