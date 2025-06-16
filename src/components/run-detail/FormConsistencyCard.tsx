"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Sparkles } from "lucide-react"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"

interface FormConsistencyCardProps {
  className?: string
}

const FormConsistencyCard: React.FC<FormConsistencyCardProps> = ({ className = "" }) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  // Sample form consistency data
  const consistencyScore = 84
  const formMetrics = [
    {
      name: "Cadence Variability",
      value: "Low",
      score: 90,
      color: "bg-green-500",
    },
    {
      name: "Stride Length Consistency",
      value: "Medium",
      score: 75,
      color: "bg-[#42b4f7]",
    },
    {
      name: "Foot Strike Pattern",
      value: "Consistent",
      score: 85,
      color: "bg-green-500",
    },
    {
      name: "Hip Drop Stability",
      value: "Variable",
      score: 68,
      color: "bg-amber-500",
    },
  ]

  // Chart dimensions
  const width = 300
  const height = 120
  const padding = 20
  const graphWidth = width - padding * 2
  const graphHeight = height - padding * 2

  // Sample data for consistency over distance
  const distances = [0, 1, 2, 3, 4, 5]
  const consistencyValues = [90, 88, 82, 75, 80, 85]

  // Generate points for the line
  const points = consistencyValues
    .map((value, index) => {
      const x = padding + (index * graphWidth) / (consistencyValues.length - 1)
      const y = height - padding - (value * graphHeight) / 100
      return `${x},${y}`
    })
    .join(" ")

  return (
    <Card className={`shadow-sm border border-gray-100 rounded-xl bg-white mb-6 ${className}`}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            Form Consistency
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
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" strokeLinecap="round" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={consistencyScore >= 85 ? "#10b981" : consistencyScore >= 70 ? "#42b4f7" : "#f59e0b"}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(consistencyScore / 100) * 283} 283`}
                transform="rotate(-90 50 50)"
              />
              <text
                x="50"
                y="50"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
                fill="#374151"
              >
                {consistencyScore}
              </text>
              <text x="50" y="70" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#6b7280">
                /100
              </text>
            </svg>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-center text-gray-700 mb-2">Consistency Over Distance</p>
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

            {/* Data line */}
            <polyline points={points} fill="none" stroke="#42b4f7" strokeWidth="2" />

            {/* Data points */}
            {consistencyValues.map((value, index) => {
              const x = padding + (index * graphWidth) / (consistencyValues.length - 1)
              const y = height - padding - (value * graphHeight) / 100
              return <circle key={index} cx={x} cy={y} r="3" fill="#42b4f7" />
            })}

            {/* X-axis labels */}
            {distances.map((distance, index) => {
              const x = padding + (index * graphWidth) / (distances.length - 1)
              return (
                <text key={index} x={x} y={height - 5} fontSize="10" textAnchor="middle" fill="#718096">
                  {distance}km
                </text>
              )
            })}
          </svg>
        </div>

        <div className="space-y-2">
          {formMetrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-700">{metric.name}</span>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">{metric.value}</span>
                <div className="w-12 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${metric.color}`} style={{ width: `${metric.score}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-gray-50 p-2 rounded-lg">
          <p className="text-sm text-gray-700">
            Your form was most consistent in the first 2km and final km. Focus on maintaining hip stability in the
            middle portion of your runs.
          </p>
        </div>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName="Form Consistency"
        runDate="May 17, 2025"
      />
    </Card>
  )
}

export default FormConsistencyCard
