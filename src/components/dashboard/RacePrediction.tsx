import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Timer, TrendingUp, TrendingDown } from "lucide-react"

interface RacePredictionProps {
  predictions: {
    distance: string
    time: string
    trend: "improved" | "declined" | "stable"
    changePercentage?: number
  }[]
  compact?: boolean
}

const RacePrediction: React.FC<RacePredictionProps> = ({ predictions = defaultPredictions, compact = false }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improved":
        return <TrendingUp size={14} className="text-[#83c55b]" />
      case "declined":
        return <TrendingDown size={14} className="text-[#6131ca]" />
      default:
        return null
    }
  }

  const getTrendText = (trend: string, percentage?: number) => {
    if (!percentage) return null

    switch (trend) {
      case "improved":
        return <span className="text-xs text-[#83c55b] ml-1">↓{percentage}%</span>
      case "declined":
        return <span className="text-xs text-[#6131ca] ml-1">↑{percentage}%</span>
      default:
        return null
    }
  }

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardHeader className={compact ? "pb-2 pt-3" : "pb-2 pt-4"}>
        <CardTitle className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center`}>
          <Timer size={16} className="mr-1.5 text-[#42b4f7]" />
          Race Predictions
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-3" : "pb-4"}>
        <div className="space-y-3">
          {predictions.map((prediction, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#42b4f7] rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">{prediction.distance}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-800">{prediction.time}</span>
                {getTrendText(prediction.trend, prediction.changePercentage)}
                <div className="ml-1">{getTrendIcon(prediction.trend)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100">
          <div className="text-xs text-gray-500">Based on your recent 5K (22:45) and training data</div>
        </div>
      </CardContent>
    </Card>
  )
}

const defaultPredictions = [
  {
    distance: "5K",
    time: "22:15",
    trend: "improved",
    changePercentage: 2.2,
  },
  {
    distance: "10K",
    time: "46:30",
    trend: "improved",
    changePercentage: 1.8,
  },
  {
    distance: "Half Marathon",
    time: "1:43:20",
    trend: "improved",
    changePercentage: 3.5,
  },
  {
    distance: "Marathon",
    time: "3:48:45",
    trend: "stable",
  },
]

export default RacePrediction
