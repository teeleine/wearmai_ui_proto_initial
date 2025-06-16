"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"

interface MiniChartProps {
  title: string
  data?: number[]
  threshold?: number
  unit?: string
  className?: string
}

const MiniChart: React.FC<MiniChartProps> = ({
  title,
  data = [2.1, 2.3, 2.5, 2.8, 3.1, 2.9, 2.7],
  threshold = 3.0,
  unit = "x BW",
  className = "",
}) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  // Chart dimensions
  const width = 200
  const height = 100
  const padding = 10
  const graphWidth = width - padding * 2
  const graphHeight = height - padding * 2

  // Calculate max value for scaling
  const maxValue = Math.max(...data, threshold) * 1.1

  // Generate points for the line
  const points = data
    .map((value, index) => {
      const x = padding + (index * graphWidth) / (data.length - 1)
      const y = height - padding - (value * graphHeight) / maxValue
      return `${x},${y}`
    })
    .join(" ")

  // Calculate threshold line y-position
  const thresholdY = height - padding - (threshold * graphHeight) / maxValue

  // Determine if any data point exceeds threshold
  const exceedsThreshold = data.some((value) => value > threshold)

  return (
    <Card className={`border border-gray-200 shadow-sm mb-4 ${className}`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm font-medium text-gray-700 flex items-center justify-between">
          <span>{title}</span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsExplanationOpen(true)}>
            <Sparkles size={14} className="text-[#42b4f7]" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="relative">
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {/* Threshold line */}
            <line
              x1={padding}
              y1={thresholdY}
              x2={width - padding}
              y2={thresholdY}
              stroke={exceedsThreshold ? "#EF4444" : "#6131ca"}
              strokeWidth="1"
              strokeDasharray="3"
            />
            <text
              x={width - padding - 5}
              y={thresholdY - 5}
              fontSize="8"
              fill={exceedsThreshold ? "#EF4444" : "#6131ca"}
              textAnchor="end"
            >
              Threshold
            </text>

            {/* X-axis */}
            <line
              x1={padding}
              y1={height - padding}
              x2={width - padding}
              y2={height - padding}
              stroke="#e2e8f0"
              strokeWidth="1"
            />

            {/* Data line */}
            <polyline points={points} fill="none" stroke="#42b4f7" strokeWidth="2" />

            {/* Data points */}
            {data.map((value, index) => {
              const x = padding + (index * graphWidth) / (data.length - 1)
              const y = height - padding - (value * graphHeight) / maxValue
              const isOverThreshold = value > threshold
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={isOverThreshold ? "#EF4444" : "#42b4f7"}
                  stroke={isOverThreshold ? "#FEE2E2" : "white"}
                  strokeWidth="1"
                />
              )
            })}
          </svg>

          <div className="mt-1 text-xs text-gray-500 flex justify-between">
            <span>
              Peak: {Math.max(...data).toFixed(1)} {unit}
            </span>
            <span>
              Threshold: {threshold.toFixed(1)} {unit}
            </span>
          </div>
        </div>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName={title}
        runDate="May 17, 2025"
      />
    </Card>
  )
}

export default MiniChart
