# Changelog

All notable changes to Praxys UI are documented here.

## [1.3.4] — Feb 24, 2026

**100 Components Milestone**

29 new components across all 6 categories — buttons/forms, cards, text effects, navigation, visual effects, and media — bringing the total to 100.

### Added

- Toggle Group — segmented control with layoutId spring animation, three sizes
- Number Input — numeric stepper with animated increment/decrement buttons, min/max/step
- Search Input — search bar with animated icon, loading spinner, and clear button
- Password Input — show/hide toggle with AnimatePresence eye icon transitions
- Range Slider — dual-thumb range slider with drag interaction and step snapping
- Copy Button — click-to-copy with animated icon transition and clipboard API
- Mention Input — text input with @ detection, dropdown user list, keyboard navigation
- Pricing Card — animated card with feature list, CTA, popular badge, hover scale
- Profile Card — avatar, online indicator, social links, staggered entrance
- Feature Card — icon card with 3D cursor-following tilt effect
- Comparison Table — side-by-side plans with check/cross icons and staggered rows
- Stat Bar — horizontal bar with scroll-triggered spring fill animation
- Gradient Text — animated gradient using background-clip with configurable colors
- Scramble Text — decode effect revealing characters with random scrambling
- Text Reveal — word-by-word entrance with staggered scroll-triggered animation
- Glitch Text — RGB split effect with clip-path slicing and intensity levels
- Sidebar — collapsible navigation with animated width, staggered items, sub-items
- Bottom Sheet — mobile drawer with drag-to-dismiss, snap points, spring animation
- Popover — floating popover with 4 sides, 3 alignments, arrow, click-outside close
- Context Menu — right-click menu with keyboard navigation, dividers, ARIA roles
- Mega Menu — large dropdown with hover trigger, multi-column grid sections
- Confetti — celebration burst with deterministic particle physics animation
- Particles — floating particle background with seeded drift paths
- Noise Texture — animated SVG grain overlay with feTurbulence filter
- Aurora — aurora borealis gradient blobs with smooth keyframe paths
- Blur Fade — entrance wrapper with blur + fade from configurable direction
- Carousel — image carousel with directional slides, auto-play, dot navigation
- Avatar — four sizes, status indicators, fallback initials, animated dot
- Lightbox — fullscreen viewer with zoom, arrow keys, thumbnails, backdrop blur

### Fixed

- TypewriterText — resolved max update depth error from setTimeout(0) loops
- Confetti/Particles — replaced Math.random() with deterministic seeded PRNG for React 19 purity
- Lightbox — refactored to avoid ref access and setState during render

### Improved

- CLI registry expanded from 71 to 100 components
- Component count updated across README, CLI README, and installation page

## [1.3.3] — Feb 24, 2026

**CLI Overhaul — Full Component Management**

Major CLI upgrade with a rich metadata registry, 10 new commands, interactive picker, parallel fetching, did-you-mean suggestions, and project diagnostics.

### Added

- Component Registry — replaced flat array with typed registry containing title, description, category, dependencies, and isNew for all 71 components
- `info` command — show component metadata (title, category, dependencies, docs link) without installing
- `view` command — fetch and display source code with syntax highlighting (keywords, strings, comments)
- `diff` command — compare local file with latest remote version, colorized line-by-line diff
- `remove` command — delete a component file with confirmation prompt. Alias: `rm`
- `update` command — update one or all installed components with diff summary and confirmation. `--check` flag for dry-run
- `doctor` command — check project health: config file, directories, utils, core dependencies, installed count
- `stats` command — visual dashboard with installed vs available counts per category and bar chart
- Interactive add picker — run `add` with no arguments for a categorized multi-select component browser
- Multi-component add — `add accordion alert badge` adds multiple components in one command
- `--install-deps` flag on `add` — auto-detect package manager and install component dependencies
- `--installed` flag on `list` — filter to only locally installed components
- `--category`, `--new`, `--search` flags on `list` — filter and search components
- Config file — `init` writes `praxys.config.json` with component and utils directories
- Did-you-mean suggestions — typo `animted-button` suggests `animated-button` (Levenshtein distance)
- Command aliases — `i` for init, `ls` for list, `rm` for remove
- Parallel fetching — multi-component adds fetch in batches of 6 concurrently
- CLI update notice — checks npm registry after each command and notifies if a newer version exists

