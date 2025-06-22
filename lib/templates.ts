export interface TemplateDefinition {
  slug: string
  title: string
  description: string
  components: string[]
  category: string
}

export const templateRegistry: Record<string, TemplateDefinition> = {
  'startup-landing': {
    slug: 'startup-landing',
    title: 'Startup Landing',
    description:
      'A high-converting landing page with hero section, feature grid, testimonials, and CTA. Uses Animated Hero, Glow Border Cards, and Testimonials Card.',
    components: ['animated-hero', 'glow-border-card', 'testimonials-card', 'animated-button'],
    category: 'Marketing',
  },
  'saas-dashboard': {
    slug: 'saas-dashboard',
    title: 'SaaS Dashboard',
    description:
      'A modern analytics dashboard with animated numbers, bento grid layout, and spotlight navigation. Uses Animated Number, Expandable Bento Grid, and Spotlight Navbar.',
    components: ['animated-number', 'expandable-bento-grid', 'spotlight-navbar', 'light-lines'],
    category: 'Application',
  },
  'developer-portfolio': {
    slug: 'developer-portfolio',
    title: 'Developer Portfolio',
    description:
      'A personal portfolio with 3D text effects, interactive project cards, and a glass dock navigation. Uses Displacement Text, Perspective Grid, and Glass Dock.',
    components: ['displacement-text', 'perspective-grid', 'glass-dock', 'flip-text'],
    category: 'Portfolio',
  },
  'agency-showcase': {
    slug: 'agency-showcase',
    title: 'Agency Showcase',
    description:
      'A bold agency website with marquee logo sliders, staggered project grids, and liquid visual effects. Uses Logo Slider, Staggered Grid, and Liquid Ocean.',
    components: ['logo-slider', 'staggered-grid', 'liquid-ocean', 'creepy-button'],
    category: 'Agency',
  },
  'documentation-site': {
    slug: 'documentation-site',
    title: 'Documentation Site',
    description:
      'A clean docs site template with sidebar navigation, code blocks, interactive book, and folder previews. Uses Interactive Book, Folder Preview, and Line Hover Link.',
    components: ['interactive-book', 'folder-preview', 'line-hover-link', 'flip-fade-text'],
    category: 'Documentation',
  },
  'ecommerce-product': {
    slug: 'ecommerce-product',
    title: 'E-commerce Product',
    description:
      'A product-focused landing page with masked avatar testimonials, social sharing buttons, and animated reveals. Uses Masked Avatars, Social Flip Button, and Reveal Loader.',
    components: ['masked-avatars', 'social-flip-button', 'reveal-loader', 'animated-button'],
    category: 'E-commerce',
  },
  'blog-magazine': {
    slug: 'blog-magazine',
    title: 'Blog & Magazine',
    description:
      'A content-driven blog layout with animated headings, category tabs, parallax hero, and article cards. Uses Typewriter Text, Morphing Text, Animated Tabs, and Parallax Scroll.',
    components: ['typewriter-text', 'morphing-text', 'animated-tabs', 'parallax-scroll'],
    category: 'Content',
  },
  'saas-pricing': {
    slug: 'saas-pricing',
    title: 'SaaS Pricing',
    description:
      'A conversion-focused pricing page with animated counters, spotlight cards, billing toggle, and usage meters. Uses Animated Counter, Spotlight Card, Animated Toggle, and Progress Bar.',
    components: ['animated-counter', 'spotlight-card', 'animated-toggle', 'progress-bar'],
    category: 'SaaS',
  },
}

export const allTemplateSlugs = Object.keys(templateRegistry)

export function getTemplate(slug: string): TemplateDefinition | undefined {
  return templateRegistry[slug]
}
