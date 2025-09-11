'use client'

import FloatingMenu from '@/app/components/ui/floating-menu'

export default function FloatingMenuDemo() {
  return (
    <div className="flex items-center justify-center py-12">
      <FloatingMenu
        sections={[
          {
            title: 'Menu',
            items: [
              { label: 'Dashboard', href: '#' },
              { label: 'Products', href: '#' },
              { label: 'Features', href: '#' },
              { label: 'Pricing', href: '#' },
            ],
          },
          {
            title: 'Other',
            items: [
              { label: 'Privacy Policy', href: '#' },
              { label: 'Terms of Service', href: '#' },
            ],
          },
          {
            title: 'Social',
            items: [
              { label: 'Github', href: '#' },
              { label: 'Twitter', href: '#' },
            ],
          },
        ]}
      />
    </div>
  )
}
