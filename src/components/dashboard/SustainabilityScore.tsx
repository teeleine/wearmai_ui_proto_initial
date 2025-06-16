import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SustainabilityScoreProps {
  score: number // 0-100
  interpretation: string
  variant?: "default" | "compact" | "prominent"
}

const SustainabilityScore: React.FC<SustainabilityScoreProps> = ({ score, interpretation, variant = "default" }) => {
  // Update the getScoreColor function to use the new color scheme
  const getScoreColor = () => {
    if (score >= 70) return "text-[#42b4f7]"
    if (score >= 40) return "text-[#f9ca24]"
    return "text-[#6131ca]"
  }

  // Update the getScoreBackground function to use the new color scheme
  const getScoreBackground = () => {
    if (score >= 70) return "from-[#e3f7ff] to-[#f0faff]"
    if (score >= 40) return "from-[#fff4e8] to-[#fff9f0]"
    return "from-[#f0e8ff] to-[#f5f0ff]"
  }

  const getScoreSize = () => {
    if (variant === "prominent") return "text-4xl"
    if (variant === "compact") return "text-2xl"
    return "text-3xl"
  }

  // Replace the renderPieChart function with this improved version
  const renderPieChart = () => {
    return (
      <div className="relative w-16 h-16 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#e6e6e6" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r="15.91549430918954"
            fill="transparent"
            stroke={score >= 70 ? "#42b4f7" : score >= 40 ? "#f9ca24" : "#6131ca"}
            strokeWidth="3"
            strokeDasharray={`${score} ${100 - score}`}
            strokeDashoffset="25"
            className="transform -rotate-90 origin-center"
          />
          <text
            x="18"
            y="18"
            className="font-bold"
            textAnchor="middle"
            dominantBaseline="central"
            fill={score >= 70 ? "#42b4f7" : score >= 40 ? "#f9ca24" : "#6131ca"}
            fontSize="8"
          >
            {score}%
          </text>
        </svg>
      </div>
    )
  }

  return (
    <Card
      className={`shadow-sm border border-gray-100 rounded-xl h-full ${variant === "prominent" ? "bg-gradient-to-br " + getScoreBackground() : "bg-white"}`}
    >
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700">Training Sustainability</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-col items-center h-full">
          {variant === "default" ? (
            <>
              <div className={`font-bold ${getScoreSize()} ${getScoreColor()} mb-2`}>{score}%</div>
              <div className="w-full h-2 bg-gray-100 rounded-full mb-3 overflow-hidden">
                {/* Update the color in the default variant display */}
                <div
                  className={`h-full rounded-full ${score >= 70 ? "bg-[#42b4f7]" : score >= 40 ? "bg-[#f9ca24]" : "bg-[#6131ca]"}`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </>
          ) : (
            renderPieChart()
          )}

          <p className="text-sm text-center text-gray-600 mt-2">{interpretation}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default SustainabilityScore