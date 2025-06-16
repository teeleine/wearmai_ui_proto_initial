"use client"

import { useState } from "react"
import Header from "@/components/Header"
import WorkoutForm from "@/components/workout-edit/WorkoutForm"
import LLMAdviceModal from "@/components/workout-edit/LLMAdviceModal"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import ChatButton from "@/components/dashboard/ChatButton"

// V1: Simple Form with LLM Advice Pre-Save

const WorkoutEditV1 = () => {
  const [showAdviceModal, setShowAdviceModal] = useState(false)
  const [adviceType, setAdviceType] = useState<"positive" | "cautionary" | "informative">("positive")

  const handleGetAdvice = () => {
    // In a real app, this would send the form data to the LLM
    // For the prototype, we'll just show a random advice type
    const types: ("positive" | "cautionary" | "informative")[] = ["positive", "cautionary", "informative"]
    const randomType = types[Math.floor(Math.random() * types.length)]
    setAdviceType(randomType)
    setShowAdviceModal(true)
  }

  const handleSave = () => {
    // In a real app, this would save the workout
    // For the prototype, we'll just go back to the previous screen
    window.history.back()
  }

  const handleCancel = () => {
    window.history.back()
  }

  const handleProceed = () => {
    setShowAdviceModal(false)
    // In a real app, this would save the workout
    // For the prototype, we'll just go back to the previous screen
    window.history.back()
  }

  const handleGoBack = () => {
    setShowAdviceModal(false)
  }

  const handleAskAlternatives = () => {
    // In a real app, this would navigate to the Chat Coach screen
    // For the prototype, we'll just close the modal
    setShowAdviceModal(false)
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <div className="container max-w-md mx-auto px-4 pb-20 pt-10">
        {!showAdviceModal ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-[#2d3748]">Edit Workout - May 20, 2025</h1>
            <WorkoutForm
              onSave={handleSave}
              onCancel={handleCancel}
              onGetAdvice={handleGetAdvice}
              showAdviceButton={true}
            />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6 text-[#2d3748]">Coach's Advice</h1>
            <div className="pb-10">
              <LLMAdviceModal
              type={adviceType}
              onProceed={handleProceed}
              onGoBack={handleGoBack}
              onAskAlternatives={handleAskAlternatives}
            />
            </div>
          </>
        )}
      </div>
      <MobileNavbar />
    </div>
  )
}

export default WorkoutEditV1
