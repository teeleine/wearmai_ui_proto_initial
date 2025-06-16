import type React from "react"
import Header from "@/components/Header"
import TabNavigation from "@/components/run-detail/TabNavigation"
import MetricsTable from "@/components/run-detail/MetricsTable"
import { MuscleLoadChart, JointForceChart, JointOveruseChart } from "@/components/run-detail/BiomechanicalCharts"
import BodyLoadVisualization from "@/components/run-detail/BodyLoadVisualization"
import KeyTakeawaysCard from "@/components/run-detail/KeyTakeawaysCard"
import GoalProgressCard from "@/components/run-detail/GoalProgressCard"
import RunComparisonChart from "@/components/run-detail/RunComparisonChart"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

const RunDetailV1: React.FC = () => {
  // Sample run data
  const runDate = "May 16, 2025"

  const performanceMetrics = [
    { label: "Distance", value: "5.2 km" },
    { label: "Duration", value: "00:28:15" },
    { label: "Average Pace", value: "5:25 min/km" },
    { label: "Average Cadence", value: "172 spm" },
    { label: "Calories Burned", value: "350 kcal" },
  ]

  const biomechanicalMetrics = [
    { label: "Avg. L. Hip Flexion", value: "22.5°" },
    { label: "Avg. R. Hip Flexion", value: "21.9°" },
    { label: "Avg. L. Hip Adduction", value: "-1.8°" },
    { label: "Avg. R. Hip Adduction", value: "-2.1°" },
    { label: "Avg. L. Knee Flexion (Stance)", value: "40.1°" },
    { label: "Avg. R. Knee Flexion (Stance)", value: "39.5°" },
    { label: "Avg. Pelvic List (Tilt)", value: "3.2°" },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header title={`Run: ${runDate}`} showBackButton={true} />

      <div className="container max-w-md mx-auto px-4 py-4 pb-20">
        <TabNavigation activeTab="summary" />

        <div className="mt-6">
          <KeyTakeawaysCard />
          <MetricsTable title="Overall Run Performance" metrics={performanceMetrics} />
          <GoalProgressCard />
          <RunComparisonChart />
          <BodyLoadVisualization />
          <MetricsTable title="Key Biomechanical Indicators (Run Averages)" metrics={biomechanicalMetrics} />
          <MuscleLoadChart />
          <JointForceChart />
          <JointOveruseChart />
        </div>
      </div>
      <MobileNavbar />
    </div>
  )
}

export default RunDetailV1
