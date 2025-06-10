'use client'

import { useState } from 'react'
import { Search, Book, Terminal, Zap, ChevronRight, Hash, Menu, X } from 'lucide-react'
import InteractiveBook from '@/app/components/ui/interactive-book'
import FolderPreview from '@/app/components/ui/folder-preview'
import LineHoverLink from '@/app/components/ui/line-hover-link'
import FlipFadeText from '@/app/components/ui/flip-fade-text'

const sidebarSections = [
  {
    title: 'Getting Started',
    items: ['Introduction', 'Installation', 'Quick Start', 'Configuration'],
  },
  {
    title: 'Core Concepts',
    items: ['Architecture', 'Routing', 'Data Fetching', 'State Management'],
  },
  {
    title: 'API Reference',
    items: ['Components', 'Hooks', 'Utilities', 'Types'],
  },
  {
    title: 'Guides',
    items: ['Authentication', 'Deployment', 'Testing', 'Performance'],
  },
]

const bookPages = [
  {
    title: 'Welcome to Docs',
    content: (
      <div className="space-y-3">
        <p>This documentation covers everything you need to build with our framework.</p>
        <p>Start with the Quick Start guide to get your first project running in under 5 minutes.</p>
      </div>
    ),
  },
  {
    title: 'Installation',
    content: (
      <div className="space-y-3">
        <p className="font-mono text-xs text-ignite bg-void rounded p-2">npm install @acme/framework</p>
        <p>Requires Node.js 18+ and npm 9+. See the compatibility table for more details.</p>
      </div>
    ),
  },
  {
    title: 'Quick Start',
    content: (
      <div className="space-y-3">
        <p className="font-mono text-xs text-ignite bg-void rounded p-2">npx create-acme-app my-app</p>
        <p>This scaffolds a new project with routing, TypeScript, and Tailwind CSS pre-configured.</p>
      </div>
    ),
  },
]

const projectFiles = [
  { name: 'src', type: 'folder' as const },
  { name: 'components', type: 'folder' as const },
  { name: 'pages', type: 'folder' as const },
  { name: 'lib', type: 'folder' as const },
  { name: 'package.json', type: 'file' as const },
  { name: 'tsconfig.json', type: 'file' as const },
  { name: 'tailwind.config.ts', type: 'file' as const },
  { name: 'next.config.js', type: 'file' as const },
]

const relatedLinks = [
  { label: 'API Reference', href: '#' },
  { label: 'Migration Guide', href: '#' },
  { label: 'Release Notes', href: '#' },
  { label: 'Contributing', href: '#' },
  { label: 'Community Discord', href: '#' },
  { label: 'GitHub Repository', href: '#' },
]

