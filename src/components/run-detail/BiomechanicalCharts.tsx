"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"

// Muscle Load Bar Chart
export const MuscleLoadChart: React.FC = () => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  const muscles = [
    { name: "Quads (L)", load: 78 },
    { name: "Quads (R)", load: 82 },
    { name: "Hamstrings (L)", load: 65 },
    { name: "Hamstrings (R)", load: 92 },
    { name: "Calves (L)", load: 70 },
    { name: "Calves (R)", load: 73 },
    { name: "Glutes (L)", load: 60 },
    { name: "Glutes (R)", load: 63 },
  ]

  const getBarColor = (load: number) => {
    if (load > 85) return "bg-[#6131ca]" // High load - purple
    if (load > 70) return "bg-[#f9ca24]" // Medium load - yellow
    return "bg-[#42b4f7]" // Normal load - blue
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            Muscle Load Distribution
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2" onClick={() => setIsExplanationOpen(true)}>
              <Sparkles size={16} className="text-[#42b4f7]" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <HelpCircle size={16} className="text-[#42b4f7]" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {muscles.map((muscle, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{muscle.name}</span>
                <span className={muscle.load > 85 ? "text-[#6131ca] font-medium" : "text-gray-600"}>
                  {muscle.load}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getBarColor(muscle.load)}`}
                  style={{ width: `${muscle.load}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-500 flex justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#42b4f7] mr-1"></div>
            <span>Normal</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#f9ca24] mr-1"></div>
            <span>Moderate</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#6131ca] mr-1"></div>
            <span>High</span>
          </div>
        </div>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName="Muscle Load Distribution"
        runDate="May 17, 2025"
      />
    </Card>
  )
}

// Joint Force Line Chart
export const JointForceChart: React.FC = () => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  // Mock data points for joint forces over time
  const timePoints = ["0km", "1km", "2km", "3km", "4km", "5km"]
  const kneeForceL = [2.1, 2.3, 2.5, 2.8, 2.7, 2.4]
  const kneeForceR = [2.2, 2.4, 2.7, 3.1, 3.0, 2.6]
  const threshold = 3.0

  // Calculate SVG points for the line charts
  const chartWidth = 280
  const chartHeight = 120
  const padding = 30
  const graphWidth = chartWidth - padding * 2
  const graphHeight = chartHeight - padding * 2

  const getPoints = (data: number[]) => {
    return data
      .map((value, index) => {
        const x = padding + (index * graphWidth) / (data.length - 1)
        const y = chartHeight - padding - (value * graphHeight) / 4 // Max value is around 4
        return `${x},${y}`
      })
      .join(" ")
  }

  const leftKneePoints = getPoints(kneeForceL)
  const rightKneePoints = getPoints(kneeForceR)

  // Calculate threshold line
  const thresholdY = chartHeight - padding - (threshold * graphHeight) / 4

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            Knee Joint Forces (x Body Weight)
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2" onClick={() => setIsExplanationOpen(true)}>
              <Sparkles size={16} className="text-[#42b4f7]" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <HelpCircle size={16} className="text-[#42b4f7]" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
            {/* Threshold line */}
            <line
              x1={padding}
              y1={thresholdY}
              x2={chartWidth - padding}
              y2={thresholdY}
              stroke="#6131ca"
              strokeWidth="1"
              strokeDasharray="4"
            />
            <text x={chartWidth - padding - 40} y={thresholdY - 5} fontSize="10" fill="#6131ca">
              Threshold
            </text>

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

            {/* X-axis labels */}
            {timePoints.map((point, index) => {
              const x = padding + (index * graphWidth) / (timePoints.length - 1)
              return (
                <text key={index} x={x} y={chartHeight - padding / 2} fontSize="10" textAnchor="middle" fill="#718096">
                  {point}
                </text>
              )
            })}

            {/* Y-axis labels */}
            {[0, 1, 2, 3, 4].map((value) => {
              const y = chartHeight - padding - (value * graphHeight) / 4
              return (
                <text
                  key={value}
                  x={padding - 5}
                  y={y}
                  fontSize="10"
                  textAnchor="end"
                  dominantBaseline="middle"
                  fill="#718096"
                >
                  {value}
                </text>
              )
            })}

            {/* Left knee line */}
            <polyline points={leftKneePoints} fill="none" stroke="#42b4f7" strokeWidth="2" />

            {/* Right knee line */}
            <polyline points={rightKneePoints} fill="none" stroke="#f9ca24" strokeWidth="2" />

            {/* Data points for left knee */}
            {kneeForceL.map((value, index) => {
              const x = padding + (index * graphWidth) / (kneeForceL.length - 1)
              const y = chartHeight - padding - (value * graphHeight) / 4
              return <circle key={`left-${index}`} cx={x} cy={y} r="3" fill="#42b4f7" />
            })}

            {/* Data points for right knee */}
            {kneeForceR.map((value, index) => {
              const x = padding + (index * graphWidth) / (kneeForceR.length - 1)
              const y = chartHeight - padding - (value * graphHeight) / 4
              return <circle key={`right-${index}`} cx={x} cy={y} r="3" fill="#f9ca24" />
            })}
          </svg>

          <div className="mt-2 text-xs text-gray-500 flex justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#42b4f7] mr-1"></div>
              <span>Left Knee</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#f9ca24] mr-1"></div>
              <span>Right Knee</span>
            </div>
          </div>
        </div>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName="Knee Joint Forces"
        runDate="May 17, 2025"
      />
    </Card>
  )
}

// Joint Overuse Indicator
export const JointOveruseChart: React.FC = () => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  const joints = [
    { name: "R. Knee", current: 85, threshold: 100 },
    { name: "L. Knee", current: 62, threshold: 100 },
    { name: "R. Hip", current: 45, threshold: 100 },
    { name: "L. Hip", current: 48, threshold: 100 },
    { name: "R. Ankle", current: 30, threshold: 100 },
    { name: "L. Ankle", current: 32, threshold: 100 },
  ]

  const getBarColor = (current: number, threshold: number) => {
    const percentage = (current / threshold) * 100
    if (percentage > 80) return "bg-[#6131ca]" // High risk - purple
    if (percentage > 60) return "bg-[#f9ca24]" // Medium risk - yellow
    return "bg-[#42b4f7]" // Low risk - blue
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            Joint Overuse Risk
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2" onClick={() => setIsExplanationOpen(true)}>
              <Sparkles size={16} className="text-[#42b4f7]" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <HelpCircle size={16} className="text-[#42b4f7]" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {joints.map((joint, index) => {
            const percentage = (joint.current / joint.threshold) * 100
            return (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{joint.name}</span>
                  <span className={percentage > 80 ? "text-[#6131ca] font-medium" : "text-gray-600"}>
                    {joint.current}/{joint.threshold}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getBarColor(joint.current, joint.threshold)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 text-xs text-gray-500">
          <p>Values show current accumulated load vs. personal threshold</p>
        </div>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName="Joint Overuse Risk"
        runDate="May 17, 2025"
      />
    </Card>
  )
}
