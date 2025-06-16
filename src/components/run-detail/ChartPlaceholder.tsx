"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"

interface ChartPlaceholderProps {
  title: string
  yAxisLabel?: string
  xAxisLabel?: string
  className?: string
}

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  title,
  yAxisLabel = "Value",
  xAxisLabel = "Time",
  className = "",
}) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  // Generate random data for the chart
  const generateRandomData = (length: number) => {
    return Array.from({ length }, () => Math.random() * 80 + 20)
  }

  const data = generateRandomData(10)
  const maxValue = Math.max(...data)

  // Chart dimensions
  const width = 300
  const height = 200
  const padding = 40
  const graphWidth = width - padding * 2
  const graphHeight = height - padding * 2

  // Generate points for the line
  const points = data
    .map((value, index) => {
      const x = padding + (index * graphWidth) / (data.length - 1)
      const y = height - padding - (value * graphHeight) / maxValue
      return `${x},${y}`
    })
    .join(" ")

  return (
    <Card className={`mb-6 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            {title}
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2" onClick={() => setIsExplanationOpen(true)}>
              <Sparkles size={16} className="text-[#42b4f7]" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <HelpCircle size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {/* X-axis */}
            <line
              x1={padding}
              y1={height - padding}
              x2={width - padding}
              y2={height - padding}
              stroke="#e2e8f0"
              strokeWidth="1"
            />

            {/* Y-axis */}
            <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#e2e8f0" strokeWidth="1" />

            {/* X-axis label */}
            <text x={width / 2} y={height - 5} fontSize="12" textAnchor="middle" fill="#718096">
              {xAxisLabel}
            </text>

            {/* Y-axis label */}
            <text
              x={10}
              y={height / 2}
              fontSize="12"
              textAnchor="middle"
              fill="#718096"
              transform={`rotate(-90, 10, ${height / 2})`}
            >
              {yAxisLabel}
            </text>

            {/* Data line */}
            <polyline points={points} fill="none" stroke="#42b4f7" strokeWidth="2" />

            {/* Data points */}
            {data.map((value, index) => {
              const x = padding + (index * graphWidth) / (data.length - 1)
              const y = height - padding - (value * graphHeight) / maxValue
              return <circle key={index} cx={x} cy={y} r="3" fill="#42b4f7" />
            })}
          </svg>
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

export default ChartPlaceholder
