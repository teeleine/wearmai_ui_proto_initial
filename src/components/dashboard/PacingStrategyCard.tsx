import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PacingStrategyCardProps {
  distance: string
  targetTime: string
  splits: {
    km: number
    pace: string
    effort: number // 1-10
  }[]
  compact?: boolean
}

const PacingStrategyCard: React.FC<PacingStrategyCardProps> = ({
  distance = "10K",
  targetTime = "48:30",
  splits = defaultSplits,
  compact = false,
}) => {
  // Get color based on effort level
  const getEffortColor = (effort: number) => {
    if (effort >= 8) return "#6131ca"
    if (effort >= 6) return "#f9ca24"
    if (effort >= 4) return "#42b4f7"
    return "#83c55b"
  }

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardHeader className={compact ? "pb-2 pt-3" : "pb-2 pt-4"}>
        <CardTitle
          className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center justify-between`}
        >
          <div className="flex items-center">
            <TrendingUp size={16} className="mr-1.5 text-[#42b4f7]" />
            Pacing Strategy
          </div>
          <div className="text-xs font-normal bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
            {distance} · {targetTime}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-3" : "pb-4"}>
        <div className="h-32 mb-3">
          {/* Pacing visualization */}
          <div className="relative w-full h-full">
            {/* Horizontal lines for pace zones */}
            <div className="absolute left-0 right-0 top-1/4 h-px bg-gray-100"></div>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-100"></div>
            <div className="absolute left-0 right-0 top-3/4 h-px bg-gray-100"></div>

            {/* Pace line */}
            <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={splits
                  .map((split, i) => `${(i / (splits.length - 1)) * 100},${100 - (split.effort / 10) * 100}`)
                  .join(" ")}
                fill="none"
                stroke="#42b4f7"
                strokeWidth="2"
              />
            </svg>

            {/* Effort points */}
            {splits.map((split, index) => {
              const x = (index / (splits.length - 1)) * 100
              const y = 100 - (split.effort / 10) * 100

              return (
                <div
                  key={index}
                  className="absolute w-3 h-3 rounded-full bg-white border-2"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                    borderColor: getEffortColor(split.effort),
                  }}
                ></div>
              )
            })}

            {/* Kilometer markers */}
            {splits.map((split, index) => {
              const x = (index / (splits.length - 1)) * 100

              return (
                <div
                  key={index}
                  className="absolute text-[10px] text-gray-500"
                  style={{
                    left: `${x}%`,
                    bottom: "-16px",
                    transform: "translateX(-50%)",
                  }}
                >
                  {split.km}K
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600">
            <div>Start: {splits[0].pace}/km</div>
            <div>Middle: {splits[Math.floor(splits.length / 2)].pace}/km</div>
            <div>Finish: {splits[splits.length - 1].pace}/km</div>
          </div>

          <div className="text-xs text-gray-500">
            Personalized strategy based on your recent training data and race goals.
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3 text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full"
        >
          Get Detailed Strategy
          <ArrowRight size={14} className="ml-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

const defaultSplits = [
  { km: 1, pace: "4:50", effort: 5 },
  { km: 2, pace: "4:50", effort: 5 },
  { km: 3, pace: "4:48", effort: 6 },
  { km: 4, pace: "4:48", effort: 6 },
  { km: 5, pace: "4:45", effort: 7 },
  { km: 6, pace: "4:45", effort: 7 },
  { km: 7, pace: "4:42", effort: 8 },
  { km: 8, pace: "4:40", effort: 8 },
  { km: 9, pace: "4:35", effort: 9 },
  { km: 10, pace: "4:30", effort: 10 },
]

export default PacingStrategyCard
