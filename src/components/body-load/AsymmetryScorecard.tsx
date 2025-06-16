import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

const AsymmetryScorecard: React.FC = () => {
  return (
    <Card className="w-full bg-gradient-to-r from-amber-50 to-red-50 border-amber-200">
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <div className="text-center mb-2">
            <span className="text-xs text-amber-800 font-medium">Asymmetry Alert</span>
            <h3 className="text-xl font-bold text-amber-900">
              68<span className="text-sm">/100</span>
            </h3>
            <p className="text-xs text-amber-800">Balance Score</p>
          </div>

          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-3">
            <div className="h-full w-[68%] bg-gradient-to-r from-red-500 to-amber-500 rounded-full relative">
              <div className="absolute right-0 top-0 h-full w-5 bg-amber-300 animate-pulse"></div>
            </div>
          </div>

          <p className="text-xs text-center text-amber-800">
            Your body shows a <strong>17% imbalance</strong> with significantly higher load on your left side
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default AsymmetryScorecard
