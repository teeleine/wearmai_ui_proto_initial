import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FormImprovementVisualProps {
  metric: string
  beforeValue: string
  afterValue: string
  improvementPercentage: number
  compact?: boolean
}

const FormImprovementVisual: React.FC<FormImprovementVisualProps> = ({
  metric = "Knee Valgus Angle",
  beforeValue = "12.5°",
  afterValue = "8.3°",
  improvementPercentage = 34,
  compact = false,
}) => {
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardHeader className={compact ? "pb-2 pt-3" : "pb-2 pt-4"}>
        <CardTitle className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center`}>
          <TrendingUp size={16} className="mr-1.5 text-[#42b4f7]" />
          Form Improvement
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-3" : "pb-4"}>
        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Before</div>
            <div className="relative w-16 h-24 bg-gray-100 rounded-lg overflow-hidden">
              {/* Simplified stick figure with exaggerated knee angle */}
              <svg viewBox="0 0 50 100" className="w-full h-full">
                {/* Head */}
                <circle cx="25" cy="15" r="8" fill="#9CA3AF" />

                {/* Torso */}
                <line x1="25" y1="23" x2="25" y2="50" stroke="#9CA3AF" strokeWidth="2" />

                {/* Arms */}
                <line x1="25" y1="30" x2="15" y2="40" stroke="#9CA3AF" strokeWidth="2" />
                <line x1="25" y1="30" x2="35" y2="40" stroke="#9CA3AF" strokeWidth="2" />

                {/* Legs with exaggerated knee valgus */}
                <line x1="25" y1="50" x2="20" y2="70" stroke="#9CA3AF" strokeWidth="2" />
                <line x1="20" y1="70" x2="30" y2="90" stroke="#6131ca" strokeWidth="3" />

                {/* Highlight the problem area */}
                <circle cx="20" cy="70" r="4" fill="#6131ca" fillOpacity="0.3" />
              </svg>
              <div className="absolute bottom-1 right-1 text-xs font-bold text-[#6131ca]">{beforeValue}</div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-[#83c55b] font-bold text-lg">↓{improvementPercentage}%</div>
            <div className="text-xs text-gray-500">{metric}</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">After</div>
            <div className="relative w-16 h-24 bg-gray-100 rounded-lg overflow-hidden">
              {/* Simplified stick figure with improved knee angle */}
              <svg viewBox="0 0 50 100" className="w-full h-full">
                {/* Head */}
                <circle cx="25" cy="15" r="8" fill="#9CA3AF" />

                {/* Torso */}
                <line x1="25" y1="23" x2="25" y2="50" stroke="#9CA3AF" strokeWidth="2" />

                {/* Arms */}
                <line x1="25" y1="30" x2="15" y2="40" stroke="#9CA3AF" strokeWidth="2" />
                <line x1="25" y1="30" x2="35" y2="40" stroke="#9CA3AF" strokeWidth="2" />

                {/* Legs with improved alignment */}
                <line x1="25" y1="50" x2="23" y2="70" stroke="#9CA3AF" strokeWidth="2" />
                <line x1="23" y1="70" x2="25" y2="90" stroke="#83c55b" strokeWidth="3" />

                {/* Highlight the improved area */}
                <circle cx="23" cy="70" r="4" fill="#83c55b" fillOpacity="0.3" />
              </svg>
              <div className="absolute bottom-1 right-1 text-xs font-bold text-[#83c55b]">{afterValue}</div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full"
        >
          View Form Analysis
          <ArrowRight size={14} className="ml-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default FormImprovementVisual
