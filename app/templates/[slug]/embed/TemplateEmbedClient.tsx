'use client'

import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'

const templateComponents: Record<string, React.LazyExoticComponent<React.FC>> = {
  'startup-landing': lazy(() => import('../templates/StartupLanding')),
  'saas-dashboard': lazy(() => import('../templates/SaaSDashboard')),
  'developer-portfolio': lazy(() => import('../templates/DeveloperPortfolio')),
  'agency-showcase': lazy(() => import('../templates/AgencyShowcase')),
  'documentation-site': lazy(() => import('../templates/DocumentationSite')),
  'ecommerce-product': lazy(() => import('../templates/EcommerceProduct')),
}

function EmbedSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-void">
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

export default function TemplateEmbedClient({ slug }: { slug: string }) {
  const TemplateComponent = templateComponents[slug]

  if (!TemplateComponent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void">
        <p className="font-pixel text-sm text-text-faint">Template not found</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<EmbedSkeleton />}>
      <TemplateComponent />
    </Suspense>
  )
}
