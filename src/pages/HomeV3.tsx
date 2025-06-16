import Header from "@/components/Header"
import LatestRunCard from "@/components/dashboard/LatestRunCard"
import UpcomingWorkoutCard from "@/components/dashboard/UpcomingWorkoutCard"
import InsightAlertCard from "@/components/dashboard/InsightAlertCard"
import SustainabilityScore from "@/components/dashboard/SustainabilityScore"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import BiomechanicalStatsGrid from "@/components/dashboard/BiomechanicalStatsGrid"
import EnhancedBodyLoadCard from "@/components/dashboard/EnhancedBodyLoadCard"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import GoalProjectionChart from "@/components/dashboard/GoalProjectionChart"
import TrainingReadinessScore from "@/components/dashboard/TrainingReadinessScore"
import EffortBenefitMatrix from "@/components/dashboard/EffortBenefitMatrix"
import PacingStrategyCard from "@/components/dashboard/PacingStrategyCard"
import FormImprovementVisual from "@/components/dashboard/FormImprovementVisual"

// V3: Enhanced Dashboard with Prominent Body Load Snapshot, Training Readiness, and Effort-Benefit Analysis

const HomeV3 = () => {
  const biomechanicalStats = [
    { label: "Knee Valgus Angle", value: "8.3°", change: -21 },
    { label: "Ground Contact Time", value: "245ms", change: 5 },
    { label: "Vertical Oscillation", value: "9.2cm", change: -8 },
    { label: "Pronation Angle", value: "12.5°", change: 3 },
  ]

  const workouts = [
    {
      name: "Tempo Run",
      effortLevel: 7,
      benefitLevel: 8,
      duration: "45 min",
      focus: "Lactate threshold",
    },
    {
      name: "Long Run",
      effortLevel: 6,
      benefitLevel: 9,
      duration: "90 min",
      focus: "Endurance",
    },
    {
      name: "Hill Repeats",
      effortLevel: 9,
      benefitLevel: 7,
      duration: "40 min",
      focus: "Strength",
    },
    {
      name: "Recovery Run",
      effortLevel: 3,
      benefitLevel: 4,
      duration: "30 min",
      focus: "Active recovery",
    },
  ]

  const pacingSplits = [
    { km: 1, pace: "4:50", effort: 5 },
    { km: 2, pace: "4:50", effort: 5 },
    { km: 3, pace: "4:48", effort: 6 },
    { km: 4, pace: "4:48", effort: 6 },
    { km: 5, pace: "4:45", effort: 7 },
    { km: 6, pace: "4:45", effort: 7 },
    { km: 7, pace: "4:42", effort: 8 },
    { km: 8, pace: "4:40", effort: 8 },
    { km: 9, pace: "4:35", effort: 9 },
    { km: 10, pace: "4:30", effort: 10 },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <div className="container max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-[#2d3748]">Training Dashboard</h1>

        <TrainingReadinessScore score={78} sleepQuality={85} recovery={72} nutrition={80} stress={65} />

        <div className="mt-5">
          <EnhancedBodyLoadCard />
        </div>

        <GoalProjectionChart
          goalName="Half Marathon in Under 1h45m"
          targetValue="1:45:00"
          currentValue="1:53:20"
          startingValue="1:58:45"
          progressPercentage={65}
          projectedImprovement={15}
          timeRemaining="8 weeks"
        />

        <div className="mt-5">
          <EffortBenefitMatrix workouts={workouts} />
        </div>

        <Card className="border border-gray-100 rounded-xl mb-5 mt-5 overflow-hidden">
          <CardHeader className="pb-2 pt-4">
            <h2 className="text-base font-medium text-gray-700">Biomechanical Metrics</h2>
          </CardHeader>
          <CardContent className="pb-4">
            <BiomechanicalStatsGrid stats={biomechanicalStats} />
          </CardContent>
        </Card>

        <div className="mt-5">
          <FormImprovementVisual
            metric="Knee Valgus Angle"
            beforeValue="12.5°"
            afterValue="8.3°"
            improvementPercentage={34}
          />
        </div>

        <div className="mt-5">
          <PacingStrategyCard distance="10K" targetTime="48:30" splits={pacingSplits} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5 mt-5">
          <div className="h-full">
            <div>
              <SustainabilityScore score={65} interpretation="Moderate training load" variant="compact" />
            </div>
          </div>
          <div className="h-full">
            <div>
              <InsightAlertCard
                type="warning"
                title="High Joint Force: Right Knee"
                summary="Joint forces above threshold"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="h-full">
            <LatestRunCard date="May 16, 2025" distance={5.2} pace="5:30 min/km" cadence={172} loadLevel="High" />
          </div>
          <div className="h-full">
            <UpcomingWorkoutCard name="Tempo Run" date="May 18, 2025" details="45 min · 8 km" />
          </div>
        </div>
      </div>
      <MobileNavbar />
    </div>
  )
}

export default HomeV3
