"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import SideBySideComparison from "@/components/proposed-plan-change/SideBySideComparison"
import CoachRationale from "@/components/proposed-plan-change/CoachRationale"
import ActionButtons from "@/components/proposed-plan-change/ActionButtons"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import ProgressProjectionChart from "@/components/proposed-plan-change/ProgressProjectionChart"
import GoalImpactMeter from "@/components/proposed-plan-change/GoalImpactMeter"
import BodyLoadComparison from "@/components/proposed-plan-change/BodyLoadComparison"
import AnimatedAcceptanceConfetti from "@/components/proposed-plan-change/AnimatedAcceptanceConfetti"

// V1: Side-by-Side Comparison with Enhanced Visuals

const ProposedPlanChangeV1 = () => {
  const navigate = useNavigate()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const currentWorkout = {
    title: "Tempo Run",
    duration: "45 minutes",
    intensity: "Tempo Pace (4:30-4:45 min/km)",
    load: "High",
    focus: "Lactate Threshold",
  }

  const suggestedWorkout = {
    title: "Recovery Run",
    duration: "30 minutes",
    intensity: "Easy Pace (5:30-6:00 min/km)",
    load: "Low",
    focus: "Active Recovery",
  }

  const rationaleText =
    "Given the high quadriceps load (85% peak capacity) and the elevated right knee joint force observed during your last run, combined with your current Training Sustainability Score of 65/100 (Moderate), switching to a lower intensity recovery run will aid muscle repair, reduce joint strain, and help prevent potential overuse. This allows for better adaptation before your next key session."

  // Sample data for progress projection chart
  const originalPlanData = [
    { date: "Oct 23", value: 42 },
    { date: "Oct 25", value: 43 },
    { date: "Oct 27", value: 44 },
    { date: "Oct 30", value: 45 },
    { date: "Nov 2", value: 46 },
    { date: "Nov 5", value: 47 },
  ]

  const proposedPlanData = [
    { date: "Oct 23", value: 42 },
    { date: "Oct 25", value: 43 },
    { date: "Oct 27", value: 44.5 },
    { date: "Oct 30", value: 46 },
    { date: "Nov 2", value: 47.5 },
    { date: "Nov 5", value: 49 },
  ]

  // Sample data for body load comparison
  const bodyLoadData = [
    { name: "Quadriceps", originalLoad: 85, proposedLoad: 45 },
    { name: "Right Knee", originalLoad: 78, proposedLoad: 40 },
    { name: "Calves", originalLoad: 65, proposedLoad: 35 },
    { name: "Achilles", originalLoad: 60, proposedLoad: 30 },
  ]

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
              <SideBySideComparison currentWorkout={currentWorkout} suggestedWorkout={suggestedWorkout} />

              <ProgressProjectionChart
                originalPlan={originalPlanData}
                proposedPlan={proposedPlanData}
                goalValue={48}
                metric="VO2 Max"
                unit="ml/kg/min"
              />

              <GoalImpactMeter originalImpact={75} proposedImpact={82} goalName="Half Marathon" />

              <BodyLoadComparison bodyParts={bodyLoadData} />

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

export default ProposedPlanChangeV1
