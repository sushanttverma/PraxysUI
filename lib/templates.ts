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
  'ocean-theme': {
    slug: 'ocean-theme',
    title: 'Ocean Theme',
    description:
      'A cloud SaaS landing page themed with the Ocean preset — deep navy and cyan tones. Features Typewriter Text, Spotlight Cards, Animated Counters, and Animated Buttons.',
    components: ['typewriter-text', 'spotlight-card', 'animated-counter', 'animated-button'],
    category: 'Theme',
  },
  'forest-theme': {
    slug: 'forest-theme',
    title: 'Forest Theme',
    description:
      'A sustainability-focused landing page themed with the Forest preset — rich greens and earth tones. Features Morphing Text, Glow Border Cards, Progress Bars, and Animated Buttons.',
    components: ['morphing-text', 'glow-border-card', 'progress-bar', 'animated-button'],
    category: 'Theme',
  },
  'purple-haze-theme': {
    slug: 'purple-haze-theme',
    title: 'Purple Haze Theme',
    description:
      'A creative agency page themed with the Purple Haze preset — vibrant purples and magentas. Features Animated Tabs, Spotlight Cards, Animated Counters, and Animated Buttons.',
    components: ['animated-tabs', 'spotlight-card', 'animated-counter', 'animated-button'],
    category: 'Theme',
  },
  'rose-gold-theme': {
    slug: 'rose-gold-theme',
    title: 'Rose Gold Theme',
    description:
      'A luxury brand landing page themed with the Rose Gold preset — warm pinks and gold accents. Features Typewriter Text, Spotlight Cards, Animated Counters, and Animated Buttons.',
    components: ['typewriter-text', 'spotlight-card', 'animated-counter', 'animated-button'],
    category: 'Theme',
  },
  'amber-theme': {
    slug: 'amber-theme',
    title: 'Amber Theme',
    description:
      'A restaurant landing page themed with the Amber preset — warm oranges and golden tones. Features Spotlight Cards, Animated Counters, Animated Buttons, and Tooltips.',
    components: ['spotlight-card', 'animated-counter', 'animated-button', 'tooltip'],
    category: 'Theme',
  },
  'neutral-theme': {
    slug: 'neutral-theme',
    title: 'Neutral Theme',
    description:
      'A minimal portfolio page themed with the Neutral preset — monochromatic grays. Features Accordion, Kbd, Badge, and Animated Buttons.',
    components: ['accordion', 'kbd', 'badge', 'animated-button'],
    category: 'Theme',
  },
}

export const allTemplateSlugs = Object.keys(templateRegistry)

export function getTemplate(slug: string): TemplateDefinition | undefined {
  return templateRegistry[slug]
}
