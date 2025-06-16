import Header from "@/components/Header"
import LatestRunCard from "@/components/dashboard/LatestRunCard"
import UpcomingWorkoutCard from "@/components/dashboard/UpcomingWorkoutCard"
import InsightAlertCard from "@/components/dashboard/InsightAlertCard"
import SustainabilityScore from "@/components/dashboard/SustainabilityScore"
import BodyLoadButton from "@/components/dashboard/BodyLoadButton"
import DailyDigest from "@/components/dashboard/DailyDigest"
import BiomechanicalTrendCard from "@/components/dashboard/BiomechanicalTrendCard"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import GoalProgressCard from "@/components/dashboard/GoalProgressCard"
import WeeklyTrainingLoad from "@/components/dashboard/WeeklyTrainingLoad"
import NextRunFocus from "@/components/dashboard/NextRunFocus"
import RacePrediction from "@/components/dashboard/RacePrediction"
import WeatherAwareTraining from "@/components/dashboard/WeatherAwareTraining"
import MilestoneCard from "@/components/dashboard/MilestoneCard"
import CommunityComparison from "@/components/dashboard/CommunityComparison"

// V4: Enhanced LLM Summary of the Day - Single card at top with synthesized summary, biomechanical focus, and personalized insights

const HomeV4 = () => {
  type WeatherCondition  = "sunny" | "cloudy" | "rainy" | "windy";
type Suitability       = "ideal" | "good" | "fair" | "poor";

interface ForecastDay {
  day:           string;
  condition:     WeatherCondition;
  temperature:   number;
  humidity:      number;
  recommendation:string;
  suitability:   Suitability;
}

type MilestoneIcon = "trophy" | "star" | "award";

interface RecentMilestone {
  title: string;
  date:  string;
  icon:  MilestoneIcon;
}

type Trend      = "improved" | "declined" | "stable";
interface Prediction {
  distance:         string;
  time:             string;
  trend:            Trend;
  changePercentage?: number;
}


  const weatherForecast: ForecastDay[] = [
    {
      day: "Today",
      condition: "sunny",
      temperature: 22,
      humidity: 45,
      recommendation: "Ideal for tempo run. Hydrate well.",
      suitability: "ideal",
    },
    {
      day: "Tomorrow",
      condition: "cloudy",
      temperature: 18,
      humidity: 65,
      recommendation: "Good for long run. Moderate humidity.",
      suitability: "good",
    },
    {
      day: "Wednesday",
      condition: "rainy",
      temperature: 15,
      humidity: 85,
      recommendation: "Consider indoor workout or trail shoes.",
      suitability: "fair",
    },
  ]



const racePredictions: Prediction[] = [
    {
      distance: "5K",
      time: "22:15",
      trend: "improved",
      changePercentage: 2.2,
    },
    {
      distance: "10K",
      time: "46:30",
      trend: "improved",
      changePercentage: 1.8,
    },
    {
      distance: "Half Marathon",
      time: "1:43:20",
      trend: "improved",
      changePercentage: 3.5,
    },
  ]





  const recentMilestones: RecentMilestone[] = [
    {
      title: "First 10K Under 50 Minutes",
      date: "May 12, 2025",
      icon: "trophy",
    },
    {
      title: "30-Day Running Streak",
      date: "April 28, 2025",
      icon: "star",
    },
  ]

  const upcomingMilestone = {
    title: "Half Marathon Personal Best",
    progress: 75,
    target: "1:45:00",
    current: "1:48:30",
  }

  const communityMetrics = [
    {
      name: "Weekly Distance",
      yourValue: 32.5,
      communityAvg: 25.2,
      percentile: 78,
      unit: "km",
    },
    {
      name: "Cadence",
      yourValue: 172,
      communityAvg: 165,
      percentile: 65,
      unit: "spm",
    },
    {
      name: "5K Time",
      yourValue: "22:45",
      communityAvg: "25:30",
      percentile: 82,
    },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <div className="container max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-[#2d3748]">Coach's Briefing</h1>

        <DailyDigest
          summary="Good morning! Your sustainability score is looking good at 65%. We detected high forces in your right knee from yesterday's run – check the body map for details. Today's recommended focus is on recovery with light stretching. Your next workout is a tempo run tomorrow."
          biomechanicalInsight="Your knee valgus angle has improved by 21% since last week, showing good progress with your stability exercises. Continue with single-leg balance work to further improve knee tracking."
        />

        <NextRunFocus
          primaryFocus="Increase cadence"
          secondaryFocus="Maintain consistent foot strike"
          biomechanicalTarget="Cadence"
          targetValue="175-180 spm"
          currentValue="168 spm"
        />

        <div className="mt-5">
          <GoalProgressCard
            goalName="Half Marathon in Under 1h45m"
            targetValue="1:45:00"
            currentValue="1:53:20"
            progressPercentage={65}
            projectedImprovement={15}
            variant="accent"
          />
        </div>

        <div className="mt-5">
          <WeeklyTrainingLoad />
        </div>

        <div className="mt-5">
          <RacePrediction predictions={racePredictions} />
        </div>

        <h2 className="text-lg font-medium text-gray-700 mt-6 mb-4">Biomechanical Trends</h2>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <BiomechanicalTrendCard
            title="Knee Stability"
            metric="Valgus Angle"
            value={8.3}
            previousValue={10.5}
            unit="°"
            isPositive={false}
          />
          <BiomechanicalTrendCard
            title="Running Economy"
            metric="Vertical Oscillation"
            value={9.2}
            previousValue={10.0}
            unit="cm"
            isPositive={false}
          />
        </div>

        <div className="mt-5">
          <WeatherAwareTraining forecast={weatherForecast} />
        </div>

        <div className="mt-5">
          <MilestoneCard recentMilestones={recentMilestones} upcomingMilestone={upcomingMilestone} />
        </div>

        <div className="mt-5">
          <CommunityComparison metrics={communityMetrics} />
        </div>

        <h2 className="text-lg font-medium text-gray-700 mt-6 mb-4">Key Areas</h2>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <LatestRunCard date="May 16, 2025" distance={5.2} pace="5:30 min/km" cadence={172} loadLevel="High" />
          </div>
          <div>
            <UpcomingWorkoutCard name="Tempo Run" date="May 18, 2025" details="45 min · 8 km" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <SustainabilityScore score={65} interpretation="Moderate load" variant="compact" />
          </div>
          <div className="flex items-center justify-center">
            <BodyLoadButton />
          </div>
        </div>

        <InsightAlertCard
          type="warning"
          title="High Joint Force: Right Knee"
          summary="Your right knee experienced forces above your typical threshold during your last run."
        />
      </div>
      <MobileNavbar />
    </div>
  )
}

export default HomeV4
