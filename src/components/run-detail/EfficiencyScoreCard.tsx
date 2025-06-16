"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Sparkles, Zap } from "lucide-react"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"

interface EfficiencyScoreCardProps {
  className?: string
}

const EfficiencyScoreCard: React.FC<EfficiencyScoreCardProps> = ({ className = "" }) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  // Sample efficiency data
  const efficiencyScore = 82
  const factors = [
    { name: "Cadence Optimization", score: 85 },
    { name: "Vertical Oscillation", score: 78 },
    { name: "Ground Contact Time", score: 82 },
    { name: "Stride Length", score: 80 },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500"
    if (score >= 70) return "text-[#42b4f7]"
    return "text-amber-500"
  }

  const getScoreBackground = (score: number) => {
    if (score >= 85) return "bg-green-100"
    if (score >= 70) return "bg-blue-100"
    return "bg-amber-100"
  }

  return (
    <Card className={`shadow-sm border border-gray-100 rounded-xl bg-white mb-6 ${className}`}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            Running Efficiency
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
        <div className="flex justify-center mb-4">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center ${getScoreBackground(efficiencyScore)}`}
          >
            <div className="text-center">
              <Zap className={`mx-auto ${getScoreColor(efficiencyScore)}`} size={20} />
              <div className={`text-2xl font-bold ${getScoreColor(efficiencyScore)}`}>{efficiencyScore}</div>
              <div className="text-xs text-gray-600">out of 100</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {factors.map((factor, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{factor.name}</span>
                <span className={getScoreColor(factor.score)}>{factor.score}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    factor.score >= 85 ? "bg-green-500" : factor.score >= 70 ? "bg-[#42b4f7]" : "bg-amber-500"
                  }`}
                  style={{ width: `${factor.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
          <p>
            Your running efficiency is <span className="font-medium">good</span>. Focus on reducing vertical oscillation
            to improve energy conservation.
          </p>
        </div>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName="Running Efficiency"
        runDate="May 17, 2025"
      />
    </Card>
  )
}

export default EfficiencyScoreCard
