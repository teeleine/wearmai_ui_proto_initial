import type React from "react"
import { MessageSquare } from "lucide-react"

interface RunListItemWithGraphProps {
  date: string
  distance: number
  pace: string
  loadLevel: "High" | "Medium" | "Low"
  hasFeedback?: boolean
}

const RunListItemWithGraph: React.FC<RunListItemWithGraphProps> = ({
  date,
  distance,
  pace,
  loadLevel,
  hasFeedback = true,
}) => {
  const getLoadColor = () => {
    switch (loadLevel) {
      case "High":
        return "bg-[#6131ca]"
      case "Medium":
        return "bg-[#f9ca24]"
      case "Low":
        return "bg-[#83c55b]"
      default:
        return "bg-gray-300"
    }
  }

  // Generate a simple sparkline pattern based on the loadLevel
  const generateSparklinePoints = () => {
    const height = 20
    const width = 60
    const points = []

    // Create different patterns based on load level
    if (loadLevel === "High") {
      points.push(`0,${height / 2}`)
      points.push(`${width * 0.2},${height * 0.3}`)
      points.push(`${width * 0.4},${height * 0.7}`)
      points.push(`${width * 0.6},${height * 0.2}`)
      points.push(`${width * 0.8},${height * 0.5}`)
      points.push(`${width},${height * 0.1}`)
    } else if (loadLevel === "Medium") {
      points.push(`0,${height * 0.5}`)
      points.push(`${width * 0.2},${height * 0.4}`)
      points.push(`${width * 0.4},${height * 0.6}`)
      points.push(`${width * 0.6},${height * 0.5}`)
      points.push(`${width * 0.8},${height * 0.4}`)
      points.push(`${width},${height * 0.5}`)
    } else {
      points.push(`0,${height * 0.7}`)
      points.push(`${width * 0.2},${height * 0.6}`)
      points.push(`${width * 0.4},${height * 0.5}`)
      points.push(`${width * 0.6},${height * 0.6}`)
      points.push(`${width * 0.8},${height * 0.5}`)
      points.push(`${width},${height * 0.7}`)
    }

    return points.join(" ")
  }

  const getSparklineColor = () => {
    switch (loadLevel) {
      case "High":
        return "#6131ca"
      case "Medium":
        return "#f9ca24"
      case "Low":
        return "#83c55b"
      default:
        return "#cccccc"
    }
  }

  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-center mb-2">
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-800">{date}</div>
          <div className="flex items-center mt-1">
            <span className="text-sm text-gray-600 mr-4">{distance} km</span>
            <span className="text-sm text-gray-600">Avg. Pace: {pace}</span>
          </div>
        </div>
        <div className="flex items-center">
          {hasFeedback && (
            <div className="mr-3">
              <MessageSquare size={18} className="text-[#42b4f7]" />
            </div>
          )}
          <div className={`w-3 h-3 rounded-full ${getLoadColor()}`}></div>
        </div>
      </div>

      <div className="mt-2 bg-gray-50 p-2 rounded-md">
        <div className="flex items-center">
          <div className="w-[60px] h-[20px] mr-2">
            <svg width="60" height="20" viewBox="0 0 60 20">
              <polyline fill="none" stroke={getSparklineColor()} strokeWidth="1.5" points={generateSparklinePoints()} />
            </svg>
          </div>
          <span className="text-xs text-gray-500">Overall Load / Pace Trend</span>
        </div>
      </div>
    </div>
  )
}

export default RunListItemWithGraph
