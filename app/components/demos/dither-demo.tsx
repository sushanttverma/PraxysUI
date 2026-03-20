'use client'

import dynamic from 'next/dynamic'

const Dither = dynamic(() => import('@/app/components/ui/dither'), { ssr: false })

export default function DitherDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <Dither />
    </div>
  )
}
