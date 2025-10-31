'use client'

import PricingCard from '@/app/components/ui/pricing-card'

export default function PricingCardDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        <PricingCard
          title="Starter"
          price="$9"
          period="/mo"
          features={['5 Projects', '10 GB Storage', 'Email Support']}
          cta="Get Started"
        />
        <PricingCard
          title="Pro"
          price="$29"
          period="/mo"
          features={['Unlimited Projects', '100 GB Storage', 'Priority Support', 'API Access']}
          cta="Upgrade to Pro"
          popular
        />
        <PricingCard
          title="Enterprise"
          price="$99"
          period="/mo"
          features={['Everything in Pro', '1 TB Storage', 'Dedicated Manager', 'Custom SLA']}
          cta="Contact Sales"
        />
      </div>
    </div>
  )
}
