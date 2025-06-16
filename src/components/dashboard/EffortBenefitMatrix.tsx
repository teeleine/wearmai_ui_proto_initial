import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EffortBenefitMatrixProps {
  workouts: {
    name: string
    effortLevel: number // 1-10
    benefitLevel: number // 1-10
    duration: string
    focus: string
  }[]
  compact?: boolean
}

const EffortBenefitMatrix: React.FC<EffortBenefitMatrixProps> = ({ workouts = defaultWorkouts, compact = false }) => {
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardHeader className={compact ? "pb-2 pt-3" : "pb-2 pt-4"}>
        <CardTitle className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center`}>
          <Zap size={16} className="mr-1.5 text-[#42b4f7]" />
          Effort vs. Benefit
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-3" : "pb-4"}>
        <div className="relative h-48 mb-3">
          {/* Quadrant labels */}
          <div className="absolute top-1 left-1 text-[10px] text-gray-400">High Benefit</div>
          <div className="absolute bottom-1 left-1 text-[10px] text-gray-400">Low Benefit</div>
          <div className="absolute bottom-1 right-1 text-[10px] text-gray-400">High Effort</div>

          {/* Axes */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>

          {/* Quadrant background */}
          <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-[#83c55b]/10 border-r border-b border-gray-200"></div>
          <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-[#f9ca24]/10 border-b border-gray-200"></div>
          <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gray-100/50 border-r border-gray-200"></div>
          <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-[#6131ca]/10"></div>

          {/* Workout dots */}
          {workouts.map((workout, index) => {
            // Convert effort and benefit to coordinates (0-100%)
            const x = (workout.effortLevel / 10) * 100
            const y = 100 - (workout.benefitLevel / 10) * 100

            return (
              <div
                key={index}
                className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="w-6 h-6 rounded-full bg-white border-2 border-[#42b4f7] flex items-center justify-center text-xs font-bold text-[#42b4f7]">
                  {index + 1}
                </div>
              </div>
            )
          })}
        </div>

        <div className="space-y-2">
          {workouts.map((workout, index) => (
            <div key={index} className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-white border-2 border-[#42b4f7] flex items-center justify-center text-xs font-bold text-[#42b4f7] mr-2">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">{workout.name}</div>
                <div className="text-xs text-gray-500">
                  {workout.duration} · {workout.focus}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!compact && (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3 text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full"
          >
            Optimize My Plan
            <ArrowRight size={14} className="ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

const defaultWorkouts = [
  {
    name: "Tempo Run",
    effortLevel: 7,
    benefitLevel: 8,
    duration: "45 min",
    focus: "Lactate threshold",
  },
  {
    name: "Long Run",
    effortLevel: 6,
    benefitLevel: 9,
    duration: "90 min",
    focus: "Endurance",
  },
  {
    name: "Hill Repeats",
    effortLevel: 9,
    benefitLevel: 7,
    duration: "40 min",
    focus: "Strength",
  },
  {
    name: "Recovery Run",
    effortLevel: 3,
    benefitLevel: 4,
    duration: "30 min",
    focus: "Active recovery",
  },
]

export default EffortBenefitMatrix
