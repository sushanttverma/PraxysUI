'use client'

import Folder from '@/app/components/ui/folder'

export default function FolderDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-12 py-8">
      <Folder
        color="#E04E2D"
        items={[
          <span key="1">Document 1</span>,
          <span key="2">Photo</span>,
          <span key="3">Notes</span>,
        ]}
      />
      <Folder
        color="#3B82F6"
        size={1.1}
        items={[
          <span key="1">Report.pdf</span>,
          <span key="2">Budget.xlsx</span>,
        ]}
      />
      <Folder
        color="#10B981"
        size={0.9}
        items={[
          <span key="1">Sketch</span>,
          <span key="2">Mockup</span>,
          <span key="3">Wireframe</span>,
        ]}
      />
    </div>
  )
}
