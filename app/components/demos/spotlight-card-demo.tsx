'use client'

import SpotlightCard from '@/app/components/ui/spotlight-card'

export default function SpotlightCardDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        <SpotlightCard>
          <h3 className="font-pixel text-lg font-semibold text-chalk">Analytics</h3>
          <p className="mt-2 text-sm text-blush">
            Track your performance metrics and user engagement in real-time.
          </p>
        </SpotlightCard>
        <SpotlightCard spotlightColor="rgba(201, 149, 138, 0.15)">
          <h3 className="font-pixel text-lg font-semibold text-chalk">Reports</h3>
          <p className="mt-2 text-sm text-blush">
            Generate detailed reports with customizable date ranges and filters.
          </p>
        </SpotlightCard>
        <SpotlightCard spotlightColor="rgba(242, 236, 226, 0.08)" spotlightSize={400}>
          <h3 className="font-pixel text-lg font-semibold text-chalk">Settings</h3>
          <p className="mt-2 text-sm text-blush">
            Configure your workspace preferences and notification settings.
          </p>
        </SpotlightCard>
        <SpotlightCard>
          <h3 className="font-pixel text-lg font-semibold text-chalk">Team</h3>
          <p className="mt-2 text-sm text-blush">
            Manage team members, roles, and access permissions.
          </p>
        </SpotlightCard>
      </div>
    </div>
  )
}
