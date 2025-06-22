import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { readFileSync } from 'fs'
import { join } from 'path'
import { codeToHtml } from 'shiki'
import { templateRegistry, allTemplateSlugs } from '@/lib/templates'
import TemplatePreviewClient from './TemplatePreviewClient'

// Map slugs to their source filenames
const templateFiles: Record<string, string> = {
  'startup-landing': 'StartupLanding.tsx',
  'saas-dashboard': 'SaaSDashboard.tsx',
  'developer-portfolio': 'DeveloperPortfolio.tsx',
  'agency-showcase': 'AgencyShowcase.tsx',
  'documentation-site': 'DocumentationSite.tsx',
  'ecommerce-product': 'EcommerceProduct.tsx',
  'blog-magazine': 'BlogMagazine.tsx',
  'saas-pricing': 'SaaSPricing.tsx',
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allTemplateSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const template = templateRegistry[slug]
  if (!template) return {}

  return {
    title: `${template.title} Template`,
    description: template.description,
  }
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params
  const template = templateRegistry[slug]

  if (!template) {
    notFound()
  }

  // Read template source code at build time
  const filename = templateFiles[slug]
  let code = ''
  let darkHtml = ''
  let lightHtml = ''

  if (filename) {
    const filePath = join(process.cwd(), 'app', 'templates', '[slug]', 'templates', filename)
    code = readFileSync(filePath, 'utf-8')

    // Pre-render syntax highlighting for both themes
    ;[darkHtml, lightHtml] = await Promise.all([
      codeToHtml(code.trim(), { lang: 'tsx', theme: 'vitesse-dark' }),
      codeToHtml(code.trim(), { lang: 'tsx', theme: 'vitesse-light' }),
    ])
  }

  return (
    <TemplatePreviewClient
      slug={slug}
      template={template}
      code={code}
      darkHtml={darkHtml}
      lightHtml={lightHtml}
    />
  )
}
