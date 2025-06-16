"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Sparkles, Clock, BarChart3 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BodyFigure from "@/components/body-load/BodyFigure"
import Legend from "@/components/body-load/Legend"
import DetailPanel from "@/components/body-load/DetailPanel"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import TimelineSlider from "@/components/body-load/TimelineSlider"
import FormImpactVisualizer from "@/components/body-load/FormImpactVisualizer"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SideBySideComparison from "@/components/body-load/SideBySideComparison"
import InjuryRiskAssessment from "@/components/body-load/InjuryRiskAssessment"

const BodyLoadVisualizationV3: React.FC = () => {
  const navigate = useNavigate()
  const [dataType, setDataType] = useState<"muscle-load" | "joint-force" | "soreness">("muscle-load")
  const [timeframe, setTimeframe] = useState<"this-run" | "last-7-days">("this-run")
  const [view, setView] = useState<"front" | "back">("front")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)
  const [timePoint, setTimePoint] = useState(100) // percentage of run completed
  const [showFormImpact, setShowFormImpact] = useState(false)

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region)
    setShowFormImpact(false)
  }

  const getMetricText = () => {
    if (!selectedRegion) return ""

    if (dataType === "muscle-load") {
      if (selectedRegion === "Left Quadriceps") {
        return "Muscle Load: High"
      } else if (selectedRegion === "Right Quadriceps") {
        return "Muscle Load: Moderate"
      } else if (view === "back" && selectedRegion.includes("Hamstring")) {
        return "Muscle Load: High"
      } else {
        return "Muscle Load: Normal"
      }
    } else if (dataType === "joint-force") {
      if (selectedRegion === "Left Knee") {
        return "Joint Force: High"
      } else if (selectedRegion === "Right Knee") {
        return "Joint Force: Moderate"
      } else {
        return "Joint Force: Normal"
      }
    } else {
      if (selectedRegion === "Left Quadriceps" || (view === "back" && selectedRegion.includes("Hamstring"))) {
        return "Soreness: Moderate to High"
      } else {
        return "Soreness: Low to None"
      }
    }
  }

  const getInsightText = () => {
    if (!selectedRegion) return ""

    if (view === "front") {
      if (selectedRegion === "Left Quadriceps") {
        return "Your left quads showed even loading, good work on maintaining balance."
      } else if (selectedRegion === "Right Quadriceps") {
        return "Right quad load is within normal ranges for your training level."
      } else if (selectedRegion.includes("Knee")) {
        return "Joint forces are slightly elevated but not concerning given your recent training."
      } else {
        return "This area is showing normal patterns, which is a good sign."
      }
    } else {
      // Back view insights
      if (selectedRegion.includes("Hamstring")) {
        return "Your hamstrings are showing higher than usual load, which may be related to the hill work in your recent runs."
      } else if (selectedRegion.includes("Calf")) {
        return "Calf load is balanced and within expected ranges."
      } else {
        return "This area is showing normal patterns, which is a good sign."
      }
    }
  }

  const handleShowFormImpact = () => {
    setShowFormImpact(true)
    setSelectedRegion(null)
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
        <div className="flex flex-col space-y-3 sm:space-y-0">
          <div className="flex flex-wrap gap-3 items-center">
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

            <div className="flex-1 sm:flex-none mb-5">
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

          <div className="flex justify-center mt-3">
            <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as any)}>
              <ToggleGroupItem value="front" aria-label="Front View" className="px-6">
                Front View
              </ToggleGroupItem>
              <ToggleGroupItem value="back" aria-label="Back View" className="px-6">
                Back View
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>

      {/* Timeline slider when viewing this run */}
      {timeframe === "this-run" && (
        <div className="bg-white px-4 py-2 border-b">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs font-medium">Run Timeline</p>
          </div>
          <TimelineSlider value={timePoint} onChange={setTimePoint} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4 pb-20">
        {/* Top action buttons */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={handleShowFormImpact}>
            <BarChart3 className="h-3.5 w-3.5 mr-1" />
            Form Impact Analysis
          </Button>
        </div>

        {/* Form Impact or Body Figure */}
        <div className="relative">
          {showFormImpact ? (
            <FormImpactVisualizer dataType={dataType} />
          ) : (
            <BodyFigure
              view={view}
              dataType={dataType}
              onRegionClick={handleRegionClick}
              timePoint={timePoint}
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

        {/* Side-by-Side Comparison */}
        <SideBySideComparison dataType={dataType} />

        {/* Advanced Insights Tabs */}
        <Tabs defaultValue="symmetry" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="symmetry">Left/Right</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="details">{selectedRegion ? "Details" : "Analysis"}</TabsTrigger>
          </TabsList>

          <TabsContent value="symmetry">
            <Card>
              <CardContent className="pt-4">
                <div className="text-center text-xs text-muted-foreground mb-2">Left/Right Balance Score</div>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-xl font-semibold">82</span>
                  <span className="text-xs text-muted-foreground ml-1">/100</span>
                </div>
                <div className="relative h-3 bg-gray-100 rounded-full mb-2">
                  <div className="absolute left-0 top-0 h-full w-[82%] bg-gradient-to-r from-amber-500 to-green-500 rounded-full"></div>
                </div>
                <p className="text-xs text-center">You have a 12% imbalance favoring your left side</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk">
            <InjuryRiskAssessment dataType={dataType} />
          </TabsContent>

          <TabsContent value="details">
            {selectedRegion ? (
              <DetailPanel
                region={selectedRegion}
                metric={getMetricText()}
                insight={getInsightText()}
                // includeChart={true}
              />
            ) : (
              <div className="bg-white p-4 rounded-lg border text-center text-sm text-muted-foreground">
                Select a region to see detailed information
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* LLM Explanation Modal */}
      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName={`Body ${dataType === "muscle-load" ? "Muscle Load" : dataType === "joint-force" ? "Joint Force" : "Soreness"} Distribution (${view === "front" ? "Front View" : "Back View"})`}
        runDate="May 17, 2025"
      />
      <MobileNavbar />
     </div>
    </div>
  )
}

export default BodyLoadVisualizationV3
