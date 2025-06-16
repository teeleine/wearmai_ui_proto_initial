"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar } from "lucide-react"

interface ProgressChartProps {
  title: string
  metricName: string
  timeframe: "week" | "month" | "3months"
}

const ProgressChart: React.FC<ProgressChartProps> = ({ title, metricName, timeframe }) => {
  // Generate sample data for progress chart
  const generateProgressData = () => {
    const points = []
    const numPoints = timeframe === "week" ? 7 : timeframe === "month" ? 4 : 12

    let trend = 0
    for (let i = 0; i < numPoints; i++) {
      // Create a generally improving trend with some fluctuations
      trend += Math.random() * 2 - 0.5
      const value = 20 + trend + Math.random() * 3
      points.push(value)
    }

    return points
  }

  const progressData = generateProgressData()

  // Calculate SVG points for the chart
  const chartWidth = 280
  const chartHeight = 120
  const padding = 30
  const graphWidth = chartWidth - padding * 2
  const graphHeight = chartHeight - padding * 2

  const getPoints = (data: number[]) => {
    return data
      .map((value, index) => {
        const x = padding + (index * graphWidth) / (data.length - 1)
        const y = chartHeight - padding - (value * graphHeight) / 40 // Max value around 40
        return `${x},${y}`
      })
      .join(" ")
  }

  const linePoints = getPoints(progressData)

  // Generate x-axis labels based on timeframe
  const getXLabels = () => {
    if (timeframe === "week") {
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    } else if (timeframe === "month") {
      return ["Week 1", "Week 2", "Week 3", "Week 4"]
    } else {
      return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
  }

  const xLabels = getXLabels()

  // Calculate trend percentage
  const trendPercentage = ((progressData[progressData.length - 1] - progressData[0]) / progressData[0]) * 100

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <Calendar size={18} className="text-[#42b4f7] mr-2" />
            {title}
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp size={14} className={trendPercentage >= 0 ? "text-green-500 mr-1" : "text-red-500 mr-1"} />
            <span className={trendPercentage >= 0 ? "text-green-500" : "text-red-500"}>
              {trendPercentage.toFixed(1)}%
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
            {/* X-axis */}
            <line
              x1={padding}
              y1={chartHeight - padding}
              x2={chartWidth - padding}
              y2={chartHeight - padding}
              stroke="#e2e8f0"
              strokeWidth="1"
            />

            {/* Y-axis */}
            <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#e2e8f0" strokeWidth="1" />

            {/* Grid lines */}
            {[10, 20, 30].map((value, index) => (
              <line
                key={`grid-${index}`}
                x1={padding}
                y1={chartHeight - padding - (value * graphHeight) / 40}
                x2={chartWidth - padding}
                y2={chartHeight - padding - (value * graphHeight) / 40}
                stroke="#e2e8f0"
                strokeWidth="0.5"
                strokeDasharray="2"
              />
            ))}

            {/* X-axis labels */}
            {timeframe === "3months"
              ? // For 3 months, show fewer labels to avoid crowding
                [0, 3, 6, 9, 11].map((index) => (
                  <text
                    key={index}
                    x={padding + (index * graphWidth) / (xLabels.length - 1)}
                    y={chartHeight - padding / 2}
                    fontSize="8"
                    textAnchor="middle"
                    fill="#718096"
                  >
                    {xLabels[index]}
                  </text>
                ))
              : xLabels.map((label, index) => (
                  <text
                    key={index}
                    x={padding + (index * graphWidth) / (xLabels.length - 1)}
                    y={chartHeight - padding / 2}
                    fontSize="8"
                    textAnchor="middle"
                    fill="#718096"
                  >
                    {label}
                  </text>
                ))}

            {/* Y-axis labels */}
            {[0, 20, 40].map((value, index) => (
              <text
                key={index}
                x={padding - 5}
                y={chartHeight - padding - (value * graphHeight) / 40}
                fontSize="8"
                textAnchor="end"
                dominantBaseline="middle"
                fill="#718096"
              >
                {value}
              </text>
            ))}

            {/* Area under the line */}
            <path
              d={`${linePoints} L ${chartWidth - padding},${chartHeight - padding} L ${padding},${
                chartHeight - padding
              } Z`}
              fill="url(#progressGradient)"
              fillOpacity="0.2"
            />

            {/* Define gradient */}
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#42b4f7" />
                <stop offset="100%" stopColor="#42b4f7" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Line */}
            <polyline points={linePoints} fill="none" stroke="#42b4f7" strokeWidth="2" />

            {/* Data points */}
            {progressData.map((value, index) => {
              const x = padding + (index * graphWidth) / (progressData.length - 1)
              const y = chartHeight - padding - (value * graphHeight) / 40
              return <circle key={index} cx={x} cy={y} r="3" fill="#42b4f7" />
            })}

            {/* Trend line */}
            <line
              x1={padding}
              y1={chartHeight - padding - (progressData[0] * graphHeight) / 40}
              x2={chartWidth - padding}
              y2={chartHeight - padding - (progressData[progressData.length - 1] * graphHeight) / 40}
              stroke="#10b981"
              strokeWidth="1"
              strokeDasharray="4"
            />
          </svg>

          <div className="text-xs text-gray-500 text-center mt-2">
            {timeframe === "week" ? "Past Week" : timeframe === "month" ? "Past Month" : "Past 3 Months"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProgressChart
