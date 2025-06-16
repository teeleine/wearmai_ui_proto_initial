import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"

interface GoalImpactMeterProps {
  originalImpact: number // 0-100
  proposedImpact: number // 0-100
  goalName: string
}

const GoalImpactMeter = ({ originalImpact, proposedImpact, goalName }: GoalImpactMeterProps) => {
  const difference = proposedImpact - originalImpact
  const isPositive = difference > 0

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center mb-3">
        <Sparkles className="text-yellow-500 mr-2" size={20} />
        <h3 className="text-lg font-medium">Impact on {goalName} Goal</h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Original Plan</span>
            <span className="text-sm font-medium">{originalImpact}%</span>
          </div>
          <Progress value={originalImpact} className="h-3" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Proposed Plan</span>
            <span className="text-sm font-medium">{proposedImpact}%</span>
          </div>
          <Progress
            value={proposedImpact}
            className={isPositive ? "bg-green-500 h-3" : "bg-amber-500 h-3"}
          />
        </div>

        <div
          className={`text-sm p-2 rounded-md ${isPositive ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
        >
          {isPositive ? (
            <span>
              <span className="font-medium">+{difference}%</span> improvement toward your {goalName} goal with the
              proposed plan.
            </span>
          ) : (
            <span>
              <span className="font-medium">{difference}%</span> change in progress toward your {goalName} goal. This
              adjustment prioritizes recovery.
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

export default GoalImpactMeter
