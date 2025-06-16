"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BodyFigure from "@/components/body-load/BodyFigure"
import Legend from "@/components/body-load/Legend"
import AsymmetryPanel from "@/components/body-load/AsymmetryPanel"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AsymmetryScorecard from "@/components/body-load/AsymmetryScorecard"
import ChainReactionAnalysis from "@/components/body-load/ChainReactionAnalysis"
import RootCauseAnalysis from "@/components/body-load/RootCauseAnalysis"
import EquipmentRecommendation from "@/components/body-load/EquipmentRecommendation"

const BodyLoadVisualizationV4: React.FC = () => {
  const navigate = useNavigate()
  const [timeframe, setTimeframe] = useState<"this-run" | "last-7-days">("this-run")
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const asymmetryInsights = [
    {
      bodyPart: "Quadriceps",
      leftValue: "Left: High Load / 75% Max",
      rightValue: "Right: Moderate Load / 55% Max",
      difference: "Imbalance: Left +20%",
    },
    {
      bodyPart: "Knees",
      leftValue: "Left: High Force / 3.2x BW",
      rightValue: "Right: Moderate Force / 2.8x BW",
      difference: "Imbalance: Left +14%",
    },
    {
      bodyPart: "Hamstrings",
      leftValue: "Left: Moderate Load / 60% Max",
      rightValue: "Right: Moderate Load / 58% Max",
      difference: "Balanced (2% diff)",
    },
  ]

  const llmInsight =
    "Your left quadriceps consistently shows higher load than your right across most runs. This could be contributing to the slight pelvic shift we've noted. Focusing on single-leg strength on your right side may help balance your running mechanics and reduce the risk of compensatory injuries."

  const handleViewDrills = () => {
    // In a real app, this would navigate to the drill detail screen filtered for asymmetry
    console.log("View drills for asymmetry")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center justify-between sticky top-0 z-10 bg-white border-b px-4 py-5 flex items-center justify-between container max-w-xl mx-auto">
        <h1 className="text-lg font-semibold">
          Body Asymmetry Map: {timeframe === "this-run" ? "Run on May 17" : "Last 7 Days"}
        </h1>
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="container max-w-md mx-auto px-4 py-2">
        {/* Filter Controls */}
      <div className="bg-white p-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <ToggleGroup type="single" defaultValue="asymmetry" disabled>
              <ToggleGroupItem value="asymmetry" aria-label="Asymmetry">
                Asymmetry
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div>
            <Select value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
              <SelectTrigger className="w-[180px]">
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
        {/* Asymmetry Scorecard */}
        <AsymmetryScorecard />

        {/* Body Figure with Magic Icon */}
        <div className="relative">
          <BodyFigure view="front" dataType="asymmetry" animate={true} highlightAsymmetry={true} />
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
        <Legend dataType="asymmetry" />

        {/* Advanced Analysis Tabs */}
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comparison" onClick={() => setSelectedSection("comparison")}>
              Comparison
            </TabsTrigger>
            <TabsTrigger value="chain-reaction" onClick={() => setSelectedSection("chain-reaction")}>
              Chain Reaction
            </TabsTrigger>
            <TabsTrigger value="root-cause" onClick={() => setSelectedSection("root-cause")}>
              Root Cause
            </TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-4">
            <AsymmetryPanel insights={asymmetryInsights} llmInsight={llmInsight} onViewDrills={handleViewDrills} />
          </TabsContent>

          <TabsContent value="chain-reaction" className="space-y-4">
            <ChainReactionAnalysis />
          </TabsContent>

          <TabsContent value="root-cause" className="space-y-4">
            <RootCauseAnalysis />
          </TabsContent>
        </Tabs>

        {/* Equipment Recommendation */}
        <EquipmentRecommendation />
      </div>

      {/* LLM Explanation Modal */}
      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName="Body Asymmetry Analysis"
        runDate="May 17, 2025"
      />
      </div>
      <MobileNavbar />
    </div>
  )
}

export default BodyLoadVisualizationV4
