import Header from "@/components/Header"
import LatestRunCard from "@/components/dashboard/LatestRunCard"
import UpcomingWorkoutCard from "@/components/dashboard/UpcomingWorkoutCard"
import InsightAlertCard from "@/components/dashboard/InsightAlertCard"
import SustainabilityScore from "@/components/dashboard/SustainabilityScore"
import MobileNavBar from "@/components/dashboard/MobileNavBar"
import BiomechanicalSummaryCard from "@/components/dashboard/BiomechanicalSummaryCard"
import EnhancedBodyLoadCard from "@/components/dashboard/EnhancedBodyLoadCard"
import BiomechanicalTrendCard from "@/components/dashboard/BiomechanicalTrendCard"
import GoalProgressCard from "@/components/dashboard/GoalProgressCard"
import NextRunFocus from "@/components/dashboard/NextRunFocus"
import FormImprovementVisual from "@/components/dashboard/FormImprovementVisual"
import WeeklyTrainingLoad from "@/components/dashboard/WeeklyTrainingLoad"
import TrainingReadinessScore from "@/components/dashboard/TrainingReadinessScore"
import RecoveryActivities from "@/components/dashboard/RecoveryActivities"

// V1: Enhanced Card Layout - Stacked cards with biomechanical focus and actionable insights

const HomeV1 = () => {

type Priority  = "high" | "medium" | "low";

interface Activity {
  name:     string;
  duration: string;
  benefit:  string;
  priority: Priority;
}
  const recoveryActivities: Activity[] = [
    {
      name: "Foam Rolling: Calves & Hamstrings",
      duration: "10 min",
      benefit: "Reduces muscle tension",
      priority: "high",
    },
    {
      name: "Gentle Yoga Flow",
      duration: "15 min",
      benefit: "Improves mobility",
      priority: "medium",
    },
    {
      name: "Contrast Bath Therapy",
      duration: "10 min",
      benefit: "Reduces inflammation",
      priority: "low",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <div className="container max-w-md mx-auto px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-6 text-[#2d3748]">Dashboard</h1>

        <div className="space-y-5">
          <TrainingReadinessScore score={78} sleepQuality={85} recovery={72} nutrition={80} stress={65} />

          <GoalProgressCard
            goalName="Half Marathon in Under 1h45m"
            targetValue="1:45:00"
            currentValue="1:53:20"
            progressPercentage={65}
            projectedImprovement={15}
          />

          <NextRunFocus
            primaryFocus="Increase cadence"
            secondaryFocus="Maintain consistent foot strike"
            biomechanicalTarget="Cadence"
            targetValue="175-180 spm"
            currentValue="168 spm"
          />

          <BiomechanicalSummaryCard
            title="Biomechanical Insights"
            insights={[
              { text: "Your right knee is experiencing 92% higher forces than your baseline.", severity: "high" },
              { text: "Hamstring imbalance detected - left side 23% weaker than right.", severity: "medium" },
              { text: "Foot strike pattern has improved by 15% since last week.", severity: "low" },
            ]}
          />

          <FormImprovementVisual
            metric="Knee Valgus Angle"
            beforeValue="12.5°"
            afterValue="8.3°"
            improvementPercentage={34}
          />

          <LatestRunCard date="May 16, 2025" distance={5.2} pace="5:30 min/km" cadence={172} loadLevel="High" />

          <WeeklyTrainingLoad />

          <EnhancedBodyLoadCard />

          <div className="grid grid-cols-1 gap-5 mb-5">
            <BiomechanicalTrendCard
              title="Knee Stability"
              metric="Knee Valgus Angle"
              value={8.3}
              previousValue={10.5}
              unit="°"
              isPositive={false}
            />
          </div>

          <UpcomingWorkoutCard
            name="Tempo Run"
            date="May 18, 2025 · 7:00 AM"
            details="45 min · 8 km · Focus on maintaining steady pace"
          />

          <InsightAlertCard
            type="warning"
            title="High Joint Force: Right Knee"
            summary="Your right knee experienced forces above your typical threshold during your last run. Consider reviewing your form or footwear."
          />

          <RecoveryActivities activities={recoveryActivities} />

          <SustainabilityScore
            score={65}
            interpretation="Your current training load is moderate. Recovery is keeping pace with stress."
          />
        </div>
      </div>
      <MobileNavBar />
    </div>
  )
}

export default HomeV1
