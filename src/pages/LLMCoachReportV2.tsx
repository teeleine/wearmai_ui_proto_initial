import type React from "react"
import Header from "@/components/Header"
import ChatButton from "@/components/dashboard/ChatButton"
import TabNavigation from "@/components/run-detail/TabNavigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import InsightCard from "@/components/llm-coach-report/InsightCard"
import RecommendationCard from "@/components/llm-coach-report/RecommendationCard"
import RiskAssessment from "@/components/llm-coach-report/RiskAssessment"
import ExpandableInfo from "@/components/llm-coach-report/ExpandableInfo"
import FootStrikeAnalysis from "@/components/llm-coach-report/FootStrikeAnalysis"
import FatigueAnalysis from "@/components/llm-coach-report/FatigueAnalysis"
import AsymmetryIndex from "@/components/llm-coach-report/AsymmetryIndex"
import { Dumbbell, Activity, Footprints } from 'lucide-react'
import MobileNavbar from "@/components/dashboard/MobileNavBar"

const LLMCoachReportV2: React.FC = () => {
  // Sample run date
  const runDate = "May 16, 2025"

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header title={`Coach Report: ${runDate}`} showBackButton={true} />

      <div className="container max-w-md mx-auto px-4 py-4 pb-20">
        <TabNavigation activeTab="coach-report" />

        <div className="mt-6">
          <Card className="mb-6 border border-gray-200 shadow-sm">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-base font-medium text-gray-700">Run Highlights & Key Takeaways</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Good overall pacing and endurance throughout your 5.2 km run</li>
                <li>Right knee showing higher forces than left - monitor for discomfort</li>
                <li>Pelvic stability decreased in final kilometer - likely due to fatigue</li>
              </ul>
            </CardContent>
          </Card>

          <FootStrikeAnalysis />

          <div className="mb-6">
            <h2 className="text-base font-medium text-gray-700 mb-3">Technique & Biomechanics</h2>
            <InsightCard
              title="Pelvic Stability: Right Side Drop Increased"
              description="Observed increased right pelvic drop (avg 5.2°) in the final km, potentially due to fatigue."
              severity="medium"
              dataSource="pelvic_list_angle_avg"
              actionLabel="Explain This"
            />
            <InsightCard
              title="Knee Flexion: Within Range"
              description="Average left knee flexion (40.1°) and right knee flexion (39.5°) were good, though variability increased slightly towards the end."
              severity="info"
              dataSource="knee_flexion_angle_avg"
            />
            <InsightCard
              title="Hip Flexion: Good Power Generation"
              description="Hip flexion on both sides (avg 22.5° L, 21.9° R) was in a healthy range, showing good power generation."
              severity="low"
              dataSource="hip_flexion_angle_avg"
            />
          </div>

          <FatigueAnalysis />

          <div className="mb-6">
            <h2 className="text-base font-medium text-gray-700 mb-3">Muscle Load & Joint Impact</h2>
            <InsightCard
              title="Quadriceps Load: Elevated (Left)"
              description="Your left quadriceps showed significantly higher load (78%) compared to the right (65%)."
              severity="medium"
              dataSource="estimated_muscle_load"
              actionLabel="View on Body Map"
            />
            <InsightCard
              title="Knee Joint Force: High Peak (Right)"
              description="Right knee experienced peak forces of 2.8x body weight. Monitor for discomfort."
              severity="high"
              dataSource="knee_joint_force_peak"
              actionLabel="View on Body Map"
            />
            <InsightCard
              title="Calf Load: Asymmetrical"
              description="Left calf load (70%) higher than right (63%), which may contribute to the observed pelvic drop."
              severity="medium"
              dataSource="estimated_muscle_load"
            />
          </div>

          <AsymmetryIndex />

          <RiskAssessment
            level="moderate"
            description="Combination of right knee load and pelvic asymmetry indicates a moderate risk for ITB-related issues if not addressed. Current pattern doesn't require immediate intervention but should be monitored."
          />

          <div className="mb-6">
            <h2 className="text-base font-medium text-gray-700 mb-3">Coach Recommendations</h2>
            <RecommendationCard
              icon={Dumbbell}
              title="Glute Bridges"
              description="Perform 2 sets of 12 reps, 3 times per week to improve pelvic stability and reduce knee load."
              actionLabel="View Drill Details"
            />
            <RecommendationCard
              icon={Footprints}
              title="Running Form Cue"
              description="Focus on landing softer on your right foot during your next few runs to reduce peak forces."
            />
            <RecommendationCard
              icon={Activity}
              title="Recovery Strategy"
              description="Consider foam rolling your left calf and IT band to address the muscle load imbalance."
              actionLabel="View Technique"
            />
          </div>

          <ExpandableInfo title="Data & Reasoning">
            <p className="mb-2">
              <strong>Pelvic drop</strong> is measured by the 'pelvic_list_angle_avg' from your sensors, which tracks
              the side-to-side tilt of your pelvis during running.
            </p>
            <p className="mb-2">
              <strong>Joint forces</strong> are calculated based on your weight, running speed, and the angles of your
              joints during impact.
            </p>
            <p>
              <strong>Muscle load</strong> is estimated from joint angles and forces, showing which muscles are working
              hardest during your run.
            </p>
          </ExpandableInfo>
        </div>
      </div>

      <MobileNavbar/>
    </div>
  )
}

export default LLMCoachReportV2
