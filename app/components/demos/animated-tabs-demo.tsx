'use client'

import AnimatedTabs from '@/app/components/ui/animated-tabs'

export default function AnimatedTabsDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-lg mx-auto">
      <AnimatedTabs
        tabs={[
          {
            id: 'preview',
            label: 'Preview',
            content: (
              <div className="rounded-lg border border-border bg-obsidian p-6 text-center">
                <p className="text-chalk font-pixel text-lg">Component Preview</p>
                <p className="mt-2 text-sm text-blush">This is where the live preview would appear.</p>
              </div>
            ),
          },
          {
            id: 'code',
            label: 'Code',
            content: (
              <div className="rounded-lg border border-border bg-obsidian p-6">
                <pre className="text-sm text-blush font-mono">
                  {`import AnimatedTabs from "@/components/ui/animated-tabs"\n\n<AnimatedTabs tabs={[...]} />`}
                </pre>
              </div>
            ),
          },
          {
            id: 'usage',
            label: 'Usage',
            content: (
              <div className="rounded-lg border border-border bg-obsidian p-6">
                <p className="text-sm text-blush">Install the component and import it into your project. Customize the tabs array with your own content.</p>
              </div>
            ),
          },
        ]}
        defaultTab="preview"
      />
    </div>
  )
}
