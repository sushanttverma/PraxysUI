'use client'

import React, { useRef, useState, useCallback, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  value?: File[]
  onChange?: (files: File[]) => void
  accept?: string
  maxSize?: number // in bytes
  multiple?: boolean
  maxFiles?: number
  disabled?: boolean
  className?: string
}

const FileUpload: React.FC<FileUploadProps> = ({
  value = [],
  onChange,
  accept,
  maxSize = 5 * 1024 * 1024, // 5MB default
  multiple = true,
  maxFiles = 10,
  disabled = false,
  className,
}) => {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const validateFiles = useCallback(
    (files: File[]): { valid: File[]; errors: string[] } => {
      const newErrors: string[] = []
      const validFiles: File[] = []

      // Check total file count
      if (value.length + files.length > maxFiles) {
        newErrors.push(`Maximum ${maxFiles} files allowed`)
        return { valid: [], errors: newErrors }
      }

      files.forEach((file) => {
        // Check file size
        if (file.size > maxSize) {
          newErrors.push(`${file.name} exceeds ${formatFileSize(maxSize)}`)
          return
        }

        // Check file type
        if (accept) {
          const acceptedTypes = accept.split(',').map((t) => t.trim())
          const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
          const isValidType = acceptedTypes.some(
            (type) =>
              type === file.type ||
              type === fileExtension ||
              (type.endsWith('/*') && file.type.startsWith(type.slice(0, -1)))
          )

          if (!isValidType) {
            newErrors.push(`${file.name} is not an accepted file type`)
            return
          }
        }

        validFiles.push(file)
      })

      return { valid: validFiles, errors: newErrors }
    },
    [value.length, maxFiles, maxSize, accept]
  )

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || disabled) return

      const fileArray = Array.from(files)
      const { valid, errors: validationErrors } = validateFiles(fileArray)

      setErrors(validationErrors)

      if (valid.length > 0) {
        const newFiles = multiple ? [...value, ...valid] : valid.slice(0, 1)
        onChange?.(newFiles)

        // Simulate upload progress
        valid.forEach((file, index) => {
          const fileId = `${file.name}-${Date.now()}-${index}`
          let progress = 0
          const interval = setInterval(() => {
            progress += Math.random() * 30
            if (progress >= 100) {
              progress = 100
              clearInterval(interval)
              setTimeout(() => {
                setUploadProgress((prev) => {
                  const updated = { ...prev }
                  delete updated[fileId]
                  return updated
                })
              }, 500)
            }
            setUploadProgress((prev) => ({ ...prev, [fileId]: progress }))
          }, 200)
        })
      }
    },
    [disabled, multiple, value, onChange, validateFiles]
  )

  const removeFile = useCallback(
    (index: number) => {
      if (disabled) return
      const newFiles = value.filter((_, i) => i !== index)
      onChange?.(newFiles)
    },
    [disabled, value, onChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) setIsDragging(true)
    },
    [disabled]
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleClick = useCallback(() => {
    if (!disabled) inputRef.current?.click()
  }, [disabled])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
        e.preventDefault()
        handleClick()
      }
    },
    [disabled, handleClick]
  )

  return (
    <div className={cn('w-full', className)}>
      {/* Drop zone */}
      <motion.div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={cn(
          'relative rounded-lg border-2 border-dashed transition-colors',
          'flex flex-col items-center justify-center p-8 min-h-[200px]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite/40',
          isDragging
            ? 'border-ignite bg-ignite/10'
            : 'border-border hover:border-border-light bg-obsidian',
          disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
        )}
        initial={false}
        animate={{
          borderColor: isDragging ? 'var(--color-ignite)' : 'var(--color-border)',
          scale: isDragging ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={false}
          animate={{ scale: isDragging ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Upload icon */}
          <motion.svg
            className="w-12 h-12 text-text-faint"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={false}
            animate={{
              y: isDragging ? -4 : 0,
              color: isDragging ? 'var(--color-ignite)' : 'var(--color-text-faint)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </motion.svg>

          <div className="text-center">
            <p className="text-sm text-chalk font-medium">
              {isDragging ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-xs text-text-faint mt-1">
              or click to browse
            </p>
          </div>

          {/* File constraints */}
          <div className="text-xs text-text-faint text-center space-y-0.5 mt-2">
            {accept && <p>Accepted: {accept}</p>}
            <p>Max size: {formatFileSize(maxSize)} per file</p>
            {multiple && <p>Max files: {maxFiles}</p>}
          </div>
        </motion.div>

        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
          className="sr-only"
          aria-label="File upload input"
        />
      </motion.div>

      {/* Errors */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="mt-3 space-y-1"
          >
            {errors.map((error, i) => (
              <p key={i} className="text-xs text-ignite flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File list */}
      <AnimatePresence mode="popLayout">
        {value.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="mt-4 space-y-2"
          >
            {value.map((file, index) => {
              const fileId = `${file.name}-${index}`
              const progress = uploadProgress[fileId]

              return (
                <motion.div
                  key={`${file.name}-${file.size}-${index}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                  className="relative flex items-center gap-3 p-3 rounded-lg bg-obsidian border border-border"
                >
                  {/* File icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-ignite/10 border border-ignite/30 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-ignite"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-chalk font-medium truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-text-faint">
                      {formatFileSize(file.size)}
                    </p>

                    {/* Progress bar */}
                    {progress !== undefined && progress < 100 && (
                      <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-ignite rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 20,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Remove button */}
                  <motion.button
                    type="button"
                    onClick={() => removeFile(index)}
                    disabled={disabled}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={cn(
                      'flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center',
                      'border border-border hover:border-ignite/50 hover:bg-ignite/10',
                      'text-text-faint hover:text-ignite transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite/40',
                      disabled && 'opacity-40 cursor-not-allowed'
                    )}
                    aria-label={`Remove ${file.name}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FileUpload
