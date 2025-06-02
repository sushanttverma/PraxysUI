'use client'

import AnimatedCounter from '@/app/components/ui/animated-counter'

export default function AnimatedCounterDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-obsidian p-6">
          <AnimatedCounter to={1234} duration={2} />
          <span className="text-sm text-text-faint">Total Users</span>
        </div>

        <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-obsidian p-6">
          <AnimatedCounter to={99.9} decimals={1} suffix="%" duration={2} />
          <span className="text-sm text-text-faint">Uptime</span>
        </div>

        <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-obsidian p-6">
          <AnimatedCounter to={50000} prefix="$" duration={2.5} />
          <span className="text-sm text-text-faint">Revenue</span>
        </div>
      </div>
    </div>
  )
}