### Improved

- `list` output — grouped by category with colored headers, NEW badges, and truncated descriptions
- `add` — reads component directory from config if no `--dir` flag provided
- All commands — consistent error messages with did-you-mean suggestions for unknown slugs

## [1.2.9] — Feb 22, 2026

**Site Redesign & New Tools**

Complete landing page redesign with experimental hero, bento showcase, and numbers bar. New standalone components page with search and live demos. Page transitions, responsive preview modes, and editorial-style page headers.

### Added

- New Landing Page — experimental hero section, bento component showcase, numbers bar, and redesigned footer
- Components Page — standalone /components with search, category filters, and lazy-loaded live demos
- Page Transitions — smooth transitions between pages
- Responsive Preview Modes — preview components at different viewport sizes
- "New" Component Labels — badge on recently added components
- Back-to-Top Button — added to content pages
- Global Command Palette — integrated across the redesigned site

### Improved

- Page Headers — redesigned to editorial style with updated button aesthetics
- Navbar — reorganized items with icons, refined expanded menu layout
- Routing — moved from /docs/[slug] to standalone /components/[slug] and /components/install
- Component Demos — lazy loading with useInView for better performance
- Hero Component — centralized site metadata

## [1.2.8] — Feb 19, 2026

**Animation Studio Rebuild & Design Tools**

Rebuilt Animation Studio from scratch with GSAP engine and timeline editor. Added Shadow Lab for layered box-shadow design and Glassmorphism tool for frosted glass effects. Replaced fixed navbar with GSAP-animated floating menu.

### Added

- Animation Studio Rebuild — complete rewrite with GSAP engine, timeline editor, and advanced animation features
- Shadow Lab — interactive tool for designing layered box-shadow effects
- Glassmorphism Tool — design frosted glass UI effects with live preview
- Gradient Maker — interactive gradient builder with CSS/Tailwind/SVG export
- GSAP Floating Menu — replaced fixed navbar with animated expanding pill navigation
- Floating Menu integrated into component grid

### Fixed

- ESLint errors and warnings resolved across studio and glass-generator
- 404 page layout fixed
- Component count updated to 70

### Improved

- Animation Studio integrated with Praxys UI component registry
- Theme toggle hydration handling improved
- Gradient Maker — responsive layout with flex-wrap and code wrapping

## [1.2.7] — Feb 16, 2026

**Floating Menu & Flip Text Improvements**

New Floating Menu component with GSAP-animated hamburger-to-X transition and text scramble effect. Flip Text upgraded with proper 3D rotation and hover-to-replay.

### Added

- Floating Menu — GSAP-animated expanding pill nav with hamburger-to-X transition, text scramble effect, and staggered item reveals
- Floating Menu added to CLI component list

### Improved

- Flip Text — proper 3D rotation with perspective and improved visual properties
- Flip Text — hover-to-replay functionality for interactive text animations
- Flip Text — adjusted default stagger delay for smoother effect

## [1.2.6] — Feb 15, 2026

**Color Customization & Enhanced Studio**

Added comprehensive color customization to Animation Studio and Theme Customizer with random palette generation and per-color editing.

### Added

- Color Scheme Customization — 10 pre-made color schemes (Ocean, Forest, Sunset, Purple, Rose Gold, Mint, Fire, Cyberpunk, Monochrome)
- Theme Customizer Panel — "Make it yours" section with individual color editing (Primary, Secondary, Accent, Background, Text)
- Random Palette Generator — 🎲 Generate harmonious color palettes with one click in both Studio and /customize
- Per-Color Randomization — Random button (🎲) for each individual color property
- Color Pickers — Visual color selection with hex/HSL text input support

### Fixed

- React Style Warning — Changed background to backgroundImage to avoid conflicts with backgroundClip
- HSL to Hex Conversion — All colors properly converted for CSS compatibility

### Improved

- Random Color Algorithm — Uses color theory (analogous + complementary hues) for harmonious palettes
- Color Contrast — Fixed lightness/saturation values ensure readable, professional themes
- Live Preview Updates — All component previews dynamically use selected color scheme

