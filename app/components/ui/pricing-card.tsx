'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  title: string
  price: string
  period?: string
  features: string[]
  cta?: string
  popular?: boolean
  onCtaClick?: () => void
  className?: string
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period = '/mo',
  features,
  cta = 'Get Started',
  popular = false,
  onCtaClick,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 24 }}
      className={cn(
        'relative flex flex-col rounded-xl border bg-obsidian p-6 transition-shadow',
        popular
          ? 'border-ignite shadow-[0_0_24px_rgba(232,78,45,0.15)]'
          : 'border-border',
        className
      )}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-ignite px-3 py-0.5 text-xs font-semibold text-chalk">
            Popular
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-chalk">{title}</h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-chalk">{price}</span>
        {period && (
          <span className="text-sm text-text-faint">{period}</span>
        )}
      </div>

      {/* Features */}
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="flex items-center gap-2 text-sm text-blush"
          >
            <svg
              className="h-4 w-4 shrink-0 text-ignite"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8.5L6.5 12L13 4" />
            </svg>
            {feature}
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onCtaClick}
        className={cn(
          'mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
          popular
            ? 'bg-ignite text-chalk hover:bg-ignite/90'
            : 'border border-border bg-void text-chalk hover:border-ignite/40 hover:text-ignite'
        )}
      >
        {cta}
      </motion.button>
    </motion.div>
  )
}

export default PricingCard
