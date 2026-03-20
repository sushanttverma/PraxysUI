'use client'

import dynamic from 'next/dynamic'

const DarkVeil = dynamic(() => import('@/app/components/ui/dark-veil'), { ssr: false })

export default function DarkVeilDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <DarkVeil />
    </div>
  )
}
