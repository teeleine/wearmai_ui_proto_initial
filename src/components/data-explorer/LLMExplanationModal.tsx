"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface LLMExplanationModalProps {
  open: boolean
  onClose: () => void
  metricName: string
  runDate: string
  specificPoint?: string
}

const LLMExplanationModal: React.FC<LLMExplanationModalProps> = ({
  open,
  onClose,
  metricName,
  runDate,
  specificPoint,
}) => {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading when the modal opens
  useEffect(() => {
    if (open) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [open])

  // Generate explanation based on metric
  const getExplanation = () => {
    if (metricName.includes("Hip Flexion")) {
      return `Your ${metricName} shows a pattern typical of efficient running form. The angle increases during the early stance phase (around 20-25°) and decreases during swing phase.

The peak at kilometer 3 (marked as point 1) indicates increased hip flexion, which could be related to fatigue or a change in terrain. This is worth monitoring as excessive hip flexion can increase energy expenditure.

Your values are within normal ranges for recreational runners, though the slight asymmetry between left and right sides (about 3°) is something to be aware of.`
    } else if (metricName.includes("Knee") && metricName.includes("Joint Forces")) {
      return `Your knee joint forces data shows how much force your knees experience during running, measured as a multiple of your body weight.

Your right knee consistently experiences higher forces (peaking at 3.1x body weight at kilometer 3) compared to your left knee (peaking at 2.8x). This asymmetry could be related to your running form or muscle imbalances.

The forces briefly exceed the recommended threshold at kilometer 3, which coincides with the downhill section of your route. Downhill running typically increases impact forces on your knees.`
    } else if (metricName.includes("Knee")) {
      return `Your ${metricName} data shows good consistency throughout most of your run. The average flexion angle of 40° during stance phase is within normal ranges.

The increased flexion at kilometer 7 (marked as point 2) coincides with when you reported feeling fatigue. This is a common compensation pattern that can increase load on the quadriceps.

I'd recommend monitoring this pattern in future runs, especially if you experience any knee discomfort. Overall, your knee mechanics appear stable with no concerning patterns.`
    } else if (metricName.includes("Joint Overuse Risk")) {
      return `This chart shows how close each joint is to its estimated overuse threshold based on your recent training history and biomechanical data.

Your right knee is at 85% of its threshold, which puts it in the high-risk category. This is likely due to the cumulative load from your recent increase in training volume and the higher forces we've detected on your right side.

Your left knee and both hips show moderate risk levels, while your ankles are at low risk. This pattern suggests focusing recovery efforts on your knees, particularly the right one.`
    } else if (metricName.includes("Muscle Load Distribution")) {
      return `This chart shows the estimated load on each major muscle group during your run, expressed as a percentage of maximum capacity.

Your right hamstring shows the highest load at 92%, which puts it in the high category. This is significantly higher than your left hamstring (65%), indicating a potential muscle imbalance that could affect your running mechanics.

Your quadriceps show moderate load with some asymmetry (left: 78%, right: 82%). This pattern is common in runners with slight pronation or hip rotation differences.`
    } else if (metricName.includes("Body Load") || metricName.includes("Biomechanical Load")) {
      return `Your body load map shows how training stress is distributed across different muscle groups and joints.

The highest load areas are your right knee (92%) and right quadriceps (82%), suggesting some asymmetry in your running mechanics. Your left hamstring also shows moderate load (78%).

This pattern indicates you may be favoring your right side slightly, which is common but worth addressing through targeted strength work to prevent potential overuse issues.`
    } else if (metricName.includes("Body Asymmetry") || metricName.includes("Asymmetry Analysis")) {
      return `This analysis highlights differences in load and force between your left and right sides.

Your left quadriceps consistently shows 20% higher load than your right across most runs. This could be contributing to the slight pelvic shift we've detected in your running form.

Your right knee experiences about 14% higher forces than your left, which may be a compensation pattern. These asymmetries are moderate but worth addressing through balanced strength training to reduce injury risk.`
    } else {
      return `Your ${metricName} data from ${runDate} shows a consistent pattern throughout most of your run, which is a positive sign for running economy.

There's a notable change at kilometer 3 (marked as point 1) where values increased by approximately 15%. This could be related to the slight uphill section of your route or fatigue setting in.

The pattern stabilizes again after kilometer 5, suggesting good adaptation. Overall, these values are within normal ranges for your running profile and don't indicate any immediate concerns.`
    }
  }

  // Generate context-specific question based on metric
  const getContextQuestion = () => {
    if (metricName.includes("Hip")) {
      return "How does hip flexion affect my running efficiency?"
    } else if (metricName.includes("Knee")) {
      return "What exercises can improve my knee stability?"
    } else if (metricName.includes("Muscle Load")) {
      return "How can I balance my muscle development?"
    } else if (metricName.includes("Joint Overuse")) {
      return "What recovery strategies would help my joints?"
    } else if (metricName.includes("Asymmetry")) {
      return "How can I correct my running asymmetry?"
    } else if (metricName.includes("Body Load")) {
      return "What does this body load pattern mean for my training?"
    } else {
      return "How can I improve this metric?"
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles size={18} className="text-[#42b4f7] mr-2" />
            Coach Explanation: {metricName}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#42b4f7] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-gray-500">Analyzing your biomechanical data...</p>
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-700 space-y-4">
              <p>{getExplanation()}</p>

              <div className="bg-[#f0f7ff] p-3 rounded-md">
                <p className="font-medium text-[#42b4f7]">Ask me more:</p>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-gray-700 hover:text-[#42b4f7] p-1 h-auto"
                >
                  {getContextQuestion()}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-gray-700 hover:text-[#42b4f7] p-1 h-auto"
                >
                  How does this compare to my previous runs?
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button className="bg-[#42b4f7] hover:bg-[#42b4f7]/80 text-white" onClick={onClose}>
                Got it
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default LLMExplanationModal
