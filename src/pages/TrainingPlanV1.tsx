"use client"

import { useState } from "react"
import Header from "@/components/Header"
import CalendarView from "@/components/training-plan/CalendarView"
import WorkoutSummary from "@/components/training-plan/WorkoutSummary"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import ChatButton from "@/components/dashboard/ChatButton"

// V1: Standard Calendar View - Week/Month Toggle

const TrainingPlanV1 = () => {
  const [view, setView] = useState<"week" | "month">("week")
  const [selectedWorkout, setSelectedWorkout] = useState({
    id: "today-workout",
    title: "Easy Run 5km",
    type: "easy" as const,
    time: "Morning",
    details: "Recovery pace",
    target: "5km at 6:00-6:30 min/km",
  })

  const handleDaySelect = (day: any) => {
    if (day.workout) {
      setSelectedWorkout({
        id: day.workout.id,
        title: day.workout.title,
        type: day.workout.type,
        time: day.workout.time,
        details: day.workout.details,
        target: day.workout.target,
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <div className="container max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-[#2d3748]">My Training Plan</h1>

        <div className="mb-6">
          <CalendarView view={view} onViewChange={setView} onDaySelect={handleDaySelect} />
        </div>

        <div className="mb-6">
          <WorkoutSummary workout={selectedWorkout} isToday={true} />
        </div>
      </div>

      <MobileNavbar />
    </div>
  )
}

export default TrainingPlanV1
