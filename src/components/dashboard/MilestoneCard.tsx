import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MilestoneCardProps {
  recentMilestones: {
    title: string
    date: string
    icon: "trophy" | "star" | "award"
  }[]
  upcomingMilestone: {
    title: string
    progress: number
    target: string
    current: string
  }
  compact?: boolean
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({
  recentMilestones = defaultRecentMilestones,
  upcomingMilestone = defaultUpcomingMilestone,
  compact = false,
}) => {
  const getMilestoneIcon = (icon: string) => {
    switch (icon) {
      case "trophy":
        return <Trophy size={16} className="text-[#f9ca24]" />
      case "star":
        return <Star size={16} className="text-[#42b4f7]" />
      case "award":
        return <Award size={16} className="text-[#83c55b]" />
      default:
        return <Trophy size={16} className="text-[#f9ca24]" />
    }
  }

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardHeader className={compact ? "pb-2 pt-3" : "pb-2 pt-4"}>
        <CardTitle className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center`}>
          <Trophy size={16} className="mr-1.5 text-[#f9ca24]" />
          Milestones & Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-3" : "pb-4"}>
        {/* Recent milestones */}
        <div className="space-y-2 mb-4">
          {recentMilestones.slice(0, compact ? 1 : 2).map((milestone, index) => (
            <div key={index} className="flex items-center bg-gray-50 p-2 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
                {getMilestoneIcon(milestone.icon)}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">{milestone.title}</div>
                <div className="text-xs text-gray-500">{milestone.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming milestone */}
        <div className="bg-[#f0f7ff] p-3 rounded-lg mb-3">
          <div className="text-sm font-medium text-gray-800 mb-1">Next up: {upcomingMilestone.title}</div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Current: {upcomingMilestone.current}</span>
            <span>Target: {upcomingMilestone.target}</span>
          </div>
          <div className="w-full h-2 bg-white rounded-full overflow-hidden">
            <div className="h-full bg-[#42b4f7]" style={{ width: `${upcomingMilestone.progress}%` }}></div>
          </div>
          <div className="text-xs text-right mt-1 text-[#42b4f7] font-medium">
            {upcomingMilestone.progress}% complete
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full"
        >
          View All Achievements
          <ArrowRight size={14} className="ml-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

const defaultRecentMilestones = [
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
  {
    title: "100 Miles This Month",
    date: "April 25, 2025",
    icon: "award",
  },
]

const defaultUpcomingMilestone = {
  title: "Half Marathon Personal Best",
  progress: 75,
  target: "1:45:00",
  current: "1:48:30",
}

export default MilestoneCard
