'use client'

import dynamic from 'next/dynamic'

const LaserFlow = dynamic(() => import('@/app/components/ui/laser-flow'), { ssr: false })

export default function LaserFlowDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <LaserFlow className="" style={{ width: '100%', height: '100%' }} dpr={1} />
    </div>
  )
}
