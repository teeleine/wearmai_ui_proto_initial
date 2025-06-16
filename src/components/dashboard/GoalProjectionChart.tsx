import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flag, Award, TrendingUp } from "lucide-react"

interface GoalProjectionChartProps {
  goalName: string
  targetValue: string
  currentValue: string
  startingValue: string
  progressPercentage: number
  projectedImprovement: number
  timeRemaining: string
}

const GoalProjectionChart: React.FC<GoalProjectionChartProps> = ({
  goalName,
  targetValue,
  currentValue,
  startingValue,
  progressPercentage,
  projectedImprovement,
  timeRemaining,
}) => {
  // Calculate total progress after projected improvement
  const projectedTotal = Math.min(100, progressPercentage + projectedImprovement)

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center">
          <Flag size={16} className="mr-1.5 text-gray-500" />
          Current Goal & Projection
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">{goalName}</h3>

        <div className="w-full h-28 relative bg-gray-50 rounded-lg border border-gray-100 p-2 mb-4">
          {/* X-axis */}
          <div className="absolute bottom-2 left-0 right-0 h-px bg-gray-300"></div>

          {/* Y-axis */}
          <div className="absolute top-0 bottom-2 left-2 w-px bg-gray-300"></div>

          {/* Current progress line */}
          <div
            className="absolute bottom-2 left-2 h-[60%] w-1.5 rounded-sm bg-[#6131ca]"
            style={{ height: `${Math.max(5, progressPercentage * 0.7)}%` }}
          ></div>

          {/* Projected progress line */}
          <div
            className="absolute bottom-2 left-8 h-[80%] w-1.5 rounded-sm bg-[#c3adef]"
            style={{ height: `${Math.max(5, projectedTotal * 0.7)}%` }}
          ></div>

          {/* Target line */}
          <div className="absolute top-[10%] left-0 right-0 h-px border-t border-dashed border-[#f9ca24]">
            <div className="absolute right-1 -top-3 text-xs text-[#f9ca24] font-medium">Goal</div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-[-5px] left-[2px] text-[9px] text-gray-600">Now</div>
          <div className="absolute bottom-[-5px] left-[8px] text-[9px] text-gray-600">+4wk</div>
        </div>

        <div className="flex justify-between mb-3">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Starting</div>
            <div className="font-semibold text-gray-800">{startingValue}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Current</div>
            <div className="font-semibold text-gray-800">{currentValue}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Projected</div>
            <div className="font-semibold text-[#42b4f7]">{targetValue}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Award size={16} className="mr-1.5 text-gray-500" />
            <span className="text-sm text-gray-700">{progressPercentage}% Complete</span>
          </div>

          <div className="flex items-center">
            <TrendingUp size={16} className="mr-1.5 text-[#42b4f7]" />
            <span className="text-sm text-[#42b4f7]">+{projectedImprovement}%</span>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-2">
          <span className="inline-block py-0.5 px-2 bg-gray-100 rounded-full">{timeRemaining} until goal date</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default GoalProjectionChart
