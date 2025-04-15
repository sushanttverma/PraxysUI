'use client'

import SocialFlipButton from '@/app/components/ui/social-flip-button'
import { Github, Twitter, Linkedin } from 'lucide-react'

export default function SocialFlipButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-8">
      <SocialFlipButton
        frontLabel="Follow"
        links={[
          { icon: <Github className="h-4 w-4" />, href: '#', label: 'GitHub' },
          { icon: <Twitter className="h-4 w-4" />, href: '#', label: 'Twitter' },
          { icon: <Linkedin className="h-4 w-4" />, href: '#', label: 'LinkedIn' },
        ]}
      />
      <SocialFlipButton
        frontLabel="Connect"
        links={[
          { icon: <Twitter className="h-4 w-4" />, href: '#', label: 'Twitter' },
          { icon: <Github className="h-4 w-4" />, href: '#', label: 'GitHub' },
        ]}
      />
    </div>
  )
}
