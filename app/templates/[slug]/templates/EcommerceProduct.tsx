'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Star, Heart, Share2, Check, ChevronDown, Shield, Truck, RotateCcw, Github, Twitter, Instagram } from 'lucide-react'
import MaskedAvatars from '@/app/components/ui/masked-avatars'
import SocialFlipButton from '@/app/components/ui/social-flip-button'
import RevealLoader from '@/app/components/ui/reveal-loader'
import AnimatedButton from '@/app/components/ui/animated-button'

const productImages = [
  'Main View',
  'Side View',
  'Detail View',
  'In Use',
]

const reviewers = [
  { name: 'Jordan Lee', src: '' },
  { name: 'Casey Kim', src: '' },
  { name: 'Riley Chen', src: '' },
  { name: 'Morgan Patel', src: '' },
  { name: 'Taylor Nguyen', src: '' },
  { name: 'Alex Rivera', src: '' },
  { name: 'Sam Watson', src: '' },
]

const reviews = [
  { author: 'Jordan L.', rating: 5, text: 'Absolutely incredible build quality. The attention to detail is unmatched at this price point.' },
  { author: 'Casey K.', rating: 5, text: 'Been using it daily for 3 months. Still feels and looks brand new. Highly recommend.' },
  { author: 'Riley C.', rating: 4, text: 'Great product overall. Shipping was fast and the packaging was premium.' },
]

const specs = [
  { label: 'Material', value: 'Aerospace-grade aluminum' },
  { label: 'Weight', value: '280g' },
  { label: 'Dimensions', value: '165 x 78 x 12mm' },
  { label: 'Battery', value: '5000mAh, 65W charging' },
  { label: 'Display', value: '6.7" AMOLED, 120Hz' },
  { label: 'Warranty', value: '2 years limited' },
]

const socialLinks = [
  { icon: <Twitter className="h-4 w-4" />, href: '#', label: 'Twitter' },
  { icon: <Instagram className="h-4 w-4" />, href: '#', label: 'Instagram' },
  { icon: <Github className="h-4 w-4" />, href: '#', label: 'GitHub' },
]

