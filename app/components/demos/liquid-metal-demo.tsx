'use client'

import LiquidMetal from '@/app/components/ui/liquid-metal'

export default function LiquidMetalDemo() {
  return (
    <div className="py-4">
      <LiquidMetal>
        <span className="font-pixel text-2xl font-bold text-chalk/80">
          Move your cursor
        </span>
      </LiquidMetal>
    </div>
  )
}
