import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChart } from "lucide-react"

const RootCauseAnalysis: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Root Cause Analysis</h3>
          <div className="flex items-center">
            <PieChart className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">AI-powered assessment</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Right Glute Weakness</span>
              <span className="font-medium">85% likelihood</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Running Surface (Cambered Road)</span>
              <span className="font-medium">62% likelihood</span>
            </div>
            <Progress value={62} className="h-2" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Left Leg Dominance</span>
              <span className="font-medium">58% likelihood</span>
            </div>
            <Progress value={58} className="h-2" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Footwear Imbalance</span>
              <span className="font-medium">40% likelihood</span>
            </div>
            <Progress value={40} className="h-2" />
          </div>
        </div>

        <div className="p-3 bg-blue-50 rounded-md">
          <p className="text-xs font-medium text-blue-800">Primary Recommendation:</p>
          <p className="text-xs text-blue-700 mt-1">
            Focus on right-side glute strengthening exercises 2-3x weekly. Vary running routes to avoid consistently
            running on the same side of cambered roads.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default RootCauseAnalysis
