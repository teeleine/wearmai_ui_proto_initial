"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Sparkles, RotateCw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BodyFigure from "@/components/body-load/BodyFigure"
import Legend from "@/components/body-load/Legend"
import DetailPanel from "@/components/body-load/DetailPanel"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import HistoricalComparisonChart from "@/components/body-load/HistoricalComparisonChart"
import RecommendedDrills from "@/components/body-load/RecommendedDrills"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RunIntensityHeatmap from "@/components/body-load/RunIntensityHeatmap"

const BodyLoadVisualizationV2: React.FC = () => {
  const navigate = useNavigate()
  const [dataType, setDataType] = useState<"muscle-load" | "joint-force" | "soreness">("muscle-load")
  const [timeframe, setTimeframe] = useState<"this-run" | "last-7-days">("this-run")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)
  const [showDrills, setShowDrills] = useState(false)
  const [viewMode, setViewMode] = useState<"normal" | "3d" | "intensity">("normal")

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region)
    setShowDrills(false)
  }

  const getMetricText = () => {
    if (!selectedRegion) return ""

    if (dataType === "muscle-load") {
      if (selectedRegion === "Left Quadriceps") {
        return "Muscle Load: 85% of Max Estimate (Category: High)"
      } else if (selectedRegion === "Right Quadriceps") {
        return "Muscle Load: 65% of Max Estimate (Category: Moderate)"
      } else {
        return "Muscle Load: 45% of Max Estimate (Category: Normal)"
      }
    } else if (dataType === "joint-force") {
      if (selectedRegion === "Left Knee") {
        return "Peak Joint Force: 3.2x Bodyweight (Category: Elevated)"
      } else if (selectedRegion === "Right Knee") {
        return "Peak Joint Force: 2.8x Bodyweight (Category: Moderate)"
      } else {
        return "Peak Joint Force: 2.1x Bodyweight (Category: Normal)"
      }
    } else {
      if (selectedRegion === "Left Quadriceps") {
        return "Reported Soreness: High (7/10)"
      } else if (selectedRegion === "Right Knee") {
        return "Reported Soreness: Moderate (4/10)"
      } else {
        return "Reported Soreness: Low (1/10)"
      }
    }
  }

  const getInsightText = () => {
    if (!selectedRegion) return ""

    if (dataType === "muscle-load") {
      if (selectedRegion === "Left Quadriceps") {
        return "This high load in your left quads is consistent with the increased uphill effort in the second half of your run. Your right side shows less load, suggesting possible compensation."
      } else if (selectedRegion === "Right Quadriceps") {
        return "Your right quad is showing moderate load, which is expected given your training volume. The difference between left and right suggests some asymmetry to monitor."
      } else {
        return "This area is showing normal load patterns, which is a good sign for balanced training stress."
      }
    } else if (dataType === "joint-force") {
      if (selectedRegion === "Left Knee") {
        return "The force on your left knee is elevated and could be linked to the slight increase in your ground contact time noted recently. Consider focusing on quick foot turnover in your next few runs."
      } else {
        return "Forces here are within normal ranges for your training level and running style."
      }
    } else {
      if (selectedRegion === "Left Quadriceps") {
        return "Your reported soreness aligns with the higher load detected in this area. This is expected given your recent training but monitor this area if soreness persists beyond 48 hours."
      } else {
        return "The mild soreness reported here is normal and should resolve with proper recovery."
      }
    }
  }

  const handleAskCoach = () => {
    // In a real app, this would navigate to the chat coach screen with context
    console.log("Ask coach about", selectedRegion)
  }

  const handleViewDrills = () => {
    setShowDrills(true)
  }

  const toggleViewMode = () => {
    if (viewMode === "normal") setViewMode("3d")
    else if (viewMode === "3d") setViewMode("intensity")
    else setViewMode("normal")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center justify-between sticky top-0 z-10 bg-white border-b px-4 py-5 flex items-center justify-between container max-w-xl mx-auto">

        <h1 className="text-lg font-semibold">
          Body Load Map: {timeframe === "this-run" ? "Run on May 17" : "Last 7 Days"}
        </h1>
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="container max-w-md mx-auto px-4 py-2">
        {/* Filter Controls */}
      <div className="bg-white p-4 border-b">
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
          <div>
            <ToggleGroup type="single" value={dataType} onValueChange={(value) => value && setDataType(value as any)}>
              <ToggleGroupItem value="muscle-load" aria-label="Muscle Load">
                Muscle Load
              </ToggleGroupItem>
              <ToggleGroupItem value="joint-force" aria-label="Joint Force">
                Joint Force
              </ToggleGroupItem>
              <ToggleGroupItem value="soreness" aria-label="Soreness">
                Soreness
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex-1 sm:flex-none">
            <Select value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-run">This Run</SelectItem>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4 pb-20">
        {/* View Mode Button */}
        <div className="flex justify-end mb-1">
          <Button variant="outline" size="sm" onClick={toggleViewMode} className="flex items-center space-x-1">
            <RotateCw className="h-3.5 w-3.5 mr-1" />
            <span>{viewMode === "normal" ? "Standard View" : viewMode === "3d" ? "3D View" : "Intensity Map"}</span>
          </Button>
        </div>

        {/* Body Figure with Magic Icon */}
        <div className="relative">
          {viewMode === "intensity" ? (
            <RunIntensityHeatmap dataType={dataType} />
          ) : (
            <BodyFigure
              view="front"
              dataType={dataType}
              onRegionClick={handleRegionClick}
              viewMode={viewMode}
              animate={true}
            />
          )}

          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white rounded-full"
            onClick={() => setIsExplanationOpen(true)}
          >
            <Sparkles className="h-4 w-4 text-[#42b4f7]" />
          </Button>
        </div>

        {/* Legend */}
        <Legend dataType={dataType} />

        {/* Overall Stats */}
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Run Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Total Muscle Load</span>
                <span className="font-medium">High (78%)</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Peak Joint Force</span>
                <span className="font-medium">Moderate (62%)</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Left/Right Balance</span>
                <span className="font-medium text-amber-600">Off (12% L &gt; R)</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-[56%] bg-blue-500 rounded-l-full"></div>
                <div className="absolute right-0 top-0 h-full w-[44%] bg-blue-300 rounded-r-full"></div>
                <div className="absolute left-[50%] top-0 h-full w-[1px] bg-gray-400"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Historical Comparison */}
        {selectedRegion && !showDrills && <HistoricalComparisonChart region={selectedRegion} dataType={dataType} />}

        {/* Selected Area Detail Panel or Recommended Drills */}
        {showDrills && selectedRegion ? (
          <RecommendedDrills region={selectedRegion} dataType={dataType} onBack={() => setShowDrills(false)} />
        ) : selectedRegion ? (
          <DetailPanel
            region={selectedRegion}
            metric={getMetricText()}
            insight={getInsightText()}
            onAskCoach={handleAskCoach}
            onViewDrills={handleViewDrills}
          />
        ) : (
          <div className="bg-white p-4 rounded-lg border text-center text-sm text-muted-foreground">
            Tap on a hotspot or colored region to see detailed information
          </div>
        )}
      </div>

      {/* LLM Explanation Modal */}
      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName={`Body ${dataType === "muscle-load" ? "Muscle Load" : dataType === "joint-force" ? "Joint Force" : "Soreness"} Distribution`}
        runDate="May 17, 2025"
      />
      </div>
      <MobileNavbar />
    </div>
  )
}

export default BodyLoadVisualizationV2
