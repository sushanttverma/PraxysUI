'use client'

import { useState } from 'react'
import FileUpload from '@/app/components/ui/file-upload'

export default function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* File upload component */}
        <div>
          <p className="mb-4 text-sm font-medium text-chalk">
            Upload Images
          </p>
          <FileUpload
            value={files}
            onChange={setFiles}
            accept=".jpg,.jpeg,.png,.gif"
            maxSize={5 * 1024 * 1024} // 5MB
            maxFiles={3}
            multiple={true}
          />
        </div>

        <div className="h-px bg-border" />

        {/* File list info */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Upload Summary
          </p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-text-faint">Files uploaded:</span>
              <span className="text-chalk font-medium">{files.length} / 3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-faint">Total size:</span>
              <span className="text-chalk font-medium">
                {(files.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <>
            <div className="h-px bg-border" />

            {/* Uploaded files details */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
                Uploaded Files
              </p>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex justify-between items-center text-sm p-2 rounded-md bg-border/20">
                    <span className="text-chalk truncate flex-1">{file.name}</span>
                    <span className="text-text-faint text-xs ml-2">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {files.length === 0 && (
          <>
            <div className="h-px bg-border" />

            {/* Empty state */}
            <div className="text-center py-4">
              <p className="text-sm text-text-faint">
                No files uploaded yet. Drag & drop or click to browse.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
