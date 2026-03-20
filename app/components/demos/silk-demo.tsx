'use client'

import dynamic from 'next/dynamic'

const Silk = dynamic(() => import('@/app/components/ui/silk'), { ssr: false })

export default function SilkDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <Silk />
    </div>
  )
}
