'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────

export interface FloatingMenuItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface FloatingMenuSection {
  title: string
  items: FloatingMenuItem[]
}

export interface FloatingMenuProps {
  sections: FloatingMenuSection[]
  className?: string
  width?: number
  badge?: React.ReactNode
}

// ─── Text Scramble ───────────────────────────────────────

function scrambleText(el: HTMLElement, target: string, duration: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const steps = Math.ceil(duration / 0.03)
  let step = 0

  const interval = setInterval(() => {
    step++
    const progress = step / steps
    const revealed = Math.floor(progress * target.length)

    let text = ''
    for (let i = 0; i < target.length; i++) {
      if (i < revealed) {
        text += target[i]
      } else {
        text += chars[Math.floor(Math.random() * chars.length)]
      }
    }
    el.textContent = text

    if (step >= steps) {
      clearInterval(interval)
      el.textContent = target
    }
  }, 30)
}

// ─── Component ───────────────────────────────────────────

const FloatingMenu: React.FC<FloatingMenuProps> = ({
  sections,
  className = '',
  width = 320,
  badge,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuOpenRef = useRef(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const topLineRef = useRef<HTMLSpanElement>(null)
  const bottomLineRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const animateOpen = useCallback(() => {
    if (tlRef.current) tlRef.current.kill()
    const tl = gsap.timeline()
    tlRef.current = tl

    tl.to(shellRef.current, { width, duration: 0.25, ease: 'power3.out' }, 0)
    tl.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.25, ease: 'power3.out' }, 0)
    tl.to(topLineRef.current, { rotate: 45, y: 0, duration: 0.15, ease: 'power2.out' }, 0)
    tl.to(bottomLineRef.current, { rotate: -45, y: 0, duration: 0.15, ease: 'power2.out' }, 0)

    const items = itemsRef.current.filter(Boolean)
    tl.fromTo(
      items,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.25, stagger: 0.04, ease: 'power2.out' },
      0.06,
    )

    if (labelRef.current) scrambleText(labelRef.current, 'Close', 0.2)
  }, [width])

  const animateClose = useCallback(() => {
    if (tlRef.current) tlRef.current.kill()
    const tl = gsap.timeline()
    tlRef.current = tl

    const items = itemsRef.current.filter(Boolean)
    tl.to(items, { opacity: 0, y: 8, duration: 0.1, stagger: 0.015, ease: 'power2.in' }, 0)
    tl.to(contentRef.current, { height: 0, opacity: 0, duration: 0.2, ease: 'power3.in' }, 0.04)
    tl.to(shellRef.current, { width: 'auto', duration: 0.25, ease: 'power3.inOut' }, 0.04)
    tl.to(topLineRef.current, { rotate: 0, y: -3, duration: 0.15, ease: 'power2.out' }, 0)
    tl.to(bottomLineRef.current, { rotate: 0, y: 3, duration: 0.15, ease: 'power2.out' }, 0)

    if (labelRef.current) scrambleText(labelRef.current, 'Menu', 0.2)
  }, [])

  const toggleMenu = useCallback(() => {
    const next = !menuOpenRef.current
    menuOpenRef.current = next
    if (next) animateOpen()
    else animateClose()
    requestAnimationFrame(() => setMenuOpen(next))
  }, [animateOpen, animateClose])

  const closeMenu = useCallback(() => {
    if (!menuOpenRef.current) return
    menuOpenRef.current = false
    animateClose()
    requestAnimationFrame(() => setMenuOpen(false))
  }, [animateClose])

  useEffect(() => {
    if (labelRef.current) labelRef.current.textContent = 'Menu'
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuOpenRef.current && wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        closeMenu()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [closeMenu])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [closeMenu])

  let refIdx = 0

  return (
    <div className={cn('inline-block', className)} ref={wrapRef}>
      <div
        ref={shellRef}
        className="relative overflow-hidden rounded-2xl border border-border bg-obsidian shadow-2xl shadow-black/20"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-1.5 py-1.5 gap-2">
          <button
            onClick={toggleMenu}
            className={cn(
              'flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200',
              menuOpen
                ? 'bg-chalk text-void'
                : 'bg-void text-chalk hover:bg-border/50',
            )}
          >
            <div className="relative w-4 h-3.5 flex items-center justify-center">
              <span
                ref={topLineRef}
                style={{ transform: 'translateY(-3px)' }}
                className={cn(
                  'absolute w-3.5 h-[1.5px] rounded-full origin-center',
                  menuOpen ? 'bg-void' : 'bg-chalk',
                )}
              />
              <span
                ref={bottomLineRef}
                style={{ transform: 'translateY(3px)' }}
                className={cn(
                  'absolute w-3.5 h-[1.5px] rounded-full origin-center',
                  menuOpen ? 'bg-void' : 'bg-chalk',
                )}
              />
            </div>
            <span ref={labelRef} className="min-w-[2.5rem]" suppressHydrationWarning />
          </button>

          {badge && (
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-void text-text-faint text-xs font-medium select-none">
              {badge}
            </div>
          )}
        </div>

        {/* Expanded content */}
        <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
          {sections.map((section, sectionIdx) => (
            <React.Fragment key={section.title}>
              {sectionIdx > 0 && <div className="mx-6 my-3 border-t border-border" />}
              <div className="px-6 pt-4 pb-2">
                <p className="text-[11px] text-text-faint/50 mb-4">{section.title}</p>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const idx = refIdx++
                    const isFirst = sectionIdx === 0
                    return (
                      <div
                        key={item.label}
                        ref={(el) => { itemsRef.current[idx] = el }}
                        style={{ opacity: 0 }}
                      >
                        {item.href ? (
                          <a
                            href={item.href}
                            onClick={closeMenu}
                            className="block py-1.5 text-chalk hover:text-ignite transition-colors duration-150"
                          >
                            <span className={cn(
                              'tracking-tight',
                              isFirst ? 'text-2xl font-semibold' : 'text-sm',
                            )}>
                              {item.label}
                            </span>
                          </a>
                        ) : item.onClick ? (
                          <button
                            onClick={() => { item.onClick?.(); closeMenu() }}
                            className="block py-1.5 text-chalk hover:text-ignite transition-colors duration-150 w-full text-left"
                          >
                            <span className={cn(
                              'tracking-tight',
                              isFirst ? 'text-2xl font-semibold' : 'text-sm',
                            )}>
                              {item.label}
                            </span>
                          </button>
                        ) : (
                          <div className="py-1.5">
                            <span className={cn(
                              'tracking-tight text-text-faint/60',
                              isFirst ? 'text-2xl font-semibold' : 'text-sm',
                            )}>
                              {item.label}
                            </span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FloatingMenu
