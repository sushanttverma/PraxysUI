import { Metadata } from 'next'
import AnimationStudio from './AnimationStudio'

export const metadata: Metadata = {
  title: 'Animation Studio | Praxys UI',
  description:
    'Visual CSS animation configurator with live preview, keyframes editor, easing curves, and multi-format export.',
  openGraph: {
    title: 'Animation Studio | Praxys UI',
    description:
      'Visual CSS animation configurator with live preview, keyframes editor, easing curves, and multi-format export.',
  },
}

export default function StudioPage() {
  return <AnimationStudio />
}
