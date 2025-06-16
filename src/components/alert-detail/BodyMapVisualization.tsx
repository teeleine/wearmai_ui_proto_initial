"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Maximize2, Sparkles } from "lucide-react"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"

interface BodyMapVisualizationProps {
  highlightArea:
    | "right-knee"
    | "left-knee"
    | "right-hamstring"
    | "left-hamstring"
    | "pelvis"
    | "right-ankle"
    | "left-ankle"
  onExploreFullMap?: () => void
  className?: string
}

const BodyMapVisualization: React.FC<BodyMapVisualizationProps> = ({
  highlightArea,
  onExploreFullMap,
  className = "",
}) => {
  const [isRotating, setIsRotating] = useState(false)
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  const getHighlightPosition = () => {
    switch (highlightArea) {
      case "right-knee":
        return { x: 107.5, y: 230 }
      case "left-knee":
        return { x: 72.5, y: 230 }
      case "right-hamstring":
        return { x: 107.5, y: 200 }
      case "left-hamstring":
        return { x: 72.5, y: 200 }
      case "pelvis":
        return { x: 90, y: 170 }
      case "right-ankle":
        return { x: 107.5, y: 290 }
      case "left-ankle":
        return { x: 72.5, y: 290 }
      default:
        return { x: 90, y: 170 }
    }
  }

  const getExplanationTitle = () => {
    switch (highlightArea) {
      case "right-knee":
        return "Right Knee Force Zone"
      case "left-knee":
        return "Left Knee Force Zone"
      case "right-hamstring":
        return "Right Hamstring Load"
      case "left-hamstring":
        return "Left Hamstring Load"
      case "pelvis":
        return "Pelvic Alignment"
      case "right-ankle":
        return "Right Ankle Mobility"
      case "left-ankle":
        return "Left Ankle Mobility"
      default:
        return "Body Load Zone"
    }
  }

  const highlightPosition = getHighlightPosition()

  return (
    <Card className={`border border-gray-200 shadow-sm mb-6 ${className}`}>
      <CardContent className="p-4">
        <div className="relative">
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            {/* Improved body outline */}
            <svg width="180" height="350" viewBox="0 0 180 350" className="max-h-full">
              {/* Head */}
              <circle cx="90" cy="40" r="30" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />

              {/* Torso */}
              <rect x="60" y="70" width="60" height="100" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />

              {/* Arms */}
              <rect x="30" y="80" width="30" height="80" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
              <rect x="120" y="80" width="30" height="80" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />

              {/* Legs */}
              <rect x="60" y="170" width="25" height="120" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
              <rect x="95" y="170" width="25" height="120" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />

              {/* Highlight area */}
              <circle
                cx={highlightPosition.x}
                cy={highlightPosition.y}
                r="12"
                fill="#f9ca24"
                fillOpacity="0.6"
                className="animate-pulse"
              />

              {/* Label for highlighted area */}
              <text
                x={highlightPosition.x}
                y={highlightPosition.y + 25}
                fontSize="12"
                fill="#000000"
                textAnchor="middle"
              >
                High Force Zone
              </text>
            </svg>
          </div>

          <div className="absolute top-2 right-2 flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/80 hover:bg-white"
              onClick={() => setIsExplanationOpen(true)}
            >
              <Sparkles className="mr-1 h-3 w-3 text-[#42b4f7]" />
              Explain
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/80 hover:bg-white" onClick={onExploreFullMap}>
              <Maximize2 className="mr-1 h-3 w-3" />
              Explore Full Body Map
            </Button>
          </div>
        </div>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName={getExplanationTitle()}
        runDate="May 17, 2025"
      />
    </Card>
  )
}

export default BodyMapVisualization
