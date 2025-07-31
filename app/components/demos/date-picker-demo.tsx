'use client'

import { useState } from 'react'
import DatePicker from '@/app/components/ui/date-picker'

export default function DatePickerDemo() {
  const [singleDate, setSingleDate] = useState<Date | null>(null)
  const [rangeStart, setRangeStart] = useState<Date | null>(null)
  const [disabledDate, setDisabledDate] = useState<Date | null>(null)
  const [restrictedDate, setRestrictedDate] = useState<Date | null>(null)

  // Disable weekends
  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  // Disable past dates
  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return 'No date selected'
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-8">
        {/* Single date picker */}
        <div className="space-y-3">
          <DatePicker
            label="Select Date"
            value={singleDate}
            onChange={setSingleDate}
            placeholder="Choose a date"
            mode="single"
          />
          <div className="text-center text-sm">
            <span className="text-text-faint">Selected: </span>
            <span className="text-chalk font-medium">
              {formatDisplayDate(singleDate)}
            </span>
          </div>
        </div>

        {/* Date range picker */}
        <div className="space-y-3">
          <DatePicker
            label="Select Range"
            value={rangeStart}
            onChange={setRangeStart}
            placeholder="Choose date range"
            mode="range"
          />
          <div className="text-center text-sm">
            <span className="text-text-faint">Range: </span>
            <span className="text-chalk font-medium">
              {rangeStart ? formatDisplayDate(rangeStart) : 'No range selected'}
            </span>
          </div>
        </div>

        {/* Disabled date picker */}
        <div className="space-y-3">
          <DatePicker
            label="Disabled Picker"
            value={disabledDate}
            onChange={setDisabledDate}
            placeholder="This is disabled"
            mode="single"
            disabled={true}
          />
          <div className="text-center text-xs text-text-faint italic">
            This date picker is disabled
          </div>
        </div>

        {/* Date picker with disabled weekends */}
        <div className="space-y-3">
          <DatePicker
            label="No Weekends"
            value={restrictedDate}
            onChange={setRestrictedDate}
            placeholder="Weekends disabled"
            mode="single"
            disabledDates={isWeekend}
          />
          <div className="text-center text-sm">
            <span className="text-text-faint">Selected: </span>
            <span className="text-chalk font-medium">
              {formatDisplayDate(restrictedDate)}
            </span>
          </div>
          <div className="text-center text-xs text-text-faint">
            Weekends are disabled in this picker
          </div>
        </div>

        {/* Date picker with disabled past dates */}
        <div className="space-y-3">
          <DatePicker
            label="Future Dates Only"
            value={null}
            onChange={() => {}}
            placeholder="Past dates disabled"
            mode="single"
            disabledDates={isPastDate}
          />
          <div className="text-center text-xs text-text-faint">
            Past dates cannot be selected
          </div>
        </div>
      </div>
    </div>
  )
}
