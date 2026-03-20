'use client'

import dynamic from 'next/dynamic'

const Prism = dynamic(() => import('@/app/components/ui/prism'), { ssr: false })

export default function PrismDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <Prism />
    </div>
  )
}
