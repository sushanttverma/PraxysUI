'use client'

import ExpandableBentoGrid from '@/app/components/ui/expandable-bento-grid'
import { Zap, Palette, Code2, Layers, Sparkles, Globe } from 'lucide-react'

export default function ExpandableBentoGridDemo() {
  return (
    <div className="py-8">
      <ExpandableBentoGrid
        items={[
          {
            id: '1',
            title: 'Lightning Fast',
            description:
              'GPU-accelerated animations that run at 60fps. Built with performance in mind from the ground up.',
            icon: <Zap className="h-5 w-5" />,
            span: 'wide',
          },
          {
            id: '2',
            title: 'Customizable',
            description:
              'Every component accepts className and custom props. Make it yours with Tailwind CSS.',
            icon: <Palette className="h-5 w-5" />,
          },
          {
            id: '3',
            title: 'TypeScript',
            description:
              'Full type safety with well-defined props, interfaces, and IntelliSense support.',
            icon: <Code2 className="h-5 w-5" />,
          },
          {
            id: '4',
            title: 'Composable',
            description:
              'Components designed to work together seamlessly in any combination.',
            icon: <Layers className="h-5 w-5" />,
            span: 'wide',
          },
          {
            id: '5',
            title: 'Animated',
            description: 'Smooth animations powered by Framer Motion.',
            icon: <Sparkles className="h-5 w-5" />,
          },
          {
            id: '6',
            title: 'Accessible',
            description: 'Built with WAI-ARIA standards and keyboard navigation.',
            icon: <Globe className="h-5 w-5" />,
          },
        ]}
      />
    </div>
  )
}
