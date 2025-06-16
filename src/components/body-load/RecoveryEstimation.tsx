import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

interface RecoveryEstimationProps {
  dataType: "muscle-load" | "joint-force" | "soreness"
  regions: string[]
}

const RecoveryEstimation: React.FC<RecoveryEstimationProps> = ({ dataType, regions }) => {
  // Mock data - in real app, this would be calculated based on actual sensor data
  const getRecoveryHours = (region: string): number => {
    if (region === "Left Quadriceps") return 36
    if (region === "Right Knee") return 24
    if (region === "Right Quadriceps") return 18
    return 12
  }

  const getRecoveryProgress = (region: string): number => {
    if (region === "Left Quadriceps") return 15
    if (region === "Right Knee") return 30
    if (region === "Right Quadriceps") return 40
    return 60
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Recovery Time Estimates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-xs text-muted-foreground mb-2">
          Estimated time until full recovery based on {dataType.replace("-", " ")} readings
        </div>

        {regions.map((region, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">{region}</span>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                <span className="text-xs">{getRecoveryHours(region)} hours left</span>
              </div>
            </div>
            <Progress value={getRecoveryProgress(region)} className="h-2" />
            <p className="text-xs text-muted-foreground">{getRecoveryProgress(region)}% recovered</p>
          </div>
        ))}

        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs">
            For optimal recovery, we recommend limiting training intensity for{" "}
            {dataType === "muscle-load" ? "quadriceps" : dataType === "joint-force" ? "knee joints" : "sore areas"} in
            your next session.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default RecoveryEstimation
