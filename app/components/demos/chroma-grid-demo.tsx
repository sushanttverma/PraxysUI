'use client'

import ChromaGrid from '@/app/components/ui/chroma-grid'

const items = [
  {
    title: 'Crimson Pulse',
    subtitle: 'Dynamic energy visualization',
    color: '#e74c3c',
  },
  {
    title: 'Ocean Depth',
    subtitle: 'Deep-sea data explorer',
    color: '#2980b9',
  },
  {
    title: 'Emerald Growth',
    subtitle: 'Organic system metrics',
    color: '#27ae60',
  },
  {
    title: 'Solar Flare',
    subtitle: 'High-performance analytics',
    color: '#f39c12',
  },
  {
    title: 'Violet Haze',
    subtitle: 'Creative workflow tools',
    color: '#8e44ad',
  },
  {
    title: 'Coral Reef',
    subtitle: 'Collaborative workspace',
    color: '#e84393',
  },
]

export default function ChromaGridDemo() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-full max-w-2xl">
        <ChromaGrid
          items={items}
          columns={3}
          gap={16}
          radius={300}
          damping={0.45}
        />
      </div>
    </div>
  )
}
