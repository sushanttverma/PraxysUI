'use client'

import AvatarGroup from '@/app/components/ui/avatar-group'

const team = [
  { alt: 'Alice', fallback: 'A' },
  { alt: 'Bob', fallback: 'B' },
  { alt: 'Charlie', fallback: 'C' },
  { alt: 'Diana', fallback: 'D' },
  { alt: 'Eve', fallback: 'E' },
  { alt: 'Frank', fallback: 'F' },
  { alt: 'Grace', fallback: 'G' },
]

export default function AvatarGroupDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-sm mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Sizes */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Small
          </p>
          <AvatarGroup avatars={team} max={4} size="sm" />
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Medium (default)
          </p>
          <AvatarGroup avatars={team} max={5} size="md" />
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Large
          </p>
          <AvatarGroup avatars={team} max={3} size="lg" />
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            All visible
          </p>
          <AvatarGroup avatars={team.slice(0, 4)} max={10} size="md" />
        </div>
      </div>
    </div>
  )
}
