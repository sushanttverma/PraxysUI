'use client'

import dynamic from 'next/dynamic'

const PixelBlast = dynamic(() => import('@/app/components/ui/pixel-blast'), { ssr: false })

export default function PixelBlastDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <PixelBlast />
    </div>
  )
}
