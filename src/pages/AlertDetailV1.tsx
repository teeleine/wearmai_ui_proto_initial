"use client"

import type React from "react"
import Header from "@/components/Header"
import ChatButton from "@/components/dashboard/ChatButton"
import AlertHeader from "@/components/alert-detail/AlertHeader"
import LLMExplanation from "@/components/alert-detail/LLMExplanation"
import MiniChart from "@/components/alert-detail/MiniChart"
import RecommendationList from "@/components/alert-detail/RecommendationList"
import ActionFooter from "@/components/alert-detail/ActionFooter"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { useNavigate } from "react-router-dom"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

const AlertDetailV1: React.FC = () => {
  const navigate = useNavigate()

  const handleViewDetailedData = () => {
    navigate("/data-explorer/v1")
  }

  const handleViewDrill = () => {
    navigate("/drill-detail/v2")
  }

  const handleAskCoach = () => {
    // Navigate to chat screen or open chat modal
    console.log("Ask coach about this alert")
  }

  const handleDismiss = () => {
    // Dismiss alert and navigate back
    navigate(-1)
  }

  const handleAdjustPlan = () => {
    // Navigate to plan adjustment screen
    console.log("Navigate to plan adjustment screen")
  }

  const recommendations = [
    {
      text: "Consider increasing your cadence by ~5% on your next few runs to potentially reduce impact.",
    },
    {
      text: "Focus on landing softer, especially when running downhill.",
    },
    {
      text: "Strengthen your glutes and quads with exercises like Single Leg Squats.",
      actionLabel: "View Drill",
      onActionClick: handleViewDrill,
    },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header title="Alert Details" showBackButton={true} />

      <div className="container max-w-md mx-auto px-4 py-4 pb-24">
        <AlertHeader
          type="joint"
          title="High Impact Force Detected: Right Knee"
          subtitle="From run on May 16, 2025"
          className="mb-6"
        />

        <LLMExplanation
          title="What Our Coach Noticed:"
          content="During your run on May 16, your right knee experienced impact forces peaking at 3.5x Bodyweight, which is significantly above your typical range (2-2.5x BW) and our recommended thresholds. This pattern was most prominent during kilometers 3 and 4, particularly on downhill segments."
        />

        <MiniChart title="Right Knee Impact Force Trend (Last Run)" className="mb-4" />

        <div className="mb-6">
          <Button variant="outline" className="w-full" onClick={handleViewDetailedData}>
            View Detailed Data in Explorer
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <LLMExplanation
          title="Potential Impact & Considerations:"
          content="Consistently high impact forces on the knee can increase strain on cartilage and ligaments, potentially leading to issues like patellofemoral pain or runner's knee over time. Being aware of this helps you manage your training load and technique to prevent future problems."
        />

        <RecommendationList title="Coach's Recommendations:" recommendations={recommendations} />

        <ActionFooter
          onAskCoach={handleAskCoach}
          onDismiss={handleDismiss}
          onAdjustPlan={handleAdjustPlan}
          showAdjustPlan={true}
        />
      </div>

      <MobileNavbar />
    </div>
  )
}

export default AlertDetailV1
