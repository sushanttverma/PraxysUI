'use client'

import dynamic from 'next/dynamic'

const Ribbons = dynamic(() => import('@/app/components/ui/ribbons'), { ssr: false })

export default function RibbonsDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <Ribbons />
    </div>
  )
}
