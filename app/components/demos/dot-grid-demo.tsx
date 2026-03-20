'use client'

import dynamic from 'next/dynamic'

const DotGrid = dynamic(() => import('@/app/components/ui/dot-grid'), { ssr: false })

export default function DotGridDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <DotGrid />
    </div>
  )
}
