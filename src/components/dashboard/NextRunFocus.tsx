import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NextRunFocusProps {
  primaryFocus: string
  secondaryFocus?: string
  biomechanicalTarget?: string
  targetValue?: string
  currentValue?: string
  compact?: boolean
}

const NextRunFocus: React.FC<NextRunFocusProps> = ({
  primaryFocus = "Increase cadence",
  secondaryFocus = "Maintain consistent foot strike",
  biomechanicalTarget = "Cadence",
  targetValue = "175-180 spm",
  currentValue = "168 spm",
  compact = false,
}) => {
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardHeader className={compact ? "pb-2 pt-3" : "pb-2 pt-4"}>
        <CardTitle className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center`}>
          <Target size={16} className="mr-1.5 text-[#42b4f7]" />
          Focus For Next Run
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-3" : "pb-4"}>
        <div className="bg-[#f0f7ff] p-3 rounded-lg mb-3">
          <div className="flex items-start mb-2">
            <CheckCircle size={16} className="text-[#42b4f7] mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-800">{primaryFocus}</div>
              <div className="text-xs text-gray-600 mt-0.5">
                Target: {biomechanicalTarget} {targetValue} (Current: {currentValue})
              </div>
            </div>
          </div>

          {secondaryFocus && (
            <div className="flex items-start">
              <CheckCircle size={16} className="text-[#42b4f7] mr-2 mt-0.5 flex-shrink-0" />
              <div className="font-medium text-gray-800">{secondaryFocus}</div>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full flex-1"
          >
            View Drills
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full flex-1"
          >
            Learn More
            <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default NextRunFocus
