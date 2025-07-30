import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "alert",
title: "Alert",
description:
  "Animated alert banner with four variants (info, success, warning, error), contextual icons, optional title, dismissible with exit animation.",
category: "visual",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type AlertVariant = 'info' | 'success' | 'warning' | 'error'

interface AlertProps {
  variant?: AlertVariant
  title?: string
  children?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

const variantStyles: Record<AlertVariant, string> = {
  info: 'border-ignite/30 bg-ignite/5 text-ignite',
  success: 'border-green-500/30 bg-green-500/5 text-green-400',
  warning: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
  error: 'border-red-500/30 bg-red-500/5 text-red-400',
}

const variantIconColor: Record<AlertVariant, string> = {
  info: 'text-ignite',
  success: 'text-green-400',
  warning: 'text-amber-400',
  error: 'text-red-400',
}

function AlertIcon({ variant }: { variant: AlertVariant }) {
  const iconClass = cn('h-5 w-5 shrink-0', variantIconColor[variant])

  switch (variant) {
    case 'info':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={iconClass}
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
            clipRule="evenodd"
          />
        </svg>
      )
    case 'success':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={iconClass}
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      )
    case 'warning':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={iconClass}
        >
          <path
            fillRule="evenodd"
            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      )
    case 'error':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={iconClass}
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clipRule="evenodd"
          />
        </svg>
      )
  }
}

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
}) => {
  const [visible, setVisible] = useState(true)

  const handleDismiss = useCallback(() => {
    setVisible(false)
    onDismiss?.()
  }, [onDismiss])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={cn(
            'relative flex items-start gap-3 rounded-lg border px-4 py-3',
            variantStyles[variant],
            className
          )}
        >
          {/* Variant icon */}
          <AlertIcon variant={variant} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <p className="text-sm font-medium leading-snug">{title}</p>
            )}
            {children && (
              <div
                className={cn(
                  'text-sm leading-relaxed',
                  title ? 'mt-1 opacity-80' : 'opacity-90'
                )}
              >
                {children}
              </div>
            )}
          </div>

          {/* Dismiss button */}
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="shrink-0 rounded-md p-0.5 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite/40"
              aria-label="Dismiss alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Alert`,
usage: `import Alert from "@/app/components/ui/alert"

export function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <Alert variant="success" title="Saved!">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="error" title="Error" dismissible>
        Something went wrong. Please try again.
      </Alert>
    </div>
  )
}`,
props: [
  {
    name: "variant",
    type: "'info' | 'success' | 'warning' | 'error'",
    default: "'info'",
    description: "Visual style variant of the alert.",
  },
  {
    name: "title",
    type: "string",
    default: "undefined",
    description: "Bold title text at the top of the alert.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    description: "Alert body content.",
  },
  {
    name: "dismissible",
    type: "boolean",
    default: "false",
    description: "Show a dismiss (X) button.",
  },
  {
    name: "onDismiss",
    type: "() => void",
    default: "undefined",
    description: "Callback when the alert is dismissed.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
],
playground: {
  controls: [
    { name: "variant", label: "Variant", type: "select", default: "info", options: ["info", "success", "warning", "error"] },
    { name: "title", label: "Title", type: "text", default: "Heads up!" },
    { name: "children", label: "Content", type: "text", default: "This is an important message for you." },
    { name: "dismissible", label: "Dismissible", type: "boolean", default: true },
  ],
},
component: () => import("@/app/components/ui/alert"),
demo: () => import("@/app/components/demos/alert-demo"),
};

export default entry;
