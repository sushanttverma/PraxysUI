import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { templateRegistry, allTemplateSlugs } from '@/lib/templates'
import TemplatePreviewClient from './TemplatePreviewClient'

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

  return <TemplatePreviewClient slug={slug} template={template} />
}
