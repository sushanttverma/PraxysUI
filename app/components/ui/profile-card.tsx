'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Social {
  icon: React.ReactNode
  href: string
}

interface ProfileCardProps {
  avatar: string
  name: string
  role?: string
  bio?: string
  socials?: Social[]
  className?: string
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 400, damping: 28 },
  },
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatar,
  name,
  role,
  bio,
  socials,
  className,
}) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={cn(
        'flex flex-col items-center rounded-xl border border-border bg-obsidian p-6 text-center',
        className
      )}
    >
      {/* Avatar */}
      <motion.div variants={item} className="relative">
        <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-border">
          <img
            src={avatar}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-obsidian bg-emerald-400" />
      </motion.div>

      {/* Name */}
      <motion.h3
        variants={item}
        className="mt-4 text-lg font-semibold text-chalk"
      >
        {name}
      </motion.h3>

      {/* Role */}
      {role && (
        <motion.p variants={item} className="mt-1 text-sm text-ignite">
          {role}
        </motion.p>
      )}

      {/* Bio */}
      {bio && (
        <motion.p
          variants={item}
          className="mt-3 text-sm leading-relaxed text-blush"
        >
          {bio}
        </motion.p>
      )}

      {/* Social links */}
      {socials && socials.length > 0 && (
        <motion.div
          variants={item}
          className="mt-4 flex items-center gap-3"
        >
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-void text-text-faint transition-colors hover:border-ignite/40 hover:text-ignite"
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default ProfileCard
