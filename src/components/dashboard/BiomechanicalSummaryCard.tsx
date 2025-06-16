import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BiomechanicalSummaryCardProps {
  title: string
  insights: {
    text: string
    severity: "high" | "medium" | "low"
  }[]
}

const BiomechanicalSummaryCard: React.FC<BiomechanicalSummaryCardProps> = ({ title, insights }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-[#6131ca]"
      case "medium":
        return "bg-[#f9ca24]"
      case "low":
        return "bg-[#42b4f7]"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white mb-5">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center">
          <Activity size={18} className="text-[#42b4f7] mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start">
              <div className={`${getSeverityColor(insight.severity)} w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0`} />
              <p className="text-sm text-gray-700">{insight.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full"
          >
            View Detailed Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BiomechanicalSummaryCard
