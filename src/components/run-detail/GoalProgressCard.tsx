"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Sparkles, Target } from "lucide-react"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"

interface GoalProgressCardProps {
  className?: string
}

const GoalProgressCard: React.FC<GoalProgressCardProps> = ({ className = "" }) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  // Sample goal data - in a real app, these would come from the user's actual goals
  const goals = [
    {
      name: "5K Race Pace",
      current: "5:25",
      target: "5:00",
      unit: "min/km",
      progress: 70,
    },
    {
      name: "Weekly Distance",
      current: "18.5",
      target: "25",
      unit: "km",
      progress: 74,
    },
    {
      name: "Cadence",
      current: "172",
      target: "180",
      unit: "spm",
      progress: 85,
    },
  ]

  return (
    <Card className={`shadow-sm border border-gray-100 rounded-xl bg-white mb-6 ${className}`}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            Goal Progress
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2" onClick={() => setIsExplanationOpen(true)}>
              <Sparkles size={16} className="text-[#42b4f7]" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <HelpCircle size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Target size={16} className="text-[#42b4f7] mr-2" />
                  <span className="text-sm font-medium text-gray-700">{goal.name}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {goal.current} / {goal.target} {goal.unit}
                </div>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    goal.progress >= 90 ? "bg-green-500" : goal.progress >= 60 ? "bg-[#42b4f7]" : "bg-amber-500"
                  }`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName="Goal Progress"
        runDate="May 17, 2025"
      />
    </Card>
  )
}

export default GoalProgressCard
