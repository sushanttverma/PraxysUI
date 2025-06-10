'use client'

import { motion } from 'framer-motion'
import { BarChart3, Users, TrendingUp, DollarSign, Activity, Clock, ArrowUpRight, ArrowDownRight, Bell, Settings, Search } from 'lucide-react'
import AnimatedNumber from '@/app/components/ui/animated-number'
import ExpandableBentoGrid from '@/app/components/ui/expandable-bento-grid'
import SpotlightNavbar from '@/app/components/ui/spotlight-navbar'
import LightLines from '@/app/components/ui/light-lines'

const stats = [
  { label: 'Total Revenue', value: 284500, prefix: '$', change: +12.5, icon: <DollarSign className="h-5 w-5" /> },
  { label: 'Active Users', value: 14832, change: +8.2, icon: <Users className="h-5 w-5" /> },
  { label: 'Conversion Rate', value: 3.24, suffix: '%', change: -1.1, icon: <TrendingUp className="h-5 w-5" /> },
  { label: 'Avg Session', value: 4.7, suffix: 'min', change: +5.3, icon: <Clock className="h-5 w-5" /> },
]

const navItems = [
  { label: 'Overview', href: '#' },
  { label: 'Analytics', href: '#' },
  { label: 'Users', href: '#' },
  { label: 'Revenue', href: '#' },
  { label: 'Settings', href: '#' },
]

const bentoItems = [
  {
    id: 'traffic',
    title: 'Traffic Sources',
    description: 'Direct: 42% | Organic: 31% | Referral: 18% | Social: 9%. Organic search traffic increased 23% this month driven by new blog content.',
    icon: <BarChart3 className="h-5 w-5" />,
    span: 'wide' as const,
  },
  {
    id: 'engagement',
    title: 'User Engagement',
    description: 'Average 4.7 minutes per session with 3.2 pages viewed. Engagement peaks between 10am-2pm UTC.',
    icon: <Activity className="h-5 w-5" />,
  },
  {
    id: 'retention',
    title: 'Retention Rate',
    description: 'Day 1: 68% | Day 7: 42% | Day 30: 28%. Retention improved after onboarding flow redesign.',
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: 'revenue',
    title: 'Revenue Breakdown',
    description: 'Subscriptions: $198K | One-time: $62K | Enterprise: $24.5K. MRR growth trending at 12.5% month-over-month.',
    icon: <DollarSign className="h-5 w-5" />,
    span: 'wide' as const,
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'P95 latency: 142ms. Uptime: 99.97%. Error rate: 0.02%. All metrics within SLA targets.',
    icon: <TrendingUp className="h-5 w-5" />,
  },
]

const recentActivity = [
  { user: 'Sarah C.', action: 'Upgraded to Pro plan', time: '2 min ago' },
  { user: 'Marcus J.', action: 'Invited 3 team members', time: '15 min ago' },
  { user: 'Aisha P.', action: 'Created new project', time: '1 hr ago' },
  { user: 'David L.', action: 'Exported analytics report', time: '2 hr ago' },
  { user: 'Emma W.', action: 'Updated billing info', time: '3 hr ago' },
]

const SaaSDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-void">
      {/* Top bar */}
      <header className="border-b border-border bg-obsidian/50">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ignite">
              <span className="font-pixel text-xs font-bold text-void">D</span>
            </div>
            <span className="hidden font-pixel text-base font-semibold text-chalk sm:inline">Dashboard</span>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-void px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-text-faint" />
            <span className="text-xs text-text-faint">Search...</span>
            <kbd className="ml-4 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-text-faint">⌘K</kbd>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border text-blush transition-colors hover:text-chalk cursor-pointer">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-ignite" />
            </button>
            <button className="hidden h-8 w-8 items-center justify-center rounded-lg border border-border text-blush transition-colors hover:text-chalk cursor-pointer sm:flex">
              <Settings className="h-4 w-4" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ignite/10 font-pixel text-xs font-bold text-ignite">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Spotlight navbar */}
        <div className="mb-8">
          <SpotlightNavbar items={navItems} />
        </div>

        {/* Stats cards */}
        <div className="mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-border bg-obsidian p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-text-faint">{stat.label}</span>
                <div className="text-ignite/60">{stat.icon}</div>
              </div>
              <div className="flex items-baseline gap-1">
                {stat.prefix && <span className="font-pixel text-xl font-bold text-chalk">{stat.prefix}</span>}
                <AnimatedNumber
                  value={stat.value}
                  className="font-pixel text-2xl font-bold text-chalk"
                  formatFn={(n) => {
                    if (stat.suffix === '%') return n.toFixed(2)
                    if (stat.suffix === 'min') return n.toFixed(1)
                    return Math.round(n).toLocaleString()
                  }}
                />
                {stat.suffix && <span className="text-sm text-blush">{stat.suffix}</span>}
              </div>
              <div className={`mt-2 flex items-center gap-1 text-xs ${stat.change > 0 ? 'text-green-500' : 'text-red-400'}`}>
                {stat.change > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {Math.abs(stat.change)}% vs last month
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content - bento grid */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-pixel text-sm font-semibold text-chalk">Analytics Overview</h2>
              <select className="rounded-lg border border-border bg-void px-3 py-1.5 text-xs text-blush focus:outline-none">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <ExpandableBentoGrid items={bentoItems} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Light lines decoration */}
            <div>
              <h3 className="mb-3 font-pixel text-xs font-semibold text-chalk">Server Status</h3>
              <LightLines lineCount={4} className="h-32" />
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-text-faint">All systems operational</span>
                <span className="flex items-center gap-1 text-green-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Online
                </span>
              </div>
            </div>

            {/* Recent activity */}
            <div>
              <h3 className="mb-3 font-pixel text-xs font-semibold text-chalk">Recent Activity</h3>
              <div className="rounded-xl border border-border bg-obsidian">
                {recentActivity.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      i < recentActivity.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ignite/10 font-pixel text-[10px] text-ignite">
                      {item.user.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs text-chalk">
                        <span className="font-semibold">{item.user}</span>{' '}
                        {item.action}
                      </p>
                      <p className="text-[10px] text-text-faint">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaaSDashboard
