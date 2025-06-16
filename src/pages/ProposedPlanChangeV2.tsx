"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import TrackChangesView from "@/components/proposed-plan-change/TrackChangesView"
import CoachRationale from "@/components/proposed-plan-change/CoachRationale"
import ActionButtons from "@/components/proposed-plan-change/ActionButtons"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import TimelineVisualization from "@/components/proposed-plan-change/TimelineVisualization"
import SustainabilityScoreCard from "@/components/proposed-plan-change/SustainabilityScoreCard"
import InteractiveBeforeAfter from "@/components/proposed-plan-change/InteractiveBeforeAfter"
import AnimatedAcceptanceConfetti from "@/components/proposed-plan-change/AnimatedAcceptanceConfetti"
// V2: Track Changes Style with Interactive Elements

interface TimelineEvent {
  date: string
  title: string
  type: "workout" | "rest" | "key-session" | "race"
  isAffected?: boolean
  isHighlighted?: boolean
}

const ProposedPlanChangeV2 = () => {
  const navigate = useNavigate()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const workout = {
    title: "Recovery Run",
    originalTitle: "Tempo Run",
    duration: "30 minutes",
    originalDuration: "45 minutes",
    intensity: "Easy Pace (5:30-6:00 min/km)",
    originalIntensity: "Tempo Pace (4:30-4:45 min/km)",
    load: "Low",
    originalLoad: "High",
    focus: "Active Recovery",
    originalFocus: "Lactate Threshold",
  }

  // Sample data for timeline visualization
  const timelineEvents: TimelineEvent[] = [
    { date: "Oct 21", title: "Easy Run", type: "workout" },
    { date: "Oct 22", title: "Rest Day", type: "rest" },
    { date: "Oct 23", title: "Recovery Run (was Tempo Run)", type: "workout", isHighlighted: true },
    { date: "Oct 24", title: "Rest Day", type: "rest" },
    { date: "Oct 25", title: "Long Run", type: "key-session" },
    { date: "Oct 27", title: "Interval Session", type: "key-session", isAffected: false },
    { date: "Oct 30", title: "Tune-up Race", type: "race" },
  ]

  const rationaleText =
    "Given the high quadriceps load (85% peak capacity) and the elevated right knee joint force observed during your last run, combined with your current Training Sustainability Score of 65/100 (Moderate), switching to a lower intensity recovery run will aid muscle repair, reduce joint strain, and help prevent potential overuse. This allows for better adaptation before your next key session."

  const handleClose = () => {
    navigate(-1)
  }

  const handleAccept = () => {
    setShowConfirmation(true)
    // In a real app, this would update the training plan
    setTimeout(() => {
      navigate("/training-plan/v1")
    }, 3000)
  }

  const handleReject = () => {
    navigate("/training-plan/v1")
  }

  const handleDiscuss = () => {
    navigate("/chat-coach/v1a")
  }

  // Create workout objects for the interactive before/after component
  const originalWorkout = {
    title: workout.originalTitle,
    duration: workout.originalDuration,
    intensity: workout.originalIntensity,
    load: workout.originalLoad,
    focus: workout.originalFocus,
  }

  const proposedWorkout = {
    title: workout.title,
    duration: workout.duration,
    intensity: workout.intensity,
    load: workout.load,
    focus: workout.focus,
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      <AnimatedAcceptanceConfetti isVisible={showConfirmation} />

      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="container max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">Coach Suggestion: Training Plan Update</h1>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X size={20} />
          </Button>
        </div>
      </div>

      <div className="container max-w-md mx-auto px-4 py-6">
        {showConfirmation ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-green-600 mb-2">Suggestion Accepted!</h2>
            <p className="text-gray-600">Your training plan has been updated to prioritize recovery.</p>
            <p className="text-sm text-gray-500 mt-4">Redirecting to your training plan...</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-medium mb-6">Your Coach Recommends an Adjustment for Wednesday, Oct 23</h2>

            <div className="space-y-6">
              <InteractiveBeforeAfter originalWorkout={originalWorkout} proposedWorkout={proposedWorkout} />

              <TrackChangesView workout={workout} />

              <SustainabilityScoreCard originalScore={65} proposedScore={78} />

              <TimelineVisualization events={timelineEvents} changeDate="Oct 23" />

              <CoachRationale explanation={rationaleText} />

              <ActionButtons onAccept={handleAccept} onReject={handleReject} onDiscuss={handleDiscuss} />
            </div>
          </>
        )}
      </div>

      <MobileNavbar />
    </div>
  )
}

export default ProposedPlanChangeV2
