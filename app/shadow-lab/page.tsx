import { Metadata } from 'next'
import ShadowLab from './ShadowLab'

export const metadata: Metadata = {
    title: 'Shadow Lab | Praxys UI',
    description:
        'Design ultra-premium layered box-shadows. Stack up to 6 shadow layers for realistic depth effects.',
}

export default function ShadowPage() {
    return <ShadowLab />
}
