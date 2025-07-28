'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GitCommit, Sparkles, Wrench, Zap, BookOpen, Palette,
  Terminal, Search, Shield, Puzzle, ChevronDown, Plus,
  CheckCircle, ArrowUp,
  type LucideIcon,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import { changelog, type ChangelogEntry } from '@/data/changelog'

// ─── Icon resolver ───────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  puzzle: Puzzle,
  shield: Shield,
  wrench: Wrench,
  terminal: Terminal,
  search: Search,
  palette: Palette,
  zap: Zap,
}

function EntryIcon({ name }: { name: string }) {
  const Icon = iconMap[name] ?? Zap
  return <Icon className="h-4 w-4" />
}

// ─── Type badge config ───────────────────────────────────

const typeConfig = {
  added: {
    icon: Plus,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    label: 'Added',
  },
  fixed: {
    icon: Wrench,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    label: 'Fixed',
  },
  improved: {
    icon: ArrowUp,
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/20',
    label: 'Improved',
  },
}

// ─── Collapsible release card ────────────────────────────

function ReleaseCard({ entry, defaultOpen }: { entry: ChangelogEntry; defaultOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const addedCount = entry.changes.filter((c) => c.type === 'added').length
  const fixedCount = entry.changes.filter((c) => c.type === 'fixed').length
  const improvedCount = entry.changes.filter((c) => c.type === 'improved').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border bg-obsidian/30 overflow-hidden transition-colors hover:border-border-light"
    >
      {/* Header — always visible, clickable */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-start gap-4 px-5 py-5 text-left cursor-pointer sm:items-center"
      >
        {/* Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ignite/20 bg-ignite/10 text-ignite">
          <EntryIcon name={entry.iconName} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="rounded-md border border-ignite/30 bg-ignite/10 px-2 py-0.5 font-mono text-xs font-medium text-ignite">
              v{entry.version}
            </span>
            <span className="text-xs text-text-faint">{entry.date}</span>
          </div>
          <h2 className="font-pixel text-base font-bold text-chalk sm:text-lg">
            {entry.title}
          </h2>
          {/* Stats pills */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {addedCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                <Plus className="h-2.5 w-2.5" />
                {addedCount} added
              </span>
            )}
            {improvedCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-sky-400/20 bg-sky-400/10 px-2 py-0.5 text-[10px] font-medium text-sky-400">
                <ArrowUp className="h-2.5 w-2.5" />
                {improvedCount} improved
              </span>
            )}
            {fixedCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                <CheckCircle className="h-2.5 w-2.5" />
                {fixedCount} fixed
              </span>
            )}
          </div>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-text-faint mt-1"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 px-5 py-4">
              <p className="mb-4 text-sm text-blush/80 leading-relaxed">
                {entry.description}
              </p>

              <div className="space-y-2">
                {entry.changes.map((change, i) => {
                  const cfg = typeConfig[change.type]
                  const Icon = cfg.icon
                  return (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${cfg.bg} ${cfg.border} border`}>
                        <Icon className={`h-2.5 w-2.5 ${cfg.color}`} />
                      </span>
                      <span className="text-chalk/80 leading-relaxed">{change.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Main ────────────────────────────────────────────────

export default function ChangelogContent() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <main id="main-content" className="mx-auto max-w-3xl px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ignite/10 border border-ignite/20">
              <BookOpen className="h-4 w-4 text-ignite" />
            </div>
            <span className="font-pixel text-xs uppercase tracking-widest text-ignite">
              Changelog
            </span>
          </div>
          <h1 className="font-pixel text-3xl font-bold text-chalk sm:text-4xl">
            What&apos;s New
          </h1>
          <p className="mt-3 max-w-2xl text-base text-blush leading-relaxed">
            A complete history of features, fixes, and improvements to Praxys UI.
          </p>

          {/* Summary stats */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-lg border border-border bg-obsidian/50 px-4 py-2.5">
              <p className="font-mono text-lg font-bold text-chalk">{changelog.length}</p>
              <p className="text-[10px] uppercase tracking-wider text-text-faint">Releases</p>
            </div>
            <div className="rounded-lg border border-border bg-obsidian/50 px-4 py-2.5">
              <p className="font-mono text-lg font-bold text-emerald-400">
                {changelog.reduce((n, e) => n + e.changes.filter((c) => c.type === 'added').length, 0)}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-text-faint">Features</p>
            </div>
            <div className="rounded-lg border border-border bg-obsidian/50 px-4 py-2.5">
              <p className="font-mono text-lg font-bold text-amber-400">
                {changelog.reduce((n, e) => n + e.changes.filter((c) => c.type === 'fixed').length, 0)}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-text-faint">Bug Fixes</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-6 bottom-6 w-px bg-border hidden sm:block" />

          <div className="space-y-4 sm:pl-12">
            {changelog.map((entry, i) => (
              <div key={entry.version} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-12 top-6 hidden h-[22px] w-[22px] items-center justify-center rounded-full border border-border bg-obsidian text-ignite sm:flex">
                  <GitCommit className="h-3 w-3" />
                </div>
                <ReleaseCard entry={entry} defaultOpen={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}
