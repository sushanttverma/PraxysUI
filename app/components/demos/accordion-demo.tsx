'use client'

import Accordion from '@/app/components/ui/accordion'

export default function AccordionDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-lg mx-auto">
      <Accordion
        items={[
          {
            id: '1',
            title: 'What is Praxys UI?',
            content:
              'Praxys UI is an open-source collection of animated React components that you can copy and paste into your Next.js projects.',
          },
          {
            id: '2',
            title: 'How do I install components?',
            content:
              'You can use the CLI tool (npx praxys-ui add component-name) or simply copy the component source code from the docs.',
          },
          {
            id: '3',
            title: 'Is it free to use?',
            content:
              'Yes! Praxys UI is completely free and open-source under the MIT license.',
          },
          {
            id: '4',
            title: 'Can I customize the components?',
            content:
              'Absolutely. All components are copy-paste, so you own the code and can modify anything — colors, animations, sizes, and behavior.',
          },
        ]}
        defaultOpen={['1']}
      />
    </div>
  )
}
