import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SideBySideComparisonProps {
  dataType: "muscle-load" | "joint-force" | "soreness"
}

const SideBySideComparison: React.FC<SideBySideComparisonProps> = ({ dataType }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-1">
        <CardTitle className="text-xs">Left/Right Comparison</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex space-x-3">
          <div className="w-1/2 bg-gray-50 rounded-lg p-2">
            <p className="text-xs font-medium text-center border-b pb-1 mb-2">Left Side</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Quad Load</span>
                <span className="font-semibold text-red-500">High (78%)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Knee Force</span>
                <span className="font-semibold text-amber-500">Med (60%)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Ankle Load</span>
                <span className="font-semibold text-green-500">Low (35%)</span>
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-gray-50 rounded-lg p-2">
            <p className="text-xs font-medium text-center border-b pb-1 mb-2">Right Side</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Quad Load</span>
                <span className="font-semibold text-amber-500">Med (58%)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Knee Force</span>
                <span className="font-semibold text-amber-500">Med (55%)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Ankle Load</span>
                <span className="font-semibold text-green-500">Low (38%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100">
          <p className="text-xs text-center text-muted-foreground">
            Your left side is bearing 15% more {dataType.replace("-", " ")} than your right side
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default SideBySideComparison
