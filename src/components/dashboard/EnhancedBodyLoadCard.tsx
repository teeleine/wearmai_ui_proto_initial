"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Sparkles } from "lucide-react"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"

interface EnhancedBodyLoadCardProps {
  compact?: boolean
}

const EnhancedBodyLoadCard: React.FC<EnhancedBodyLoadCardProps> = ({ compact = false }) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white mb-5">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            Biomechanical Load Map
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2" onClick={() => setIsExplanationOpen(true)}>
              <Sparkles size={16} className="text-[#42b4f7]" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <HelpCircle size={16} className="text-[#42b4f7]" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex justify-center mb-3">
          <div className="bg-[#a3d7fb]/30 p-4 rounded-xl w-full max-w-[240px] aspect-[2/3] relative">
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
              {/* Right knee hotspot - high load */}
              <circle cx="107.5" cy="230" r="10" fill="#6131ca" fillOpacity="0.6" />
              <text x="125" y="230" fontSize="12" fill="#6131ca" fontWeight="bold">
                92%
              </text>

              {/* Left hamstring hotspot - medium load */}
              <circle cx="72.5" cy="200" r="8" fill="#f9ca24" fillOpacity="0.6" />
              <text x="55" y="200" fontSize="12" fill="#f9ca24" fontWeight="bold">
                78%
              </text>

              {/* Right quad hotspot - medium load */}
              <circle cx="107.5" cy="200" r="9" fill="#f9ca24" fillOpacity="0.6" />
              <text x="125" y="200" fontSize="12" fill="#f9ca24" fontWeight="bold">
                82%
              </text>

              {/* Left calf hotspot - low load */}
              <circle cx="72.5" cy="260" r="7" fill="#42b4f7" fillOpacity="0.6" />
              <text x="55" y="260" fontSize="12" fill="#42b4f7" fontWeight="bold">
                65%
              </text>
            </svg>
          </div>
        </div>

        {!compact && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-[#f0f7ff] p-2 rounded-md flex flex-col items-center">
              <div className="text-xs text-gray-500">Knee Load</div>
              <div className="text-sm font-bold text-[#6131ca]">High</div>
            </div>
            <div className="bg-[#f0f7ff] p-2 rounded-md flex flex-col items-center">
              <div className="text-xs text-gray-500">Muscle Imbalance</div>
              <div className="text-sm font-bold text-[#f9ca24]">Medium</div>
            </div>
            <div className="bg-[#f0f7ff] p-2 rounded-md flex flex-col items-center">
              <div className="text-xs text-gray-500">Recovery Status</div>
              <div className="text-sm font-bold text-[#42b4f7]">Good</div>
            </div>
          </div>
        )}

        <Button
          variant="outline"
          size={compact ? "sm" : "default"}
          className="w-full text-[#42b4f7] border-[#a3d7fb] hover:bg-[#a3d7fb]/20 rounded-full"
        >
          View Detailed Body Load Analysis
        </Button>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName="Biomechanical Load Distribution"
        runDate="May 17, 2025"
      />
    </Card>
  )
}

export default EnhancedBodyLoadCard
