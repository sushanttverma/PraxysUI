// ─── Single source of truth for changelog data ──────────
// Both the website (/changelog) and CHANGELOG.md are derived from this file.

export type ChangeType = 'added' | 'fixed' | 'improved'

export interface ChangeItem {
  type: ChangeType
  text: string
}

export interface ChangelogEntry {
  version: string
  date: string
  title: string
  description: string
  /** Lucide icon name — resolved in the UI component */
  iconName: 'sparkles' | 'puzzle' | 'shield' | 'wrench' | 'terminal' | 'search' | 'palette' | 'zap'
  changes: ChangeItem[]
}

export const changelog: ChangelogEntry[] = [
  {
    version: '1.3.4',
    date: 'Feb 24, 2026',
    title: '100 Components Milestone',
    description:
      '29 new components across all 6 categories — buttons/forms, cards, text effects, navigation, visual effects, and media — bringing the total to 100.',
    iconName: 'sparkles',
    changes: [
      { type: 'added', text: 'Toggle Group — segmented control with layoutId spring animation, three sizes' },
      { type: 'added', text: 'Number Input — numeric stepper with animated increment/decrement buttons, min/max/step' },
      { type: 'added', text: 'Search Input — search bar with animated icon, loading spinner, and clear button' },
      { type: 'added', text: 'Password Input — show/hide toggle with AnimatePresence eye icon transitions' },
      { type: 'added', text: 'Range Slider — dual-thumb range slider with drag interaction and step snapping' },
      { type: 'added', text: 'Copy Button — click-to-copy with animated icon transition and clipboard API' },
      { type: 'added', text: 'Mention Input — text input with @ detection, dropdown user list, keyboard navigation' },
      { type: 'added', text: 'Pricing Card — animated card with feature list, CTA, popular badge, hover scale' },
      { type: 'added', text: 'Profile Card — avatar, online indicator, social links, staggered entrance' },
      { type: 'added', text: 'Feature Card — icon card with 3D cursor-following tilt effect' },
      { type: 'added', text: 'Comparison Table — side-by-side plans with check/cross icons and staggered rows' },
      { type: 'added', text: 'Stat Bar — horizontal bar with scroll-triggered spring fill animation' },
      { type: 'added', text: 'Gradient Text — animated gradient using background-clip with configurable colors' },
      { type: 'added', text: 'Scramble Text — decode effect revealing characters with random scrambling' },
      { type: 'added', text: 'Text Reveal — word-by-word entrance with staggered scroll-triggered animation' },
      { type: 'added', text: 'Glitch Text — RGB split effect with clip-path slicing and intensity levels' },
      { type: 'added', text: 'Sidebar — collapsible navigation with animated width, staggered items, sub-items' },
      { type: 'added', text: 'Bottom Sheet — mobile drawer with drag-to-dismiss, snap points, spring animation' },
      { type: 'added', text: 'Popover — floating popover with 4 sides, 3 alignments, arrow, click-outside close' },
      { type: 'added', text: 'Context Menu — right-click menu with keyboard navigation, dividers, ARIA roles' },
      { type: 'added', text: 'Mega Menu — large dropdown with hover trigger, multi-column grid sections' },
      { type: 'added', text: 'Confetti — celebration burst with deterministic particle physics animation' },
      { type: 'added', text: 'Particles — floating particle background with seeded drift paths' },
      { type: 'added', text: 'Noise Texture — animated SVG grain overlay with feTurbulence filter' },
      { type: 'added', text: 'Aurora — aurora borealis gradient blobs with smooth keyframe paths' },
      { type: 'added', text: 'Blur Fade — entrance wrapper with blur + fade from configurable direction' },
      { type: 'added', text: 'Carousel — image carousel with directional slides, auto-play, dot navigation' },
      { type: 'added', text: 'Avatar — four sizes, status indicators, fallback initials, animated dot' },
      { type: 'added', text: 'Lightbox — fullscreen viewer with zoom, arrow keys, thumbnails, backdrop blur' },
      { type: 'improved', text: 'CLI registry expanded from 71 to 100 components' },
      { type: 'improved', text: 'Component count updated across README, CLI README, and installation page' },
      { type: 'fixed', text: 'TypewriterText — resolved max update depth error from setTimeout(0) loops' },
      { type: 'fixed', text: 'Confetti/Particles — replaced Math.random() with deterministic seeded PRNG for React 19 purity' },
      { type: 'fixed', text: 'Lightbox — refactored to avoid ref access and setState during render' },
    ],
  },
  {
    version: '1.3.3',
    date: 'Feb 24, 2026',
    title: 'CLI Overhaul — Full Component Management',
    description:
      'Major CLI upgrade with a rich metadata registry, 10 new commands, interactive picker, parallel fetching, did-you-mean suggestions, and project diagnostics.',
    iconName: 'terminal',
    changes: [
      { type: 'added', text: 'Component Registry — replaced flat array with typed registry containing title, description, category, dependencies, and isNew for all 71 components' },
      { type: 'added', text: '`info` command — show component metadata (title, category, dependencies, docs link) without installing' },
      { type: 'added', text: '`view` command — fetch and display source code with syntax highlighting (keywords, strings, comments)' },
      { type: 'added', text: '`diff` command — compare local file with latest remote version, colorized line-by-line diff' },
      { type: 'added', text: '`remove` command — delete a component file with confirmation prompt. Alias: `rm`' },
      { type: 'added', text: '`update` command — update one or all installed components with diff summary and confirmation. `--check` flag for dry-run' },
      { type: 'added', text: '`doctor` command — check project health: config file, directories, utils, core dependencies, installed count' },
      { type: 'added', text: '`stats` command — visual dashboard with installed vs available counts per category and bar chart' },
      { type: 'added', text: 'Interactive add picker — run `add` with no arguments for a categorized multi-select component browser' },
      { type: 'added', text: 'Multi-component add — `add accordion alert badge` adds multiple components in one command' },
      { type: 'added', text: '`--install-deps` flag on `add` — auto-detect package manager and install component dependencies' },
      { type: 'added', text: '`--installed` flag on `list` — filter to only locally installed components' },
      { type: 'added', text: '`--category`, `--new`, `--search` flags on `list` — filter and search components' },
      { type: 'added', text: 'Config file — `init` writes `praxys.config.json` with component and utils directories' },
      { type: 'added', text: 'Did-you-mean suggestions — typo `animted-button` suggests `animated-button` (Levenshtein distance)' },
      { type: 'added', text: 'Command aliases — `i` for init, `ls` for list, `rm` for remove' },
      { type: 'added', text: 'Parallel fetching — multi-component adds fetch in batches of 6 concurrently' },
      { type: 'added', text: 'CLI update notice — checks npm registry after each command and notifies if a newer version exists' },
      { type: 'improved', text: '`list` output — grouped by category with colored headers, NEW badges, and truncated descriptions' },
      { type: 'improved', text: '`add` — reads component directory from config if no `--dir` flag provided' },
      { type: 'improved', text: 'All commands — consistent error messages with did-you-mean suggestions for unknown slugs' },
    ],
  },
  {
    version: '1.2.9',
    date: 'Feb 22, 2026',
    title: 'Site Redesign & New Tools',
    description:
      'Complete landing page redesign with experimental hero, bento showcase, and numbers bar. New standalone components page with search and live demos. Page transitions, responsive preview modes, and editorial-style page headers.',
    iconName: 'sparkles',
    changes: [
      { type: 'added', text: 'New Landing Page — experimental hero section, bento component showcase, numbers bar, and redesigned footer' },
      { type: 'added', text: 'Components Page — standalone /components with search, category filters, and lazy-loaded live demos' },
      { type: 'added', text: 'Page Transitions — smooth transitions between pages' },
      { type: 'added', text: 'Responsive Preview Modes — preview components at different viewport sizes' },
      { type: 'added', text: '"New" Component Labels — badge on recently added components' },
      { type: 'added', text: 'Back-to-Top Button — added to content pages' },
      { type: 'added', text: 'Global Command Palette — integrated across the redesigned site' },
      { type: 'improved', text: 'Page Headers — redesigned to editorial style with updated button aesthetics' },
      { type: 'improved', text: 'Navbar — reorganized items with icons, refined expanded menu layout' },
      { type: 'improved', text: 'Routing — moved from /docs/[slug] to standalone /components/[slug] and /components/install' },
      { type: 'improved', text: 'Component Demos — lazy loading with useInView for better performance' },
      { type: 'improved', text: 'Hero Component — centralized site metadata' },
    ],
  },
  {
    version: '1.2.8',
    date: 'Feb 19, 2026',
    title: 'Animation Studio Rebuild & Design Tools',
    description:
      'Rebuilt Animation Studio from scratch with GSAP engine and timeline editor. Added Shadow Lab for layered box-shadow design and Glassmorphism tool for frosted glass effects. Replaced fixed navbar with GSAP-animated floating menu.',
    iconName: 'zap',
    changes: [
      { type: 'added', text: 'Animation Studio Rebuild — complete rewrite with GSAP engine, timeline editor, and advanced animation features' },
      { type: 'added', text: 'Shadow Lab — interactive tool for designing layered box-shadow effects' },
      { type: 'added', text: 'Glassmorphism Tool — design frosted glass UI effects with live preview' },
      { type: 'added', text: 'Gradient Maker — interactive gradient builder with CSS/Tailwind/SVG export' },
      { type: 'added', text: 'GSAP Floating Menu — replaced fixed navbar with animated expanding pill navigation' },
      { type: 'added', text: 'Floating Menu integrated into component grid' },
      { type: 'improved', text: 'Animation Studio integrated with Praxys UI component registry' },
      { type: 'improved', text: 'Theme toggle hydration handling improved' },
      { type: 'improved', text: 'Gradient Maker — responsive layout with flex-wrap and code wrapping' },
      { type: 'fixed', text: 'ESLint errors and warnings resolved across studio and glass-generator' },
      { type: 'fixed', text: '404 page layout fixed' },
      { type: 'fixed', text: 'Component count updated to 70' },
    ],
  },
  {
    version: '1.2.7',
    date: 'Feb 16, 2026',
    title: 'Floating Menu & Flip Text Improvements',
    description:
      'New Floating Menu component with GSAP-animated hamburger-to-X transition and text scramble effect. Flip Text upgraded with proper 3D rotation and hover-to-replay.',
    iconName: 'puzzle',
    changes: [
      { type: 'added', text: 'Floating Menu — GSAP-animated expanding pill nav with hamburger-to-X transition, text scramble effect, and staggered item reveals' },
      { type: 'added', text: 'Floating Menu added to CLI component list' },
      { type: 'improved', text: 'Flip Text — proper 3D rotation with perspective and improved visual properties' },
      { type: 'improved', text: 'Flip Text — hover-to-replay functionality for interactive text animations' },
      { type: 'improved', text: 'Flip Text — adjusted default stagger delay for smoother effect' },
    ],
  },
  {
    version: '1.2.6',
    date: 'Feb 15, 2026',
    title: 'Color Customization & Enhanced Studio',
    description:
      'Added comprehensive color customization to Animation Studio and Theme Customizer with random palette generation and per-color editing.',
    iconName: 'palette',
    changes: [
      { type: 'added', text: 'Color Scheme Customization — 10 pre-made color schemes (Ocean, Forest, Sunset, Purple, Rose Gold, Mint, Fire, Cyberpunk, Monochrome)' },
      { type: 'added', text: 'Theme Customizer Panel — "Make it yours" section with individual color editing (Primary, Secondary, Accent, Background, Text)' },
      { type: 'added', text: 'Random Palette Generator — 🎲 Generate harmonious color palettes with one click in both Studio and /customize' },
      { type: 'added', text: 'Per-Color Randomization — Random button (🎲) for each individual color property' },
      { type: 'added', text: 'Color Pickers — Visual color selection with hex/HSL text input support' },
      { type: 'improved', text: 'Random Color Algorithm — Uses color theory (analogous + complementary hues) for harmonious palettes' },
      { type: 'improved', text: 'Color Contrast — Fixed lightness/saturation values ensure readable, professional themes' },
      { type: 'improved', text: 'Live Preview Updates — All component previews dynamically use selected color scheme' },
      { type: 'fixed', text: 'React Style Warning — Changed background to backgroundImage to avoid conflicts with backgroundClip' },
      { type: 'fixed', text: 'HSL to Hex Conversion — All colors properly converted for CSS compatibility' },
    ],
  },
  {
    version: '1.2.5',
    date: 'Feb 15, 2026',
    title: 'Animation Studio — Visual Animation Builder',
    description:
      'Introducing the Animation Studio, a killer feature that sets PraxysUI apart. Visually design animations for any component with live preview, presets, and instant code generation.',
    iconName: 'zap',
    changes: [
      { type: 'added', text: 'Animation Studio (/studio) — Interactive visual playground for designing component animations' },
      { type: 'added', text: 'Live Preview Canvas — See animations play in real-time as you adjust parameters' },
      { type: 'added', text: 'Animation Controls — Fine-tune initial state, animate state, and transitions with intuitive sliders' },
      { type: 'added', text: '30+ Animation Presets — Pre-built entrance, attention, exit, and loop animations (fade, slide, bounce, scale, flip, rotate, etc.)' },
      { type: 'added', text: 'Component Selector — Search and filter through all 69 components with category filters' },
      { type: 'added', text: 'Code Generator — Instantly copy Framer Motion or CSS @keyframes code for your custom animations' },
      { type: 'added', text: 'Auto-Play Mode — Automatically replay animations when changing parameters or components' },
      { type: 'added', text: 'Category-Specific Previews — Realistic mockups for buttons, cards, text, navigation, and visual components' },
      { type: 'improved', text: 'Mobile Responsive — Compact dropdown component selector on mobile, full experience preserved' },
      { type: 'improved', text: 'Navbar — Added "Studio" link for easy access' },
    ],
  },
  {
    version: '1.2.2',
    date: 'Feb 15, 2026',
    title: 'Autocomplete API Fix',
    description:
      'Fixed Autocomplete component API to use onSelect callback instead of onChange for better clarity and type safety.',
    iconName: 'wrench',
    changes: [
      { type: 'fixed', text: 'Autocomplete — changed API from onChange to onSelect, now passes full option object instead of just value string' },
      { type: 'fixed', text: 'Autocomplete demo and documentation updated to reflect new API' },
      { type: 'fixed', text: 'TypeScript errors resolved in Autocomplete component' },
    ],
  },
  {
    version: '1.2.1',
    date: 'Feb 15, 2026',
    title: '6 New Components — Essential UI Elements',
    description:
      'Essential interactive components: Switch, Slider, File Upload, OTP Input, Rating, and Autocomplete with async search — bringing the total to 69 components.',
    iconName: 'sparkles',
    changes: [
      { type: 'added', text: 'Switch — simple on/off toggle with spring animation, 3 sizes, optional label, keyboard accessible' },
      { type: 'added', text: 'Slider — range input with draggable thumb, animated track fill, value tooltip, min/max labels, step support, keyboard navigation' },
      { type: 'added', text: 'File Upload — drag-and-drop zone with animated borders, file list with remove buttons, progress bars, file type and size validation, multiple file support' },
      { type: 'added', text: 'OTP Input — PIN/verification code input with auto-focus next/prev, paste support, animated focus rings, configurable length (4-6)' },
      { type: 'added', text: 'Rating — interactive star rating with half-star support, hover preview, animated fill, read-only mode, 3 sizes, custom icon support' },
      { type: 'added', text: 'Autocomplete — async search input with debouncing, loading state, keyboard navigation, highlighted matching text, empty state' },
      { type: 'improved', text: 'CLI updated to v1.2.1 with all 69 components' },
      { type: 'improved', text: 'Component count updated from 63 to 69 across site' },
    ],
  },
  {
    version: '1.2.0',
    date: 'Feb 15, 2026',
    title: '3 New Form Components — Complete Your Forms',
    description:
      'Essential form components to complete your UI toolkit: Date Picker with range selection, Combobox with search, and Color Picker with HSL controls — bringing the total to 63 components.',
    iconName: 'sparkles',
    changes: [
      { type: 'added', text: 'Date Picker — animated calendar popup with month/year navigation, single/range selection, keyboard navigation, disabled dates support' },
      { type: 'added', text: 'Combobox — searchable select with filtering, single/multi-select modes, keyboard navigation, search highlighting, loading state' },
      { type: 'added', text: 'Color Picker — HSL sliders, hex input, preset swatches, alpha channel, format toggle (HEX/RGB/HSL), copy to clipboard' },
      { type: 'improved', text: 'CLI updated to v1.2.0 with all 63 components' },
      { type: 'improved', text: 'Component count updated from 60 to 63 across site' },
      { type: 'fixed', text: 'Skip-to-content accessibility link — now only appears on real keyboard Tab, never on route navigation' },
      { type: 'fixed', text: 'AnimatedInput and AnimatedTextarea — support both controlled and uncontrolled usage for Playground compatibility' },
    ],
  },
  {
    version: '1.1.0',
    date: 'Feb 14, 2026',
    title: '11 New Components — Forms, Layout & Data',
    description:
      '11 new components covering forms (Input, Select, Textarea, Checkbox, Radio), feedback (Alert, Sheet), data display (Pagination, Timeline, Stats Card), and layout (Divider) — bringing the total to 60. CLI updated to v1.1.0.',
    iconName: 'sparkles',
    changes: [
      { type: 'added', text: 'Animated Input — floating label, animated focus ring, left/right icons, error state, 3 sizes' },
      { type: 'added', text: 'Animated Select — custom dropdown with keyboard navigation, spring animations, click-outside close' },
      { type: 'added', text: 'Animated Textarea — floating label, auto-resize, character counter, animated focus ring' },
      { type: 'added', text: 'Checkbox — animated SVG checkmark with pathLength draw, spring scale, error state, ARIA checkbox role' },
      { type: 'added', text: 'Radio Group — animated dot selection, horizontal/vertical layout, keyboard navigation, ARIA radiogroup' },
      { type: 'added', text: 'Alert — 4 variants (info/success/warning/error) with auto-icons, dismissible with animated exit' },
      { type: 'added', text: 'Pagination — sliding active indicator with layoutId, ellipsis, prev/next, 2 sizes' },
      { type: 'added', text: 'Sheet — slide-in drawer from 4 sides, backdrop blur, Escape close, scroll lock' },
      { type: 'added', text: 'Divider — horizontal/vertical with optional label, gradient mode, animated entrance' },
      { type: 'added', text: 'Timeline — alternating two-column layout, staggered scroll animations, active/completed states' },
      { type: 'added', text: 'Stats Card — animated counter with useSpring, trend indicator, icon slot' },
      { type: 'improved', text: 'CLI updated to v1.1.0 with all 60 components published to npm' },
      { type: 'improved', text: 'Component count updated from 50 to 60 across landing page and registry' },
      { type: 'improved', text: 'Navbar — active link highlighting, skip-to-content accessibility link' },
      { type: 'improved', text: 'Docs — breadcrumbs on all pages, slim footer, back-to-top button' },
      { type: 'improved', text: 'Changelog — extracted data to single source of truth, auto-generates CHANGELOG.md' },
      { type: 'improved', text: 'ComponentPreview — proper ARIA tab roles (tablist, tab, tabpanel)' },
      { type: 'improved', text: '404 page — now has Navbar/Footer, fixed stale template count' },
      { type: 'improved', text: 'Loading skeletons added to changelog, templates, examples, and customize pages' },
      { type: 'fixed', text: 'Navbar — replaced useEffect setState with React-idiomatic derived state pattern for route change detection' },
      { type: 'fixed', text: 'Sidebar — same derived state fix to comply with react-hooks/set-state-in-effect rule' },
      { type: 'fixed', text: 'Header inconsistency — docs pages now use the shared Navbar instead of a separate custom header' },
    ],
  },
  {
    version: '0.9.0',
    date: 'Feb 10, 2026',
    title: '10 New Components & CLI v0.3.0',
    description:
      '10 new interactive components spanning modals, tooltips, dropdowns, progress indicators, and more — bringing the total to 50. CLI updated to v0.3.0.',
    iconName: 'sparkles',
    changes: [
      { type: 'added', text: 'Modal Dialog — animated modal with backdrop blur, spring scale, Escape key, scroll lock, and ARIA attributes' },
      { type: 'added', text: 'Tooltip — 4-position tooltip with configurable delay, direction-aware animation, and arrow pointer' },
      { type: 'added', text: 'Dropdown Menu — full keyboard navigation, click-outside close, divider and disabled item support' },
      { type: 'added', text: 'Progress Bar — animated bar with sm/md/lg sizes, candy-stripe overlay, custom colors, and label/value display' },
      { type: 'added', text: 'Stepper — horizontal/vertical multi-step indicator with animated check icons and connector fill' },
      { type: 'added', text: 'Image Comparison — before/after slider with pointer-capture drag, clip-based reveal, and animated handle' },
      { type: 'added', text: 'Animated Counter — spring-physics number counter triggered on scroll into view with prefix/suffix/decimals' },
      { type: 'added', text: 'Infinite Scroll — Intersection Observer-based with configurable threshold and animated loader' },
      { type: 'added', text: 'Command Menu — search-filtered palette with grouped items, keyboard nav, match highlighting, and shortcut badges' },
      { type: 'added', text: 'Animated Toggle — switch with spring-animated knob, 3 sizes, ARIA role="switch", and disabled state' },
      { type: 'improved', text: 'CLI updated to v0.3.0 with all 50 components published to npm' },
      { type: 'improved', text: 'Component count updated from 34 to 50 across landing page and registry' },
    ],
  },
  {
    version: '0.8.0',
    date: 'Feb 2, 2026',
    title: 'New Components, Theme Customizer & Open Source',
    description:
      '10 new components, interactive theme customizer with export, Props Playground for all components, and full open-source community setup.',
    iconName: 'puzzle',
    changes: [
      { type: 'added', text: 'Typewriter Text — animated typing effect with cursor and configurable speed' },
      { type: 'added', text: 'Toast Notification — stackable toast system with multiple variants' },
      { type: 'added', text: 'Accordion — smooth expand/collapse with icon rotation' },
      { type: 'added', text: 'Animated Tabs — tab switcher with sliding indicator and content transitions' },
      { type: 'added', text: 'Magnetic Cursor — element that pulls toward the mouse pointer' },
      { type: 'added', text: 'Parallax Scroll — depth-based scroll animations for layered content' },
      { type: 'added', text: 'Gradient Mesh — animated multi-point gradient background' },
      { type: 'added', text: 'Skeleton Loader — pulsing placeholder for loading states' },
      { type: 'added', text: 'Morphing Text — smooth text transitions between words' },
      { type: 'added', text: 'Spotlight Card — card with mouse-following light effect' },
      { type: 'added', text: 'Theme Customizer page (/customize) with color pickers, 6 presets, live preview, and CSS export' },
      { type: 'added', text: 'Interactive Props Playground with live controls for all 34 components' },
      { type: 'added', text: 'Live interactive demos on component showcase (landing page)' },
      { type: 'added', text: '6 interactive template pages with preview toolbar and responsive viewport switcher' },
      { type: 'added', text: 'CONTRIBUTING.md, CODE_OF_CONDUCT.md, issue templates, and PR template for open source' },
      { type: 'improved', text: 'CLI updated to v0.2.0 with all 34 components' },
      { type: 'improved', text: 'Component showcase redesigned with live demos instead of placeholder cards' },
      { type: 'improved', text: 'Dark mode text contrast improved (--color-text-faint bumped to #6b6560)' },
      { type: 'improved', text: 'Comprehensive responsive design fixes across all components and pages' },
      { type: 'fixed', text: 'Nested <a> tags in ComponentShowcase — replaced Link with div + useRouter' },
      { type: 'fixed', text: 'ToastContainer crash when toasts/onDismiss are undefined in playground' },
      { type: 'fixed', text: 'LogoSlider animation shorthand/longhand conflict in React 19' },
      { type: 'fixed', text: 'Missing playground defaults for glass-dock and logo-slider' },
      { type: 'fixed', text: 'CopyButton invisible on touch devices — now always visible on mobile' },
    ],
  },
  {
    version: '0.7.0',
    date: 'Jan 11, 2026',
    title: 'SEO, Accessibility & Polish',
    description:
      'Comprehensive SEO metadata, accessibility audit fixes, and public assets.',
    iconName: 'shield',
    changes: [
      { type: 'added', text: 'Open Graph and Twitter Card metadata across all pages' },
      { type: 'added', text: 'Dynamic generateMetadata for all /docs/[slug] pages' },
      { type: 'added', text: 'SVG favicon, robots.txt, and sitemap.xml' },
      { type: 'improved', text: 'ARIA labels, roles, and keyboard navigation on Navbar, CommandPalette, Sidebar' },
      { type: 'improved', text: 'Focus trap in command palette dialog' },
      { type: 'improved', text: 'aria-current="page" on active sidebar links' },
      { type: 'fixed', text: 'suppressHydrationWarning on body to handle browser extension attributes' },
    ],
  },
  {
    version: '0.6.0',
    date: 'Jan 8, 2026',
    title: 'Bug Fix Pass',
    description:
      'Major audit fixing 10 issues across the docs — broken links, duplicate pages, layout problems, and error handling.',
    iconName: 'wrench',
    changes: [
      { type: 'fixed', text: 'Broken /docs/components links across 5 files — now points to /docs/components-overview' },
      { type: 'fixed', text: 'Mobile menu not closing on link click in Navbar' },
      { type: 'fixed', text: 'Duplicate IntroductionPage — single source of truth now' },
      { type: 'improved', text: 'Docs layout.tsx extracted to server component + DocsShell client component' },
      { type: 'fixed', text: 'ComponentPageClient dynamic import error handling with .catch() and error state' },
      { type: 'fixed', text: 'Sidebar slug extraction for trailing slashes' },
      { type: 'fixed', text: 'ComponentsOverviewPage uses sidebar order, removed dead code' },
      { type: 'fixed', text: 'Component count corrected to 24, added missing Logo Slider' },
      { type: 'fixed', text: 'GitHub links in Footer now point to actual repository' },
    ],
  },
  {
    version: '0.5.0',
    date: 'Jan 7, 2026',
    title: 'CLI Tool & Templates',
    description:
      'Added a CLI for scaffolding components and a templates gallery page.',
    iconName: 'terminal',
    changes: [
      { type: 'added', text: 'npx @praxys/ui CLI with init, add, and list commands' },
      { type: 'added', text: 'Templates gallery page with 6 template previews' },
      { type: 'added', text: 'CLI docs page at /docs/cli' },
    ],
  },
  {
    version: '0.4.0',
    date: 'Jan 4, 2026',
    title: 'Command Palette',
    description:
      'Ctrl+K fuzzy search across all components and documentation pages.',
    iconName: 'search',
    changes: [
      { type: 'added', text: 'Ctrl+K / Cmd+K keyboard shortcut to open search' },
      { type: 'added', text: 'Fuzzy matching with scoring (exact > starts with > contains > fuzzy)' },
      { type: 'added', text: 'Arrow key navigation and Enter to select' },
    ],
  },
  {
    version: '0.3.0',
    date: 'Jan 2, 2026',
    title: 'Complete Component Library',
    description:
      'All 24 components implemented with live previews, code examples, and props tables.',
    iconName: 'sparkles',
    changes: [
      { type: 'added', text: 'Interactive Book — 3D page-flip book component' },
      { type: 'added', text: 'Logo Slider — infinite marquee logo carousel' },
      { type: 'added', text: 'Animated Hero — cinematic hero section with parallax' },
      { type: 'added', text: 'Masked Avatars — overlapping avatar stack with hover reveal' },
      { type: 'added', text: 'Folder Preview — macOS-style folder with hover preview' },
      { type: 'added', text: 'Liquid Ocean, Liquid Metal, Reveal Loader — visual effects' },
      { type: 'added', text: 'Spotlight Navbar, Glass Dock — navigation components' },
      { type: 'added', text: 'Flip Fade Text, 3D Displacement Text — text effects' },
      { type: 'added', text: 'Testimonials Card, Staggered Grid, Expandable Bento Grid, Perspective Grid — cards & layout' },
      { type: 'added', text: 'Creepy Button, Social Flip Button — button variants' },
    ],
  },
  {
    version: '0.2.0',
    date: 'Dec 22, 2025',
    title: 'Theme System & First Components',
    description:
      'Light/dark mode with CSS custom properties and the first 6 animated components.',
    iconName: 'palette',
    changes: [
      { type: 'added', text: 'Light/dark theme toggle with localStorage persistence and FOUC prevention' },
      { type: 'added', text: 'Animated Button, Flip Text, Glow Border Card, Animated Number, Line Hover Link, Light Lines' },
      { type: 'added', text: 'Shiki dual-theme code blocks (vitesse-dark + vitesse-light)' },
      { type: 'added', text: 'Component preview with Preview/Code tab switcher' },
    ],
  },
  {
    version: '0.1.0',
    date: 'Dec 15, 2025',
    title: 'Initial Release',
    description:
      'Project scaffolding, design system, landing page, and docs infrastructure.',
    iconName: 'zap',
    changes: [
      { type: 'added', text: 'Next.js 16 project with React 19, Tailwind CSS 4, Framer Motion 12' },
      { type: 'added', text: 'Praxys brand palette — Void, Obsidian, Ignite, Blush, Chalk' },
      { type: 'added', text: 'Font stack — Geist Pixel Square, Satoshi, JetBrains Mono' },
      { type: 'added', text: 'Landing page with 7 sections (Navbar, Hero, Showcase, Features, Grid, CTA, Footer)' },
      { type: 'added', text: 'Docs with sidebar navigation and dynamic [slug] routing' },
      { type: 'added', text: 'Getting Started pages (Installation, Tailwind, Utilities)' },
      { type: 'added', text: 'Component registry architecture with lazy-loaded demos' },
    ],
  },
]

// ─── Helper: generate standard CHANGELOG.md content ──────

const typeLabels: Record<ChangeType, string> = {
  added: 'Added',
  fixed: 'Fixed',
  improved: 'Improved',
}

export function generateChangelogMarkdown(): string {
  const lines: string[] = ['# Changelog', '', 'All notable changes to Praxys UI are documented here.', '']

  for (const entry of changelog) {
    lines.push(`## [${entry.version}] — ${entry.date}`)
    lines.push('')
    lines.push(`**${entry.title}**`)
    lines.push('')
    lines.push(entry.description)
    lines.push('')

    // Group by type
    for (const type of ['added', 'fixed', 'improved'] as ChangeType[]) {
      const items = entry.changes.filter((c) => c.type === type)
      if (items.length === 0) continue
      lines.push(`### ${typeLabels[type]}`)
      lines.push('')
      for (const item of items) {
        lines.push(`- ${item.text}`)
      }
      lines.push('')
    }
  }

  return lines.join('\n')
}
