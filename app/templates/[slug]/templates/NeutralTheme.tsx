'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Minus, ArrowRight, Mail, Github, ExternalLink } from 'lucide-react'
import { buildThemeVars, themePresets } from '@/lib/theme-presets'
import Accordion from '@/app/components/ui/accordion'
import Kbd from '@/app/components/ui/kbd'
import Badge from '@/app/components/ui/badge'
import AnimatedButton from '@/app/components/ui/animated-button'

const preset = themePresets.find((p) => p.name === 'Neutral')!

function useThemeMode(): 'dark' | 'light' {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  useEffect(() => {
    const el = document.documentElement
    const check = () => setMode(el.getAttribute('data-theme') === 'light' ? 'light' : 'dark')
    check()
    const obs = new MutationObserver(check)
    obs.observe(el, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])
  return mode
}

const skills = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS',
  'GraphQL', 'Docker', 'AWS', 'Figma', 'Go', 'Redis',
]

const faqItems = [
  {
    id: 'availability',
    title: 'Are you available for freelance work?',
    content: 'Yes, I\'m currently accepting select freelance projects. I specialize in full-stack web applications and design systems. Reach out via email to discuss your project.',
  },
  {
    id: 'stack',
    title: 'What is your preferred tech stack?',
    content: 'I primarily work with React/Next.js on the frontend, Node.js or Go on the backend, and PostgreSQL for data. I\'m comfortable adapting to whatever stack best fits the project.',
  },
  {
    id: 'timeline',
    title: 'What is your typical project timeline?',
    content: 'Small projects take 2-4 weeks, medium projects 1-3 months, and large-scale applications 3-6 months. I provide detailed timelines during the initial consultation.',
  },
  {
    id: 'process',
    title: 'What does your development process look like?',
    content: 'I follow an iterative process: discovery, design, development, and deployment. Weekly check-ins and demo sessions keep you involved at every step.',
  },
]

const shortcuts = [
  { keys: ['Ctrl', 'K'], action: 'Quick search' },
  { keys: ['Ctrl', 'B'], action: 'Toggle sidebar' },
  { keys: ['Ctrl', '/'], action: 'Command palette' },
  { keys: ['Ctrl', 'Shift', 'P'], action: 'Open projects' },
]

const projects = [
  { title: 'Design System', description: 'A comprehensive component library used by 200+ developers.', status: 'Active' },
  { title: 'CLI Toolkit', description: 'Command-line tools for scaffolding modern web applications.', status: 'Active' },
  { title: 'Data Viz Engine', description: 'Real-time data visualization framework with chart primitives.', status: 'Beta' },
]

export default function NeutralTheme() {
  const mode = useThemeMode()
  const themeVars = buildThemeVars(mode === 'light' ? preset.light : preset.dark)

  return (
    <div style={themeVars} className="min-h-screen bg-void">
      {/* Header */}
      <header className="border-b border-border bg-void/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ignite">
              <Minus className="h-4 w-4 text-void" />
            </div>
            <span className="font-pixel text-lg font-semibold text-chalk">mono</span>
          </div>
          <nav className="hidden items-center gap-6 sm:flex">
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Work</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">About</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Blog</span>
          </nav>
          <button className="flex h-8 items-center rounded-lg bg-ignite px-3 text-xs font-medium text-void cursor-pointer">
            Contact
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ignite/30 bg-ignite/10 px-3 py-1 text-xs font-medium text-ignite mb-6">
              Neutral Theme Preview
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-pixel text-3xl font-bold text-chalk sm:text-5xl leading-tight"
          >
            Less noise. More signal.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base text-blush leading-relaxed"
          >
            I&apos;m a full-stack developer who believes in simplicity. Clean code, minimal interfaces,
            maximum impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <AnimatedButton className="bg-ignite text-void border-ignite">
              View Projects
            </AnimatedButton>
            <button className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-blush hover:text-chalk transition-colors cursor-pointer">
              Read Blog
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-y border-border bg-obsidian/50 py-10">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="default" size="md">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="font-pixel text-2xl font-bold text-chalk sm:text-3xl">Projects</h2>
          <p className="mt-3 text-sm text-blush">Things I&apos;ve built and am building.</p>
        </div>

        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="group flex items-center justify-between rounded-xl border border-border bg-obsidian p-5 transition-colors hover:border-ignite/30"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-pixel text-sm font-bold text-chalk">{project.title}</h3>
                  <Badge variant={project.status === 'Active' ? 'success' : 'info'} size="sm">
                    {project.status}
                  </Badge>
                </div>
                <p className="text-sm text-blush truncate">{project.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-text-faint group-hover:text-ignite transition-colors ml-4" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section className="border-y border-border bg-obsidian/30 py-16">
        <div className="mx-auto max-w-xl px-6">
          <div className="text-center mb-10">
            <h2 className="font-pixel text-xl font-bold text-chalk">Keyboard Shortcuts</h2>
            <p className="mt-2 text-sm text-blush">Navigate faster with these shortcuts.</p>
          </div>

          <div className="space-y-3 rounded-2xl border border-border bg-obsidian p-6">
            {shortcuts.map((sc) => (
              <div key={sc.action} className="flex items-center justify-between">
                <span className="text-sm text-blush">{sc.action}</span>
                <div className="flex items-center gap-1">
                  {sc.keys.map((key, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <Kbd>{key}</Kbd>
                      {i < sc.keys.length - 1 && <span className="text-text-faint text-xs">+</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <div className="text-center mb-10">
          <h2 className="font-pixel text-2xl font-bold text-chalk sm:text-3xl">FAQ</h2>
          <p className="mt-3 text-sm text-blush">Common questions about working together.</p>
        </div>
        <Accordion items={faqItems} defaultOpen={['availability']} />
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 text-center">
        <div className="mx-auto max-w-lg px-6">
          <h2 className="font-pixel text-xl font-bold text-chalk sm:text-2xl">
            Let&apos;s build something
          </h2>
          <p className="mt-3 text-sm text-blush">
            Available for freelance, consulting, and open-source collaboration.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <AnimatedButton className="bg-ignite text-void border-ignite">
              <Mail className="h-3.5 w-3.5 mr-1.5 inline" />
              Email Me
            </AnimatedButton>
            <button className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-blush hover:text-chalk transition-colors cursor-pointer">
              <Github className="h-3.5 w-3.5" />
              GitHub
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
