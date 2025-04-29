'use client'

import LogoSlider from '@/app/components/ui/logo-slider'

const logos = [
  <span key="vercel" className="font-pixel text-lg text-chalk">▲ Vercel</span>,
  <span key="next" className="font-pixel text-lg text-chalk">Next.js</span>,
  <span key="react" className="font-pixel text-lg text-chalk">⚛ React</span>,
  <span key="tailwind" className="font-pixel text-lg text-chalk">Tailwind</span>,
  <span key="framer" className="font-pixel text-lg text-chalk">Framer</span>,
  <span key="typescript" className="font-pixel text-lg text-chalk">TypeScript</span>,
  <span key="prisma" className="font-pixel text-lg text-chalk">Prisma</span>,
  <span key="stripe" className="font-pixel text-lg text-chalk">Stripe</span>,
]

export default function LogoSliderDemo() {
  return (
    <div className="flex flex-col items-center gap-8 py-8 w-full">
      <LogoSlider logos={logos} speed={35} />
      <LogoSlider logos={logos} speed={25} direction="right" />
    </div>
  )
}
