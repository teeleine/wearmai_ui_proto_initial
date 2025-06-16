"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Check, X } from "lucide-react"

interface BaselineComparisonProps {
  metricName: string
  currentValue: number
  idealRange: [number, number]
  userType: string
}

const BaselineComparison: React.FC<BaselineComparisonProps> = ({ metricName, currentValue, idealRange, userType }) => {
  const isWithinRange = currentValue >= idealRange[0] && currentValue <= idealRange[1]
  const percentOfIdeal = ((currentValue - idealRange[0]) / (idealRange[1] - idealRange[0])) * 100
  const clampedPercent = Math.min(Math.max(percentOfIdeal, 0), 100)

  // Determine status color
  const getStatusColor = () => {
    if (isWithinRange) return "#10b981" // Green for within range
    if (currentValue < idealRange[0]) return "#3b82f6" // Blue for below range
    return "#ef4444" // Red for above range
  }

  const statusColor = getStatusColor()

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center">
          <Target size={18} className="text-[#42b4f7] mr-2" />
          Baseline Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-700">{metricName}</p>
              <p className="text-xs text-gray-500">Compared to {userType} baseline</p>
            </div>
            <div className="flex items-center">
              {isWithinRange ? (
                <div className="bg-green-100 p-1 rounded-full mr-2">
                  <Check size={16} className="text-green-500" />
                </div>
              ) : (
                <div className="bg-red-100 p-1 rounded-full mr-2">
                  <X size={16} className="text-red-500" />
                </div>
              )}
              <span className="text-lg font-semibold" style={{ color: statusColor }}>
                {currentValue.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>
                Ideal Range: {idealRange[0]} - {idealRange[1]}
              </span>
              <span>Your Value: {currentValue.toFixed(1)}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${clampedPercent}%`,
                  backgroundColor: statusColor,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-blue-500">Too Low</span>
              <span className="text-green-500">Ideal Range</span>
              <span className="text-red-500">Too High</span>
            </div>
          </div>

          <div className="text-sm text-gray-700 mt-2">
            {isWithinRange ? (
              <p>
                Your {metricName.toLowerCase()} is within the ideal range for {userType}. Keep up the good work!
              </p>
            ) : currentValue < idealRange[0] ? (
              <p>
                Your {metricName.toLowerCase()} is below the ideal range. This might indicate{" "}
                {metricName.includes("Flexion") ? "limited mobility" : "insufficient engagement"}.
              </p>
            ) : (
              <p>
                Your {metricName.toLowerCase()} is above the ideal range. This could lead to{" "}
                {metricName.includes("Force") ? "increased stress on joints" : "inefficient movement patterns"}.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BaselineComparison
