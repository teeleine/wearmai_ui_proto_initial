"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Minus, HelpCircle, Sparkles } from "lucide-react"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"

interface KeyTakeawaysCardProps {
  className?: string
}

const KeyTakeawaysCard: React.FC<KeyTakeawaysCardProps> = ({ className = "" }) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  // Sample takeaways - in a real app, these would be generated based on actual run data
  const takeaways = [
    {
      type: "positive",
      text: "Your cadence has improved by 4 spm compared to your last run, reducing impact forces on your knees.",
      icon: <ArrowUp className="text-green-500" size={16} />,
    },
    {
      type: "negative",
      text: "Left hip adduction increased by 2.3°, which may contribute to IT band stress if it continues.",
      icon: <ArrowDown className="text-red-500" size={16} />,
    },
    {
      type: "neutral",
      text: "Your overall muscle load distribution is balanced, with no significant asymmetries detected.",
      icon: <Minus className="text-blue-500" size={16} />,
    },
    {
      type: "positive",
      text: "Knee joint forces remained below your personal threshold throughout the run.",
      icon: <ArrowUp className="text-green-500" size={16} />,
    },
  ]

  return (
    <Card className={`shadow-sm border border-gray-100 rounded-xl bg-white mb-6 ${className}`}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            Key Takeaways
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
        <div className="space-y-3">
          {takeaways.map((takeaway, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="mt-0.5">{takeaway.icon}</div>
              <p className="text-sm text-gray-700">{takeaway.text}</p>
            </div>
          ))}
        </div>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName="Key Takeaways"
        runDate="May 17, 2025"
      />
    </Card>
  )
}

export default KeyTakeawaysCard
