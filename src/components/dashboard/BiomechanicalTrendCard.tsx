import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"

interface BiomechanicalTrendCardProps {
  title: string
  metric: string
  value: number
  previousValue: number
  unit: string
  isPositive?: boolean
}

const BiomechanicalTrendCard: React.FC<BiomechanicalTrendCardProps> = ({
  title,
  metric,
  value,
  previousValue,
  unit,
  isPositive = true,
}) => {
  const percentChange = Math.abs(Math.round(((value - previousValue) / previousValue) * 100))
  const isImproving = (value > previousValue && isPositive) || (value < previousValue && !isPositive)

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white h-full">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold mb-1">
            {value}
            <span className="text-lg ml-1">{unit}</span>
          </div>
          <div className="text-sm text-gray-500 mb-2">{metric}</div>
          <div className={`flex items-center text-sm ${isImproving ? "text-[#83c55b]" : "text-[#6131ca]"} font-medium`}>
            {isImproving ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
            <span>
              {percentChange}% {isImproving ? "better" : "worse"} than last week
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BiomechanicalTrendCard
