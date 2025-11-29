'use client'

import Avatar from '@/app/components/ui/avatar'

export default function AvatarDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-sm mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Sizes */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Sizes
          </p>
          <div className="flex items-end gap-3">
            <Avatar fallback="SM" size="sm" />
            <Avatar fallback="MD" size="md" />
            <Avatar fallback="LG" size="lg" />
            <Avatar fallback="XL" size="xl" />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Status indicators */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Status
          </p>
          <div className="flex items-center gap-4">
            <Avatar fallback="ON" size="lg" status="online" />
            <Avatar fallback="AW" size="lg" status="away" />
            <Avatar fallback="BS" size="lg" status="busy" />
            <Avatar fallback="OF" size="lg" status="offline" />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Image with fallback */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Image &amp; fallback
          </p>
          <div className="flex items-center gap-4">
            <Avatar
              src="https://i.pravatar.cc/150?img=12"
              alt="Jane Doe"
              size="lg"
              status="online"
            />
            <Avatar
              src="https://broken-link.invalid/nope.jpg"
              alt="John Smith"
              fallback="JS"
              size="lg"
              status="busy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
