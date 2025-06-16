import type React from "react"
import { Card } from "@/components/ui/card"

interface CoachInsightProps {
  text: string
  title?: string
  compact?: boolean
  className?: string
}

const CoachInsight: React.FC<CoachInsightProps> = ({
  text,
  title = "Why This Drill?",
  compact = false,
  className = "",
}) => {
  return (
    <Card className={`p-3 ${compact ? "bg-gray-50" : "bg-wearmai-light/10 border-wearmai-primary/20"} ${className}`}>
      <h3 className={`font-medium ${compact ? "text-sm mb-1" : "text-base mb-2"} text-gray-900`}>{title}</h3>
      <p className={`text-gray-700 ${compact ? "text-sm" : "text-base"}`}>{text}</p>
    </Card>
  )
}

export default CoachInsight
