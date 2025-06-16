"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import WorkoutForm from "@/components/workout-edit/WorkoutForm"
import DynamicFeedback from "@/components/workout-edit/DynamicFeedback"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import ChatButton from "@/components/dashboard/ChatButton"

// V3: Inline LLM Suggestions & Load Impact Preview During Editing

const WorkoutEditV3 = () => {
  const [workoutType, setWorkoutType] = useState("easy-run")
  const [duration, setDuration] = useState("45")
  const [distance, setDistance] = useState("7.5")
  const [intensity, setIntensity] = useState("medium")

  // Simulate form changes for the prototype
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly change one of the values to simulate user input
      const random = Math.floor(Math.random() * 4)
      switch (random) {
        case 0:
          setWorkoutType(["easy-run", "tempo-run", "intervals", "long-run", "rest-day"][Math.floor(Math.random() * 5)])
          break
        case 1:
          setDuration(String(30 + Math.floor(Math.random() * 60)))
          break
        case 2:
          setDistance(String(5 + Math.floor(Math.random() * 15)))
          break
        case 3:
          setIntensity(["low", "medium", "high"][Math.floor(Math.random() * 3)])
          break
      }
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleSave = () => {
    // In a real app, this would save the workout
    // For the prototype, we'll just go back to the previous screen
    window.history.back()
  }

  const handleCancel = () => {
    window.history.back()
  }

  const handleApplySuggestion = () => {
    // In a real app, this would apply the suggested changes
    // For the prototype, we'll just update some values
    if (workoutType === "intervals") {
      setDuration("35")
    } else if (workoutType === "long-run") {
      setDistance("12")
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] overflow-y-auto">
      <Header />

      <div className="container max-w-md mx-auto px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-6 text-[#2d3748]">Edit Workout - May 20, 2025</h1>

        <WorkoutForm onSave={handleSave} onCancel={handleCancel} />

        <DynamicFeedback
          workoutType={workoutType}
          duration={duration}
          distance={distance}
          intensity={intensity}
          onApplySuggestion={handleApplySuggestion}
        />
      </div>
      <MobileNavbar />
    </div>
  )
}

export default WorkoutEditV3
