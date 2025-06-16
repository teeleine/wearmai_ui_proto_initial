import type React from "react"
import { MessageSquare } from "lucide-react"

interface RunListItemProps {
  date: string
  distance: number
  pace: string
  loadLevel: "High" | "Medium" | "Low"
  hasFeedback?: boolean
}

const RunListItem: React.FC<RunListItemProps> = ({ date, distance, pace, loadLevel, hasFeedback = true }) => {
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

  return (
    <div className="p-4 border-b border-gray-100 flex items-center">
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-800 mb-1">{date}</div>
        <div className="flex items-center">
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
  )
}

export default RunListItem
