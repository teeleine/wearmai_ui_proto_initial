import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface BiomechanicalStatsGridProps {
  stats: {
    label: string
    value: string
    change: number
  }[]
  compact?: boolean
}

const BiomechanicalStatsGrid: React.FC<BiomechanicalStatsGridProps> = ({ stats, compact = false }) => {
  return (
    <div className={`grid ${compact ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"} gap-3 mb-5`}>
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm border border-gray-100 rounded-xl bg-white">
          <CardContent className={compact ? "p-3" : "p-4"}>
            <div className={`${compact ? "text-xs" : "text-sm"} font-medium text-gray-700 mb-1`}>{stat.label}</div>
            <div className={`${compact ? "text-lg" : "text-xl"} font-bold text-gray-800`}>{stat.value}</div>
            <div
              className={`${compact ? "text-[10px]" : "text-xs"} mt-1 ${
                stat.change > 0 ? "text-[#83c55b]" : stat.change < 0 ? "text-[#6131ca]" : "text-gray-500"
              }`}
            >
              {stat.change > 0 && "+"}
              {stat.change}% vs. avg
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default BiomechanicalStatsGrid
