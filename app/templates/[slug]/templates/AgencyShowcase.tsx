'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Award, Briefcase, Users, Globe } from 'lucide-react'
import LogoSlider from '@/app/components/ui/logo-slider'
import StaggeredGrid from '@/app/components/ui/staggered-grid'
import LiquidOcean from '@/app/components/ui/liquid-ocean'
import CreepyButton from '@/app/components/ui/creepy-button'

const clientLogos = [
  <span key="1" className="font-pixel text-lg text-chalk/60">Nike</span>,
  <span key="2" className="font-pixel text-lg text-chalk/60">Apple</span>,
  <span key="3" className="font-pixel text-lg text-chalk/60">Google</span>,
  <span key="4" className="font-pixel text-lg text-chalk/60">Meta</span>,
  <span key="5" className="font-pixel text-lg text-chalk/60">Spotify</span>,
  <span key="6" className="font-pixel text-lg text-chalk/60">Netflix</span>,
  <span key="7" className="font-pixel text-lg text-chalk/60">Airbnb</span>,
  <span key="8" className="font-pixel text-lg text-chalk/60">Stripe</span>,
]

const projects = [
  {
    title: 'Brand Identity — Nexus',
    category: 'Branding',
    description: 'Complete brand overhaul for a fintech startup, including logo design, typography system, and visual guidelines.',
    year: '2025',
  },
  {
    title: 'E-commerce — VOID',
    category: 'Web Design',
    description: 'Premium streetwear e-commerce platform with immersive product experiences and 3D model integration.',
    year: '2025',
  },
  {
    title: 'Campaign — Pulse',
    category: 'Digital',
    description: 'Multi-platform digital campaign for a health tech launch, reaching 2.4M impressions in 72 hours.',
    year: '2024',
  },
  {
    title: 'App Design — Flow',
    category: 'Product',
    description: 'A meditation and mindfulness app with micro-interactions, haptic feedback design, and adaptive UI.',
    year: '2024',
  },
  {
    title: 'Website — Archetype',
    category: 'Web Design',
    description: 'Architecture firm portfolio with parallax scrolling, WebGL building models, and interactive floor plans.',
    year: '2024',
  },
  {
    title: 'Identity — Drift',
    category: 'Branding',
    description: 'Visual identity for an electric vehicle startup. Motion design system with 200+ animated brand assets.',
    year: '2023',
  },
]

const agencyStats = [
  { number: '150+', label: 'Projects Delivered' },
  { number: '40+', label: 'Global Clients' },
  { number: '12', label: 'Industry Awards' },
  { number: '8', label: 'Years Running' },
]

const services = [
  { icon: <Briefcase className="h-6 w-6" />, title: 'Brand Strategy', description: 'Research-driven brand positioning, naming, and identity systems.' },
  { icon: <Globe className="h-6 w-6" />, title: 'Web & Digital', description: 'High-performance websites, web apps, and digital experiences.' },
  { icon: <Award className="h-6 w-6" />, title: 'Creative Direction', description: 'Campaign concepts, art direction, and motion design.' },
  { icon: <Users className="h-6 w-6" />, title: 'Product Design', description: 'User research, UX/UI design, and design systems.' },
]

const AgencyShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-void">
      {/* Navigation */}
      <nav className="border-b border-border/60 bg-void/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <span className="font-pixel text-base font-bold text-chalk tracking-tight sm:text-xl">OBSIDIAN</span>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#work" className="text-sm text-blush transition-colors hover:text-chalk">Work</a>
            <a href="#services" className="text-sm text-blush transition-colors hover:text-chalk">Services</a>
            <a href="#about" className="text-sm text-blush transition-colors hover:text-chalk">About</a>
            <a href="#contact" className="text-sm text-blush transition-colors hover:text-chalk">Contact</a>
          </div>
          <CreepyButton className="text-xs px-3 py-1.5 sm:text-sm sm:px-5 sm:py-2">Let&apos;s Talk</CreepyButton>
        </div>
      </nav>

      {/* Hero with Liquid Ocean background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LiquidOcean className="h-full w-full rounded-none border-0" waveCount={5} speed={8} />
        </div>
        <div className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 py-20 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 font-pixel text-xs uppercase tracking-[0.3em] text-ignite"
          >
            Creative Agency
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl font-pixel text-4xl font-bold leading-tight text-chalk sm:text-6xl md:text-7xl"
          >
            We craft brands that
            <br />
            <span className="text-ignite">break through noise</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blush sm:text-lg"
          >
            Obsidian is a design-led creative agency specializing in brand strategy,
            digital experiences, and creative campaigns for ambitious companies.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <CreepyButton className="text-sm">View Our Work</CreepyButton>
            <a href="#about" className="text-sm text-blush transition-colors hover:text-chalk">
              About Us &rarr;
            </a>
          </motion.div>
        </div>
      </section>

      {/* Client logos */}
      <section className="border-y border-border bg-obsidian/30 py-10">
        <p className="mb-6 text-center text-xs uppercase tracking-widest text-text-faint">
          Trusted by industry leaders
        </p>
        <LogoSlider logos={clientLogos} speed={25} />
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="mx-auto grid max-w-5xl gap-8 grid-cols-2 lg:grid-cols-4">
          {agencyStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-pixel text-3xl font-bold text-ignite sm:text-4xl">{stat.number}</p>
              <p className="mt-1 text-sm text-blush">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Work / Projects */}
      <section id="work" className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="font-pixel text-xs uppercase tracking-widest text-ignite">Selected Work</span>
            <h2 className="mt-3 font-pixel text-3xl font-bold text-chalk sm:text-4xl">
              Case Studies
            </h2>
          </motion.div>

          <StaggeredGrid staggerDelay={0.1}>
            {projects.map((project) => (
              <div
                key={project.title}
                className="group cursor-pointer rounded-xl border border-border bg-obsidian p-6 transition-colors hover:border-ignite/30"
              >
                {/* Placeholder image area */}
                <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-void/50 border border-border/50">
                  <span className="font-pixel text-xs text-text-faint">{project.category}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-pixel text-sm font-semibold text-chalk">{project.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-blush">{project.description}</p>
                  </div>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-text-faint transition-colors group-hover:text-ignite" />
                </div>
                <span className="mt-3 inline-block text-[10px] text-text-faint">{project.year}</span>
              </div>
            ))}
          </StaggeredGrid>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-border bg-obsidian/30 py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="font-pixel text-xs uppercase tracking-widest text-ignite">What We Do</span>
            <h2 className="mt-3 font-pixel text-3xl font-bold text-chalk">Our Services</h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-obsidian p-6 text-center transition-colors hover:border-ignite/30"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ignite/10 text-ignite">
                  {service.icon}
                </div>
                <h3 className="font-pixel text-sm font-semibold text-chalk">{service.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-blush">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-pixel text-3xl font-bold text-chalk sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mt-4 text-base text-blush">
            We&apos;re always looking for new challenges. Tell us about your project and let&apos;s create something extraordinary together.
          </p>
          <div className="mt-10">
            <CreepyButton className="px-10 py-4 text-base">Start a Project</CreepyButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-pixel text-lg font-bold text-chalk tracking-tight">OBSIDIAN</span>
          <p className="text-xs text-text-faint">&copy; 2026 Obsidian Agency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default AgencyShowcase
