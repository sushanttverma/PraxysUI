'use client'

import { useState } from 'react'
import ColorPicker from '@/app/components/ui/color-picker'

const brandPresets = [
  '#E84E2D', // ignite (primary)
  '#FF6B9D', // blush
  '#8B5CF6', // purple
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
]

export default function ColorPickerDemo() {
  const [primaryColor, setPrimaryColor] = useState('#E84E2D')
  const [accentColor, setAccentColor] = useState('#8B5CF6')
  const [backgroundColor, setBackgroundColor] = useState('#3B82F6')

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-8">
        {/* Primary color picker */}
        <div className="space-y-3">
          <ColorPicker
            label="Primary Color"
            value={primaryColor}
            onChange={setPrimaryColor}
          />
          <div className="flex items-center justify-center gap-3">
            <div
              className="h-16 w-16 rounded-lg border-2 border-border shadow-lg"
              style={{ backgroundColor: primaryColor }}
            />
            <div className="text-left">
              <div className="text-xs text-text-faint">Current Color</div>
              <div className="text-sm font-mono text-chalk font-semibold">
                {primaryColor.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Accent color picker with alpha */}
        <div className="space-y-3">
          <ColorPicker
            label="Accent Color"
            value={accentColor}
            onChange={setAccentColor}
            showAlpha={true}
          />
          <div className="flex items-center justify-center gap-3">
            <div
              className="h-16 w-16 rounded-lg border-2 border-border shadow-lg relative overflow-hidden"
              style={{ backgroundColor: accentColor }}
            >
              {/* Checkerboard pattern for transparency */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  backgroundImage:
                    'linear-gradient(45deg, #18181b 25%, transparent 25%), linear-gradient(-45deg, #18181b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #18181b 75%), linear-gradient(-45deg, transparent 75%, #18181b 75%)',
                  backgroundSize: '8px 8px',
                  backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
                }}
              />
            </div>
            <div className="text-left">
              <div className="text-xs text-text-faint">Current Color</div>
              <div className="text-sm font-mono text-chalk font-semibold">
                {accentColor.toUpperCase()}
              </div>
              <div className="text-xs text-ignite">Alpha channel enabled</div>
            </div>
          </div>
        </div>

        {/* Background color picker with custom presets */}
        <div className="space-y-3">
          <ColorPicker
            label="Background Color"
            value={backgroundColor}
            onChange={setBackgroundColor}
            presets={brandPresets}
          />
          <div className="flex items-center justify-center gap-3">
            <div
              className="h-16 w-16 rounded-lg border-2 border-border shadow-lg"
              style={{ backgroundColor: backgroundColor }}
            />
            <div className="text-left">
              <div className="text-xs text-text-faint">Current Color</div>
              <div className="text-sm font-mono text-chalk font-semibold">
                {backgroundColor.toUpperCase()}
              </div>
              <div className="text-xs text-ignite">Brand color presets</div>
            </div>
          </div>
        </div>

        {/* All colors preview */}
        <div className="space-y-3 pt-4 border-t border-border">
          <h3 className="text-center text-sm font-semibold text-chalk">
            All Selected Colors
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div
                className="h-20 w-full rounded-lg border-2 border-border shadow-md"
                style={{ backgroundColor: primaryColor }}
              />
              <div className="text-center">
                <div className="text-xs text-text-faint">Primary</div>
                <div className="text-xs font-mono text-chalk font-medium">
                  {primaryColor.toUpperCase()}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-20 w-full rounded-lg border-2 border-border shadow-md"
                style={{ backgroundColor: accentColor }}
              />
              <div className="text-center">
                <div className="text-xs text-text-faint">Accent</div>
                <div className="text-xs font-mono text-chalk font-medium">
                  {accentColor.toUpperCase()}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-20 w-full rounded-lg border-2 border-border shadow-md"
                style={{ backgroundColor: backgroundColor }}
              />
              <div className="text-center">
                <div className="text-xs text-text-faint">Background</div>
                <div className="text-xs font-mono text-chalk font-medium">
                  {backgroundColor.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
