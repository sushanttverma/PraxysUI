'use client'

import StatBar from '@/app/components/ui/stat-bar'

export default function StatBarDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="flex w-full max-w-md flex-col gap-5">
        <StatBar label="React" value={92} />
        <StatBar label="TypeScript" value={85} color="#3b82f6" />
        <StatBar label="Node.js" value={78} color="#22c55e" />
        <StatBar label="Rust" value={45} color="#f59e0b" />
        <StatBar label="Go" value={60} color="#a855f7" />
      </div>
    </div>
  )
}
