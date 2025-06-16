import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Calendar, Award } from "lucide-react"

interface StreakVisualizerProps {
  currentStreak: number
  longestStreak: number
  lastWeek: boolean[]
  compact?: boolean
}

const StreakVisualizer: React.FC<StreakVisualizerProps> = ({
  currentStreak = 4,
  longestStreak = 12,
  lastWeek = [true, true, false, true, true, false, true],
  compact = false,
}) => {
  // Calculate streak percentage for the progress bar
  const streakPercentage = Math.min(100, (currentStreak / longestStreak) * 100)

  // Get day labels
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"]

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardHeader className={compact ? "pb-2 pt-3" : "pb-2 pt-4"}>
        <CardTitle
          className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center justify-between`}
        >
          <div className="flex items-center">
            <Flame size={16} className="mr-1.5 text-[#f9ca24]" />
            Activity Streak
          </div>
          <div className="flex items-center text-xs bg-[#fff4e8] text-[#f9ca24] px-2 py-0.5 rounded-full">
            <Flame size={12} className="mr-1" />
            <span>{currentStreak} days</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-3" : "pb-4"}>
        {/* Last week visualization */}
        <div className="flex justify-between mb-4">
          {lastWeek.map((active, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">{dayLabels[index]}</div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  active ? "bg-[#fff4e8] text-[#f9ca24]" : "bg-gray-100 text-gray-400"
                }`}
              >
                {active ? <Flame size={16} /> : <Calendar size={16} />}
              </div>
            </div>
          ))}
        </div>

        {/* Streak progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Current</span>
            <span>Longest: {longestStreak} days</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#f9ca24]" style={{ width: `${streakPercentage}%` }}></div>
          </div>
        </div>

        {/* Achievements */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center">
            <Award size={14} className="text-[#83c55b] mr-1" />
            <span className="text-gray-600">Next milestone: 7 days</span>
          </div>
          <div className="text-[#f9ca24] font-medium">3 days to go!</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StreakVisualizer
