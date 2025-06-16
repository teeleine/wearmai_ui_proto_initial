"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface Recommendation {
  text: string
  actionLabel?: string
  onActionClick?: () => void
}

interface RecommendationListProps {
  title: string
  recommendations: Recommendation[]
  className?: string
}

const RecommendationList: React.FC<RecommendationListProps> = ({ title, recommendations, className = "" }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-base font-medium text-gray-800 mb-2">{title}</h2>
      <ul className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-[#42b4f7] font-bold">•</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{recommendation.text}</p>
              {recommendation.actionLabel && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 mt-1 text-[#42b4f7] hover:bg-[#e3f7d4] p-0"
                  onClick={recommendation.onActionClick}
                >
                  {recommendation.actionLabel}
                  <ExternalLink size={14} className="ml-1" />
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecommendationList
