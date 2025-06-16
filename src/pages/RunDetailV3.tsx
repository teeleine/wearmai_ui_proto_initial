import type React from "react"
import Header from "@/components/Header"
import TabNavigation from "@/components/run-detail/TabNavigation"
import ExpandableSection from "@/components/run-detail/ExpandableSection"
import { MuscleLoadChart, JointForceChart, JointOveruseChart } from "@/components/run-detail/BiomechanicalCharts"
import BodyLoadVisualization from "@/components/run-detail/BodyLoadVisualization"
import KeyTakeawaysCard from "@/components/run-detail/KeyTakeawaysCard"
import GoalProgressCard from "@/components/run-detail/GoalProgressCard"
import RunComparisonChart from "@/components/run-detail/RunComparisonChart"
import EfficiencyScoreCard from "@/components/run-detail/EfficiencyScoreCard"
import RecoveryRecommendationCard from "@/components/run-detail/RecoveryRecommendationCard"
import FormConsistencyCard from "@/components/run-detail/FormConsistencyCard"
import { Map, Clock, Gauge, Footprints, Flame, Activity } from "lucide-react"
import MetricCard from "@/components/run-detail/MetricCard"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

const RunDetailV3: React.FC = () => {
  // Sample run date
  const runDate = "May 16, 2025"

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header title={`Run: ${runDate}`} showBackButton={true} />

      <div className="container max-w-md mx-auto px-4 py-4 pb-20">
        <TabNavigation activeTab="summary" />

        <div className="mt-6">
          <KeyTakeawaysCard />

          <ExpandableSection title="Overall Run Performance" defaultExpanded={true}>
            <div className="grid grid-cols-2 gap-3">
              <MetricCard icon={Map} label="Distance" value="5.2 km" />
              <MetricCard icon={Clock} label="Duration" value="00:28:15" />
              <MetricCard icon={Gauge} label="Average Pace" value="5:25 min/km" />
              <MetricCard icon={Footprints} label="Average Cadence" value="172 spm" />
              <MetricCard icon={Flame} label="Calories Burned" value="350 kcal" />
            </div>
          </ExpandableSection>

          <ExpandableSection title="Goal Progress & Comparison" defaultExpanded={true}>
            <GoalProgressCard />
            <RunComparisonChart />
          </ExpandableSection>

          <ExpandableSection title="Running Efficiency & Form" defaultExpanded={true}>
            <EfficiencyScoreCard />
            <FormConsistencyCard />
          </ExpandableSection>

          <ExpandableSection title="3D Body Load Visualization" defaultExpanded={true}>
            <BodyLoadVisualization />
          </ExpandableSection>

          <ExpandableSection title="Key Biomechanical Indicators">
            <div className="grid grid-cols-2 gap-3">
              <MetricCard icon={Activity} label="Avg. L. Hip Flexion" value="22.5°" />
              <MetricCard icon={Activity} label="Avg. R. Hip Flexion" value="21.9°" />
              <MetricCard icon={Activity} label="Avg. L. Hip Adduction" value="-1.8°" />
              <MetricCard icon={Activity} label="Avg. R. Hip Adduction" value="-2.1°" />
              <MetricCard icon={Activity} label="Avg. L. Knee Flexion" value="40.1°" />
              <MetricCard icon={Activity} label="Avg. R. Knee Flexion" value="39.5°" />
              <MetricCard icon={Activity} label="Avg. Pelvic List" value="3.2°" />
            </div>
          </ExpandableSection>

          <ExpandableSection title="Muscle Load Analysis">
            <MuscleLoadChart />
          </ExpandableSection>

          <ExpandableSection title="Joint Force Analysis">
            <JointForceChart />
          </ExpandableSection>

          <ExpandableSection title="Joint Overuse Risk">
            <JointOveruseChart />
          </ExpandableSection>

          <ExpandableSection title="Recovery Recommendations" defaultExpanded={true}>
            <RecoveryRecommendationCard />
          </ExpandableSection>
        </div>
      </div>
      <MobileNavbar />
    </div>
  )
}

export default RunDetailV3
