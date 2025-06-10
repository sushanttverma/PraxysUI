'use client'

import { lazy, Suspense, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Monitor, Smartphone, Tablet, Maximize2, Code } from 'lucide-react'
import { motion } from 'framer-motion'
import type { TemplateDefinition } from '@/lib/templates'
import ThemeToggle from '@/app/components/ThemeToggle'

const templateComponents: Record<string, React.LazyExoticComponent<React.FC>> = {
  'startup-landing': lazy(() => import('./templates/StartupLanding')),
  'saas-dashboard': lazy(() => import('./templates/SaaSDashboard')),
  'developer-portfolio': lazy(() => import('./templates/DeveloperPortfolio')),
  'agency-showcase': lazy(() => import('./templates/AgencyShowcase')),
  'documentation-site': lazy(() => import('./templates/DocumentationSite')),
  'ecommerce-product': lazy(() => import('./templates/EcommerceProduct')),
}

type Viewport = 'desktop' | 'tablet' | 'mobile' | 'fullscreen'

export default function TemplatePreviewClient({
  slug,
  template,
}: {
  slug: string
  template: TemplateDefinition
}) {
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const TemplateComponent = templateComponents[slug]

  const viewportWidths: Record<Viewport, string> = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
    fullscreen: '100%',
  }

  if (viewport === 'fullscreen' && TemplateComponent) {
    return (
      <div className="min-h-screen bg-void">
        {/* Minimal floating toolbar */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <button
            onClick={() => setViewport('desktop')}
            className="flex h-9 items-center gap-2 rounded-lg border border-border bg-obsidian/90 px-3 text-xs text-blush backdrop-blur-sm transition-colors hover:text-chalk cursor-pointer"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Exit Fullscreen
          </button>
          <ThemeToggle />
        </div>
        <Suspense fallback={<TemplateSkeleton />}>
          <TemplateComponent />
        </Suspense>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-void">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-void/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 sm:px-6">
          {/* Left: back + info */}
          <div className="flex items-center gap-3">
            <Link
              href="/templates"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-blush transition-colors hover:text-chalk"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="hidden sm:block">
              <h1 className="font-pixel text-sm font-semibold text-chalk">
                {template.title}
              </h1>
              <p className="text-[11px] text-text-faint">{template.category} Template</p>
            </div>
          </div>

          {/* Center: viewport toggles */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-obsidian p-1">
            {([
              { key: 'mobile' as Viewport, icon: Smartphone, label: 'Mobile' },
              { key: 'tablet' as Viewport, icon: Tablet, label: 'Tablet' },
              { key: 'desktop' as Viewport, icon: Monitor, label: 'Desktop' },
              { key: 'fullscreen' as Viewport, icon: Maximize2, label: 'Fullscreen' },
            ]).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setViewport(key)}
                className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors cursor-pointer ${
                  viewport === key
                    ? 'bg-ignite/10 text-ignite border border-ignite/20'
                    : 'text-text-faint hover:text-blush'
                }`}
                title={label}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href={`/docs/${template.components[0]}`}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-xs text-blush transition-colors hover:text-chalk"
            >
              <Code className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View Components</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Preview area */}
      <div className="pt-14">
        <div
          className="mx-auto transition-all duration-300"
          style={{
            maxWidth: viewportWidths[viewport],
          }}
        >
          {/* Device frame for mobile/tablet */}
          {(viewport === 'mobile' || viewport === 'tablet') && (
            <div className="py-4 px-4">
              <div className="overflow-hidden rounded-2xl border border-border shadow-2xl">
                {/* Device chrome */}
                <div className="flex items-center gap-2 border-b border-border bg-obsidian px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-ignite/30" />
                    <div className="h-2.5 w-2.5 rounded-full bg-blush/20" />
                    <div className="h-2.5 w-2.5 rounded-full bg-chalk/10" />
                  </div>
                  <div className="flex-1 mx-8">
                    <div className="mx-auto max-w-xs rounded-md border border-border bg-void px-3 py-1 text-center text-[10px] text-text-faint">
                      ui.praxys.xyz/templates/{slug}
                    </div>
                  </div>
                </div>
                <div className="overflow-y-auto bg-void" style={{ maxHeight: 'calc(100vh - 140px)' }}>
                  <Suspense fallback={<TemplateSkeleton />}>
                    {TemplateComponent && <TemplateComponent />}
                  </Suspense>
                </div>
              </div>
            </div>
          )}

          {/* Desktop: no frame */}
          {viewport === 'desktop' && (
            <Suspense fallback={<TemplateSkeleton />}>
              {TemplateComponent && <TemplateComponent />}
            </Suspense>
          )}
        </div>
      </div>

      {/* Bottom bar: component tags */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-void/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-10 max-w-[1600px] items-center gap-2 px-4 py-2 sm:gap-3 sm:px-6">
          <span className="hidden text-[11px] text-text-faint sm:inline shrink-0">Components used:</span>
          <div className="flex flex-wrap gap-1.5 overflow-hidden">
            {template.components.map((comp) => (
              <Link
                key={comp}
                href={`/docs/${comp}`}
                className="rounded-md border border-border bg-obsidian px-2 py-0.5 text-[10px] text-blush transition-colors hover:border-ignite/30 hover:text-ignite whitespace-nowrap"
              >
                {comp}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TemplateSkeleton() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-ignite"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>
        <span className="font-pixel text-xs text-text-faint">Loading template...</span>
      </motion.div>
    </div>
  )
}
