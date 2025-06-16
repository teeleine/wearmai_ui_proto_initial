"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Sparkles } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"

interface RunComparisonChartProps {
  className?: string
  metric?: string
}

const RunComparisonChart: React.FC<RunComparisonChartProps> = ({ className = "", metric = "Pace" }) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)
  const [comparisonType, setComparisonType] = useState("last-run")
  const [selectedMetric, setSelectedMetric] = useState(metric)

  // Sample comparison data - in a real app, this would be fetched based on the selected comparison type
  const comparisonData = {
    "last-run": {
      labels: ["1km", "2km", "3km", "4km", "5km"],
      current: [5.5, 5.3, 5.4, 5.2, 5.1],
      comparison: [5.7, 5.6, 5.5, 5.4, 5.3],
      unit: "min/km",
      date: "May 14, 2025",
      improvement: 5.2,
    },
    "last-week": {
      labels: ["1km", "2km", "3km", "4km", "5km"],
      current: [5.5, 5.3, 5.4, 5.2, 5.1],
      comparison: [5.8, 5.7, 5.6, 5.5, 5.4],
      unit: "min/km",
      date: "May 10, 2025",
      improvement: 7.8,
    },
    "last-month": {
      labels: ["1km", "2km", "3km", "4km", "5km"],
      current: [5.5, 5.3, 5.4, 5.2, 5.1],
      comparison: [6.0, 5.9, 5.8, 5.7, 5.6],
      unit: "min/km",
      date: "April 17, 2025",
      improvement: 10.5,
    },
  }

  // Metrics that can be compared
  const metrics = [
    { value: "Pace", label: "Pace (min/km)" },
    { value: "Cadence", label: "Cadence (spm)" },
    { value: "Stride Length", label: "Stride Length (m)" },
    { value: "Ground Contact", label: "Ground Contact (ms)" },
    { value: "Vertical Oscillation", label: "Vertical Oscillation (cm)" },
  ]

  const data = comparisonData[comparisonType as keyof typeof comparisonData]
  const isImprovement = selectedMetric === "Pace" ? true : data.improvement > 0

  // Chart dimensions
  const width = 320
  const height = 180
  const padding = 40
  const graphWidth = width - padding * 2
  const graphHeight = height - padding * 2

  // Find max value for scaling
  const allValues = [...data.current, ...data.comparison]
  const maxValue = Math.max(...allValues) * 1.1
  const minValue = Math.min(...allValues) * 0.9

  // Generate points for the lines
  const currentPoints = data.current
    .map((value, index) => {
      const x = padding + (index * graphWidth) / (data.current.length - 1)
      const y = height - padding - ((value - minValue) * graphHeight) / (maxValue - minValue)
      return `${x},${y}`
    })
    .join(" ")

  const comparisonPoints = data.comparison
    .map((value, index) => {
      const x = padding + (index * graphWidth) / (data.comparison.length - 1)
      const y = height - padding - ((value - minValue) * graphHeight) / (maxValue - minValue)
      return `${x},${y}`
    })
    .join(" ")

  const comparisonLabels = {
    "last-run": "Last Run",
    "last-week": "Last Week",
    "last-month": "Last Month",
  }

  return (
    <Card className={`shadow-sm border border-gray-100 rounded-xl bg-white mb-6 ${className}`}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            Run Comparison
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2" onClick={() => setIsExplanationOpen(true)}>
              <Sparkles size={16} className="text-[#42b4f7]" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <HelpCircle size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex justify-between items-center mb-4 gap-2">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Metric" />
            </SelectTrigger>
            <SelectContent>
              {metrics.map((metric) => (
                <SelectItem key={metric.value} value={metric.value}>
                  {metric.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={comparisonType} onValueChange={setComparisonType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Compare with" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-run">Last Run</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

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

            {/* X-axis labels */}
            {data.labels.map((label, index) => {
              const x = padding + (index * graphWidth) / (data.labels.length - 1)
              return (
                <text key={index} x={x} y={height - padding + 15} fontSize="10" textAnchor="middle" fill="#718096">
                  {label}
                </text>
              )
            })}

            {/* Current run line */}
            <polyline points={currentPoints} fill="none" stroke="#42b4f7" strokeWidth="2.5" />

            {/* Comparison run line */}
            <polyline points={comparisonPoints} fill="none" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="4" />

            {/* Data points for current run */}
            {data.current.map((value, index) => {
              const x = padding + (index * graphWidth) / (data.current.length - 1)
              const y = height - padding - ((value - minValue) * graphHeight) / (maxValue - minValue)
              return <circle key={`current-${index}`} cx={x} cy={y} r="4" fill="#42b4f7" />
            })}

            {/* Data points for comparison run */}
            {data.comparison.map((value, index) => {
              const x = padding + (index * graphWidth) / (data.comparison.length - 1)
              const y = height - padding - ((value - minValue) * graphHeight) / (maxValue - minValue)
              return <circle key={`comparison-${index}`} cx={x} cy={y} r="3" fill="#9CA3AF" />
            })}
          </svg>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#42b4f7] mr-1"></div>
            <span className="text-xs">Current Run</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-400 mr-1"></div>
            <span className="text-xs">
              {comparisonLabels[comparisonType as keyof typeof comparisonLabels]} ({data.date})
            </span>
          </div>
        </div>

        <div className="mt-3 p-2 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className={`font-medium ${isImprovement ? "text-green-600" : "text-amber-600"}`}>
              {isImprovement ? "Improved by" : "Decreased by"} {data.improvement}%
            </span>{" "}
            compared to {comparisonLabels[comparisonType as keyof typeof comparisonLabels].toLowerCase()}.
            {selectedMetric === "Pace" && (
              <span> Your pace is getting faster, especially in the final kilometers.</span>
            )}
            {selectedMetric === "Cadence" && <span> Your step frequency is becoming more consistent.</span>}
          </p>
        </div>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName="Run Comparison"
        runDate="May 17, 2025"
      />
    </Card>
  )
}

export default RunComparisonChart