const DocumentationSite: React.FC = () => {
  const [activeSection, setActiveSection] = useState('Introduction')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-void">
      {/* Top navigation */}
      <header className="border-b border-border bg-obsidian/50 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-blush transition-colors hover:text-chalk cursor-pointer lg:hidden"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ignite">
              <Book className="h-3.5 w-3.5 text-void" />
            </div>
            <span className="font-pixel text-base font-semibold text-chalk">Acme Docs</span>
            <span className="ml-2 hidden rounded-md border border-border px-1.5 py-0.5 font-pixel text-[10px] text-text-faint sm:inline">v3.2</span>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-void px-3 py-1.5 w-64">
            <Search className="h-3.5 w-3.5 text-text-faint" />
            <span className="text-xs text-text-faint">Search documentation...</span>
            <kbd className="ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-text-faint">⌘K</kbd>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <a href="#" className="text-xs text-blush transition-colors hover:text-chalk">Guides</a>
            <a href="#" className="text-xs text-blush transition-colors hover:text-chalk">API</a>
            <a href="#" className="text-xs text-blush transition-colors hover:text-chalk">Blog</a>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-void/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed top-14 left-0 z-40 h-[calc(100vh-56px)] w-64 shrink-0 border-r border-border bg-void
          transition-transform duration-200 ease-in-out
          lg:sticky lg:top-0 lg:translate-x-0 lg:bg-transparent
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="sticky top-0 h-[calc(100vh-56px)] overflow-y-auto py-6 px-4">
            {sidebarSections.map((section) => (
              <div key={section.title} className="mb-6">
                <h4 className="mb-2 font-pixel text-xs font-semibold uppercase tracking-wider text-text-faint">
                  {section.title}
                </h4>
                <ul className="space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => { setActiveSection(item); setSidebarOpen(false) }}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors cursor-pointer ${
                          activeSection === item
                            ? 'bg-ignite/10 text-ignite border border-ignite/20'
                            : 'text-blush hover:text-chalk hover:bg-void'
                        }`}
                      >
                        <ChevronRight className={`h-3 w-3 transition-transform ${activeSection === item ? 'rotate-90' : ''}`} />
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 py-6 px-4 sm:py-10 sm:px-6 lg:px-12">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs text-text-faint">
            <span>Docs</span>
            <ChevronRight className="h-3 w-3" />
            <span>Getting Started</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-chalk">{activeSection}</span>
          </div>

          {/* Page heading with FlipFadeText */}
          <div className="mb-8">
            <h1 className="font-pixel text-3xl font-bold text-chalk sm:text-4xl">
              {activeSection}
            </h1>
            <p className="mt-3 text-base text-blush leading-relaxed">
              Learn how to{' '}
              <FlipFadeText
                words={['get started', 'configure', 'deploy', 'scale']}
                className="text-ignite font-semibold"
                interval={2500}
              />{' '}
              your application with our framework.
            </p>
          </div>

          {/* Content area */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {/* Article content */}
              <div className="prose-like space-y-4">
                <div className="rounded-xl border border-border bg-obsidian p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-4 w-4 text-ignite" />
                    <span className="font-pixel text-xs text-ignite">Quick Tip</span>
                  </div>
                  <p className="text-sm leading-relaxed text-blush">
                    Use the CLI to scaffold your project. It sets up TypeScript, Tailwind CSS,
                    and routing automatically with sensible defaults.
                  </p>
                </div>

                <h2 className="font-pixel text-xl font-bold text-chalk flex items-center gap-2">
                  <Hash className="h-4 w-4 text-text-faint" />
                  Overview
                </h2>
                <p className="text-sm leading-relaxed text-blush">
                  Our framework is designed with developer experience in mind. It provides a set of
                  primitives and conventions that let you build fast, accessible web applications
                  without the configuration overhead.
                </p>
                <p className="text-sm leading-relaxed text-blush">
                  The architecture is built around file-based routing, server components, and an
                  extensible plugin system that lets you add functionality as you need it.
                </p>

                {/* Code block */}
                <div className="rounded-xl border border-border bg-obsidian overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-3.5 w-3.5 text-text-faint" />
                      <span className="font-mono text-xs text-text-faint">Terminal</span>
                    </div>
                    <button className="rounded-md border border-border px-2 py-0.5 text-[10px] text-text-faint transition-colors hover:text-chalk cursor-pointer">
                      Copy
                    </button>
                  </div>
                  <pre className="p-4 font-mono text-sm text-chalk overflow-x-auto">
                    <code>{`npx create-acme-app my-project\ncd my-project\nnpm run dev`}</code>
                  </pre>
                </div>

                <h2 className="font-pixel text-xl font-bold text-chalk flex items-center gap-2">
                  <Hash className="h-4 w-4 text-text-faint" />
                  Interactive Guide
                </h2>
                <p className="text-sm leading-relaxed text-blush">
                  Flip through the interactive book below to learn the basics step by step.
                </p>

                {/* Interactive Book */}
                <div className="py-4 overflow-x-auto">
                  <InteractiveBook pages={bookPages} width={320} height={260} />
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* On this page */}
              <div className="rounded-xl border border-border bg-obsidian p-5">
                <h4 className="mb-3 font-pixel text-xs font-semibold text-text-faint uppercase tracking-wider">
                  On This Page
                </h4>
                <ul className="space-y-2">
                  {['Overview', 'Installation', 'Quick Start', 'Interactive Guide', 'Project Structure'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-xs text-blush transition-colors hover:text-ignite">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project structure */}
              <div>
                <h4 className="mb-3 font-pixel text-xs font-semibold text-chalk">Project Structure</h4>
                <FolderPreview name="my-project" files={projectFiles} />
              </div>

              {/* Related links */}
              <div className="rounded-xl border border-border bg-obsidian p-5">
                <h4 className="mb-3 font-pixel text-xs font-semibold text-text-faint uppercase tracking-wider">
                  Related
                </h4>
                <div className="space-y-2">
                  {relatedLinks.map((link) => (
                    <div key={link.label}>
                      <LineHoverLink href={link.href} className="text-sm">
                        {link.label}
                      </LineHoverLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Prev/Next navigation */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 border-t border-border pt-8">
            <a href="#" className="group rounded-xl border border-border bg-obsidian p-4 transition-colors hover:border-ignite/30">
              <span className="text-xs text-text-faint">Previous</span>
              <p className="mt-1 font-pixel text-sm font-semibold text-chalk group-hover:text-ignite transition-colors">
                Configuration
              </p>
            </a>
            <a href="#" className="group rounded-xl border border-border bg-obsidian p-4 text-right transition-colors hover:border-ignite/30">
              <span className="text-xs text-text-faint">Next</span>
              <p className="mt-1 font-pixel text-sm font-semibold text-chalk group-hover:text-ignite transition-colors">
                Architecture
              </p>
            </a>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DocumentationSite
