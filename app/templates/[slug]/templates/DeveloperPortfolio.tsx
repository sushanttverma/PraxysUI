'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, ExternalLink, Code2, Palette, Terminal, Cpu } from 'lucide-react'
import DisplacementText from '@/app/components/ui/displacement-text'
import PerspectiveGrid from '@/app/components/ui/perspective-grid'
import GlassDock from '@/app/components/ui/glass-dock'
import FlipText from '@/app/components/ui/flip-text'

const projects = [
  {
    title: 'AI Code Assistant',
    description: 'A VS Code extension that uses GPT-4 to suggest code completions, refactors, and documentation.',
    tags: ['TypeScript', 'OpenAI', 'VS Code'],
    link: '#',
  },
  {
    title: 'Realtime Dashboard',
    description: 'Live analytics dashboard with WebSocket connections, D3.js charts, and sub-second data updates.',
    tags: ['React', 'D3.js', 'WebSocket'],
    link: '#',
  },
  {
    title: 'CLI Framework',
    description: 'A zero-config CLI framework for Node.js with auto-generated help, argument parsing, and plugins.',
    tags: ['Node.js', 'CLI', 'npm'],
    link: '#',
  },
  {
    title: 'Design System',
    description: 'Component library with 50+ accessible, animated components built for React and Tailwind CSS.',
    tags: ['React', 'Tailwind', 'Storybook'],
    link: '#',
  },
  {
    title: 'API Gateway',
    description: 'High-performance API gateway with rate limiting, caching, authentication, and real-time monitoring.',
    tags: ['Rust', 'gRPC', 'Redis'],
    link: '#',
  },
  {
    title: 'Mobile App',
    description: 'Cross-platform fitness tracking app with social features, offline-first architecture, and health API.',
    tags: ['React Native', 'Expo', 'Firebase'],
    link: '#',
  },
]

const skills = [
  { name: 'TypeScript', level: 95 },
  { name: 'React / Next.js', level: 92 },
  { name: 'Node.js', level: 88 },
  { name: 'Rust', level: 72 },
  { name: 'System Design', level: 85 },
  { name: 'DevOps / CI', level: 78 },
]

const dockItems = [
  { icon: <Github className="h-full w-full" />, label: 'GitHub' },
  { icon: <Twitter className="h-full w-full" />, label: 'Twitter' },
  { icon: <Linkedin className="h-full w-full" />, label: 'LinkedIn' },
  { icon: <Mail className="h-full w-full" />, label: 'Email' },
  { icon: <Code2 className="h-full w-full" />, label: 'Blog' },
  { icon: <Terminal className="h-full w-full" />, label: 'Terminal' },
]

const DeveloperPortfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-20">
        {/* Grid bg */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-ignite) 1px, transparent 1px), linear-gradient(90deg, var(--color-ignite) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center rounded-full border border-ignite/20 bg-ignite/5 px-4 py-1.5"
        >
          <span className="text-xs font-medium tracking-wide text-ignite">Available for hire</span>
        </motion.div>

        <DisplacementText text="Alex Mercer" fontSize={80} className="mb-4" />

        <div className="mt-2 flex items-center gap-2 text-lg text-blush sm:text-xl">
          <span>I build</span>
          <FlipText text="beautiful interfaces" className="font-pixel text-ignite" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-6 max-w-lg text-center text-base leading-relaxed text-blush"
        >
          Full-stack developer with 6+ years of experience building performant web applications,
          design systems, and developer tools.
        </motion.p>

        {/* Dock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <GlassDock items={dockItems} />
        </motion.div>
      </section>

      {/* Skills */}
      <section className="border-y border-border bg-obsidian/30 py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="font-pixel text-xs uppercase tracking-widest text-ignite">Expertise</span>
            <h2 className="mt-3 font-pixel text-2xl font-bold text-chalk sm:text-3xl">
              Skills & Technologies
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border bg-obsidian p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-chalk">{skill.name}</span>
                  <span className="font-pixel text-xs text-ignite">{skill.level}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-void">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-ignite to-ignite/60"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.08 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="font-pixel text-xs uppercase tracking-widest text-ignite">Work</span>
            <h2 className="mt-3 font-pixel text-2xl font-bold text-chalk sm:text-3xl">
              Featured Projects
            </h2>
          </motion.div>

          <PerspectiveGrid tiltAmount={6}>
            {projects.map((project) => (
              <div
                key={project.title}
                className="group rounded-xl border border-border bg-obsidian p-6 transition-colors hover:border-ignite/30"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-pixel text-sm font-semibold text-chalk">{project.title}</h3>
                  <ExternalLink className="h-3.5 w-3.5 text-text-faint transition-colors group-hover:text-ignite" />
                </div>
                <p className="mb-4 text-sm leading-relaxed text-blush">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-void px-2 py-0.5 text-[10px] text-text-faint"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </PerspectiveGrid>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-border bg-obsidian/30 py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-pixel text-2xl font-bold text-chalk sm:text-3xl">Let&apos;s work together</h2>
          <p className="mt-4 text-base text-blush">
            I&apos;m currently open to freelance projects, consulting, and full-time opportunities.
          </p>
          <motion.a
            href="mailto:hello@alexmercer.dev"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-ignite px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-ignite/90"
          >
            <Mail className="h-4 w-4" />
            Get In Touch
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="font-pixel text-sm text-chalk">Alex Mercer</span>
          <p className="text-xs text-text-faint">&copy; 2026. Built with Praxys UI.</p>
        </div>
      </footer>
    </div>
  )
}

export default DeveloperPortfolio
