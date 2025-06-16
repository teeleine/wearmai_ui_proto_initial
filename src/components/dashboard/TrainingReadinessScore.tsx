import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Battery, BatteryCharging, Moon, Activity, Utensils } from "lucide-react"

interface TrainingReadinessScoreProps {
  score: number // 0-100
  sleepQuality: number // 0-100
  recovery: number // 0-100
  nutrition: number // 0-100
  stress: number // 0-100
  compact?: boolean
}

const TrainingReadinessScore: React.FC<TrainingReadinessScoreProps> = ({
  score = 78,
  sleepQuality = 85,
  recovery = 72,
  nutrition = 80,
  stress = 65,
  compact = false,
}) => {
  // Determine the readiness level
  const getReadinessLevel = () => {
    if (score >= 80) return { text: "Ready for high intensity", color: "text-[#83c55b]" }
    if (score >= 60) return { text: "Ready for moderate training", color: "text-[#42b4f7]" }
    if (score >= 40) return { text: "Light training recommended", color: "text-[#f9ca24]" }
    return { text: "Recovery day recommended", color: "text-[#6131ca]" }
  }

  const readinessLevel = getReadinessLevel()

  // Get color for the gauge
  const getGaugeColor = () => {
    if (score >= 80) return "#83c55b"
    if (score >= 60) return "#42b4f7"
    if (score >= 40) return "#f9ca24"
    return "#6131ca"
  }

  // Calculate the gauge angle based on score
  const gaugeAngle = (score / 100) * 180

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardHeader className={compact ? "pb-2 pt-3" : "pb-2 pt-4"}>
        <CardTitle className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center`}>
          <BatteryCharging size={16} className="mr-1.5 text-[#42b4f7]" />
          Training Readiness
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-3" : "pb-4"}>
        <div className="flex flex-col items-center">
          {/* Gauge visualization */}
          <div className="relative w-32 h-16 mb-2">
            <div className="absolute top-0 left-0 w-full h-full">
              <svg width="100%" height="100%" viewBox="0 0 100 50">
                {/* Background arc */}
                <path
                  d="M10,50 A40,40 0 0,1 90,50"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Colored arc based on score */}
                <path
                  d={`M10,50 A40,40 0 0,1 ${10 + 80 * (score / 100)},${50 - Math.sin((score / 100) * Math.PI) * 40}`}
                  fill="none"
                  stroke={getGaugeColor()}
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Score text */}
                <text x="50" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">
                  {score}%
                </text>
              </svg>
            </div>
          </div>

          <div className={`${readinessLevel.color} font-medium text-sm mb-3`}>{readinessLevel.text}</div>

          {/* Contributing factors */}
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="flex items-center">
              <Moon size={14} className="text-[#6131ca] mr-1.5" />
              <span className="text-xs text-gray-600">Sleep: </span>
              <span className="text-xs font-medium ml-1">{sleepQuality}%</span>
            </div>
            <div className="flex items-center">
              <Battery size={14} className="text-[#83c55b] mr-1.5" />
              <span className="text-xs text-gray-600">Recovery: </span>
              <span className="text-xs font-medium ml-1">{recovery}%</span>
            </div>
            <div className="flex items-center">
              <Utensils size={14} className="text-[#f9ca24] mr-1.5" />
              <span className="text-xs text-gray-600">Nutrition: </span>
              <span className="text-xs font-medium ml-1">{nutrition}%</span>
            </div>
            <div className="flex items-center">
              <Activity size={14} className="text-[#42b4f7] mr-1.5" />
              <span className="text-xs text-gray-600">Stress: </span>
              <span className="text-xs font-medium ml-1">{stress}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TrainingReadinessScore
