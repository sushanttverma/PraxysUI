import type { MotionState, TransitionConfig } from './AnimationStudio'

export interface AnimationPreset {
  name: string
  category: 'entrance' | 'attention' | 'exit' | 'loop'
  initial: Partial<MotionState>
  animate: Partial<MotionState>
  transition: Partial<TransitionConfig>
}

export const presets: AnimationPreset[] = [
  /* ─── Entrance ─────────────────────────── */
  {
    name: 'Fade In',
    category: 'entrance',
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  {
    name: 'Fade In Up',
    category: 'entrance',
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  {
    name: 'Fade In Down',
    category: 'entrance',
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  {
    name: 'Slide In Left',
    category: 'entrance',
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  {
    name: 'Slide In Right',
    category: 'entrance',
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  {
    name: 'Scale Up',
    category: 'entrance',
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: 'backOut' },
  },
  {
    name: 'Scale Down',
    category: 'entrance',
    initial: { opacity: 0, scale: 1.5 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  {
    name: 'Rotate In',
    category: 'entrance',
    initial: { opacity: 0, rotate: -90, scale: 0.7 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    transition: { duration: 0.5, ease: 'backOut' },
  },
  {
    name: 'Spring Pop',
    category: 'entrance',
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
  {
    name: 'Spring Slide',
    category: 'entrance',
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  },
  {
    name: 'Flip In',
    category: 'entrance',
    initial: { opacity: 0, rotate: 180, scale: 0.6 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    transition: { duration: 0.6, ease: 'backOut' },
  },
  {
    name: 'Skew In',
    category: 'entrance',
    initial: { opacity: 0, skewX: 20, x: -60 },
    animate: { opacity: 1, skewX: 0, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  /* ─── Attention Seekers ────────────────── */
  {
    name: 'Pulse',
    category: 'attention',
    initial: { scale: 1 },
    animate: { scale: 1.1 },
    transition: { duration: 0.4, repeat: -1, repeatType: 'mirror', ease: 'easeInOut' },
  },
  {
    name: 'Shake X',
    category: 'attention',
    initial: { x: 0 },
    animate: { x: 10 },
    transition: { duration: 0.1, repeat: 5, repeatType: 'mirror', ease: 'easeInOut' },
  },
  {
    name: 'Shake Y',
    category: 'attention',
    initial: { y: 0 },
    animate: { y: 10 },
    transition: { duration: 0.1, repeat: 5, repeatType: 'mirror', ease: 'easeInOut' },
  },
  {
    name: 'Wobble',
    category: 'attention',
    initial: { rotate: 0 },
    animate: { rotate: 15 },
    transition: { duration: 0.15, repeat: 5, repeatType: 'mirror', ease: 'easeInOut' },
  },
  {
    name: 'Bounce',
    category: 'attention',
    initial: { y: 0 },
    animate: { y: -30 },
    transition: { type: 'spring', stiffness: 400, damping: 10, repeat: -1, repeatType: 'mirror' },
  },
  {
    name: 'Heartbeat',
    category: 'attention',
    initial: { scale: 1 },
    animate: { scale: 1.25 },
    transition: { duration: 0.25, repeat: -1, repeatType: 'mirror', repeatDelay: 0.4 },
  },
  {
    name: 'Jello',
    category: 'attention',
    initial: { skewX: 0, skewY: 0 },
    animate: { skewX: 12, skewY: 6 },
    transition: { duration: 0.2, repeat: 3, repeatType: 'mirror', ease: 'easeInOut' },
  },
  {
    name: 'Glow Pulse',
    category: 'attention',
    initial: { opacity: 0.5 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, repeat: -1, repeatType: 'mirror', ease: 'easeInOut' },
  },

  /* ─── Exit ─────────────────────────────── */
  {
    name: 'Fade Out',
    category: 'exit',
    initial: { opacity: 1 },
    animate: { opacity: 0 },
    transition: { duration: 0.4, ease: 'easeIn' },
  },
  {
    name: 'Fade Out Down',
    category: 'exit',
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 0, y: 40 },
    transition: { duration: 0.4, ease: 'easeIn' },
  },
  {
    name: 'Fade Out Up',
    category: 'exit',
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 0, y: -40 },
    transition: { duration: 0.4, ease: 'easeIn' },
  },
  {
    name: 'Scale Out',
    category: 'exit',
    initial: { opacity: 1, scale: 1 },
    animate: { opacity: 0, scale: 0.5 },
    transition: { duration: 0.3, ease: 'easeIn' },
  },
  {
    name: 'Slide Out Right',
    category: 'exit',
    initial: { opacity: 1, x: 0 },
    animate: { opacity: 0, x: 100 },
    transition: { duration: 0.4, ease: 'easeIn' },
  },
  {
    name: 'Slide Out Left',
    category: 'exit',
    initial: { opacity: 1, x: 0 },
    animate: { opacity: 0, x: -100 },
    transition: { duration: 0.4, ease: 'easeIn' },
  },

  /* ─── Loop / Continuous ────────────────── */
  {
    name: 'Float',
    category: 'loop',
    initial: { y: 0 },
    animate: { y: -15 },
    transition: { duration: 2, repeat: -1, repeatType: 'mirror', ease: 'easeInOut' },
  },
  {
    name: 'Spin',
    category: 'loop',
    initial: { rotate: 0 },
    animate: { rotate: 360 },
    transition: { duration: 2, repeat: -1, repeatType: 'loop', ease: 'linear' },
  },
  {
    name: 'Breathe',
    category: 'loop',
    initial: { scale: 1 },
    animate: { scale: 1.05 },
    transition: { duration: 3, repeat: -1, repeatType: 'mirror', ease: 'easeInOut' },
  },
  {
    name: 'Sway',
    category: 'loop',
    initial: { rotate: -5 },
    animate: { rotate: 5 },
    transition: { duration: 1.5, repeat: -1, repeatType: 'mirror', ease: 'easeInOut' },
  },
]
