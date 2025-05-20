'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, BarChart3, Users, Globe, Layers } from 'lucide-react'
import AnimatedHero from '@/app/components/ui/animated-hero'
import GlowBorderCard from '@/app/components/ui/glow-border-card'
import TestimonialsCard from '@/app/components/ui/testimonials-card'
import AnimatedButton from '@/app/components/ui/animated-button'

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Lightning Fast',
    description: 'Optimized for speed with lazy loading, code splitting, and edge caching. Your users will never wait.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption, SSO, and role-based access control built in.',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Real-time Analytics',
    description: 'Track every metric that matters. Custom dashboards, alerts, and automated reports.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Team Collaboration',
    description: 'Built for teams of any size. Comments, mentions, shared workspaces, and audit logs.',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Global CDN',
    description: 'Deploy to 200+ edge locations worldwide. Sub-50ms latency for every user.',
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: 'API First',
    description: 'RESTful and GraphQL APIs with comprehensive documentation and SDK support.',
  },
]

const testimonials = [
  {
    quote: 'This product completely transformed how we onboard customers. Our conversion rate jumped 40% in the first month.',
    author: 'Sarah Chen',
    role: 'Head of Growth, Acme Corp',
  },
  {
    quote: 'The developer experience is unmatched. We shipped our integration in two days instead of two weeks.',
    author: 'Marcus Johnson',
    role: 'CTO, TechStart',
  },
  {
    quote: 'Finally a tool that actually delivers on its promise. Clean UI, great performance, solid docs.',
    author: 'Aisha Patel',
    role: 'Product Lead, ScaleUp',
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'Perfect for side projects and experiments.',
    features: ['Up to 1,000 events/mo', '1 team member', 'Community support', 'Basic analytics'],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For growing teams that need more power.',
    features: ['Unlimited events', 'Up to 10 members', 'Priority support', 'Advanced analytics', 'Custom domains', 'API access'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with advanced needs.',
    features: ['Everything in Pro', 'Unlimited members', 'Dedicated support', 'SSO & SAML', 'SLA guarantee', 'Custom integrations'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const StartupLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-void">
      {/* Navigation */}
      <nav className="border-b border-border/60 bg-void/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ignite">
              <span className="font-pixel text-sm font-bold text-void">S</span>
            </div>
            <span className="font-pixel text-lg font-semibold text-chalk">StartupKit</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-blush transition-colors hover:text-chalk">Features</a>
            <a href="#testimonials" className="text-sm text-blush transition-colors hover:text-chalk">Testimonials</a>
            <a href="#pricing" className="text-sm text-blush transition-colors hover:text-chalk">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm text-blush transition-colors hover:text-chalk">Log in</a>
            <AnimatedButton className="text-sm">Get Started</AnimatedButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-8 pb-16">
        <div className="mx-auto max-w-6xl">
          <AnimatedHero
            badge="Now in Public Beta"
            title="Ship faster with less complexity"
            subtitle="The all-in-one platform that helps startups build, launch, and scale their products without the enterprise overhead."
            primaryCta={{ label: 'Start Building Free', href: '#' }}
            secondaryCta={{ label: 'View Demo', href: '#' }}
          />
        </div>
      </section>

      {/* Logos / Social proof */}
      <section className="border-y border-border bg-obsidian/50 py-8">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-6 text-center text-xs uppercase tracking-widest text-text-faint">
            Trusted by forward-thinking teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {['Vercel', 'Stripe', 'Linear', 'Notion', 'Figma', 'Supabase'].map((name) => (
              <span key={name} className="font-pixel text-sm text-text-faint/60 transition-colors hover:text-blush">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="font-pixel text-xs uppercase tracking-widest text-ignite">Features</span>
            <h2 className="mt-3 font-pixel text-3xl font-bold text-chalk sm:text-4xl">
              Everything you need to ship
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-blush">
              A complete toolkit designed for modern startups. No bloat, no unnecessary complexity.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <GlowBorderCard>
                  <div className="mb-3 text-ignite">{feature.icon}</div>
                  <h3 className="font-pixel text-sm font-semibold text-chalk">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blush">{feature.description}</p>
                </GlowBorderCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-y border-border bg-obsidian/30 py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="font-pixel text-xs uppercase tracking-widest text-ignite">Testimonials</span>
            <h2 className="mt-3 font-pixel text-3xl font-bold text-chalk">
              Loved by builders
            </h2>
          </motion.div>

          <div className="mx-auto max-w-2xl">
            <TestimonialsCard testimonials={testimonials} interval={4000} />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="font-pixel text-xs uppercase tracking-widest text-ignite">Pricing</span>
            <h2 className="mt-3 font-pixel text-3xl font-bold text-chalk">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-blush">
              Start free. Scale when you&apos;re ready. No hidden fees.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {pricingPlans.map((plan) => (
              <motion.div key={plan.name} variants={itemVariants}>
                <div
                  className={`relative flex flex-col rounded-xl border p-6 transition-colors ${
                    plan.highlighted
                      ? 'border-ignite/40 bg-ignite/5'
                      : 'border-border bg-obsidian'
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ignite px-3 py-0.5 font-pixel text-[10px] font-bold text-void">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-pixel text-sm font-semibold text-chalk">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-pixel text-3xl font-bold text-chalk">{plan.price}</span>
                    {plan.period && <span className="text-sm text-blush">{plan.period}</span>}
                  </div>
                  <p className="mt-2 text-sm text-blush">{plan.description}</p>
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-chalk">
                        <span className="text-ignite">&#10003;</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    {plan.highlighted ? (
                      <AnimatedButton className="w-full text-sm">{plan.cta}</AnimatedButton>
                    ) : (
                      <button className="w-full rounded-lg border border-border py-2.5 text-sm font-medium text-chalk transition-colors hover:border-border-light hover:text-ignite cursor-pointer">
                        {plan.cta}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-obsidian/30 py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-pixel text-3xl font-bold text-chalk">
            Ready to build something great?
          </h2>
          <p className="mt-4 text-base text-blush">
            Join thousands of startups already using our platform to ship faster.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <AnimatedButton className="text-sm">
              Get Started Free <ArrowRight className="ml-1.5 inline h-4 w-4" />
            </AnimatedButton>
            <a href="#" className="text-sm text-blush transition-colors hover:text-chalk">
              Talk to Sales &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-ignite">
              <span className="font-pixel text-[10px] font-bold text-void">S</span>
            </div>
            <span className="font-pixel text-sm text-chalk">StartupKit</span>
          </div>
          <p className="text-xs text-text-faint">&copy; 2026 StartupKit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default StartupLanding
