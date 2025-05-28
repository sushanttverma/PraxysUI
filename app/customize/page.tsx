import type { Metadata } from 'next'
import ThemeCustomizer from './ThemeCustomizer'

export const metadata: Metadata = {
  title: 'Theme Customizer',
  description:
    'Customize your Praxys UI theme. Pick brand colors, preview components live, and export CSS for your project.',
}

export default function CustomizePage() {
  return <ThemeCustomizer />
}
