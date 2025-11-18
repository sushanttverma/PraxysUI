'use client'

import MegaMenu from '@/app/components/ui/mega-menu'

export default function MegaMenuDemo() {
  return (
    <div className="flex flex-col items-center justify-start py-8 w-full max-w-2xl mx-auto min-h-[350px]">
      <MegaMenu
        trigger={
          <button
            type="button"
            className="rounded-lg bg-ignite px-4 py-2 text-sm font-medium text-chalk transition-opacity hover:opacity-90"
          >
            Products
          </button>
        }
        sections={[
          {
            title: 'Platform',
            items: [
              { label: 'Analytics', href: '#', description: 'Track performance metrics' },
              { label: 'Automation', href: '#', description: 'Streamline your workflows' },
              { label: 'Integrations', href: '#', description: 'Connect your tools' },
            ],
          },
          {
            title: 'Solutions',
            items: [
              { label: 'For Startups', href: '#', description: 'Scale from day one' },
              { label: 'Enterprise', href: '#', description: 'Built for large teams' },
              { label: 'Developers', href: '#', description: 'APIs and SDKs' },
            ],
          },
          {
            title: 'Resources',
            items: [
              { label: 'Documentation', href: '#' },
              { label: 'Blog', href: '#' },
              { label: 'Community', href: '#' },
            ],
          },
        ]}
      />
    </div>
  )
}