## [1.2.5] — Feb 15, 2026

**Animation Studio — Visual Animation Builder**

Introducing the Animation Studio, a killer feature that sets PraxysUI apart. Visually design animations for any component with live preview, presets, and instant code generation.

### Added

- Animation Studio (/studio) — Interactive visual playground for designing component animations
- Live Preview Canvas — See animations play in real-time as you adjust parameters
- Animation Controls — Fine-tune initial state, animate state, and transitions with intuitive sliders
- 30+ Animation Presets — Pre-built entrance, attention, exit, and loop animations (fade, slide, bounce, scale, flip, rotate, etc.)
- Component Selector — Search and filter through all 69 components with category filters
- Code Generator — Instantly copy Framer Motion or CSS @keyframes code for your custom animations
- Auto-Play Mode — Automatically replay animations when changing parameters or components
- Category-Specific Previews — Realistic mockups for buttons, cards, text, navigation, and visual components

### Improved

- Mobile Responsive — Compact dropdown component selector on mobile, full experience preserved
- Navbar — Added "Studio" link for easy access

## [1.2.2] — Feb 15, 2026

**Autocomplete API Fix**

Fixed Autocomplete component API to use onSelect callback instead of onChange for better clarity and type safety.

### Fixed

- Autocomplete — changed API from onChange to onSelect, now passes full option object instead of just value string
- Autocomplete demo and documentation updated to reflect new API
- TypeScript errors resolved in Autocomplete component

## [1.2.1] — Feb 15, 2026

**6 New Components — Essential UI Elements**

Essential interactive components: Switch, Slider, File Upload, OTP Input, Rating, and Autocomplete with async search — bringing the total to 69 components.

### Added

- Switch — simple on/off toggle with spring animation, 3 sizes, optional label, keyboard accessible
- Slider — range input with draggable thumb, animated track fill, value tooltip, min/max labels, step support, keyboard navigation
- File Upload — drag-and-drop zone with animated borders, file list with remove buttons, progress bars, file type and size validation, multiple file support
- OTP Input — PIN/verification code input with auto-focus next/prev, paste support, animated focus rings, configurable length (4-6)
- Rating — interactive star rating with half-star support, hover preview, animated fill, read-only mode, 3 sizes, custom icon support
- Autocomplete — async search input with debouncing, loading state, keyboard navigation, highlighted matching text, empty state

### Improved

- CLI updated to v1.2.1 with all 69 components
- Component count updated from 63 to 69 across site

## [1.2.0] — Feb 15, 2026

**3 New Form Components — Complete Your Forms**

Essential form components to complete your UI toolkit: Date Picker with range selection, Combobox with search, and Color Picker with HSL controls — bringing the total to 63 components.

### Added

- Date Picker — animated calendar popup with month/year navigation, single/range selection, keyboard navigation, disabled dates support
- Combobox — searchable select with filtering, single/multi-select modes, keyboard navigation, search highlighting, loading state
- Color Picker — HSL sliders, hex input, preset swatches, alpha channel, format toggle (HEX/RGB/HSL), copy to clipboard

### Fixed

- Skip-to-content accessibility link — now only appears on real keyboard Tab, never on route navigation
- AnimatedInput and AnimatedTextarea — support both controlled and uncontrolled usage for Playground compatibility

### Improved

- CLI updated to v1.2.0 with all 63 components
- Component count updated from 60 to 63 across site

## [1.1.0] — Feb 14, 2026

**11 New Components — Forms, Layout & Data**

11 new components covering forms (Input, Select, Textarea, Checkbox, Radio), feedback (Alert, Sheet), data display (Pagination, Timeline, Stats Card), and layout (Divider) — bringing the total to 60. CLI updated to v1.1.0.

### Added

