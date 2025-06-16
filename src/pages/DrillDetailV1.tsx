"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import DrillModal from "@/components/drill-detail/DrillModal"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

// This is a demo page to show the DrillModal in context
const DrillDetailV1: React.FC = () => {
  const [showModal, setShowModal] = useState(true)

  const drillData = {
    drillName: "Glute Bridges",
    targetAreas: ["Glute Strength", "Core Stability"],
    steps: [
      { text: "Lie on your back with knees bent and feet flat on the floor, hip-width apart." },
      { text: "Press your arms into the floor for support and engage your core." },
      {
        text: "Push through your heels to lift your hips off the ground until your knees, hips, and shoulders form a straight line.",
      },
      { text: "Squeeze your glutes at the top and hold for 2-3 seconds." },
      { text: "Lower back down with control and repeat." },
    ],
    mistakes: [
      { text: "Pushing through your toes instead of your heels." },
      { text: "Overextending your back at the top position." },
      { text: "Not engaging your core throughout the movement." },
    ],
    coachInsight:
      "Strengthens glutes to improve pelvic stability observed in your last run. This will help reduce the right pelvic drop we noticed and potentially decrease knee load.",
    repsAndSets: "3 sets of 12 reps",
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-4 flex items-center">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Back to Coach Report</h1>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-medium mb-4">LLM Coach Report</h2>
          <p className="mb-4">
            This is a placeholder for the LLM Coach Report screen. The drill detail modal appears as an overlay on top
            of this screen.
          </p>

          <div className="mb-4">
            <h3 className="font-medium mb-2">Recommendations</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-wearmai-primary"></div>
                <span>Glute Bridges for pelvic stability</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-wearmai-primary"></div>
                <span>Focus on softer landings</span>
              </li>
            </ul>
          </div>

          <Button onClick={() => setShowModal(true)} disabled={showModal}>
            View Glute Bridges Drill
          </Button>
        </div>
      </div>

      {showModal && (
        <DrillModal
          drillName={drillData.drillName}
          targetAreas={drillData.targetAreas}
          steps={drillData.steps}
          mistakes={drillData.mistakes}
          coachInsight={drillData.coachInsight}
          repsAndSets={drillData.repsAndSets}
          onClose={closeModal}
        />
      )}

      {/* Floating Chat Icon */}
      <div className="fixed bottom-4 right-4">
        <MobileNavbar/>
      </div>
    </div>
  )
}

export default DrillDetailV1
