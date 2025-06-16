"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb } from "lucide-react"

interface DynamicFeedbackProps {
  workoutType: string
  duration: string
  distance: string
  intensity: string
  onApplySuggestion: () => void
}

const DynamicFeedback: React.FC<DynamicFeedbackProps> = ({
  workoutType,
  duration,
  distance,
  intensity,
  onApplySuggestion,
}) => {
  // Determine feedback based on workout parameters
  const getFeedbackType = () => {
    if (workoutType === "intervals" && Number.parseInt(duration) > 45) {
      return "high-intensity"
    } else if (workoutType === "rest-day") {
      return "rest-day"
    } else if (workoutType === "long-run" && Number.parseInt(distance) < 10) {
      return "short-long-run"
    } else {
      return "neutral"
    }
  }

  const feedbackType = getFeedbackType()

  const getImpactStatement = () => {
    switch (feedbackType) {
      case "high-intensity":
        return "This adjustment will increase today's planned load by 35% and your weekly load by 12%. Sustainability may be impacted."
      case "rest-day":
        return "Good choice for recovery! This will help lower your fatigue."
      case "short-long-run":
        return "This distance is shorter than your typical long run. Consider if this aligns with your marathon training goals."
      default:
        return "Current change aligns with your plan."
    }
  }

  const getSuggestion = () => {
    switch (feedbackType) {
      case "high-intensity":
        return "Consider reducing the duration to 30-40 minutes for this intensity level, especially given your run yesterday."
      case "short-long-run":
        return "For marathon training, aim for at least 12km on your long run days to build necessary endurance."
      default:
        return null
    }
  }

  const getLoadImpact = () => {
    switch (feedbackType) {
      case "high-intensity":
        return "High"
      case "rest-day":
        return "Low"
      case "short-long-run":
        return "Medium"
      default:
        return "Medium"
    }
  }

  const getWeeklyLoadImpact = () => {
    switch (feedbackType) {
      case "high-intensity":
        return "+12%"
      case "rest-day":
        return "-5%"
      case "short-long-run":
        return "-3%"
      default:
        return "+2%"
    }
  }

  const suggestion = getSuggestion()

  return (
    <Card className="mt-6 border-wearmai-light">
      <CardContent className="pt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Coach's Instant Feedback:</h3>

        <p className="text-sm mb-3">{getImpactStatement()}</p>

        {suggestion && (
          <div className="bg-wearmai-light/20 p-3 rounded-md mb-3">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
              <p className="text-sm">{suggestion}</p>
            </div>
            <Button
              size="sm"
              onClick={onApplySuggestion}
              className="mt-2 bg-wearmai-primary hover:bg-wearmai-primary/80"
            >
              Apply Coach's Suggestion
            </Button>
          </div>
        )}

        <div className="flex justify-between items-center mt-4 text-sm">
          <div>
            <p className="text-xs text-gray-500">Projected Load for this Workout:</p>
            <div className="flex items-center mt-1">
              <div className={`h-2 w-24 rounded-full bg-gray-200 overflow-hidden`}>
                <div
                  className={`h-full ${
                    getLoadImpact() === "High"
                      ? "bg-red-500 w-full"
                      : getLoadImpact() === "Medium"
                        ? "bg-amber-500 w-2/3"
                        : "bg-green-500 w-1/3"
                  }`}
                ></div>
              </div>
              <span className="ml-2 font-medium">{getLoadImpact()}</span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500">Impact on Weekly Load:</p>
            <p
              className={`font-medium mt-1 ${
                getWeeklyLoadImpact().startsWith("+")
                  ? Number.parseInt(getWeeklyLoadImpact()) > 10
                    ? "text-red-500"
                    : "text-amber-500"
                  : "text-green-500"
              }`}
            >
              {getWeeklyLoadImpact()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DynamicFeedback
