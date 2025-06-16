"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChartAreaProps {
  title: string
  yAxisLabel: string
  xAxisLabel: string
  onExplainClick?: () => void
  onPointClick?: (pointIndex: number, value: number) => void
  showMagicIcon?: boolean
  showAnnotations?: boolean
  allowDirectInteraction?: boolean
  chartType?: "line" | "bar"
  comparisonMode?: boolean
  comparisonLabel?: string
}

const ChartArea: React.FC<ChartAreaProps> = ({
  title,
  yAxisLabel,
  xAxisLabel,
  onExplainClick,
  onPointClick,
  showMagicIcon = true,
  showAnnotations = false,
  allowDirectInteraction = false,
  chartType = "line",
  comparisonMode = false,
  comparisonLabel,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  // Generate sample data points for visualization
  const generateDataPoints = () => {
    const points = []
    const numPoints = 10

    for (let i = 0; i < numPoints; i++) {
      // Create a sine wave pattern with some randomness
      const value = 20 + 10 * Math.sin(i / (numPoints / (2 * Math.PI))) + Math.random() * 5
      points.push(value)
    }

    return points
  }

  const dataPoints = generateDataPoints()
  const comparisonPoints = comparisonMode ? generateDataPoints() : []

  // Calculate SVG points for the line chart
  const chartWidth = 320
  const chartHeight = 180
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

  const linePoints = getPoints(dataPoints)
  const comparisonLinePoints = comparisonMode ? getPoints(comparisonPoints) : ""

  // Annotation positions (if enabled)
  const annotations = [
    { x: padding + graphWidth * 0.3, y: chartHeight - padding - (dataPoints[3] * graphHeight) / 40, number: 1 },
    { x: padding + graphWidth * 0.7, y: chartHeight - padding - (dataPoints[7] * graphHeight) / 40, number: 2 },
  ]

  // Determine color based on value (for highlighting highs and lows)
  const getPointColor = (value: number) => {
    if (value > 30) return "#ef4444" // High values - red
    if (value < 15) return "#3b82f6" // Low values - blue
    return "#42b4f7" // Normal values - default blue
  }

  // Handle point click
  const handlePointClick = (index: number, value: number) => {
    if (onPointClick) {
      onPointClick(index, value)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          {title}
          {showMagicIcon && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#42b4f7]" onClick={onExplainClick}>
              <Sparkles size={18} />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`relative ${allowDirectInteraction && !onPointClick ? "cursor-pointer" : ""}`}
          onClick={allowDirectInteraction && !onPointClick ? onExplainClick : undefined}
        >
          <div className="text-xs text-gray-500 -rotate-90 absolute left-[-15px] top-1/2 transform -translate-y-1/2">
            {yAxisLabel}
          </div>

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
            {[0, 2, 4, 6, 8].map((value, index) => (
              <text
                key={index}
                x={padding + (value * graphWidth) / 10}
                y={chartHeight - padding / 2}
                fontSize="8"
                textAnchor="middle"
                fill="#718096"
              >
                {value}
              </text>
            ))}

            {/* Y-axis labels */}
            {[0, 10, 20, 30, 40].map((value, index) => (
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

            {/* Baseline zone (if applicable) */}
            <rect
              x={padding}
              y={chartHeight - padding - (25 * graphHeight) / 40}
              width={graphWidth}
              height={(10 * graphHeight) / 40}
              fill="#4ade8080"
              fillOpacity="0.1"
            />

            {/* Primary line */}
            <polyline points={linePoints} fill="none" stroke="#42b4f7" strokeWidth="3" />

            {/* Comparison line (if in comparison mode) */}
            {comparisonMode && (
              <polyline
                points={comparisonLinePoints}
                fill="none"
                stroke="#f9ca24"
                strokeWidth="3"
                strokeDasharray="4"
              />
            )}

            {/* Data points */}
            {dataPoints.map((value, index) => {
              const x = padding + (index * graphWidth) / (dataPoints.length - 1)
              const y = chartHeight - padding - (value * graphHeight) / 40
              return (
                <g key={index}>
                  <circle
                    cx={x}
                    cy={y}
                    r={hoveredPoint === index ? "7" : "5"}
                    fill={getPointColor(value)}
                    className={onPointClick ? "cursor-pointer" : ""}
                    onClick={() => handlePointClick(index, value)}
                    onMouseEnter={() => setHoveredPoint(index)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {hoveredPoint === index && (
                    <g>
                      <rect x={x - 20} y={y - 25} width="40" height="20" rx="4" fill="#333" fillOpacity="0.8" />
                      <text x={x} y={y - 12} fontSize="10" fill="white" textAnchor="middle" dominantBaseline="middle">
                        {value.toFixed(1)}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}

            {/* Comparison data points */}
            {comparisonMode &&
              comparisonPoints.map((value, index) => {
                const x = padding + (index * graphWidth) / (comparisonPoints.length - 1)
                const y = chartHeight - padding - (value * graphHeight) / 40
                return <circle key={`comp-${index}`} cx={x} cy={y} r="3" fill="#f9ca24" />
              })}

            {/* Annotations (if enabled) */}
            {showAnnotations &&
              annotations.map((annotation, index) => (
                <g key={index}>
                  <circle cx={annotation.x} cy={annotation.y} r="8" fill="#6131ca" fillOpacity="0.2" />
                  <text
                    x={annotation.x}
                    y={annotation.y}
                    fontSize="8"
                    fill="#6131ca"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {annotation.number}
                  </text>
                </g>
              ))}
          </svg>

          <div className="text-xs text-gray-500 text-center mt-2">{xAxisLabel}</div>

          <div className="mt-4 text-xs text-gray-500 flex justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#ef4444] mr-1"></div>
              <span>High</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#42b4f7] mr-1"></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#3b82f6] mr-1"></div>
              <span>Low</span>
            </div>
            {comparisonMode && (
              <div className="flex items-center ml-2">
                <div className="w-3 h-3 rounded-full bg-[#f9ca24] mr-1"></div>
                <span>{comparisonLabel || "Comparison"}</span>
              </div>
            )}
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute top-0 right-0 mt-1 mr-1">
                  <Info size={14} className="text-gray-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Click on data points for detailed explanations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChartArea
