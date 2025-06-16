"use client"

import type React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import DrillVisual from "./DrillVisual"
import StepByStep from "./StepByStep"
import CommonMistakes from "./CommonMistakes"
import CoachInsight from "./CoachInsight"

interface DrillModalProps {
  drillName: string
  targetAreas: string[]
  steps: { text: string }[]
  mistakes: { text: string }[]
  coachInsight: string
  repsAndSets: string
  onClose: () => void
}

const DrillModal: React.FC<DrillModalProps> = ({
  drillName,
  targetAreas,
  steps,
  mistakes,
  coachInsight,
  repsAndSets,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">{drillName}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <DrillVisual drillName={drillName} size="medium" className="mb-4" />

          <p className="text-sm text-gray-600 mb-4">Focuses on: {targetAreas.join(", ")}</p>

          <div className="space-y-4">
            <StepByStep steps={steps} compact />

            {mistakes.length > 0 && <CommonMistakes mistakes={mistakes} compact />}

            <CoachInsight text={coachInsight} compact />

            <p className="text-sm font-medium">Do: {repsAndSets}</p>
          </div>
        </div>

        <div className="p-4 border-t flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Got it!
          </Button>
          <Button>Add to Routine</Button>
        </div>
      </Card>
    </div>
  )
}

export default DrillModal
