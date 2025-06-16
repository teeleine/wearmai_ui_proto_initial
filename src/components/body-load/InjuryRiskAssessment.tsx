import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Zap, Shield, ArrowRight } from "lucide-react"

interface InjuryRiskAssessmentProps {
  dataType: "muscle-load" | "joint-force" | "soreness"
}

const InjuryRiskAssessment: React.FC<InjuryRiskAssessmentProps> = ({ dataType }) => {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
              <span className="text-sm font-medium">Injury Risk Assessment</span>
            </div>
            <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Moderate</span>
          </div>

          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-[60%] bg-gradient-to-r from-green-500 via-amber-500 to-red-500 rounded-full"></div>
            <div className="absolute left-[60%] top-0 h-4 w-1 bg-black rounded-full -translate-y-1"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 border rounded-md">
            <div className="flex items-center mb-1">
              <Zap className="h-3.5 w-3.5 mr-1 text-red-500" />
              <span className="text-xs font-medium">Acute Risk</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {dataType === "muscle-load"
                ? "Left quadriceps muscle fatigue could lead to compensatory patterns"
                : dataType === "joint-force"
                  ? "Elevated left knee forces increase short-term risk"
                  : "Reported soreness indicates tissue stress"}
            </p>
          </div>

          <div className="p-3 border rounded-md">
            <div className="flex items-center mb-1">
              <Shield className="h-3.5 w-3.5 mr-1 text-amber-500" />
              <span className="text-xs font-medium">Chronic Risk</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Consistent asymmetry may contribute to long-term issues if not addressed
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-start space-x-2">
            <ArrowRight className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs">
              Based on your {dataType.replace("-", " ")} profile, we recommend focusing on single-leg exercises and
              gradually increasing training volume over the next week.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InjuryRiskAssessment
