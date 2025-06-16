import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Wind } from "lucide-react"

interface WeatherAwareTrainingProps {
  forecast: {
    day: string
    condition: "sunny" | "cloudy" | "rainy" | "windy"
    temperature: number
    humidity: number
    recommendation: string
    suitability: "ideal" | "good" | "fair" | "poor"
  }[]
  compact?: boolean
}

const WeatherAwareTraining: React.FC<WeatherAwareTrainingProps> = ({ forecast = defaultForecast, compact = false }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun size={16} className="text-[#f9ca24]" />
      case "cloudy":
        return <Cloud size={16} className="text-[#9CA3AF]" />
      case "rainy":
        return <CloudRain size={16} className="text-[#42b4f7]" />
      case "windy":
        return <Wind size={16} className="text-[#9CA3AF]" />
      default:
        return <Sun size={16} className="text-[#f9ca24]" />
    }
  }

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case "ideal":
        return "bg-[#83c55b]"
      case "good":
        return "bg-[#42b4f7]"
      case "fair":
        return "bg-[#f9ca24]"
      case "poor":
        return "bg-[#6131ca]"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardHeader className={compact ? "pb-2 pt-3" : "pb-2 pt-4"}>
        <CardTitle className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center`}>
          <Cloud size={16} className="mr-1.5 text-[#42b4f7]" />
          Weather-Aware Training
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-3" : "pb-4"}>
        <div className="space-y-3">
          {forecast.slice(0, compact ? 2 : 3).map((day, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-1.5 h-10 rounded-full ${getSuitabilityColor(day.suitability)} mr-2`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm text-gray-800">{day.day}</div>
                  <div className="flex items-center">
                    {getWeatherIcon(day.condition)}
                    <span className="text-xs ml-1 text-gray-600">{day.temperature}°C</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-0.5">{day.recommendation}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const defaultForecast = [
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
  {
    day: "Thursday",
    condition: "windy",
    temperature: 17,
    humidity: 55,
    recommendation: "Headwind training opportunity.",
    suitability: "good",
  },
]

export default WeatherAwareTraining
