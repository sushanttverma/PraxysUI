'use client'

import ComparisonTable from '@/app/components/ui/comparison-table'

const plans = [
  {
    name: 'Free',
    features: {
      'Projects': '3',
      'Storage': '1 GB',
      'API Access': false,
      'Custom Domains': false,
      'Priority Support': false,
      'SSO': false,
    },
  },
  {
    name: 'Pro',
    features: {
      'Projects': 'Unlimited',
      'Storage': '100 GB',
      'API Access': true,
      'Custom Domains': true,
      'Priority Support': true,
      'SSO': false,
    },
  },
  {
    name: 'Enterprise',
    features: {
      'Projects': 'Unlimited',
      'Storage': '1 TB',
      'API Access': true,
      'Custom Domains': true,
      'Priority Support': true,
      'SSO': true,
    },
  },
]

const featureLabels = [
  'Projects',
  'Storage',
  'API Access',
  'Custom Domains',
  'Priority Support',
  'SSO',
]

export default function ComparisonTableDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <ComparisonTable
        plans={plans}
        featureLabels={featureLabels}
        className="max-w-2xl"
      />
    </div>
  )
}
