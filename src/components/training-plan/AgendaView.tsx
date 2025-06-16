"use client"

import React from "react"
import { ChevronRight, Lightbulb, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type WorkoutType = "easy" | "tempo" | "interval" | "rest" | "cross"

interface Workout {
  id: string
  date: Date
  title: string
  type: WorkoutType
  time?: string
  hasProposedChange?: boolean
  isUrgent?: boolean
  details?: string
  target?: string
}

interface AgendaViewProps {
  onViewCalendar: () => void
  onWorkoutSelect?: (workout: Workout) => void
  onSuggestionSelect?: (workout: Workout) => void
}

const getWorkoutTypeColor = (type: WorkoutType) => {
  switch (type) {
    case "easy":
      return "bg-blue-100 border-blue-300"
    case "tempo":
      return "bg-orange-100 border-orange-300"
    case "interval":
      return "bg-red-100 border-red-300"
    case "rest":
      return "bg-green-100 border-green-300"
    case "cross":
      return "bg-purple-100 border-purple-300"
    default:
      return "bg-gray-100 border-gray-300"
  }
}

const getWorkoutTypeDot = (type: WorkoutType) => {
  switch (type) {
    case "easy":
      return "bg-blue-500"
    case "tempo":
      return "bg-orange-500"
    case "interval":
      return "bg-red-500"
    case "rest":
      return "bg-green-500"
    case "cross":
      return "bg-purple-500"
    default:
      return "bg-gray-500"
  }
}

const AgendaView: React.FC<AgendaViewProps> = ({ onViewCalendar, onWorkoutSelect, onSuggestionSelect }) => {
  const [dateRange, setDateRange] = React.useState<string>("7")

  // Mock data for workouts
  const mockWorkouts: Workout[] = React.useMemo(() => {
    const workouts: Workout[] = []
    const today = new Date()

    // Generate workouts for the next X days
    const days = Number.parseInt(dateRange)

    for (let i = 0; i < days; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      const day = date.getDay()

      // Monday, Wednesday, Friday, Saturday - running days
      if (day === 1 || day === 3 || day === 5 || day === 6) {
        const workoutTypes: WorkoutType[] = ["easy", "tempo", "interval", "easy"]
        const index = date.getDate() % 4

        workouts.push({
          id: `workout-${date.toISOString()}`,
          date: new Date(date),
          title:
            workoutTypes[index] === "easy"
              ? "Easy Run 5km"
              : workoutTypes[index] === "tempo"
                ? "Tempo 3x1km"
                : "Interval 8x400m",
          type: workoutTypes[index],
          time: "Morning",
          hasProposedChange: date.getDate() % 7 === 3,
          isUrgent: date.getDate() % 11 === 2,
          details:
            workoutTypes[index] === "easy"
              ? "Recovery pace"
              : workoutTypes[index] === "tempo"
                ? "Threshold effort"
                : "VO2max effort",
          target:
            workoutTypes[index] === "easy"
              ? "5km at 6:00-6:30 min/km"
              : workoutTypes[index] === "tempo"
                ? "3x1km at 4:30 min/km"
                : "8x400m at 4:00 min/km",
        })
      }

      // Sunday - rest day
      if (day === 0) {
        workouts.push({
          id: `rest-${date.toISOString()}`,
          date: new Date(date),
          title: "Rest Day",
          type: "rest",
        })
      }

      // Tuesday, Thursday - cross training
      if (day === 2 || day === 4) {
        workouts.push({
          id: `cross-${date.toISOString()}`,
          date: new Date(date),
          title: "Cross Training",
          type: "cross",
          time: "Evening",
          details: "Low impact",
          target: "30-45 minutes",
        })
      }
    }

    return workouts
  }, [dateRange])

  // Group workouts by date
  const groupedWorkouts = React.useMemo(() => {
    const grouped: { [key: string]: Workout[] } = {}

    mockWorkouts.forEach((workout) => {
      const dateStr = workout.date.toDateString()
      if (!grouped[dateStr]) {
        grouped[dateStr] = []
      }
      grouped[dateStr].push(workout)
    })

    return grouped
  }, [mockWorkouts])

  const handleWorkoutClick = (workout: Workout) => {
    if (onWorkoutSelect) {
      onWorkoutSelect(workout)
    }
  }

  const handleSuggestionClick = (workout: Workout, e: React.MouseEvent) => {
    e.stopPropagation()
    if (onSuggestionSelect) {
      onSuggestionSelect(workout)
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="bg-wearmai-primary text-white" onClick={() => {}}>
            Agenda View
          </Button>
          <Button variant="outline" size="sm" onClick={onViewCalendar}>
            Calendar View
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Show:</span>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Next 7 Days</SelectItem>
              <SelectItem value="30">Next 30 Days</SelectItem>
              <SelectItem value="90">Next 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedWorkouts).map(([dateStr, workouts]) => {
          const date = new Date(dateStr)
          const isToday = new Date().toDateString() === dateStr

          return (
            <div key={dateStr} className="space-y-2">
              <h3 className={`text-sm font-medium ${isToday ? "text-wearmai-primary" : "text-gray-500"}`}>
                {isToday ? "Today" : ""}{" "}
                {date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
              </h3>

              {workouts.map((workout) => (
                <Card
                  key={workout.id}
                  className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleWorkoutClick(workout)}
                >
                  <div className="flex items-start">
                    <div className={`w-2 h-2 mt-1.5 rounded-full ${getWorkoutTypeDot(workout.type)}`}></div>

                    <div className="ml-2 flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{workout.title}</h4>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>

                      {workout.time && <p className="text-sm text-gray-500">Scheduled: {workout.time}</p>}

                      {workout.target && <p className="text-sm text-gray-600 mt-1">Target: {workout.target}</p>}

                      {workout.hasProposedChange && (
                        <div
                          className="mt-2 flex items-center text-sm text-amber-600 cursor-pointer"
                          onClick={(e) => handleSuggestionClick(workout, e)}
                        >
                          {workout.isUrgent ? (
                            <AlertTriangle className="h-4 w-4 mr-1" />
                          ) : (
                            <Lightbulb className="h-4 w-4 mr-1" />
                          )}
                          <span>Coach suggestion available</span>
                        </div>
                      )}

                      <div className="mt-2 flex space-x-2">
                        <Button size="sm" variant="outline">
                          Modify
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500">
                          Skip
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AgendaView
