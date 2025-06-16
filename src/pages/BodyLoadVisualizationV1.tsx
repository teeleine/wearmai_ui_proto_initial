"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Sparkles, ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BodyFigure from "@/components/body-load/BodyFigure"
import Legend from "@/components/body-load/Legend"
import LLMInsightPanel from "@/components/body-load/LLMInsightPanel"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RunPhaseSelector from "@/components/body-load/RunPhaseSelector"
import TrendComparison from "@/components/body-load/TrendComparison"
import RecoveryEstimation from "@/components/body-load/RecoveryEstimation"

const BodyLoadVisualizationV1: React.FC = () => {
  const navigate = useNavigate()
  const [dataType, setDataType] = useState<"muscle-load" | "joint-force" | "soreness">("muscle-load")
  const [timeframe, setTimeframe] = useState<"this-run" | "last-7-days">("this-run")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)
  const [runPhase, setRunPhase] = useState<"full-run" | "start" | "middle" | "end">("full-run")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region)
  }

  const getInsightText = () => {
    if (dataType === "muscle-load") {
      return "Your left quadriceps and right knee show the highest load from this run. This pattern suggests you might be compensating for some tightness in your right hip. Consider some hip mobility exercises before your next run."
    } else if (dataType === "joint-force") {
      return "Your left knee is experiencing higher forces than normal. This could be related to the increased hill work in your recent runs. Consider reducing hill training for the next few days."
    } else {
      return "The soreness in your left quadriceps aligns with the higher load detected in that area. This is expected given your recent training but monitor this area if soreness persists beyond 48 hours."
    }
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
        <div className="flex flex-col space-y-3">
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

          {timeframe === "this-run" && <RunPhaseSelector currentPhase={runPhase} onPhaseChange={setRunPhase} />}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4 pb-20">
        {/* Body Figure with Magic Icon */}
        <div className="relative">
          <BodyFigure
            view="front"
            dataType={dataType}
            onRegionClick={handleRegionClick}
            runPhase={runPhase}
            animate={true}
          />
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

        {/* Tooltip for selected region */}
        {selectedRegion && (
          <div className="bg-white p-3 rounded-lg shadow-sm border text-sm">
            <p>
              <span className="font-medium">{selectedRegion}:</span>{" "}
              {dataType === "muscle-load"
                ? "High Load"
                : dataType === "joint-force"
                  ? "High Force"
                  : "Moderate Soreness"}
            </p>
          </div>
        )}

        {/* LLM Insight Panel */}
        <LLMInsightPanel title="Coach's Overview of Your Body Load:" insight={getInsightText()} />

        {/* Button to toggle advanced analysis */}
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between"
        >
          <span>Advanced Analysis</span>
          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {/* Advanced Analysis Section */}
        {showAdvanced && (
          <Tabs defaultValue="trends" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="trends">Load Trends</TabsTrigger>
              <TabsTrigger value="recovery">Recovery</TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="space-y-4">
              <TrendComparison
                title="Muscle Load Trend"
                dataType={dataType}
                selectedRegion={selectedRegion || "All Regions"}
              />
            </TabsContent>

            <TabsContent value="recovery" className="space-y-4">
              <RecoveryEstimation dataType={dataType} regions={["Left Quadriceps", "Right Knee"]} />
            </TabsContent>
          </Tabs>
        )}

        {/* Hover help tooltip */}
        <div className="fixed bottom-20 right-4 bg-white p-2 rounded-full shadow-md">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
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

export default BodyLoadVisualizationV1