const EcommerceProduct: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('Obsidian')
  const [quantity, setQuantity] = useState(1)
  const [showSpecs, setShowSpecs] = useState(false)
  const [showReveal, setShowReveal] = useState(true)

  const colors = [
    { name: 'Obsidian', hex: '#0B0A08' },
    { name: 'Ignite', hex: '#E84E2D' },
    { name: 'Chalk', hex: '#F2ECE2' },
  ]

  return (
    <div className="min-h-screen bg-void">
      {/* Navigation */}
      <nav className="border-b border-border/60 bg-void/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="font-pixel text-lg font-bold text-chalk">PRAXYS STORE</span>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-sm text-blush transition-colors hover:text-chalk">Shop</a>
            <a href="#" className="text-sm text-blush transition-colors hover:text-chalk">New</a>
            <a href="#" className="text-sm text-blush transition-colors hover:text-chalk">About</a>
          </div>
          <div className="flex items-center gap-3">
            <SocialFlipButton frontLabel="Share" links={socialLinks} />
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-blush transition-colors hover:text-chalk cursor-pointer">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-ignite font-pixel text-[9px] font-bold text-void">
                2
              </span>
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Product images */}
          <div>
            {/* Main image with reveal loader */}
            {showReveal ? (
              <RevealLoader
                duration={2.5}
                className="h-80 sm:h-[420px]"
                onComplete={() => setShowReveal(false)}
              >
                <div className="flex h-full items-center justify-center">
                  <span className="font-pixel text-2xl text-chalk">{productImages[selectedImage]}</span>
                </div>
              </RevealLoader>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-80 sm:h-[420px] items-center justify-center rounded-xl border border-border bg-obsidian"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="font-pixel text-2xl text-chalk"
                  >
                    {productImages[selectedImage]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            )}

            {/* Thumbnail strip */}
            <div className="mt-4 flex gap-3">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex h-16 w-16 items-center justify-center rounded-lg border text-[10px] transition-colors cursor-pointer ${
                    selectedImage === i
                      ? 'border-ignite/50 bg-ignite/10 text-ignite'
                      : 'border-border bg-obsidian text-text-faint hover:border-border-light'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-ignite/10 border border-ignite/20 px-2.5 py-0.5 font-pixel text-[10px] text-ignite">
                New Release
              </span>
              <span className="text-xs text-text-faint">SKU: PRX-2026-001</span>
            </div>

            <h1 className="font-pixel text-2xl font-bold text-chalk sm:text-3xl">
              Praxys One Pro
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= 4.8 ? 'fill-ignite text-ignite' : 'text-border'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-blush">4.8 (234 reviews)</span>
            </div>

            {/* Avatars */}
            <div className="mt-4 flex items-center gap-3">
              <MaskedAvatars avatars={reviewers} max={5} size={32} />
              <span className="text-xs text-text-faint">234 happy customers</span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-pixel text-3xl font-bold text-chalk">$299</span>
              <span className="text-sm text-text-faint line-through">$399</span>
              <span className="rounded-md bg-ignite/10 border border-ignite/20 px-2 py-0.5 font-pixel text-[10px] text-ignite">
                Save 25%
              </span>
            </div>

            {/* Color selector */}
            <div className="mt-6">
              <p className="mb-2 text-sm text-blush">Color: <span className="text-chalk">{selectedColor}</span></p>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all cursor-pointer ${
                      selectedColor === color.name
                        ? 'border-ignite scale-110'
                        : 'border-border hover:border-border-light'
                    }`}
                  >
                    <div
                      className="h-6 w-6 rounded-full"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-4">
              <p className="text-sm text-blush">Quantity:</p>
              <div className="flex items-center rounded-lg border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm text-blush transition-colors hover:text-chalk cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center font-pixel text-sm text-chalk">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm text-blush transition-colors hover:text-chalk cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              <AnimatedButton className="flex-1 py-3 text-sm">
                <ShoppingCart className="mr-2 inline h-4 w-4" />
                Add to Cart
              </AnimatedButton>
              <button className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-blush transition-colors hover:border-ignite/30 hover:text-ignite cursor-pointer">
                <Heart className="h-4 w-4" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: <Shield className="h-4 w-4" />, label: '2 Year Warranty' },
                { icon: <Truck className="h-4 w-4" />, label: 'Free Shipping' },
                { icon: <RotateCcw className="h-4 w-4" />, label: '30-Day Returns' },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-obsidian p-3 text-center">
                  <div className="text-ignite">{badge.icon}</div>
                  <span className="text-[10px] text-blush">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Specs accordion */}
            <div className="mt-8">
              <button
                onClick={() => setShowSpecs(!showSpecs)}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-obsidian px-4 py-3 text-sm font-medium text-chalk transition-colors hover:border-border-light cursor-pointer"
              >
                Specifications
                <ChevronDown className={`h-4 w-4 text-blush transition-transform ${showSpecs ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showSpecs && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 rounded-lg border border-border bg-obsidian">
                      {specs.map((spec, i) => (
                        <div
                          key={spec.label}
                          className={`flex items-center justify-between px-4 py-2.5 ${
                            i < specs.length - 1 ? 'border-b border-border' : ''
                          }`}
                        >
                          <span className="text-xs text-text-faint">{spec.label}</span>
                          <span className="text-xs text-chalk">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="font-pixel text-xl font-bold text-chalk mb-6">Customer Reviews</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-obsidian p-5"
              >
                <div className="mb-3 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${star <= review.rating ? 'fill-ignite text-ignite' : 'text-border'}`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-blush">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ignite/10 font-pixel text-[10px] text-ignite">
                    {review.author.charAt(0)}
                  </div>
                  <span className="text-xs font-medium text-chalk">{review.author}</span>
                  <Check className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-[10px] text-text-faint">Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-border py-8 px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-pixel text-sm font-bold text-chalk">PRAXYS STORE</span>
          <p className="text-xs text-text-faint">&copy; 2026 Praxys Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default EcommerceProduct
