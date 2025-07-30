'use client'

import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react'
import StatsCard from '@/app/components/ui/stats-card'

export default function StatsCardDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-faint">
          Dashboard Stats
        </p>
        <div className="grid grid-cols-2 gap-3">
          <StatsCard
            label="Revenue"
            value={12450}
            prefix="$"
            trend={{ value: 12, direction: 'up' }}
            icon={<DollarSign className="h-5 w-5" />}
          />
          <StatsCard
            label="Users"
            value={3240}
            trend={{ value: 8, direction: 'up' }}
            icon={<Users className="h-5 w-5" />}
          />
          <StatsCard
            label="Orders"
            value={156}
            trend={{ value: 3, direction: 'down' }}
            icon={<ShoppingCart className="h-5 w-5" />}
          />
          <StatsCard
            label="Conversion"
            value={4.6}
            suffix="%"
            trend={{ value: 0.5, direction: 'up' }}
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>
      </div>
    </div>
  )
}