- Animated Input — floating label, animated focus ring, left/right icons, error state, 3 sizes
- Animated Select — custom dropdown with keyboard navigation, spring animations, click-outside close
- Animated Textarea — floating label, auto-resize, character counter, animated focus ring
- Checkbox — animated SVG checkmark with pathLength draw, spring scale, error state, ARIA checkbox role
- Radio Group — animated dot selection, horizontal/vertical layout, keyboard navigation, ARIA radiogroup
- Alert — 4 variants (info/success/warning/error) with auto-icons, dismissible with animated exit
- Pagination — sliding active indicator with layoutId, ellipsis, prev/next, 2 sizes
- Sheet — slide-in drawer from 4 sides, backdrop blur, Escape close, scroll lock
- Divider — horizontal/vertical with optional label, gradient mode, animated entrance
- Timeline — alternating two-column layout, staggered scroll animations, active/completed states
- Stats Card — animated counter with useSpring, trend indicator, icon slot

### Fixed

- Navbar — replaced useEffect setState with React-idiomatic derived state pattern for route change detection
- Sidebar — same derived state fix to comply with react-hooks/set-state-in-effect rule
- Header inconsistency — docs pages now use the shared Navbar instead of a separate custom header

### Improved

- CLI updated to v1.1.0 with all 60 components published to npm
- Component count updated from 50 to 60 across landing page and registry
- Navbar — active link highlighting, skip-to-content accessibility link
- Docs — breadcrumbs on all pages, slim footer, back-to-top button
- Changelog — extracted data to single source of truth, auto-generates CHANGELOG.md
- ComponentPreview — proper ARIA tab roles (tablist, tab, tabpanel)
- 404 page — now has Navbar/Footer, fixed stale template count
- Loading skeletons added to changelog, templates, examples, and customize pages

## [0.9.0] — Feb 10, 2026

**10 New Components & CLI v0.3.0**

10 new interactive components spanning modals, tooltips, dropdowns, progress indicators, and more — bringing the total to 50. CLI updated to v0.3.0.

### Added

- Modal Dialog — animated modal with backdrop blur, spring scale, Escape key, scroll lock, and ARIA attributes
- Tooltip — 4-position tooltip with configurable delay, direction-aware animation, and arrow pointer
- Dropdown Menu — full keyboard navigation, click-outside close, divider and disabled item support
- Progress Bar — animated bar with sm/md/lg sizes, candy-stripe overlay, custom colors, and label/value display
- Stepper — horizontal/vertical multi-step indicator with animated check icons and connector fill
- Image Comparison — before/after slider with pointer-capture drag, clip-based reveal, and animated handle
- Animated Counter — spring-physics number counter triggered on scroll into view with prefix/suffix/decimals
- Infinite Scroll — Intersection Observer-based with configurable threshold and animated loader
- Command Menu — search-filtered palette with grouped items, keyboard nav, match highlighting, and shortcut badges
- Animated Toggle — switch with spring-animated knob, 3 sizes, ARIA role="switch", and disabled state

### Improved

- CLI updated to v0.3.0 with all 50 components published to npm
- Component count updated from 34 to 50 across landing page and registry

## [0.8.0] — Feb 2, 2026

**New Components, Theme Customizer & Open Source**

10 new components, interactive theme customizer with export, Props Playground for all components, and full open-source community setup.

### Added

- Typewriter Text — animated typing effect with cursor and configurable speed
- Toast Notification — stackable toast system with multiple variants
- Accordion — smooth expand/collapse with icon rotation
- Animated Tabs — tab switcher with sliding indicator and content transitions
- Magnetic Cursor — element that pulls toward the mouse pointer
- Parallax Scroll — depth-based scroll animations for layered content
- Gradient Mesh — animated multi-point gradient background
- Skeleton Loader — pulsing placeholder for loading states
- Morphing Text — smooth text transitions between words
- Spotlight Card — card with mouse-following light effect
- Theme Customizer page (/customize) with color pickers, 6 presets, live preview, and CSS export
- Interactive Props Playground with live controls for all 34 components
- Live interactive demos on component showcase (landing page)
- 6 interactive template pages with preview toolbar and responsive viewport switcher
- CONTRIBUTING.md, CODE_OF_CONDUCT.md, issue templates, and PR template for open source

### Fixed

- Nested <a> tags in ComponentShowcase — replaced Link with div + useRouter
- ToastContainer crash when toasts/onDismiss are undefined in playground
- LogoSlider animation shorthand/longhand conflict in React 19
- Missing playground defaults for glass-dock and logo-slider
- CopyButton invisible on touch devices — now always visible on mobile

