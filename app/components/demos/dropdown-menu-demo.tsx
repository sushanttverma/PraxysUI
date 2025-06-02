'use client'

import DropdownMenu from '@/app/components/ui/dropdown-menu'
import { Settings, User, LogOut, CreditCard, HelpCircle } from 'lucide-react'

export default function DropdownMenuDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-lg mx-auto">
      <DropdownMenu
        trigger={
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-obsidian px-5 py-2.5 text-sm font-medium text-chalk transition-colors hover:bg-ignite/10 hover:border-ignite">
            <User size={16} className="text-blush" />
            My Account
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-faint"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        }
        items={[
          {
            label: 'Profile',
            icon: <User size={16} />,
            onClick: () => {},
          },
          {
            label: 'Billing',
            icon: <CreditCard size={16} />,
            onClick: () => {},
          },
          {
            label: 'Settings',
            icon: <Settings size={16} />,
            onClick: () => {},
          },
          { label: '', divider: true },
          {
            label: 'Help & Support',
            icon: <HelpCircle size={16} />,
            onClick: () => {},
          },
          {
            label: 'Log Out',
            icon: <LogOut size={16} />,
            onClick: () => {},
          },
        ]}
      />
    </div>
  )
}
