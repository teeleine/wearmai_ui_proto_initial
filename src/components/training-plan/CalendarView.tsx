"use client"

import React from "react"
import { ChevronLeft, ChevronRight, Lightbulb, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type WorkoutType = "easy" | "tempo" | "interval" | "rest" | "cross"

interface Workout {
  id: string
  title: string
  type: WorkoutType
  time?: string
  hasProposedChange?: boolean
  isUrgent?: boolean
  details?: string
  target?: string
}

interface DayCell {
  date: number
  month: number
  year: number
  isCurrentMonth: boolean
  isToday: boolean
  workout?: Workout
  projectedLoad?: "low" | "medium" | "high"
}

interface CalendarViewProps {
  view: "week" | "month"
  onViewChange: (view: "week" | "month") => void
  onDaySelect?: (day: DayCell) => void
  showLoadProjection?: boolean
}

const getWorkoutTypeColor = (type: WorkoutType) => {
  switch (type) {
    case "easy":
      return "bg-blue-100 border-blue-300 text-blue-800"
    case "tempo":
      return "bg-orange-100 border-orange-300 text-orange-800"
    case "interval":
      return "bg-red-100 border-red-300 text-red-800"
    case "rest":
      return "bg-green-100 border-green-300 text-green-800"
    case "cross":
      return "bg-purple-100 border-purple-300 text-purple-800"
    default:
      return "bg-gray-100 border-gray-300 text-gray-800"
  }
}

const getLoadColor = (load?: "low" | "medium" | "high") => {
  switch (load) {
    case "low":
      return "bg-green-50"
    case "medium":
      return "bg-yellow-50"
    case "high":
      return "bg-orange-50"
    default:
      return ""
  }
}

const CalendarView: React.FC<CalendarViewProps> = ({ view, onViewChange, onDaySelect, showLoadProjection = false }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [selectedDay, setSelectedDay] = React.useState<DayCell | null>(null)

  // Mock data for the calendar
  const mockDays: DayCell[] = React.useMemo(() => {
    const today = new Date()
    const days: DayCell[] = []

    // Generate days for the current week or month
    const startDate = new Date(currentDate)
    if (view === "week") {
      // Set to the beginning of the week (Monday)
      const day = startDate.getDay()
      startDate.setDate(startDate.getDate() - (day === 0 ? 6 : day - 1))

      // Generate 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate)
        date.setDate(date.getDate() + i)

        days.push({
          date: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          isCurrentMonth: date.getMonth() === currentDate.getMonth(),
          isToday: date.toDateString() === today.toDateString(),
          workout: getMockWorkout(date),
          projectedLoad: getMockLoad(date),
        })
      }
    } else {
      // Set to the beginning of the month
      startDate.setDate(1)

      // Get the day of the week for the first day of the month
      const firstDayOfMonth = startDate.getDay()

      // Add days from previous month to fill the first week
      const prevMonthDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
      const prevMonth = new Date(startDate)
      prevMonth.setDate(prevMonth.getDate() - prevMonthDays)

      for (let i = 0; i < prevMonthDays; i++) {
        const date = new Date(prevMonth)
        date.setDate(date.getDate() + i)

        days.push({
          date: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          isCurrentMonth: false,
          isToday: date.toDateString() === today.toDateString(),
          workout: getMockWorkout(date),
          projectedLoad: getMockLoad(date),
        })
      }

      // Add days for the current month
      const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate()
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(startDate.getFullYear(), startDate.getMonth(), i)

        days.push({
          date: i,
          month: startDate.getMonth(),
          year: startDate.getFullYear(),
          isCurrentMonth: true,
          isToday: date.toDateString() === today.toDateString(),
          workout: getMockWorkout(date),
          projectedLoad: getMockLoad(date),
        })
      }

      // Add days from next month to complete the grid (up to 42 cells for 6 weeks)
      const remainingDays = 42 - days.length
      const nextMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1)

      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(nextMonth)
        date.setDate(date.getDate() + (i - 1))

        days.push({
          date: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          isCurrentMonth: false,
          isToday: date.toDateString() === today.toDateString(),
          workout: getMockWorkout(date),
          projectedLoad: getMockLoad(date),
        })
      }
    }

    return days
  }, [currentDate, view])

  // Mock function to get a workout for a specific date
  function getMockWorkout(date: Date): Workout | undefined {
    const day = date.getDay()
    const dateNum = date.getDate()

    // Monday, Wednesday, Friday, Saturday - running days
    if (day === 1 || day === 3 || day === 5 || day === 6) {
      const workoutTypes: WorkoutType[] = ["easy", "tempo", "interval", "easy"]
      const index = dateNum % 4

      return {
        id: `workout-${date.toISOString()}`,
        title:
          workoutTypes[index] === "easy"
            ? "Easy Run 5km"
            : workoutTypes[index] === "tempo"
              ? "Tempo 3x1km"
              : "Interval 8x400m",
        type: workoutTypes[index],
        time: "Morning",
        hasProposedChange: dateNum % 7 === 3,
        isUrgent: dateNum % 11 === 2,
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
      }
    }

    // Sunday - rest day
    if (day === 0) {
      return {
        id: `rest-${date.toISOString()}`,
        title: "Rest Day",
        type: "rest",
      }
    }

    // Tuesday, Thursday - cross training
    if (day === 2 || day === 4) {
      return {
        id: `cross-${date.toISOString()}`,
        title: "Cross Training",
        type: "cross",
        time: "Evening",
        details: "Low impact",
        target: "30-45 minutes",
      }
    }

    return undefined
  }

  // Mock function to get projected load for a specific date
  function getMockLoad(date: Date): "low" | "medium" | "high" | undefined {
    if (!showLoadProjection) return undefined

    const workout = getMockWorkout(date)
    if (!workout) return undefined

    switch (workout.type) {
      case "easy":
        return "low"
      case "tempo":
        return "medium"
      case "interval":
        return "high"
      case "cross":
        return "low"
      case "rest":
        return undefined
      default:
        return undefined
    }
  }

  const handlePrevious = () => {
    const newDate = new Date(currentDate)
    if (view === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setMonth(newDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(currentDate)
    if (view === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const handleDayClick = (day: DayCell) => {
    setSelectedDay(day)
    if (onDaySelect) {
      onDaySelect(day)
    }
  }

  const formatDateRange = () => {
    if (view === "week") {
      const startOfWeek = new Date(mockDays[0].year, mockDays[0].month, mockDays[0].date)
      const endOfWeek = new Date(mockDays[6].year, mockDays[6].month, mockDays[6].date)

      const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
      return `${startOfWeek.toLocaleDateString("en-US", options)} - ${endOfWeek.toLocaleDateString("en-US", options)}, ${endOfWeek.getFullYear()}`
    } else {
      const options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" }
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toLocaleDateString("en-US", options)
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(view === "week" ? "bg-wearmai-primary text-white" : "")}
            onClick={() => onViewChange("week")}
          >
            Week View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(view === "month" ? "bg-wearmai-primary text-white" : "")}
            onClick={() => onViewChange("month")}
          >
            Month View
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="icon" onClick={handlePrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-medium">{formatDateRange()}</h2>
        <Button variant="ghost" size="icon" onClick={handleNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-lg border overflow-hidden">
        {/* Calendar header */}
        <div className="grid grid-cols-7 bg-gray-50 border-b">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="py-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className={`grid grid-cols-7 ${view === "month" ? "grid-rows-6" : "grid-rows-1"}`}>
          {mockDays.map((day, index) => (
            <div
              key={index}
              className={cn(
                "min-h-[80px] p-1 border-r border-b relative",
                !day.isCurrentMonth && "bg-gray-50 text-gray-400",
                day.isToday && "bg-blue-50",
                getLoadColor(day.projectedLoad),
              )}
              onClick={() => handleDayClick(day)}
            >
              <div className="text-right p-1">
                <span className={cn("text-sm", day.isToday && "font-bold")}>{day.date}</span>
              </div>

              {day.workout && (
                <div className={cn("mt-1 p-1 text-xs rounded border", getWorkoutTypeColor(day.workout.type))}>
                  <div className="font-medium truncate">{day.workout.title}</div>
                  {day.workout.time && <div className="truncate">{day.workout.time}</div>}

                  {day.workout.hasProposedChange && (
                    <div className="absolute top-1 left-1">
                      {day.workout.isUrgent ? (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      ) : (
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Load legend if showing load projection */}
      {showLoadProjection && (
        <div className="mt-4 flex items-center text-xs text-gray-500 space-x-4">
          <span>Projected Daily Load:</span>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 rounded"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded"></div>
            <span>High</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalendarView
