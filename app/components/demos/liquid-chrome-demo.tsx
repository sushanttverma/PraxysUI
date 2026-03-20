'use client'

import dynamic from 'next/dynamic'

const LiquidChrome = dynamic(() => import('@/app/components/ui/liquid-chrome'), { ssr: false })

export default function LiquidChromeDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <LiquidChrome />
    </div>
  )
}
