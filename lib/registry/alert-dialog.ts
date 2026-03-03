import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "alert-dialog",
title: "Alert Dialog",
description:
  "An accessible confirmation dialog with role=\"alertdialog\", focus trap, auto-focus on cancel, spring animation, and default/destructive variants.",
category: "navigation",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AlertDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'destructive'
  className?: string
}

const FOCUSABLE = 'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  className,
}) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    },
    []
  )

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => {
        cancelRef.current?.focus()
      })
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      if (!open && previousFocusRef.current) {
        previousFocusRef.current.focus()
        previousFocusRef.current = null
      }
    }
  }, [open, handleKeyDown])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="alert-dialog-title"
            aria-describedby={description ? 'alert-dialog-description' : undefined}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className={cn(
              'relative z-10 w-full max-w-md rounded-xl border border-border bg-obsidian p-6 shadow-xl',
              className
            )}
          >
            <div
              className={cn(
                'mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full',
                variant === 'destructive'
                  ? 'bg-red-500/10 text-red-400'
                  : 'bg-ignite/10 text-ignite'
              )}
            >
              {variant === 'destructive' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
            </div>

            <h2 id="alert-dialog-title" className="text-center text-lg font-medium text-chalk">
              {title}
            </h2>

            {description && (
              <p id="alert-dialog-description" className="mt-2 text-center text-sm text-blush">
                {description}
              </p>
            )}

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                ref={cancelRef}
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-blush transition-colors hover:bg-ignite/10 hover:text-chalk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite/40"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2',
                  variant === 'destructive'
                    ? 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500/40'
                    : 'bg-ignite text-chalk hover:bg-ignite/90 focus-visible:ring-ignite/40'
                )}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default AlertDialog`,
usage: `import AlertDialog from "@/app/components/ui/alert-dialog"

export function Demo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Delete Item</button>
      <AlertDialog
        open={open}
        onConfirm={() => { /* perform action */ setOpen(false) }}
        onCancel={() => setOpen(false)}
        title="Delete this item?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
      />
    </>
  )
}`,
props: [
  {
    name: "open",
    type: "boolean",
    default: "—",
    description: "Whether the alert dialog is visible.",
  },
  {
    name: "onConfirm",
    type: "() => void",
    default: "—",
    description: "Callback fired when the confirm button is clicked.",
  },
  {
    name: "onCancel",
    type: "() => void",
    default: "—",
    description: "Callback fired when the cancel button is clicked.",
  },
  {
    name: "title",
    type: "string",
    default: "—",
    description: "Heading text for the alert dialog.",
  },
  {
    name: "description",
    type: "string",
    default: "undefined",
    description: "Optional description text below the title.",
  },
  {
    name: "confirmLabel",
    type: "string",
    default: "'Confirm'",
    description: "Label for the confirm action button.",
  },
  {
    name: "cancelLabel",
    type: "string",
    default: "'Cancel'",
    description: "Label for the cancel action button.",
  },
  {
    name: "variant",
    type: "'default' | 'destructive'",
    default: "'default'",
    description: "Visual variant — destructive uses red styling.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes for the dialog panel.",
  },
],
playground: {
  controls: [
    { name: "title", label: "Title", type: "text", default: "Are you sure?" },
    { name: "description", label: "Description", type: "text", default: "This action cannot be undone." },
    { name: "variant", label: "Variant", type: "select", default: "default", options: ["default", "destructive"] },
    { name: "confirmLabel", label: "Confirm Label", type: "text", default: "Confirm" },
    { name: "cancelLabel", label: "Cancel Label", type: "text", default: "Cancel" },
  ],
},
component: () => import("@/app/components/ui/alert-dialog"),
demo: () => import("@/app/components/demos/alert-dialog-demo"),
};

export default entry;
