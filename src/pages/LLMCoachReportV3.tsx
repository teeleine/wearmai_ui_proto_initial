"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header"
import TabNavigation from "@/components/run-detail/TabNavigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import InteractiveBodyMap from "@/components/llm-coach-report/InteractiveBodyMap"
import RiskAssessment from "@/components/llm-coach-report/RiskAssessment"
import ExpandableInfo from "@/components/llm-coach-report/ExpandableInfo"
import RecommendationCard from "@/components/llm-coach-report/RecommendationCard"
import RecoveryTimeline from "@/components/llm-coach-report/RecoveryTimeline"
import GaitCycleAnalysis from "@/components/llm-coach-report/GaitCycleAnalysis"
import ProgressTrendChart from "@/components/llm-coach-report/ProgressTrendChart"
import { Dumbbell, Footprints } from 'lucide-react'
import MobileNavbar from "@/components/dashboard/MobileNavBar"

const LLMCoachReportV3: React.FC = () => {
  // Sample run date
  const runDate = "May 16, 2025"

  // Define hotspots for the interactive body map with explicit typing
  const hotspots: Array<{
    id: string;
    x: number;
    y: number;
    title: string;
    description: string;
    dataSource?: string;
    recommendation?: string;
    severity: "high" | "medium" | "low";
  }> = [
    {
      id: "right-knee",
      x: 60,
      y: 95,
      title: "Right Knee Focus",
      description:
        "High peak forces (2.8x body weight) and increased load observed on your right knee, especially during later stages. This might be related to the pelvic drop on your right side.",
      dataSource: "Knee Joint Force, Pelvic List Angle",
      recommendation: "Consider Glute Bridges for stability and focus on softer landings.",
      severity: "high",
    },
    {
      id: "pelvis",
      x: 50,
      y: 65,
      title: "Pelvic Stability Insight",
      description:
        "Increased right pelvic drop (5.2°) noted in the final kilometer. This can affect your knee alignment and increase stress on your IT band.",
      dataSource: "Pelvic List Angle",
      recommendation: "Strengthen glutes and core with targeted exercises.",
      severity: "medium",
    },
    {
      id: "left-calf",
      x: 45,
      y: 105,
      title: "Left Calf Load",
      description:
        "Your left calf is working harder (70% load) than your right (63%). This asymmetry may be compensating for the pelvic instability.",
      dataSource: "Estimated Muscle Load",
      recommendation: "Consider foam rolling and calf stretches to address the imbalance.",
      severity: "medium",
    },
  ]

  const [selectedHotspot, setSelectedHotspot] = useState<any>(null)

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header title={`Coach Report: ${runDate}`} showBackButton={true} />

      <div className="container max-w-md mx-auto px-4 py-4 pb-20">
        <TabNavigation activeTab="coach-report" />

        <div className="mt-6">
          <Card className="mb-6 border border-gray-200 shadow-sm">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-base font-medium text-gray-700">Your Run At a Glance</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-gray-700">
                Good job on your 5.2 km run! Your pacing was consistent, but I've identified a few areas to focus on to
                improve your running mechanics and reduce injury risk.
              </p>
            </CardContent>
          </Card>

          <InteractiveBodyMap hotspots={hotspots} onHotspotClick={setSelectedHotspot} />

          <GaitCycleAnalysis />

          <ProgressTrendChart />

          <RiskAssessment
            level="moderate"
            description="Combination of right knee load and pelvic asymmetry indicates a moderate risk for ITB-related issues if not addressed. Current pattern doesn't require immediate intervention but should be monitored."
          />

          <div className="mb-6">
            <h2 className="text-base font-medium text-gray-700 mb-3">Key Recommendations</h2>
            <RecommendationCard
              icon={Dumbbell}
              title="Glute Bridges for Pelvic Stability"
              description="Perform 2 sets of 12 reps, 3 times per week."
              actionLabel="View Drill"
            />
            <RecommendationCard
              icon={Footprints}
              title="Focus on Softer Right Landings"
              description="Pay attention to landing more softly on your right foot during your next few runs."
            />
            {selectedHotspot?.recommendation && (
              <Card className="mb-3 border border-[#e3f7d4] bg-[#f0f7ff]/30 shadow-sm">
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-[#42b4f7] mb-1">Based on your selection:</h3>
                  <p className="text-sm text-gray-700">{selectedHotspot.recommendation}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <RecoveryTimeline />

          <ExpandableInfo title="Understanding The Body Map">
            <p className="mb-2">
              The body map highlights areas of interest based on your biomechanical data from this run. Areas are
              color-coded by level of concern:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1 mb-2">
              <li>
                <span className="text-[#42b4f7] font-medium">Blue</span>: Low concern - within normal ranges
              </li>
              <li>
                <span className="text-[#f9ca24] font-medium">Yellow</span>: Medium concern - monitor these areas
              </li>
              <li>
                <span className="text-[#6131ca] font-medium">Purple</span>: High concern - areas to address
              </li>
            </ul>
            <p>Tap any highlighted area to see specific insights and recommendations based on your sensor data.</p>
          </ExpandableInfo>
        </div>
      </div>
      <MobileNavbar/>
    </div>
  )
}

export default LLMCoachReportV3
