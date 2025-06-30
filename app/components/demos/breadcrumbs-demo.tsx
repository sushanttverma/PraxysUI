'use client'

import Breadcrumbs from '@/app/components/ui/breadcrumbs'

export default function BreadcrumbsDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Basic */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Basic
          </p>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '#' },
              { label: 'Docs', href: '#' },
              { label: 'Components' },
            ]}
          />
        </div>

        <div className="h-px bg-border" />

        {/* Longer path */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Nested path
          </p>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '#' },
              { label: 'Products', href: '#' },
              { label: 'Electronics', href: '#' },
              { label: 'Headphones', href: '#' },
              { label: 'AirPods Pro' },
            ]}
          />
        </div>

        <div className="h-px bg-border" />

        {/* Custom separator */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Custom separator
          </p>
          <Breadcrumbs
            items={[
              { label: 'Dashboard', href: '#' },
              { label: 'Settings', href: '#' },
              { label: 'Profile' },
            ]}
            separator={<span className="text-text-faint">/</span>}
          />
        </div>
      </div>
    </div>
  )
}
