import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"

const EquipmentRecommendation: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <ShoppingBag className="h-4 w-4 mr-2 text-blue-500" />
          <CardTitle className="text-sm font-medium">Equipment Recommendation</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xs space-y-3">
          <p>
            Based on your asymmetry profile, our analysis suggests your footwear may be contributing to the imbalance.
          </p>

          <div className="p-3 bg-blue-50 rounded-md">
            <p className="font-medium text-blue-800">Recommended Solutions:</p>
            <ul className="mt-1 space-y-1 text-blue-700 list-disc list-inside">
              <li>Consider a neutral running shoe with moderate cushioning</li>
              <li>Evaluate if your current shoes have uneven wear patterns</li>
              <li>A right-side orthotic insert may help balance your gait mechanics</li>
            </ul>
          </div>

          <p className="text-muted-foreground">
            Your current shoes have logged 356 miles. Replacing shoes between 300-500 miles is recommended for optimal
            support.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default EquipmentRecommendation
