'use client'

import TestimonialsCard from '@/app/components/ui/testimonials-card'

export default function TestimonialsCardDemo() {
  return (
    <div className="flex items-center justify-center py-8">
      <TestimonialsCard
        className="max-w-md"
        testimonials={[
          {
            quote: 'Praxys UI components saved me hours of work. The animations are silky smooth and the code is clean.',
            author: 'Sarah Chen',
            role: 'Frontend Developer',
          },
          {
            quote: 'Best copy-paste component library I have used. No bloated dependencies, just beautiful code.',
            author: 'Alex Rivera',
            role: 'Design Engineer',
          },
          {
            quote: 'The attention to detail in every component is incredible. Truly a premium collection.',
            author: 'Marcus Kim',
            role: 'Full Stack Developer',
          },
        ]}
      />
    </div>
  )
}
