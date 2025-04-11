'use client'

import LineHoverLink from '@/app/components/ui/line-hover-link'

export default function LineHoverLinkDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-8 text-lg">
      <LineHoverLink href="#">Documentation</LineHoverLink>
      <LineHoverLink href="#" lineColor="var(--color-blush)">
        Components
      </LineHoverLink>
      <LineHoverLink href="#" className="text-blush hover:text-chalk">
        Templates
      </LineHoverLink>
    </div>
  )
}
