'use client'

import { lazy, Suspense, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Monitor, Smartphone, Tablet, Maximize2, Code, Eye, Copy, Check } from 'lucide-react'
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
type ActiveTab = 'preview' | 'code'

export default function TemplatePreviewClient({
  slug,
  template,
  code,
  darkHtml,
  lightHtml,
}: {
  slug: string
  template: TemplateDefinition
  code: string
  darkHtml: string
  lightHtml: string
}) {
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>('preview')
  const [copied, setCopied] = useState(false)
  const TemplateComponent = templateComponents[slug]

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const viewportWidths: Record<Viewport, string> = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
    fullscreen: '100%',
  }

  if (viewport === 'fullscreen' && TemplateComponent && activeTab === 'preview') {
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

  // Reset iframe loaded state when viewport changes
  const handleViewportChange = (key: Viewport) => {
    if (key !== viewport) {
      setIframeLoaded(false)
    }
    setViewport(key)
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

          {/* Center: tab toggle + viewport toggles */}
          <div className="flex items-center gap-2">
            {/* Preview / Code tabs */}
            <div className="flex items-center gap-1 rounded-lg border border-border bg-obsidian p-1">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-ignite/10 text-ignite border border-ignite/20'
                    : 'text-text-faint hover:text-blush'
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Preview</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-ignite/10 text-ignite border border-ignite/20'
                    : 'text-text-faint hover:text-blush'
                }`}
              >
                <Code className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Code</span>
              </button>
            </div>

            {/* Viewport toggles (only visible in preview mode) */}
            {activeTab === 'preview' && (
              <div className="hidden md:flex items-center gap-1 rounded-lg border border-border bg-obsidian p-1">
                {([
                  { key: 'mobile' as Viewport, icon: Smartphone, label: 'Mobile' },
                  { key: 'tablet' as Viewport, icon: Tablet, label: 'Tablet' },
                  { key: 'desktop' as Viewport, icon: Monitor, label: 'Desktop' },
                  { key: 'fullscreen' as Viewport, icon: Maximize2, label: 'Fullscreen' },
                ]).map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => handleViewportChange(key)}
                    className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors cursor-pointer ${
                      viewport === key
                        ? 'bg-ignite/10 text-ignite border border-ignite/20'
                        : 'text-text-faint hover:text-blush'
                    }`}
                    title={label}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden lg:inline">{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {activeTab === 'code' ? (
              <button
                onClick={handleCopy}
                className="flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-xs text-blush transition-colors hover:text-chalk hover:border-ignite/30 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-ignite" />
                    <span className="hidden sm:inline text-ignite">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Copy Code</span>
                  </>
                )}
              </button>
            ) : (
              <Link
                href={`/docs/${template.components[0]}`}
                className="flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-xs text-blush transition-colors hover:text-chalk"
              >
                <Code className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">View Components</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="pt-14">
        {activeTab === 'preview' ? (
          <>
            {/* Preview area */}
            <div
              className="mx-auto transition-all duration-300"
              style={{
                maxWidth: viewportWidths[viewport],
              }}
            >
              {/* Device frame for mobile/tablet — uses iframe for correct responsive breakpoints */}
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
                    {/* iframe renders template with real viewport breakpoints */}
                    <div className="relative bg-void" style={{ height: 'calc(100vh - 140px)' }}>
                      {!iframeLoaded && (
                        <div className="absolute inset-0 z-10">
                          <TemplateSkeleton />
                        </div>
                      )}
                      <iframe
                        src={`/templates/${slug}/embed`}
                        className="h-full w-full border-0 bg-void"
                        title={`${template.title} preview`}
                        onLoad={() => setIframeLoaded(true)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Desktop: render directly (viewport matches, breakpoints work) */}
              {viewport === 'desktop' && (
                <Suspense fallback={<TemplateSkeleton />}>
                  {TemplateComponent && <TemplateComponent />}
                </Suspense>
              )}
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
          </>
        ) : (
          /* Code view */
          <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
            {/* File header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-pixel text-lg font-semibold text-chalk">
                  {template.title} Template
                </h2>
                <p className="mt-1 text-sm text-text-faint">
                  Copy and paste this template into your project. Requires the following components:{' '}
                  {template.components.map((comp, i) => (
                    <span key={comp}>
                      <Link href={`/docs/${comp}`} className="text-ignite hover:underline">
                        {comp}
                      </Link>
                      {i < template.components.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            {/* Code block */}
            <div className="group relative rounded-xl border border-border overflow-hidden bg-[var(--color-code-bg)]">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <span className="font-mono text-xs text-text-faint">
                  templates/{slug}.tsx
                </span>
                <button
                  onClick={handleCopy}
                  className="flex h-7 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs text-text-faint transition-colors hover:text-blush hover:border-border cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-ignite" />
                      <span className="text-ignite">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="relative overflow-x-auto p-4 text-sm font-mono leading-relaxed max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Dark theme code block */}
                <div
                  className="code-block-dark [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent"
                  dangerouslySetInnerHTML={{ __html: darkHtml }}
                />
                {/* Light theme code block */}
                <div
                  className="code-block-light [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent"
                  dangerouslySetInnerHTML={{ __html: lightHtml }}
                />
              </div>
            </div>

            {/* Dependencies note */}
            <div className="mt-6 rounded-xl border border-border bg-obsidian/50 p-4">
              <h3 className="font-pixel text-sm font-semibold text-chalk mb-2">Required Components</h3>
              <p className="text-xs text-text-faint mb-3">
                Install each component used in this template. Click on a component to view its installation guide.
              </p>
              <div className="flex flex-wrap gap-2">
                {template.components.map((comp) => (
                  <Link
                    key={comp}
                    href={`/docs/${comp}`}
                    className="rounded-lg border border-border bg-void px-3 py-1.5 text-xs text-blush transition-colors hover:border-ignite/30 hover:text-ignite"
                  >
                    {comp}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
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
