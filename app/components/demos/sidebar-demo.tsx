'use client'

import { useState } from 'react'
import Sidebar from '@/app/components/ui/sidebar'

export default function SidebarDemo() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-[420px] w-full max-w-xl mx-auto rounded-xl border border-border overflow-hidden bg-void">
      <Sidebar
        items={[
          { label: 'Dashboard', href: '#' },
          { label: 'Projects', children: [
            { label: 'Active', href: '#' },
            { label: 'Archived', href: '#' },
          ]},
          { label: 'Settings', href: '#' },
          { label: 'Team', children: [
            { label: 'Members', href: '#' },
            { label: 'Roles', href: '#' },
            { label: 'Permissions', href: '#' },
          ]},
          { label: 'Help', href: '#' },
        ]}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-text-faint">Main content area</p>
      </div>
    </div>
  )
}
