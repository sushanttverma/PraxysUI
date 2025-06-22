'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  Clock,
  ArrowRight,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  User,
  Tag,
} from 'lucide-react'
import TypewriterText from '@/app/components/ui/typewriter-text'
import MorphingText from '@/app/components/ui/morphing-text'
import AnimatedTabs from '@/app/components/ui/animated-tabs'
import SkeletonLoader from '@/app/components/ui/skeleton-loader'

const featuredPost = {
  title: 'Building the Next Generation of UI Components',
  excerpt:
    'How we approached designing a component library that balances aesthetics with performance, and what we learned along the way.',
  author: 'Sarah Chen',
  date: 'Feb 10, 2026',
  readTime: '8 min read',
  category: 'Engineering',
}

const allPosts = [
  {
    title: 'Designing for Motion: Animation Principles in UI',
    excerpt: 'A deep dive into how subtle animations can dramatically improve user experience and interface clarity.',
    author: 'Alex Rivera',
    date: 'Feb 8, 2026',
    readTime: '6 min read',
    category: 'Design',
    likes: 142,
    comments: 23,
  },
  {
    title: 'Server Components and the Future of React',
    excerpt: 'Exploring how React Server Components change the way we think about data fetching and rendering.',
    author: 'Marcus Wei',
    date: 'Feb 5, 2026',
    readTime: '10 min read',
    category: 'Engineering',
    likes: 89,
    comments: 15,
  },
  {
    title: 'From Figma to Code: Bridging the Design-Dev Gap',
    excerpt: 'Practical strategies for maintaining design fidelity when translating Figma designs into production code.',
    author: 'Priya Patel',
    date: 'Feb 3, 2026',
    readTime: '7 min read',
    category: 'Product',
    likes: 76,
    comments: 11,
  },
  {
    title: 'Tailwind CSS v4: What Changed and Why It Matters',
    excerpt: 'Breaking down the biggest changes in Tailwind v4 and how they affect your existing projects.',
    author: 'Sarah Chen',
    date: 'Jan 30, 2026',
    readTime: '5 min read',
    category: 'Engineering',
    likes: 203,
    comments: 34,
  },
  {
    title: 'Color Theory for Developers',
    excerpt: 'You do not need to be a designer to create beautiful color palettes. Here is a systematic approach.',
    author: 'Alex Rivera',
    date: 'Jan 28, 2026',
    readTime: '9 min read',
    category: 'Design',
    likes: 167,
    comments: 28,
  },
  {
    title: 'Building Accessible Components from Scratch',
    excerpt: 'Accessibility is not an afterthought. Learn to build components that work for everyone from day one.',
    author: 'Marcus Wei',
    date: 'Jan 25, 2026',
    readTime: '11 min read',
    category: 'Engineering',
    likes: 95,
    comments: 19,
  },
]

function PostCard({ post, index }: { post: typeof allPosts[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-obsidian transition-colors hover:border-ignite/20 cursor-pointer"
    >
      <div className="h-2 bg-gradient-to-r from-ignite/40 via-ignite/20 to-transparent" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[10px] text-text-faint">
            <Tag className="h-2.5 w-2.5" />
            {post.category}
          </span>
          <span className="text-[10px] text-text-faint">{post.readTime}</span>
        </div>
        <h3 className="font-pixel text-sm font-bold text-chalk group-hover:text-ignite transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-xs text-blush/80 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-ignite/10 text-[9px] font-medium text-ignite">
              {post.author[0]}
            </div>
            <span className="text-[11px] text-blush">{post.author}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px] text-text-faint">
              <Heart className="h-2.5 w-2.5" /> {post.likes}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-text-faint">
              <MessageCircle className="h-2.5 w-2.5" /> {post.comments}
            </span>
            <Share2 className="h-2.5 w-2.5 text-text-faint hover:text-blush transition-colors" />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function PostsGrid({ posts }: { posts: typeof allPosts }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <PostCard key={post.title} post={post} index={i} />
      ))}
    </div>
  )
}

const tabs = [
  {
    id: 'all',
    label: 'All Posts',
    content: <PostsGrid posts={allPosts} />,
  },
  {
    id: 'engineering',
    label: 'Engineering',
    content: <PostsGrid posts={allPosts.filter((p) => p.category === 'Engineering')} />,
  },
  {
    id: 'design',
    label: 'Design',
    content: <PostsGrid posts={allPosts.filter((p) => p.category === 'Design')} />,
  },
  {
    id: 'product',
    label: 'Product',
    content: <PostsGrid posts={allPosts.filter((p) => p.category === 'Product')} />,
  },
]

