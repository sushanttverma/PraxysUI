'use client'

import FolderPreview from '@/app/components/ui/folder-preview'

export default function FolderPreviewDemo() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6 py-8">
      <FolderPreview
        name="components"
        files={[
          { name: 'ui', type: 'folder' },
          { name: 'demos', type: 'folder' },
          { name: 'Navbar.tsx', type: 'file' },
          { name: 'Hero.tsx', type: 'file' },
          { name: 'Footer.tsx', type: 'file' },
        ]}
      />
      <FolderPreview
        name="lib"
        files={[
          { name: 'utils.ts', type: 'file' },
          { name: 'registry.ts', type: 'file' },
        ]}
      />
    </div>
  )
}
