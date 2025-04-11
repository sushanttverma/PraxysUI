'use client'

import AnimatedNumber from '@/app/components/ui/animated-number'

export default function AnimatedNumberDemo() {
  return (
    <div className="flex items-center justify-center gap-12 py-8">
      <div className="text-center">
        <div className="text-4xl font-bold text-chalk">
          <AnimatedNumber value={1234} />
        </div>
        <p className="mt-1 text-sm text-blush">Users</p>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-ignite">
          <AnimatedNumber value={99} formatFn={(n) => `${Math.round(n)}%`} />
        </div>
        <p className="mt-1 text-sm text-blush">Uptime</p>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-chalk">
          <AnimatedNumber value={25} formatFn={(n) => `${Math.round(n)}+`} />
        </div>
        <p className="mt-1 text-sm text-blush">Components</p>
      </div>
    </div>
  )
}
