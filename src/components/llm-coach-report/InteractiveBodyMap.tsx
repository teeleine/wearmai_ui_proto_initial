"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"

interface Hotspot {
  id: string
  x: number
  y: number
  title: string
  description: string
  recommendation?: string
  dataSource?: string
  severity: "high" | "medium" | "low"
}

interface InteractiveBodyMapProps {
  hotspots?: Hotspot[]
  onHotspotClick?: (hotspot: Hotspot) => void
  className?: string
}

const InteractiveBodyMap: React.FC<InteractiveBodyMapProps> = ({
  hotspots = defaultHotspots,
  onHotspotClick,
  className = "",
}) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [view, setView] = useState<"front" | "back">("front")
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  const handleHotspotClick = (hotspot: Hotspot) => {
    setActiveHotspot(hotspot)
    if (onHotspotClick) {
      onHotspotClick(hotspot)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "#6131ca" // Purple for high severity
      case "medium":
        return "#f9ca24" // Yellow for medium severity
      case "low":
        return "#42b4f7" // Blue for low severity
      default:
        return "#cccccc"
    }
  }

  // Filter hotspots based on current view
  const visibleHotspots = hotspots.filter(
    (hotspot) => (view === "front" && hotspot.y < 100) || (view === "back" && hotspot.y >= 100),
  )

  return (
    <Card className={`mb-6 border border-gray-200 shadow-sm ${className}`}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            Body Insights & Load Distribution
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2" onClick={() => setIsExplanationOpen(true)}>
              <Sparkles size={16} className="text-[#42b4f7]" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <Tabs defaultValue="front" onValueChange={(value) => setView(value as "front" | "back")}>
          <div className="flex justify-end mb-2">
            <TabsList>
              <TabsTrigger value="front">Front</TabsTrigger>
              <TabsTrigger value="back">Back</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="relative w-full max-w-[240px] mx-auto mb-4 md:mb-0 md:mr-4">
              <TabsContent value="front" className="mt-0">
                {/* Improved body outline - Front View */}
                <svg viewBox="0 0 100 150" className="w-full h-full">
                  {/* Head */}
                  <circle cx="50" cy="20" r="15" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />

                  {/* Torso */}
                  <path d="M35,35 L65,35 L65,90 L35,90 Z" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />

                  {/* Arms */}
                  <path d="M35,35 L25,35 L20,70 L30,70 Z" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />
                  <path d="M65,35 L75,35 L80,70 L70,70 Z" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />

                  {/* Legs */}
                  <path d="M35,90 L45,90 L45,140 L35,140 Z" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />
                  <path d="M55,90 L65,90 L65,140 L55,140 Z" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />

                  {/* Hotspots - only show front view hotspots */}
                  {visibleHotspots.map((hotspot, index) => (
                    <g key={index} onClick={() => handleHotspotClick(hotspot)} style={{ cursor: "pointer" }}>
                      <circle
                        cx={hotspot.x}
                        cy={hotspot.y}
                        r="5"
                        fill={getSeverityColor(hotspot.severity)}
                        fillOpacity="0.6"
                        className={`${activeHotspot?.id === hotspot.id ? "animate-pulse" : ""}`}
                      />
                      <text
                        x={hotspot.x}
                        y={hotspot.y}
                        fontSize="6"
                        fill="#ffffff"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {index + 1}
                      </text>
                    </g>
                  ))}
                </svg>
              </TabsContent>

              <TabsContent value="back" className="mt-0">
                {/* Improved body outline - Back View */}
                <svg viewBox="0 0 100 150" className="w-full h-full">
                  {/* Head */}
                  <circle cx="50" cy="20" r="15" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />

                  {/* Torso */}
                  <path d="M35,35 L65,35 L65,90 L35,90 Z" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />

                  {/* Arms */}
                  <path d="M35,35 L25,35 L20,70 L30,70 Z" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />
                  <path d="M65,35 L75,35 L80,70 L70,70 Z" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />

                  {/* Legs */}
                  <path d="M35,90 L45,90 L45,140 L35,140 Z" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />
                  <path d="M55,90 L65,90 L65,140 L55,140 Z" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />

                  {/* Hotspots - only show back view hotspots */}
                  {visibleHotspots.map((hotspot, index) => (
                    <g key={index} onClick={() => handleHotspotClick(hotspot)} style={{ cursor: "pointer" }}>
                      <circle
                        cx={hotspot.x}
                        cy={hotspot.y}
                        r="5"
                        fill={getSeverityColor(hotspot.severity)}
                        fillOpacity="0.6"
                        className={`${activeHotspot?.id === hotspot.id ? "animate-pulse" : ""}`}
                      />
                      <text
                        x={hotspot.x}
                        y={hotspot.y}
                        fontSize="6"
                        fill="#ffffff"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {index + 1}
                      </text>
                    </g>
                  ))}
                </svg>
              </TabsContent>
            </div>

            <div className="flex-1 bg-gray-50 p-4 rounded-lg">
              {activeHotspot ? (
                <div>
                  <h3 className="text-sm font-medium text-gray-800 mb-2">{activeHotspot.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{activeHotspot.description}</p>
                  {activeHotspot.dataSource && (
                    <p className="text-xs text-gray-400 mb-2">Data: {activeHotspot.dataSource}</p>
                  )}
                  {activeHotspot.recommendation && (
                    <div className="mt-3 p-2 bg-[#e3f7d4] rounded-md text-xs text-gray-700">
                      <strong>Recommendation:</strong> {activeHotspot.recommendation}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-gray-500 flex items-center justify-center h-full">
                  Tap a highlighted area on the body map to see specific insights
                </div>
              )}
            </div>
          </div>
        </Tabs>

        <div className="mt-4 text-xs text-gray-500 flex justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#42b4f7] mr-1"></div>
            <span>Low Concern</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#f9ca24] mr-1"></div>
            <span>Medium Concern</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#6131ca] mr-1"></div>
            <span>High Concern</span>
          </div>
        </div>
      </CardContent>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName="Body Load & Asymmetry Analysis"
        runDate="May 17, 2025"
      />
    </Card>
  )
}

// Default hotspots to use when none are provided
const defaultHotspots: Hotspot[] = [
  {
    id: "1",
    x: 40,
    y: 60,
    title: "Left Quadriceps",
    description: "High load detected in this area. This may be contributing to your recent knee discomfort.",
    recommendation: "Consider foam rolling and targeted stretching after runs.",
    dataSource: "WearM.AI Muscle Load Sensor",
    severity: "high",
  },
  {
    id: "2",
    x: 60,
    y: 60,
    title: "Right Quadriceps",
    description: "Moderate load detected, slightly lower than left side.",
    recommendation: "Work on balanced strength training for both legs.",
    dataSource: "WearM.AI Muscle Load Sensor",
    severity: "medium",
  },
  {
    id: "3",
    x: 40,
    y: 85,
    title: "Left Knee Joint",
    description: "Elevated force detected during impact phase of running.",
    recommendation: "Consider gait analysis to optimize running form.",
    dataSource: "WearM.AI Joint Force Sensor",
    severity: "high",
  },
  {
    id: "4",
    x: 60,
    y: 85,
    title: "Right Knee Joint",
    description: "Normal force levels detected.",
    dataSource: "WearM.AI Joint Force Sensor",
    severity: "low",
  },
  {
    id: "5",
    x: 40,
    y: 110,
    title: "Left Hamstring",
    description: "Moderate load with some fatigue patterns detected.",
    recommendation: "Focus on proper hamstring recovery exercises.",
    dataSource: "WearM.AI Muscle Load Sensor",
    severity: "medium",
  },
  {
    id: "6",
    x: 60,
    y: 110,
    title: "Right Hamstring",
    description: "Normal load patterns detected.",
    dataSource: "WearM.AI Muscle Load Sensor",
    severity: "low",
  },
  {
    id: "7",
    x: 40,
    y: 130,
    title: "Left Calf",
    description: "Low load detected, good recovery pattern.",
    dataSource: "WearM.AI Muscle Load Sensor",
    severity: "low",
  },
  {
    id: "8",
    x: 60,
    y: 130,
    title: "Right Calf",
    description: "Low load detected, good recovery pattern.",
    dataSource: "WearM.AI Muscle Load Sensor",
    severity: "low",
  },
]

export default InteractiveBodyMap
