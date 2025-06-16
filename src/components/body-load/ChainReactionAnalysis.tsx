import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown } from "lucide-react"

const ChainReactionAnalysis: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3">Biomechanical Chain Reaction</h3>

        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-1/3 bg-red-100 text-red-800 p-2 rounded-md text-xs font-medium text-center">
              Left Hip Drop (+4°)
            </div>
            <ArrowDown className="h-6 w-4 mx-auto text-red-400" />
          </div>

          <div className="flex items-center">
            <div className="w-1/3 bg-red-100 text-red-800 p-2 rounded-md text-xs font-medium text-center">
              Left Quad Overload
            </div>
            <ArrowDown className="h-6 w-4 mx-auto text-red-400" />
          </div>

          <div className="flex items-center">
            <div className="w-1/3 bg-red-100 text-red-800 p-2 rounded-md text-xs font-medium text-center">
              Increased Knee Force
            </div>
            <ArrowDown className="h-6 w-4 mx-auto text-red-400" />
          </div>

          <div className="flex items-center">
            <div className="w-1/3 bg-amber-100 text-amber-800 p-2 rounded-md text-xs font-medium text-center">
              Altered Foot Pronation
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-md text-xs">
          <p className="mb-2 font-medium">Expert Analysis:</p>
          <p>
            The asymmetry starts with a left hip drop during midstance phase, causing a cascade of compensations down
            the kinetic chain. This explains the increased muscle loads and joint forces measured in your left leg.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChainReactionAnalysis
