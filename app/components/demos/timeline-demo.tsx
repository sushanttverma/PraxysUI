'use client'

import Timeline from '@/app/components/ui/timeline'

const roadmapItems = [
  {
    title: 'Planning',
    description: 'Define project scope, gather requirements, and establish milestones for the product roadmap.',
    date: 'Jan 2025',
    active: true,
  },
  {
    title: 'Design',
    description: 'Create wireframes, design system, and high-fidelity prototypes. Conduct user research and iterate.',
    date: 'Mar 2025',
    active: true,
  },
  {
    title: 'Development',
    description: 'Build core features, implement APIs, and set up CI/CD pipelines for continuous delivery.',
    date: 'Jun 2025',
    active: true,
  },
  {
    title: 'Testing',
    description: 'Run comprehensive QA, performance benchmarks, and security audits before launch.',
    date: 'Sep 2025',
    active: false,
  },
  {
    title: 'Launch',
    description: 'Deploy to production, announce publicly, and begin monitoring key metrics and user feedback.',
    date: 'Nov 2025',
    active: false,
  },
]

export default function TimelineDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-text-faint">
            Project Roadmap
          </p>
          <Timeline items={roadmapItems} />
        </div>
      </div>
    </div>
  )
}
