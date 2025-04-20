'use client'

import GlassDock from '@/app/components/ui/glass-dock'
import { Home, Search, Palette, Code2, Settings, Github } from 'lucide-react'

export default function GlassDockDemo() {
  return (
    <div className="flex items-center justify-center py-12">
      <GlassDock
        items={[
          { icon: <Home className="h-full w-full" />, label: 'Home' },
          { icon: <Search className="h-full w-full" />, label: 'Search' },
          { icon: <Palette className="h-full w-full" />, label: 'Design' },
          { icon: <Code2 className="h-full w-full" />, label: 'Code' },
          { icon: <Github className="h-full w-full" />, label: 'GitHub' },
          { icon: <Settings className="h-full w-full" />, label: 'Settings' },
        ]}
      />
    </div>
  )
}
