import Header from "@/components/Header"
import LatestRunCard from "@/components/dashboard/LatestRunCard"
import UpcomingWorkoutCard from "@/components/dashboard/UpcomingWorkoutCard"
import InsightAlertCard from "@/components/dashboard/InsightAlertCard"
import SustainabilityScore from "@/components/dashboard/SustainabilityScore"
import { FeedItem } from "@/components/dashboard/FeedItem"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import BiomechanicalFeedItem from "@/components/dashboard/BiomechanicalFeedItem"
import EnhancedBodyLoadCard from "@/components/dashboard/EnhancedBodyLoadCard"
import GoalProgressCard from "@/components/dashboard/GoalProgressCard"
import NextRunFocus from "@/components/dashboard/NextRunFocus"
import RacePrediction from "@/components/dashboard/RacePrediction"
import WeatherAwareTraining from "@/components/dashboard/WeatherAwareTraining"
import StreakVisualizer from "@/components/dashboard/StreakVisualizer"
import GearRotationCard from "@/components/dashboard/GearRotationCard"

// V2: Enhanced Feed Layout - Chronological feed of insights, alerts, and summaries with biomechanical focus

const HomeV2 = () => {
   type WeatherCondition  = "sunny" | "cloudy" | "rainy" | "windy";
type Suitability       = "ideal" | "good" | "fair" | "poor";


type Trend     = "improved" | "declined" | "stable";

// 1b) Re‑declare the shape of each item
interface Prediction {
  distance:         string;
  time:             string;
  trend:            Trend;
  changePercentage?: number;
}




interface ForecastDay {
  day:           string;
  condition:     WeatherCondition;
  temperature:   number;
  humidity:      number;
  recommendation:string;
  suitability:   Suitability;
}

type ShoeStatus = "primary" | "rotation" | "recovery" | "replace";

// 1b) Re‑declare each shoe’s interface
interface Shoe {
  name:          string;
  distance:      number;
  totalDistance: number;
  maxDistance:   number;
  lastUsed:      string;
  status:        ShoeStatus;
}

  const weatherForecast: ForecastDay[]  = [
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
  ]

  const shoes: Shoe[] = [
    {
      name: "Nike Pegasus 39",
      distance: 5.2,
      totalDistance: 320,
      maxDistance: 500,
      lastUsed: "Today",
      status: "primary",
    },
    {
      name: "Hoka Clifton 8",
      distance: 0,
      totalDistance: 180,
      maxDistance: 500,
      lastUsed: "3 days ago",
      status: "rotation",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <div className="container max-w-md mx-auto px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-6 text-[#2d3748]">Activity Feed</h1>

        <div className="space-y-5">
          <FeedItem timestamp="Today · 11:30 AM" type="insight">
            <NextRunFocus
              primaryFocus="Increase cadence"
              secondaryFocus="Maintain consistent foot strike"
              biomechanicalTarget="Cadence"
              targetValue="175-180 spm"
              currentValue="168 spm"
              compact={true}
            />
          </FeedItem>

          <FeedItem timestamp="Today · 10:30 AM" type="alert">
            <InsightAlertCard
              type="warning"
              title="Coach Alert: Right Knee Overuse Potential"
              summary="Your right knee experienced forces above your typical threshold during your last run. Consider reviewing your form or footwear."
            />
          </FeedItem>

          <FeedItem timestamp="Today · 09:45 AM" type="biomechanics">
            <BiomechanicalFeedItem title="Knee Valgus Angle" value="8.3°" change={-21} isPositive={false} />
          </FeedItem>

          <FeedItem timestamp="Today · 09:15 AM" type="biomechanics">
            <BiomechanicalFeedItem title="Ground Contact Time" value="245ms" change={5} isPositive={true} />
          </FeedItem>

          <FeedItem timestamp="Today · 08:45 AM" type="insight">
            <RacePrediction compact={true} predictions={racePredictions} />
          </FeedItem>

          <FeedItem timestamp="Today · 08:15 AM" type="sustainability">
            <div className="py-2 px-4 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center text-sm">
              <div className="w-2 h-2 bg-[#42b4f7] rounded-full mr-3"></div>
              <span className="text-gray-700">Your sustainability score has improved by 5% this week</span>
            </div>
          </FeedItem>

          <FeedItem timestamp="Today · 07:45 AM" type="run">
            <LatestRunCard date="May 16, 2025" distance={5.2} pace="5:30 min/km" cadence={172} loadLevel="High" />
          </FeedItem>

          <FeedItem timestamp="Yesterday · 6:00 PM" type="insight">
            <WeatherAwareTraining compact={true} forecast={weatherForecast} />
          </FeedItem>

          <FeedItem timestamp="Yesterday · 4:30 PM" type="biomechanics">
            <EnhancedBodyLoadCard compact={true} />
          </FeedItem>

          <FeedItem timestamp="Yesterday · 3:15 PM" type="recommendation">
            <div className="py-2 px-4 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center text-sm">
              <div className="w-2 h-2 bg-[#42b4f7] rounded-full mr-3"></div>
              <span className="text-gray-700">
                New drill recommended: Single-leg balance (3x30s) for knee stability
              </span>
            </div>
          </FeedItem>

          <FeedItem timestamp="Yesterday · 2:30 PM" type="gear">
            <GearRotationCard compact={true} shoes={shoes} />
          </FeedItem>

          <FeedItem timestamp="Yesterday · 2:00 PM" type="insight">
            <InsightAlertCard
              type="insight"
              title="Muscle Overload Pattern: Hamstrings"
              summary="Your hamstrings are consistently showing higher than normal load. Consider adding specific recovery stretches."
            />
          </FeedItem>

          <FeedItem timestamp="Yesterday · 12:30 PM" type="streak">
            <StreakVisualizer
              compact={true}
              currentStreak={4}
              longestStreak={12}
              lastWeek={[true, true, false, true, true, false, true]}
            />
          </FeedItem>

          <FeedItem timestamp="Yesterday · 10:30 AM" type="workout">
            <UpcomingWorkoutCard
              name="Tempo Run"
              date="May 18, 2025"
              details="45 min · 8 km · Focus on maintaining steady pace"
            />
          </FeedItem>

          <FeedItem timestamp="Yesterday · 9:00 AM" type="sustainability">
            <SustainabilityScore
              score={65}
              interpretation="Your current training load is moderate. Recovery is keeping pace with stress."
              variant="compact"
            />
          </FeedItem>

          <FeedItem timestamp="Yesterday · 8:00 AM" type="goal">
            <GoalProgressCard
              goalName="Half Marathon in Under 1h45m"
              targetValue="1:45:00"
              currentValue="1:53:20"
              progressPercentage={65}
              projectedImprovement={15}
              compact={true}
              variant="minimal"
            />
          </FeedItem>
        </div>
      </div>
      <MobileNavbar />
    </div>
  )
}

export default HomeV2
