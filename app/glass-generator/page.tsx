import { Metadata } from 'next'
import GlassGenerator from './GlassGenerator'

export const metadata: Metadata = {
    title: 'Glassmorphism | Praxys UI',
    description: 'Design frosted-glass UI effects with live preview and CSS export.',
}

export default function GlassPage() {
    return <GlassGenerator />
}
