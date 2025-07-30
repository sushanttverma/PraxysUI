'use client'

import Divider from '@/app/components/ui/divider'

export default function DividerDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Plain divider */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Plain
          </p>
          <Divider />
        </div>

        <div className="h-px bg-border" />

        {/* With label */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            With Label
          </p>
          <Divider label="OR" />
        </div>

        <div className="h-px bg-border" />

        {/* Gradient */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Gradient
          </p>
          <Divider gradient />
        </div>

        <div className="h-px bg-border" />

        {/* Gradient with label */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Gradient with Label
          </p>
          <Divider gradient label="SECTION" />
        </div>

        <div className="h-px bg-border" />

        {/* Vertical divider */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Vertical
          </p>
          <div className="flex items-center gap-4 h-16">
            <div className="flex-1 text-right">
              <p className="text-sm font-medium text-chalk">Left Content</p>
              <p className="text-xs text-text-faint">Some description</p>
            </div>
            <Divider orientation="vertical" />
            <div className="flex-1">
              <p className="text-sm font-medium text-chalk">Right Content</p>
              <p className="text-xs text-text-faint">Some description</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
