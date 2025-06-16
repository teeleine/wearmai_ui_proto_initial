"use client"

import type React from "react"
import { Slider } from "@/components/ui/slider"

interface TimelineSliderProps {
  value: number
  onChange: (value: number) => void
}

const TimelineSlider: React.FC<TimelineSliderProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Slider defaultValue={[value]} max={100} step={1} onValueChange={(values) => onChange(values[0])} />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Start</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>End</span>
      </div>
    </div>
  )
}

export default TimelineSlider
