import { Metadata } from 'next'
import AnimationStudio from './AnimationStudio'

export const metadata: Metadata = {
  title: 'Animation Studio | Praxys UI',
  description:
    'Interactive animation studio - customize animations for any component with real-time preview and code generation.',
  openGraph: {
    title: 'Animation Studio | Praxys UI',
    description:
      'Interactive animation studio - customize animations for any component with real-time preview and code generation.',
  },
}

export default function StudioPage() {
  return <AnimationStudio />
}
