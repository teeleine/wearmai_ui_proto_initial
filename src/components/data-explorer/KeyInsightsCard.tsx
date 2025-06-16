"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

interface KeyInsight {
  type: "positive" | "negative" | "neutral" | "warning"
  text: string
}

interface KeyInsightsCardProps {
  insights: KeyInsight[]
  metricName: string
}

const KeyInsightsCard: React.FC<KeyInsightsCardProps> = ({ insights, metricName }) => {
  const getIcon = (type: KeyInsight["type"]) => {
    switch (type) {
      case "positive":
        return <TrendingUp size={16} className="text-green-500" />
      case "negative":
        return <TrendingDown size={16} className="text-red-500" />
      case "warning":
        return <AlertTriangle size={16} className="text-amber-500" />
      default:
        return <Lightbulb size={16} className="text-blue-500" />
    }
  }

  return (
    <Card className="mb-6 border-l-4 border-l-[#42b4f7]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center">
          <Lightbulb size={18} className="text-[#42b4f7] mr-2" />
          Key Insights: {metricName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start">
              <div className="mt-0.5 mr-2">{getIcon(insight.type)}</div>
              <p className="text-sm text-gray-700">{insight.text}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default KeyInsightsCard
