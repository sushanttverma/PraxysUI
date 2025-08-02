'use client'

import { useState } from 'react'
import Switch from '@/app/components/ui/switch'

export default function SwitchDemo() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [autoSave, setAutoSave] = useState(true)

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Standard switches */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Settings
          </p>
          <div className="space-y-4">
            <Switch
              label="Enable notifications"
              checked={notifications}
              onChange={setNotifications}
            />
            <Switch
              label="Dark mode"
              checked={darkMode}
              onChange={setDarkMode}
            />
            <Switch
              label="Auto-save"
              checked={autoSave}
              onChange={setAutoSave}
            />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Size variants */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Size Variants
          </p>
          <div className="space-y-4">
            <Switch
              label="Small switch"
              size="sm"
              checked={true}
              onChange={() => {}}
            />
            <Switch
              label="Medium switch (default)"
              size="md"
              checked={true}
              onChange={() => {}}
            />
            <Switch
              label="Large switch"
              size="lg"
              checked={true}
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Disabled state */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Disabled State
          </p>
          <div className="space-y-4">
            <Switch
              label="Disabled (off)"
              checked={false}
              disabled
              onChange={() => {}}
            />
            <Switch
              label="Disabled (on)"
              checked={true}
              disabled
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Current state */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Current State
          </p>
          <div className="space-y-1 text-sm text-text-faint">
            <p>Notifications: <span className={notifications ? 'text-green-400' : 'text-red-400'}>{notifications ? 'Enabled' : 'Disabled'}</span></p>
            <p>Dark mode: <span className={darkMode ? 'text-green-400' : 'text-red-400'}>{darkMode ? 'On' : 'Off'}</span></p>
            <p>Auto-save: <span className={autoSave ? 'text-green-400' : 'text-red-400'}>{autoSave ? 'Enabled' : 'Disabled'}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
