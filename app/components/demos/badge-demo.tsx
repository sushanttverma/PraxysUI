'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Check, AlertTriangle, Info, Zap } from 'lucide-react'
import Badge from '@/app/components/ui/badge'

export default function BadgeDemo() {
  const [badges, setBadges] = useState([
    { id: 1, label: 'New', variant: 'info' as const },
    { id: 2, label: 'Approved', variant: 'success' as const },
    { id: 3, label: 'Warning', variant: 'warning' as const },
    { id: 4, label: 'Failed', variant: 'error' as const },
    { id: 5, label: 'Default', variant: 'default' as const },
  ])

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Variants */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Variants
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="success" icon={<Check className="h-3 w-3" />}>
              Success
            </Badge>
            <Badge variant="warning" icon={<AlertTriangle className="h-3 w-3" />}>
              Warning
            </Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info" icon={<Info className="h-3 w-3" />}>
              Info
            </Badge>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Sizes */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Sizes
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge size="sm" variant="info" icon={<Zap className="h-2.5 w-2.5" />}>
              Small
            </Badge>
            <Badge size="md" variant="info" icon={<Zap className="h-3 w-3" />}>
              Medium
            </Badge>
            <Badge size="lg" variant="info" icon={<Zap className="h-3.5 w-3.5" />}>
              Large
            </Badge>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Removable */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Removable
          </p>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {badges.map((b) => (
                <Badge
                  key={b.id}
                  variant={b.variant}
                  removable
                  onRemove={() => setBadges((prev) => prev.filter((x) => x.id !== b.id))}
                >
                  {b.label}
                </Badge>
              ))}
            </AnimatePresence>
            {badges.length === 0 && (
              <button
                onClick={() =>
                  setBadges([
                    { id: 1, label: 'New', variant: 'info' },
                    { id: 2, label: 'Approved', variant: 'success' },
                    { id: 3, label: 'Warning', variant: 'warning' },
                    { id: 4, label: 'Failed', variant: 'error' },
                    { id: 5, label: 'Default', variant: 'default' },
                  ])
                }
                className="text-xs text-ignite hover:text-blush transition-colors"
              >
                Reset badges
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
