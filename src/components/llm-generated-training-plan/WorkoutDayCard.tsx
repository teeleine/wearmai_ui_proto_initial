"use client"

import { useNavigate } from "react-router-dom"
import { Layers, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface TargetModuleProps {
  focus: string
  rationale: string
  drills?: string[]
}

interface WorkoutProps {
  type: string
  duration: string
  intensity: string
  targetModule?: TargetModuleProps
}

interface WorkoutDayCardProps {
  day: string
  date: string
  workout: WorkoutProps
}

export const WorkoutDayCard = ({ day, date, workout }: WorkoutDayCardProps) => {
  const navigate = useNavigate()

  return (
    <Card className="overflow-hidden">
      <div className="flex border-b">
        <div className="w-16 py-3 px-2 bg-gray-50 flex flex-col items-center justify-center">
          <div className="font-medium">{day}</div>
          <div className="text-xs text-gray-500">{date}</div>
        </div>

        <div className="flex-1 p-3">
          <div className="font-medium">{workout.type}</div>
          <div className="text-sm text-gray-600">{workout.duration}</div>
          <div className="text-xs text-gray-500">{workout.intensity}</div>
        </div>
      </div>

      {workout.targetModule && (
        <div className="p-3 bg-blue-50">
          <div className="flex items-start gap-2">
            <Zap className="h-4 w-4 text-blue-600 mt-0.5" />
            <div>
              <div className="font-medium text-blue-800">{workout.targetModule.focus}</div>
              <p className="text-xs text-blue-700 mt-1">{workout.targetModule.rationale}</p>

              {workout.targetModule.drills && (
                <div className="mt-2">
                  <div className="text-xs font-medium text-blue-800 flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5" />
                    Recommended Drills:
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {workout.targetModule.drills.map((drill, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs bg-white border-blue-200 text-blue-800"
                        onClick={() => navigate("/drill-detail/v3")}
                      >
                        {drill}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
