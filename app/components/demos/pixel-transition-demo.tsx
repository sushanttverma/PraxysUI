'use client'

import React from 'react'
import PixelTransition from '@/app/components/ui/pixel-transition'

const PixelTransitionDemo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full py-12">
      <PixelTransition
        firstContent={
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-600 to-violet-500 text-white text-2xl font-bold rounded-xl">
            Hover Me
          </div>
        }
        secondContent={
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-emerald-500 to-teal-400 text-white text-2xl font-bold rounded-xl">
            Hello!
          </div>
        }
        gridSize={7}
        pixelColor="#E04E2D"
        className="w-[300px] h-[300px] rounded-xl"
      />
    </div>
  )
}

export default PixelTransitionDemo
