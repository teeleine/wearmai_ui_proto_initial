"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightLeft, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface ComparisonInsightProps {
  metricName: string
  currentValue: number
  comparisonValue: number
  comparisonLabel: string
}

const ComparisonInsight: React.FC<ComparisonInsightProps> = ({
  metricName,
  currentValue,
  comparisonValue,
  comparisonLabel,
}) => {
  const difference = currentValue - comparisonValue
  const percentChange = (difference / comparisonValue) * 100

  // Determine if the change is significant
  const isSignificant = Math.abs(percentChange) > 5

  // Determine if the change is positive or negative (context-dependent)
  const isPositive = () => {
    // For force metrics, lower is generally better
    if (metricName.toLowerCase().includes("force")) {
      return difference < 0
    }
    // For other metrics, it depends on the context
    return difference > 0
  }

  // Get the appropriate icon
  const getChangeIcon = () => {
    if (!isSignificant) return <Minus size={16} className="text-gray-500" />
    return isPositive() ? (
      <TrendingUp size={16} className="text-green-500" />
    ) : (
      <TrendingDown size={16} className="text-red-500" />
    )
  }

  // Get explanation text
  const getExplanationText = () => {
    if (!isSignificant) {
      return `Your ${metricName.toLowerCase()} is nearly identical to ${comparisonLabel.toLowerCase()}, with only a ${Math.abs(
        percentChange,
      ).toFixed(1)}% difference. This indicates consistent biomechanics.`
    }

    if (metricName.toLowerCase().includes("force") || metricName.toLowerCase().includes("load")) {
      if (difference < 0) {
        return `Your ${metricName.toLowerCase()} is ${Math.abs(percentChange).toFixed(
          1,
        )}% lower than ${comparisonLabel.toLowerCase()}, which is positive as it indicates reduced stress on your body.`
      } else {
        return `Your ${metricName.toLowerCase()} is ${percentChange.toFixed(
          1,
        )}% higher than ${comparisonLabel.toLowerCase()}, which may indicate increased stress on your body.`
      }
    }

    if (metricName.toLowerCase().includes("flexion") || metricName.toLowerCase().includes("angle")) {
      if (difference > 0) {
        return `Your ${metricName.toLowerCase()} is ${percentChange.toFixed(
          1,
        )}% greater than ${comparisonLabel.toLowerCase()}, which could indicate increased range of motion.`
      } else {
        return `Your ${metricName.toLowerCase()} is ${Math.abs(percentChange).toFixed(
          1,
        )}% less than ${comparisonLabel.toLowerCase()}, which might suggest reduced mobility.`
      }
    }

    // Generic explanation
    if (difference > 0) {
      return `Your ${metricName.toLowerCase()} is ${percentChange.toFixed(
        1,
      )}% higher than ${comparisonLabel.toLowerCase()}.`
    } else {
      return `Your ${metricName.toLowerCase()} is ${Math.abs(percentChange).toFixed(
        1,
      )}% lower than ${comparisonLabel.toLowerCase()}.`
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center">
          <ArrowRightLeft size={18} className="text-[#42b4f7] mr-2" />
          Comparison Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#42b4f7] mr-2"></div>
                <p className="text-sm">Current: {currentValue.toFixed(1)}</p>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#f9ca24] mr-2"></div>
                <p className="text-sm">
                  {comparisonLabel}: {comparisonValue.toFixed(1)}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                {getChangeIcon()}
                <span
                  className={`ml-1 font-semibold ${
                    !isSignificant ? "text-gray-500" : isPositive() ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {difference > 0 ? "+" : ""}
                  {difference.toFixed(1)} ({percentChange > 0 ? "+" : ""}
                  {percentChange.toFixed(1)}%)
                </span>
              </div>
              <p className="text-xs text-gray-500">Difference</p>
            </div>
          </div>

          <div className="text-sm text-gray-700">{getExplanationText()}</div>

          {isSignificant && (
            <div
              className={`text-sm p-2 rounded-md ${
                isPositive() ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}
            >
              {isPositive() ? (
                <p>
                  This change is likely beneficial for your running biomechanics. Continue monitoring this trend in
                  future runs.
                </p>
              ) : (
                <p>
                  This change may require attention. Consider reviewing your form or training approach if this pattern
                  persists.
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ComparisonInsight
