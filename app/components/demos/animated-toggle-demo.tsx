'use client'

import { useState } from 'react'
import AnimatedToggle from '@/app/components/ui/animated-toggle'

export default function AnimatedToggleDemo() {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-sm mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-chalk">Dark Mode</p>
            <p className="text-xs text-text-faint">Use dark color scheme</p>
          </div>
          <AnimatedToggle
            checked={darkMode}
            onChange={setDarkMode}
            label="Dark Mode"
          />
        </div>

        <div className="h-px bg-border" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-chalk">Notifications</p>
            <p className="text-xs text-text-faint">Receive push notifications</p>
          </div>
          <AnimatedToggle
            checked={notifications}
            onChange={setNotifications}
            label="Notifications"
          />
        </div>

        <div className="h-px bg-border" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-chalk">Disabled</p>
            <p className="text-xs text-text-faint">This toggle is disabled</p>
          </div>
          <AnimatedToggle
            checked={false}
            disabled
            label="Disabled"
          />
        </div>
      </div>
    </div>
  )
}