export default function BlogMagazine() {
  return (
    <div className="min-h-screen bg-void">
      {/* Header */}
      <header className="border-b border-border bg-void/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-ignite" />
            <span className="font-pixel text-lg font-semibold text-chalk">The Praxys Blog</span>
          </div>
          <nav className="hidden items-center gap-6 sm:flex">
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Articles</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Tutorials</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Changelog</span>
          </nav>
          <div className="flex items-center gap-3">
            <button className="flex h-8 items-center gap-1.5 rounded-lg bg-ignite px-3 text-xs font-medium text-void cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-border py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-ignite/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <MorphingText
            words={['Ideas', 'Stories', 'Insights', 'Knowledge']}
            className="font-pixel text-sm uppercase tracking-widest text-ignite mb-4"
          />

          <h1 className="font-pixel text-3xl font-bold text-chalk sm:text-5xl leading-tight">
            <TypewriterText
              strings={['Where engineering meets design thinking', 'Thoughts on modern UI development', 'Building interfaces with precision']}
              typingSpeed={40}
              className="inline"
            />
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-blush leading-relaxed">
            Thoughts on building modern interfaces, component architecture, and the craft of frontend development.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-text-faint">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-ignite" />
              120+ articles
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              8 authors
            </span>
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-ignite animate-pulse" />
          <span className="font-pixel text-xs uppercase tracking-widest text-ignite">Featured</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group relative overflow-hidden rounded-2xl border border-border bg-obsidian p-8 sm:p-10 transition-colors hover:border-ignite/20 cursor-pointer"
        >
          <div className="absolute top-0 right-0 h-32 w-32 bg-ignite/5 blur-[80px]" />
          <div className="relative">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-ignite/30 bg-ignite/10 px-2.5 py-0.5 text-[10px] font-medium text-ignite">
                {featuredPost.category}
              </span>
              <span className="text-xs text-text-faint">{featuredPost.date}</span>
              <span className="flex items-center gap-1 text-xs text-text-faint">
                <Clock className="h-3 w-3" />
                {featuredPost.readTime}
              </span>
            </div>

            <h2 className="font-pixel text-xl font-bold text-chalk sm:text-2xl group-hover:text-ignite transition-colors">
              {featuredPost.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-blush leading-relaxed">
              {featuredPost.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ignite/10 text-xs font-medium text-ignite">
                  {featuredPost.author[0]}
                </div>
                <span className="text-sm text-chalk">{featuredPost.author}</span>
              </div>
              <span className="flex items-center gap-1.5 text-sm text-ignite group-hover:gap-2.5 transition-all">
                Read more
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Posts section with tabs */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <AnimatedTabs tabs={tabs} defaultTab="all" />

        {/* Load more */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-blush transition-colors hover:border-border-light hover:text-chalk cursor-pointer">
            Load more posts
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* Loading states demo */}
      <section className="border-t border-border bg-obsidian/30 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-8">
            <h2 className="font-pixel text-lg font-bold text-chalk">Loading States</h2>
            <p className="mt-2 text-sm text-blush">Graceful skeleton loading for content</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-xl border border-border bg-obsidian p-5 space-y-3">
                <SkeletonLoader variant="text" width="60%" />
                <SkeletonLoader variant="text" count={3} />
                <div className="flex items-center gap-2 pt-2">
                  <SkeletonLoader variant="avatar" width={24} height={24} />
                  <SkeletonLoader variant="text" width="40%" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter footer */}
      <section className="border-t border-border bg-obsidian/50 py-16">
        <div className="mx-auto max-w-lg px-6 text-center">
          <h3 className="font-pixel text-lg font-bold text-chalk">Stay in the loop</h3>
          <p className="mt-2 text-sm text-blush">
            Get the latest articles and updates delivered to your inbox.
          </p>
          <div className="mt-6 flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-lg border border-border bg-void px-4 py-2.5 text-sm text-chalk placeholder:text-text-faint outline-none focus:border-ignite/30"
            />
            <button className="rounded-lg bg-ignite px-5 py-2.5 text-sm font-medium text-void transition-colors hover:bg-ignite/90 cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
