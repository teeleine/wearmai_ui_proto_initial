"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PointExplanationCardProps {
  pointIndex: number
  value: number
  metricName: string
  onClose: () => void
}

const PointExplanationCard: React.FC<PointExplanationCardProps> = ({ pointIndex, value, metricName, onClose }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Generate explanation based on metric and point
  const getExplanation = () => {
    const kilometer = pointIndex

    if (value > 30) {
      if (metricName.includes("Hip")) {
        return `At kilometer ${kilometer}, your hip flexion increased to ${value.toFixed(1)}°, which is higher than your average. This spike could be related to fatigue or compensating for terrain changes. High hip flexion can increase energy expenditure and potentially stress your lower back.`
      } else if (metricName.includes("Knee")) {
        return `At kilometer ${kilometer}, your knee flexion peaked at ${value.toFixed(1)}°, significantly above your baseline. This could indicate fatigue in your quadriceps or a response to incline changes. Excessive knee flexion can increase load on your patellofemoral joint.`
      } else if (metricName.includes("Force")) {
        return `The force on your joint reached ${value.toFixed(1)}N at kilometer ${kilometer}, which exceeds recommended thresholds. This spike coincides with a downhill section of your route. High impact forces increase injury risk, especially when sustained over multiple runs.`
      } else {
        return `At kilometer ${kilometer}, this metric spiked to ${value.toFixed(1)}, which is notably higher than your average. This could indicate a change in your running form due to fatigue or terrain. Monitor this pattern in future runs to prevent potential issues.`
      }
    } else if (value < 15) {
      if (metricName.includes("Hip")) {
        return `Your hip flexion dropped to ${value.toFixed(1)}° at kilometer ${kilometer}, which is lower than your typical range. This could indicate increased hip extension, potentially improving your stride length. However, insufficient hip flexion can sometimes limit forward propulsion.`
      } else if (metricName.includes("Knee")) {
        return `At kilometer ${kilometer}, your knee flexion decreased to ${value.toFixed(1)}°, below your normal range. This could indicate a stiffer running style, which might reduce shock absorption but could be more economical on flat surfaces.`
      } else if (metricName.includes("Force")) {
        return `Joint forces reduced to ${value.toFixed(1)}N at kilometer ${kilometer}, which is lower than your typical values. This could indicate improved shock absorption or running on a softer surface. Lower impact forces generally reduce injury risk.`
      } else {
        return `This metric dropped to ${value.toFixed(1)} at kilometer ${kilometer}, below your typical range. This could represent a positive adaptation in your running form or a response to terrain changes. Lower values here generally indicate reduced stress on your body.`
      }
    } else {
      return `At kilometer ${kilometer}, this value (${value.toFixed(1)}) is within your normal range. Your biomechanics appear stable at this point in your run, showing good consistency in your running form. This suggests efficient movement patterns.`
    }
  }

  // Get recommendation based on value
  const getRecommendation = () => {
    if (value > 30) {
      if (metricName.includes("Hip")) {
        return "Try hip mobility exercises and core strengthening to improve control."
      } else if (metricName.includes("Knee")) {
        return "Consider quadriceps strengthening and monitoring your form when fatigued."
      } else if (metricName.includes("Force")) {
        return "Work on softer landings and consider stride length adjustments on downhills."
      } else {
        return "Monitor this pattern and consider technique drills to maintain form when tired."
      }
    } else if (value < 15) {
      if (metricName.includes("Hip") || metricName.includes("Knee")) {
        return "Include dynamic mobility exercises to ensure sufficient range of motion."
      } else if (metricName.includes("Force")) {
        return "While lower forces are generally good, ensure you're not sacrificing performance."
      } else {
        return "This pattern appears beneficial, but ensure it's not compensating for other issues."
      }
    } else {
      return "Continue your current training approach as these values indicate good biomechanical efficiency."
    }
  }

  return (
    <Card
      className="mb-6 border-l-4"
      style={{ borderLeftColor: value > 30 ? "#ef4444" : value < 15 ? "#3b82f6" : "#42b4f7" }}
    >
      <CardContent className="pt-4 relative">
        <Button variant="ghost" size="sm" className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full" onClick={onClose}>
          <X size={14} />
        </Button>

        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="w-6 h-6 border-2 border-[#42b4f7] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Kilometer {pointIndex}</p>
                <p className="text-xs text-gray-500">{metricName}</p>
              </div>
              <div
                className="text-lg font-semibold"
                style={{ color: value > 30 ? "#ef4444" : value < 15 ? "#3b82f6" : "#42b4f7" }}
              >
                {value.toFixed(1)}
              </div>
            </div>

            <p className="text-sm text-gray-700">{getExplanation()}</p>

            <div className="bg-gray-50 p-2 rounded-md">
              <p className="text-xs font-medium text-gray-700">Coach Recommendation:</p>
              <p className="text-xs text-gray-600">{getRecommendation()}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PointExplanationCard
