import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RecoveryActivitiesProps {
  activities: {
    name: string
    duration: string
    benefit: string
    priority: "high" | "medium" | "low"
  }[]
  compact?: boolean
}

const RecoveryActivities: React.FC<RecoveryActivitiesProps> = ({ activities = defaultActivities, compact = false }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-[#6131ca]"
      case "medium":
        return "bg-[#f9ca24]"
      case "low":
        return "bg-[#42b4f7]"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardHeader className={compact ? "pb-2 pt-3" : "pb-2 pt-4"}>
        <CardTitle className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center`}>
          <Heart size={16} className="mr-1.5 text-[#42b4f7]" />
          Recovery Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-3" : "pb-4"}>
        <div className="space-y-3">
          {activities.slice(0, compact ? 2 : 3).map((activity, index) => (
            <div key={index} className="flex items-start">
              <div
                className={`${getPriorityColor(activity.priority)} w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0`}
              />
              <div>
                <div className="text-sm font-medium text-gray-800">{activity.name}</div>
                <div className="text-xs text-gray-500">
                  {activity.duration} · {activity.benefit}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3 text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full"
        >
          View All Activities
          <ArrowRight size={14} className="ml-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

const defaultActivities = [
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
  {
    name: "Compression Socks",
    duration: "3 hours",
    benefit: "Improves circulation",
    priority: "medium",
  },
]

export default RecoveryActivities
