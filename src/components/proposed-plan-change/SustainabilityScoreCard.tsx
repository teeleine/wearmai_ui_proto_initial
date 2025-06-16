import { Card } from "@/components/ui/card"
import { Battery, BatteryCharging, BatteryWarning } from "lucide-react"

interface SustainabilityScoreCardProps {
  originalScore: number // 0-100
  proposedScore: number // 0-100
}

const SustainabilityScoreCard = ({ originalScore, proposedScore }: SustainabilityScoreCardProps) => {
  const scoreDifference = proposedScore - originalScore
  const isImproved = scoreDifference > 0

  // Determine status based on score
  const getStatus = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "text-green-500", bg: "bg-green-100" }
    if (score >= 65) return { label: "Good", color: "text-blue-500", bg: "bg-blue-100" }
    if (score >= 50) return { label: "Moderate", color: "text-amber-500", bg: "bg-amber-100" }
    return { label: "At Risk", color: "text-red-500", bg: "bg-red-100" }
  }

  const originalStatus = getStatus(originalScore)
  const proposedStatus = getStatus(proposedScore)

  // Get appropriate icon
  const getIcon = (score: number) => {
    if (score >= 65) return BatteryCharging
    if (score >= 50) return Battery
    return BatteryWarning
  }

  const OriginalIcon = getIcon(originalScore)
  const ProposedIcon = getIcon(proposedScore)

  return (
    <Card className="p-4 mb-4">
      <h3 className="text-lg font-medium mb-3">Training Sustainability Score</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Original Plan</span>
            <OriginalIcon className={originalStatus.color} size={18} />
          </div>

          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold">{originalScore}</span>
            <span className="text-sm text-gray-500 mb-1">/100</span>
          </div>

          <span className={`text-xs px-2 py-1 rounded-full ${originalStatus.bg} ${originalStatus.color}`}>
            {originalStatus.label}
          </span>
        </div>

        <div className="p-3 rounded-lg border border-wearmai-primary bg-wearmai-light/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Proposed Plan</span>
            <ProposedIcon className={proposedStatus.color} size={18} />
          </div>

          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold">{proposedScore}</span>
            <span className="text-sm text-gray-500 mb-1">/100</span>
          </div>

          <span className={`text-xs px-2 py-1 rounded-full ${proposedStatus.bg} ${proposedStatus.color}`}>
            {proposedStatus.label}
          </span>
        </div>
      </div>

      <div
        className={`mt-4 p-2 rounded-md text-sm ${isImproved ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
      >
        {isImproved ? (
          <span>
            <span className="font-medium">+{scoreDifference} points</span> improvement in your sustainability score with
            the proposed plan.
          </span>
        ) : (
          <span>
            <span className="font-medium">{scoreDifference} points</span> change in your sustainability score. This may
            be necessary for long-term progress.
          </span>
        )}
      </div>
    </Card>
  )
}

export default SustainabilityScoreCard
