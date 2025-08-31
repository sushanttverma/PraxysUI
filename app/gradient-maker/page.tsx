import { Metadata } from 'next'
import GradientMaker from './GradientMaker'

export const metadata: Metadata = {
    title: 'Gradient Maker | Praxys UI',
    description:
        'Create beautiful mesh gradients with an interactive visual editor. Pick colors, adjust blending, choose from curated presets, and export CSS.',
    openGraph: {
        title: 'Gradient Maker | Praxys UI',
        description:
            'Create beautiful mesh gradients with an interactive visual editor. Pick colors, adjust blending, choose from curated presets, and export CSS.',
    },
}

export default function GradientMakerPage() {
    return <GradientMaker />
}
