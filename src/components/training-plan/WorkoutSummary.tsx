import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type WorkoutType = "easy" | "tempo" | "interval" | "rest" | "cross"

interface Workout {
  id: string
  title: string
  type: WorkoutType
  time?: string
  details?: string
  target?: string
}

interface WorkoutSummaryProps {
  workout: Workout
  isToday?: boolean
}

const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({ workout, isToday = false }) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-2">
        {isToday ? "Today: " : "Selected: "}
        {workout.title}
      </h3>

      <div className="space-y-2 mb-4">
        {workout.type !== "rest" && (
          <>
            <div className="flex">
              <span className="text-sm text-gray-500 w-20">Type:</span>
              <span className="text-sm font-medium capitalize">{workout.type}</span>
            </div>

            {workout.target && (
              <div className="flex">
                <span className="text-sm text-gray-500 w-20">Target:</span>
                <span className="text-sm">{workout.target}</span>
              </div>
            )}

            {workout.time && (
              <div className="flex">
                <span className="text-sm text-gray-500 w-20">Time:</span>
                <span className="text-sm">{workout.time}</span>
              </div>
            )}

            {workout.details && (
              <div className="flex">
                <span className="text-sm text-gray-500 w-20">Details:</span>
                <span className="text-sm">{workout.details}</span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex space-x-2">
        <Button className="flex-1">View/Modify</Button>
        <Button variant="outline" className="flex-1">
          Skip Workout
        </Button>
      </div>
    </Card>
  )
}

export default WorkoutSummary
