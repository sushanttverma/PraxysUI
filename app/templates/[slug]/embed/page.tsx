import { allTemplateSlugs } from '@/lib/templates'
import TemplateEmbedClient from './TemplateEmbedClient'

export function generateStaticParams() {
  return allTemplateSlugs.map((slug) => ({ slug }))
}

export default async function TemplateEmbedPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <TemplateEmbedClient slug={slug} />
}
