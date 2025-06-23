'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  X,
  Zap,
  Shield,
  Headphones,
  ArrowRight,
  Star,
  Users,
} from 'lucide-react'
import AnimatedCounter from '@/app/components/ui/animated-counter'
import SpotlightCard from '@/app/components/ui/spotlight-card'
import AnimatedToggle from '@/app/components/ui/animated-toggle'
import ProgressBar from '@/app/components/ui/progress-bar'

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for side projects and small teams getting started.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    popular: false,
    features: [
      { text: 'Up to 3 projects', included: true },
      { text: '1,000 API requests/mo', included: true },
      { text: 'Community support', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Custom domains', included: false },
      { text: 'Team collaboration', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Pro',
    description: 'For growing teams that need more power and flexibility.',
    monthlyPrice: 29,
    yearlyPrice: 24,
    popular: true,
    features: [
      { text: 'Unlimited projects', included: true },
      { text: '100,000 API requests/mo', included: true },
      { text: 'Email support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom domains', included: true },
      { text: 'Team collaboration', included: true },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Enterprise',
    description: 'For organizations that need enterprise-grade features.',
    monthlyPrice: 99,
    yearlyPrice: 79,
    popular: false,
    features: [
      { text: 'Unlimited everything', included: true },
      { text: 'Unlimited API requests', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Custom analytics', included: true },
      { text: 'Custom domains', included: true },
      { text: 'Team collaboration', included: true },
      { text: 'Priority support', included: true },
    ],
  },
]

const stats = [
  { label: 'Active Users', value: 12400 },
  { label: 'API Uptime', value: 99.9 },
  { label: 'Avg Response', value: 42 },
]

export default function SaaSPricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-void">
      {/* Header */}
      <header className="border-b border-border bg-void/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ignite">
              <Zap className="h-4 w-4 text-void" />
            </div>
            <span className="font-pixel text-lg font-semibold text-chalk">Acme SaaS</span>
          </div>
          <nav className="hidden items-center gap-6 sm:flex">
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Features</span>
            <span className="text-sm text-ignite cursor-pointer">Pricing</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Docs</span>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex h-8 items-center rounded-lg border border-border px-3 text-xs text-blush hover:text-chalk transition-colors cursor-pointer">
              Sign in
            </button>
            <button className="flex h-8 items-center rounded-lg bg-ignite px-3 text-xs font-medium text-void cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[400px] w-[500px] rounded-full bg-ignite/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ignite/30 bg-ignite/10 px-3 py-1 text-xs font-medium text-ignite mb-6">
              <Star className="h-3 w-3" />
              Trusted by 12,000+ developers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-pixel text-3xl font-bold text-chalk sm:text-5xl leading-tight"
          >
            Simple pricing,{' '}
            <span className="text-ignite">powerful features</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base text-blush leading-relaxed"
          >
            Choose the plan that fits your needs. Start free, scale as you grow. No hidden fees.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <span className={`text-sm transition-colors ${!isYearly ? 'text-chalk' : 'text-text-faint'}`}>Monthly</span>
            <AnimatedToggle
              checked={isYearly}
              onChange={setIsYearly}
            />
            <span className={`text-sm transition-colors ${isYearly ? 'text-chalk' : 'text-text-faint'}`}>
              Yearly
              <span className="ml-1.5 rounded-full bg-ignite/10 px-2 py-0.5 text-[10px] font-medium text-ignite">
                Save 20%
              </span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-obsidian/50 py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 px-6 sm:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-pixel text-2xl font-bold text-chalk">
                <AnimatedCounter
                  to={stat.value}
                  duration={2}
                  decimals={stat.label === 'API Uptime' ? 1 : 0}
                  suffix={
                    stat.label === 'API Uptime'
                      ? '%'
                      : stat.label === 'Active Users'
                        ? '+'
                        : 'ms'
                  }
                  className="text-2xl"
                />
              </div>
              <p className="mt-1 text-xs text-text-faint">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing cards */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <SpotlightCard className={`relative flex flex-col h-full rounded-2xl border ${
                plan.popular
                  ? 'border-ignite/30 bg-obsidian shadow-lg shadow-ignite/5'
                  : 'border-border bg-obsidian'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ignite px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-void">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-pixel text-lg font-bold text-chalk">{plan.name}</h3>
                  <p className="mt-1 text-sm text-blush">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isYearly ? 'yearly' : 'monthly'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-baseline gap-1"
                    >
                      <span className="font-pixel text-4xl font-bold text-chalk">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      {plan.monthlyPrice > 0 && (
                        <span className="text-sm text-text-faint">/month</span>
                      )}
                    </motion.div>
                  </AnimatePresence>
                  {plan.monthlyPrice === 0 && (
                    <p className="mt-1 text-xs text-text-faint">Free forever</p>
                  )}
                  {isYearly && plan.monthlyPrice > 0 && (
                    <p className="mt-1 text-xs text-ignite">
                      ${plan.yearlyPrice * 12}/year (save ${(plan.monthlyPrice - plan.yearlyPrice) * 12})
                    </p>
                  )}
                </div>

                {/* CTA */}
                <button
                  className={`mb-6 flex h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    plan.popular
                      ? 'bg-ignite text-void hover:bg-ignite/90'
                      : 'border border-border text-blush hover:border-border-light hover:text-chalk'
                  }`}
                >
                  {plan.monthlyPrice === 0 ? 'Start Free' : 'Get Started'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                {/* Features */}
                <ul className="flex-1 space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat.text} className="flex items-center gap-2.5">
                      {feat.included ? (
                        <Check className="h-3.5 w-3.5 shrink-0 text-ignite" />
                      ) : (
                        <X className="h-3.5 w-3.5 shrink-0 text-text-faint/40" />
                      )}
                      <span className={`text-sm ${feat.included ? 'text-blush' : 'text-text-faint/40'}`}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Usage meter section */}
      <section className="border-t border-border bg-obsidian/30 py-16">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center mb-10">
            <h2 className="font-pixel text-xl font-bold text-chalk">Usage Dashboard Preview</h2>
            <p className="mt-2 text-sm text-blush">Track your usage in real-time with our built-in dashboard.</p>
          </div>

          <div className="space-y-6 rounded-2xl border border-border bg-obsidian p-6 sm:p-8">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-blush">API Requests</span>
                <span className="text-text-faint">67,500 / 100,000</span>
              </div>
              <ProgressBar value={67.5} max={100} />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-blush">Storage</span>
                <span className="text-text-faint">4.2 GB / 10 GB</span>
              </div>
              <ProgressBar value={42} max={100} />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-blush">Team Members</span>
                <span className="text-text-faint">8 / 15</span>
              </div>
              <ProgressBar value={53} max={100} />
            </div>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2 text-text-faint">
              <Shield className="h-5 w-5" />
              <span className="text-sm">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-text-faint">
              <Headphones className="h-5 w-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-text-faint">
              <Users className="h-5 w-5" />
              <span className="text-sm">12,000+ Users</span>
            </div>
            <div className="flex items-center gap-2 text-text-faint">
              <Zap className="h-5 w-5" />
              <span className="text-sm">99.9% Uptime</span>
            </div>
          </div>

          <p className="mt-8 text-xs text-text-faint">
            All plans include SSL, DDoS protection, and automatic backups.
          </p>
        </div>
      </section>
    </div>
  )
}
