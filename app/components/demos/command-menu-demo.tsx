'use client'

import CommandMenu from '@/app/components/ui/command-menu'
import {
  Home,
  FileText,
  Users,
  PlusCircle,
  Download,
  Trash2,
  Settings,
  Palette,
  Bell,
} from 'lucide-react'

export default function CommandMenuDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <CommandMenu
        items={[
          {
            id: 'home',
            label: 'Go to Home',
            icon: <Home size={16} />,
            shortcut: 'G H',
            group: 'Navigation',
            onSelect: () => {},
          },
          {
            id: 'docs',
            label: 'Documentation',
            icon: <FileText size={16} />,
            shortcut: 'G D',
            group: 'Navigation',
            onSelect: () => {},
          },
          {
            id: 'team',
            label: 'Team Members',
            icon: <Users size={16} />,
            shortcut: 'G T',
            group: 'Navigation',
            onSelect: () => {},
          },
          {
            id: 'create',
            label: 'Create New Project',
            icon: <PlusCircle size={16} />,
            shortcut: 'C P',
            group: 'Actions',
            onSelect: () => {},
          },
          {
            id: 'export',
            label: 'Export Data',
            icon: <Download size={16} />,
            shortcut: 'C E',
            group: 'Actions',
            onSelect: () => {},
          },
          {
            id: 'delete',
            label: 'Delete Selected',
            icon: <Trash2 size={16} />,
            shortcut: 'Del',
            group: 'Actions',
            onSelect: () => {},
          },
          {
            id: 'settings',
            label: 'General Settings',
            icon: <Settings size={16} />,
            shortcut: 'G S',
            group: 'Settings',
            onSelect: () => {},
          },
          {
            id: 'theme',
            label: 'Change Theme',
            icon: <Palette size={16} />,
            shortcut: 'T H',
            group: 'Settings',
            onSelect: () => {},
          },
          {
            id: 'notifications',
            label: 'Notification Preferences',
            icon: <Bell size={16} />,
            group: 'Settings',
            onSelect: () => {},
          },
        ]}
        placeholder="Search commands..."
      />
    </div>
  )
}
