"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface WorkoutDetail {
  title: string
  duration: string
  intensity: string
  load: string
  focus: string
}

interface InteractiveBeforeAfterProps {
  originalWorkout: WorkoutDetail
  proposedWorkout: WorkoutDetail
}

const InteractiveBeforeAfter = ({ originalWorkout, proposedWorkout }: InteractiveBeforeAfterProps) => {
  const [sliderValue, setSliderValue] = useState(50)

  // Calculate which workout to show based on slider value
  const showOriginal = sliderValue <= 50
  const opacity = showOriginal ? 1 - sliderValue / 50 : (sliderValue - 50) / 50

  return (
    <Card className="p-4 mb-4 overflow-hidden">
      <h3 className="text-lg font-medium mb-3">Compare Workouts</h3>

      <div className="relative h-48 mb-4 border rounded-md overflow-hidden">
        {/* Original Workout */}
        <div
          className="absolute inset-0 p-4 transition-opacity duration-300"
          style={{ opacity: showOriginal ? 1 - opacity : 0 }}
        >
          <h4 className="text-lg font-medium mb-2">{originalWorkout.title}</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="font-medium w-24">Duration:</span>
              <span>{originalWorkout.duration}</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium w-24">Intensity:</span>
              <span>{originalWorkout.intensity}</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium w-24">Expected Load:</span>
              <span>{originalWorkout.load}</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium w-24">Key Focus:</span>
              <span>{originalWorkout.focus}</span>
            </li>
          </ul>
        </div>

        {/* Proposed Workout */}
        <div
          className="absolute inset-0 p-4 transition-opacity duration-300 bg-wearmai-light/10"
          style={{ opacity: showOriginal ? opacity : 1 }}
        >
          <h4 className="text-lg font-medium mb-2 text-wearmai-primary">{proposedWorkout.title}</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="font-medium w-24">Duration:</span>
              <span
                className={
                  originalWorkout.duration !== proposedWorkout.duration ? "text-wearmai-primary font-medium" : ""
                }
              >
                {proposedWorkout.duration}
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-medium w-24">Intensity:</span>
              <span
                className={
                  originalWorkout.intensity !== proposedWorkout.intensity ? "text-wearmai-primary font-medium" : ""
                }
              >
                {proposedWorkout.intensity}
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-medium w-24">Expected Load:</span>
              <span className={originalWorkout.load !== proposedWorkout.load ? "text-wearmai-primary font-medium" : ""}>
                {proposedWorkout.load}
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-medium w-24">Key Focus:</span>
              <span
                className={originalWorkout.focus !== proposedWorkout.focus ? "text-wearmai-primary font-medium" : ""}
              >
                {proposedWorkout.focus}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Original Plan</span>
          <span>Proposed Plan</span>
        </div>
        <Slider
          value={[sliderValue]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setSliderValue(value[0])}
          className="cursor-pointer"
        />
      </div>

      <p className="text-xs text-center mt-2 text-gray-500">Slide to compare the original and proposed workouts</p>
    </Card>
  )
}

export default InteractiveBeforeAfter
