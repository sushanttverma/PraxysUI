'use client'

import SpotlightNavbar from '@/app/components/ui/spotlight-navbar'

export default function SpotlightNavbarDemo() {
  return (
    <div className="flex items-center justify-center py-8">
      <SpotlightNavbar
        items={[
          { label: 'Home', href: '#' },
          { label: 'Components', href: '#' },
          { label: 'Templates', href: '#' },
          { label: 'Docs', href: '#' },
          { label: 'Blog', href: '#' },
        ]}
      />
    </div>
  )
}
