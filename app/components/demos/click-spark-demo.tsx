'use client'

import dynamic from 'next/dynamic'

const ClickSpark = dynamic(() => import('@/app/components/ui/click-spark'), { ssr: false })

export default function ClickSparkDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <ClickSpark>
        <div className="flex h-full items-center justify-center text-white/60 text-sm">
          Click anywhere for sparks
        </div>
      </ClickSpark>
    </div>
  )
}
