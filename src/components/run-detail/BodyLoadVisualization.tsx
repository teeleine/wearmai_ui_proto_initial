"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Sparkles } from "lucide-react"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"

interface BodyLoadVisualizationProps {
  className?: string
}

const BodyLoadVisualization: React.FC<BodyLoadVisualizationProps> = ({ className = "" }) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  return (
    <Card className={`shadow-sm border border-gray-100 rounded-xl bg-white ${className}`}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            Body Load Distribution
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
        <div className="flex justify-center mb-3">
          <div className="bg-gray-100 p-4 rounded-xl w-full max-w-[240px] aspect-[2/3] relative">
            {/* Improved human body outline */}
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

              {/* Hotspots for different muscle groups/joints */}
              {/* Left quad - high load */}
              <rect x="60" y="170" width="25" height="60" fill="#EF4444" fillOpacity="0.7" />

              {/* Right knee - medium load */}
              <circle cx="107.5" cy="230" r="10" fill="#F59E0B" fillOpacity="0.7" />

              {/* Left calf - low load */}
              <rect x="60" y="230" width="25" height="60" fill="#10B981" fillOpacity="0.7" />

              {/* Right calf - medium load */}
              <rect x="95" y="230" width="25" height="60" fill="#F59E0B" fillOpacity="0.7" />
            </svg>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs">Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Low</span>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full mt-3 text-blue-500 border-blue-200 hover:bg-blue-50">
          View Detailed Analysis
        </Button>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName="Body Load Distribution"
        runDate="May 17, 2025"
      />
    </Card>
  )
}

export default BodyLoadVisualization
