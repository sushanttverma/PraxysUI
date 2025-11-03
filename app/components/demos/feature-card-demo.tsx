'use client'

import FeatureCard from '@/app/components/ui/feature-card'

const BoltIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

export default function FeatureCardDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        <FeatureCard
          icon={<BoltIcon />}
          title="Blazing Fast"
          description="Optimized for performance with lazy loading and code splitting out of the box."
        />
        <FeatureCard
          icon={<ShieldIcon />}
          title="Secure by Default"
          description="Enterprise-grade security with built-in authentication and role-based access."
        />
        <FeatureCard
          icon={<ChartIcon />}
          title="Real-time Analytics"
          description="Monitor your metrics in real time with interactive dashboards and alerts."
        />
      </div>
    </div>
  )
}
