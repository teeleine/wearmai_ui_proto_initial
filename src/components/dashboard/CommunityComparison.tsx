import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CommunityComparisonProps {
  metrics: {
    name: string
    yourValue: string | number
    communityAvg: string | number
    percentile: number
    unit?: string
  }[]
  compact?: boolean
}

const CommunityComparison: React.FC<CommunityComparisonProps> = ({ metrics = defaultMetrics, compact = false }) => {
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardHeader className={compact ? "pb-2 pt-3" : "pb-2 pt-4"}>
        <CardTitle className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center`}>
          <Users size={16} className="mr-1.5 text-[#42b4f7]" />
          Community Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-3" : "pb-4"}>
        <div className="space-y-3">
          {metrics.slice(0, compact ? 2 : 3).map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-700">{metric.name}</div>
                <div className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                  Top {metric.percentile}%
                </div>
              </div>

              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>
                  You: {metric.yourValue}
                  {metric.unit}
                </span>
                <span>
                  Avg: {metric.communityAvg}
                  {metric.unit}
                </span>
              </div>

              <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                {/* Community average marker */}
                <div className="absolute top-0 bottom-0 w-px bg-gray-400" style={{ left: `50%` }}></div>

                {/* Your value marker */}
                <div
                  className="absolute top-0 bottom-0 w-1.5 h-1.5 rounded-full bg-[#42b4f7] transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${Math.min(100, Math.max(0, metric.percentile))}%`,
                    top: "50%",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3 text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full"
        >
          View Full Comparison
          <ArrowRight size={14} className="ml-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

const defaultMetrics = [
  {
    name: "Weekly Distance",
    yourValue: 32.5,
    communityAvg: 25.2,
    percentile: 78,
    unit: "km",
  },
  {
    name: "Cadence",
    yourValue: 172,
    communityAvg: 165,
    percentile: 65,
    unit: "spm",
  },
  {
    name: "5K Time",
    yourValue: "22:45",
    communityAvg: "25:30",
    percentile: 82,
  },
  {
    name: "Training Consistency",
    yourValue: "4.2",
    communityAvg: "3.5",
    percentile: 70,
    unit: "days/week",
  },
]

export default CommunityComparison
