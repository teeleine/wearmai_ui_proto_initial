"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Sparkles, Heart, Clock, Calendar } from "lucide-react"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"

interface RecoveryRecommendationCardProps {
  className?: string
}

const RecoveryRecommendationCard: React.FC<RecoveryRecommendationCardProps> = ({ className = "" }) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  // Sample recovery data
  const recoveryScore = 76
  const recommendedRecoveryHours = 24
  const nextWorkoutDate = "May 19, 2025"
  const highLoadAreas = ["Right Knee", "Left Quad"]

  return (
    <Card className={`shadow-sm border border-gray-100 rounded-xl bg-white mb-6 ${className}`}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            Recovery Recommendation
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Heart className="text-[#42b4f7]" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-600">Recovery Score</div>
              <div className="text-xl font-bold text-[#42b4f7]">{recoveryScore}/100</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Clock className="text-[#42b4f7]" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-600">Recommended Rest</div>
              <div className="text-xl font-bold text-[#42b4f7]">{recommendedRecoveryHours}h</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg mb-3">
          <div className="flex items-center mb-2">
            <Calendar className="text-[#42b4f7] mr-2" size={16} />
            <span className="text-sm font-medium">Next Workout: {nextWorkoutDate}</span>
          </div>
          <p className="text-sm text-gray-700">
            Based on your biomechanical data, we recommend focusing recovery on:{" "}
            <span className="font-medium">{highLoadAreas.join(", ")}</span>
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="min-w-4 h-4 rounded-full bg-[#42b4f7] mt-1"></div>
            <p className="text-sm text-gray-700">Apply ice to your right knee for 15 minutes to reduce inflammation.</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="min-w-4 h-4 rounded-full bg-[#42b4f7] mt-1"></div>
            <p className="text-sm text-gray-700">Perform gentle quad stretches focusing on the left side.</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="min-w-4 h-4 rounded-full bg-[#42b4f7] mt-1"></div>
            <p className="text-sm text-gray-700">Consider a light foam rolling session to aid muscle recovery.</p>
          </div>
        </div>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName="Recovery Recommendation"
        runDate="May 17, 2025"
      />
    </Card>
  )
}

export default RecoveryRecommendationCard
