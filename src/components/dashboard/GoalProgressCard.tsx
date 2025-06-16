import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Award, Flag } from "lucide-react"

interface GoalProgressCardProps {
  goalName: string
  targetValue: string
  currentValue: string
  progressPercentage: number
  projectedImprovement: number
  compact?: boolean
  variant?: "default" | "accent" | "minimal"
}

const GoalProgressCard: React.FC<GoalProgressCardProps> = ({
  goalName,
  targetValue,
  currentValue,
  progressPercentage,
  projectedImprovement,
  compact = false,
  variant = "default",
}) => {
  // Calculate total progress after projected improvement
  const projectedTotal = Math.min(100, progressPercentage + projectedImprovement)

  // Determine colors based on variant
  const getProgressColors = () => {
    switch (variant) {
      case "accent":
        return {
          main: "bg-[#42b4f7]",
          projected: "bg-[#a3d7fb]",
          background: "bg-gray-100",
        }
      case "minimal":
        return {
          main: "bg-blue-500",
          projected: "bg-blue-300",
          background: "bg-gray-100",
        }
      default:
        return {
          main: "bg-[#6131ca]",
          projected: "bg-[#c3adef]",
          background: "bg-gray-100",
        }
    }
  }

  const colors = getProgressColors()

  return (
    <Card
      className={`shadow-sm border border-gray-100 rounded-xl h-full ${
        variant === "accent" ? "bg-gradient-to-br from-[#e3f7ff] to-[#f0faff]" : "bg-white"
      }`}
    >
      <CardHeader className={`${compact ? "pb-1 pt-3" : "pb-2 pt-4"}`}>
        <CardTitle
          className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center justify-between`}
        >
          <span className="flex items-center">
            <Flag size={16} className="mr-1.5 text-gray-500" />
            Current Goal
          </span>
          {!compact && (
            <span className="text-xs font-normal bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">In Progress</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className={`${compact ? "pb-3" : "pb-4"}`}>
        <div className="mb-2">
          <h3 className={`font-semibold ${compact ? "text-base" : "text-lg"} text-gray-800`}>{goalName}</h3>
          <div className="flex items-center justify-between mt-1 mb-2">
            <span className="text-xs text-gray-500">Current: {currentValue}</span>
            <span className="text-xs text-gray-500">Target: {targetValue}</span>
          </div>
        </div>

        <div className="relative w-full h-5 mb-3">
          <div className={`absolute top-0 left-0 w-full h-2 rounded-full ${colors.background}`}></div>
          <div
            className={`absolute top-0 left-0 h-2 rounded-full ${colors.main} transition-all duration-500 ease-out`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <div
            className={`absolute top-0 left-0 h-2 rounded-full ${colors.projected} transition-all duration-500 ease-out`}
            style={{ width: `${projectedTotal}%`, clipPath: `inset(0 0 0 ${progressPercentage}%)` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Award size={16} className="mr-1.5 text-gray-500" />
            <span className="text-sm text-gray-700">{progressPercentage}% Complete</span>
          </div>

          <div className="flex items-center">
            <TrendingUp size={16} className="mr-1.5 text-[#42b4f7]" />
            <span className="text-sm text-[#42b4f7]">+{projectedImprovement}% with plan</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GoalProgressCard
