import type { Metadata } from 'next'
import ExamplesContent from './ExamplesContent'

export const metadata: Metadata = {
  title: 'Examples & Recipes | Praxys UI',
  description:
    'Real-world patterns combining multiple Praxys UI components. Copy full recipes for landing heroes, pricing sections, feature grids, and more.',
}

export default function ExamplesPage() {
  return <ExamplesContent />
}
