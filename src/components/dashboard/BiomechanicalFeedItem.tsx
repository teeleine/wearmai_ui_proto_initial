import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, TrendingDown, TrendingUp } from "lucide-react"

interface BiomechanicalFeedItemProps {
  title: string
  value: string
  change: number
  isPositive?: boolean
}

const BiomechanicalFeedItem: React.FC<BiomechanicalFeedItemProps> = ({ title, value, change, isPositive = true }) => {
  const isImproving = (change > 0 && isPositive) || (change < 0 && !isPositive)

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity size={16} className="text-[#42b4f7] mr-2" />
            <div className="text-sm font-medium text-gray-700">{title}</div>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-bold text-gray-800 mr-2">{value}</span>
            <div
              className={`flex items-center text-xs ${isImproving ? "text-[#83c55b]" : "text-[#6131ca]"} font-medium`}
            >
              {isImproving ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span className="ml-1">{Math.abs(change)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BiomechanicalFeedItem
