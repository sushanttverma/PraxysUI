import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { COMPONENT_COUNT, TEMPLATE_COUNT } from '@/lib/site-stats'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-void">
      <Navbar />

      <main id="main-content" className="relative flex flex-1 flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-ignite/8 blur-[150px]" />
        </div>

        <div className="relative text-center max-w-2xl">
          {/* Monospace tag */}
          <p className="font-mono text-[10px] text-text-faint tracking-wider mb-6">
            {'// error / page-not-found'}
          </p>

          {/* Giant 404 */}
          <h1 className="font-pixel text-[100px] sm:text-[140px] md:text-[180px] font-bold leading-none text-chalk/[0.04] select-none">
            404
          </h1>

          {/* Overlaid message */}
          <div className="-mt-16 sm:-mt-24 md:-mt-28 relative">
            <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl font-bold text-chalk leading-tight">
              Lost in the void
            </h2>
            <p className="mt-4 text-sm sm:text-base text-blush max-w-md mx-auto leading-relaxed">
              This page doesn&apos;t exist. It might have been moved, renamed, or
              you may have followed a broken link.
            </p>
          </div>

          {/* Accent line */}
          <div
            className="mt-8 mx-auto h-px w-48"
            style={{
              background:
                'linear-gradient(90deg, transparent, var(--color-ignite), transparent)',
            }}
          />

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-ignite px-6 text-sm font-semibold text-void transition-all hover:bg-ignite/90 hover:scale-[1.02]"
            >
              Go home
            </Link>
            <Link
              href="/components"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-6 text-sm font-medium text-blush transition-all hover:border-ignite/30 hover:text-chalk"
            >
              Browse components
            </Link>
            <Link
              href="/installation"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-6 text-sm font-medium text-blush transition-all hover:border-ignite/30 hover:text-chalk"
            >
              Installation
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-text-faint">
            <span className="font-mono">try:</span>
            <Link href="/studio" className="underline decoration-border underline-offset-4 hover:text-blush transition-colors">
              Animation Studio
            </Link>
            <span className="text-border">·</span>
            <Link href="/templates" className="underline decoration-border underline-offset-4 hover:text-blush transition-colors">
              Templates
            </Link>
            <span className="text-border">·</span>
            <Link href="/gradient-maker" className="underline decoration-border underline-offset-4 hover:text-blush transition-colors">
              Gradient Maker
            </Link>
            <span className="text-border">·</span>
            <Link href="/shadow-lab" className="underline decoration-border underline-offset-4 hover:text-blush transition-colors">
              Shadow Lab
            </Link>
          </div>

          {/* Stats */}
          <p className="mt-10 font-mono text-[10px] text-text-faint/50 tracking-wider">
            {COMPONENT_COUNT} components &middot; {TEMPLATE_COUNT} templates &middot; open source
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