### Improved

- CLI updated to v0.2.0 with all 34 components
- Component showcase redesigned with live demos instead of placeholder cards
- Dark mode text contrast improved (--color-text-faint bumped to #6b6560)
- Comprehensive responsive design fixes across all components and pages

## [0.7.0] — Jan 11, 2026

**SEO, Accessibility & Polish**

Comprehensive SEO metadata, accessibility audit fixes, and public assets.

### Added

- Open Graph and Twitter Card metadata across all pages
- Dynamic generateMetadata for all /docs/[slug] pages
- SVG favicon, robots.txt, and sitemap.xml

### Fixed

- suppressHydrationWarning on body to handle browser extension attributes

### Improved

- ARIA labels, roles, and keyboard navigation on Navbar, CommandPalette, Sidebar
- Focus trap in command palette dialog
- aria-current="page" on active sidebar links

## [0.6.0] — Jan 8, 2026

**Bug Fix Pass**

Major audit fixing 10 issues across the docs — broken links, duplicate pages, layout problems, and error handling.

### Fixed

- Broken /docs/components links across 5 files — now points to /docs/components-overview
- Mobile menu not closing on link click in Navbar
- Duplicate IntroductionPage — single source of truth now
- ComponentPageClient dynamic import error handling with .catch() and error state
- Sidebar slug extraction for trailing slashes
- ComponentsOverviewPage uses sidebar order, removed dead code
- Component count corrected to 24, added missing Logo Slider
- GitHub links in Footer now point to actual repository

### Improved

- Docs layout.tsx extracted to server component + DocsShell client component

## [0.5.0] — Jan 7, 2026

**CLI Tool & Templates**

Added a CLI for scaffolding components and a templates gallery page.

### Added

- npx @praxys/ui CLI with init, add, and list commands
- Templates gallery page with 6 template previews
- CLI docs page at /docs/cli

## [0.4.0] — Jan 4, 2026

**Command Palette**

Ctrl+K fuzzy search across all components and documentation pages.

### Added

- Ctrl+K / Cmd+K keyboard shortcut to open search
- Fuzzy matching with scoring (exact > starts with > contains > fuzzy)
- Arrow key navigation and Enter to select

## [0.3.0] — Jan 2, 2026

**Complete Component Library**

All 24 components implemented with live previews, code examples, and props tables.

### Added

- Interactive Book — 3D page-flip book component
- Logo Slider — infinite marquee logo carousel
- Animated Hero — cinematic hero section with parallax
- Masked Avatars — overlapping avatar stack with hover reveal
- Folder Preview — macOS-style folder with hover preview
- Liquid Ocean, Liquid Metal, Reveal Loader — visual effects
- Spotlight Navbar, Glass Dock — navigation components
- Flip Fade Text, 3D Displacement Text — text effects
- Testimonials Card, Staggered Grid, Expandable Bento Grid, Perspective Grid — cards & layout
- Creepy Button, Social Flip Button — button variants

## [0.2.0] — Dec 22, 2025

**Theme System & First Components**

Light/dark mode with CSS custom properties and the first 6 animated components.

### Added

- Light/dark theme toggle with localStorage persistence and FOUC prevention
- Animated Button, Flip Text, Glow Border Card, Animated Number, Line Hover Link, Light Lines
- Shiki dual-theme code blocks (vitesse-dark + vitesse-light)
- Component preview with Preview/Code tab switcher

## [0.1.0] — Dec 15, 2025

**Initial Release**

Project scaffolding, design system, landing page, and docs infrastructure.

### Added

- Next.js 16 project with React 19, Tailwind CSS 4, Framer Motion 12
- Praxys brand palette — Void, Obsidian, Ignite, Blush, Chalk
- Font stack — Geist Pixel Square, Satoshi, JetBrains Mono
- Landing page with 7 sections (Navbar, Hero, Showcase, Features, Grid, CTA, Footer)
- Docs with sidebar navigation and dynamic [slug] routing
- Getting Started pages (Installation, Tailwind, Utilities)
- Component registry architecture with lazy-loaded demos
