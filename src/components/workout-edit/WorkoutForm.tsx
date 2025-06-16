"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { MessageCircle } from "lucide-react"

interface WorkoutFormProps {
  onSave: () => void
  onCancel: () => void
  onGetAdvice?: () => void
  isEditing?: boolean
  showAdviceButton?: boolean
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({
  onSave,
  onCancel,
  onGetAdvice,
  isEditing = true,
  showAdviceButton = false,
}) => {
  const [workoutType, setWorkoutType] = React.useState("easy-run")
  const [intensityType, setIntensityType] = React.useState("rpe")

  return (
    <div className="space-y-6">
      {/* Workout Type */}
      <div className="space-y-2">
        <Label htmlFor="workout-type">Type of Workout:</Label>
        <Select value={workoutType} onValueChange={setWorkoutType}>
          <SelectTrigger id="workout-type">
            <SelectValue placeholder="Select workout type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy-run">Easy Run</SelectItem>
            <SelectItem value="tempo-run">Tempo Run</SelectItem>
            <SelectItem value="intervals">Intervals</SelectItem>
            <SelectItem value="long-run">Long Run</SelectItem>
            <SelectItem value="recovery-run">Recovery Run</SelectItem>
            <SelectItem value="cross-training">Cross-Training</SelectItem>
            <SelectItem value="rest-day">Rest Day</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Duration & Distance */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration:</Label>
          <Input id="duration" placeholder="00:45:00" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="distance">Distance:</Label>
          <Input id="distance" placeholder="7.5 km" />
        </div>
      </div>

      {/* Intensity */}
      <div className="space-y-2">
        <Label htmlFor="intensity-type">Target Intensity:</Label>
        <Select value={intensityType} onValueChange={setIntensityType}>
          <SelectTrigger id="intensity-type">
            <SelectValue placeholder="Select intensity type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rpe">RPE (1-10)</SelectItem>
            <SelectItem value="pace-zone">Pace Zone (Z1-Z5)</SelectItem>
            <SelectItem value="target-pace">Target Pace (min/km)</SelectItem>
          </SelectContent>
        </Select>

        {intensityType === "rpe" && (
          <div className="pt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>1 (Very Easy)</span>
              <span>10 (Max Effort)</span>
            </div>
            <Slider defaultValue={[4]} max={10} step={1} />
            <div className="text-center mt-2 text-sm">Selected: 4</div>
          </div>
        )}

        {intensityType === "pace-zone" && (
          <div className="pt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Z1 (Recovery)</span>
              <span>Z5 (Anaerobic)</span>
            </div>
            <Slider defaultValue={[2]} max={5} step={1} />
            <div className="text-center mt-2 text-sm">Selected: Zone 2</div>
          </div>
        )}

        {intensityType === "target-pace" && (
          <div className="pt-4">
            <Input placeholder="5:30 min/km" />
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes for this workout:</Label>
        <Textarea id="notes" placeholder="Add any notes or specific instructions for this workout..." />
      </div>

      {/* LLM Interaction Button */}
      {showAdviceButton && (
        <Button
          onClick={onGetAdvice}
          variant="outline"
          className="w-full bg-wearmai-light text-wearmai-primary hover:bg-wearmai-light/80"
        >
          Get Coach's Advice on These Changes
        </Button>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button onClick={onSave} className="flex-1 bg-wearmai-primary hover:bg-wearmai-primary/80">
          Save Changes
        </Button>
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>

    </div>
  )
}

export default WorkoutForm
