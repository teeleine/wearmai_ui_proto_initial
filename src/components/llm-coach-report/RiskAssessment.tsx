import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"

interface RiskAssessmentProps {
  level: "high" | "moderate" | "low"
  description: string
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ level, description }) => {
  const getRiskIcon = () => {
    switch (level) {
      case "high":
        return <AlertTriangle size={20} className="text-[#6131ca]" />
      case "moderate":
        return <AlertCircle size={20} className="text-[#f9ca24]" />
      case "low":
        return <CheckCircle size={20} className="text-[#83c55b]" />
      default:
        return <AlertCircle size={20} className="text-gray-400" />
    }
  }

  const getRiskColor = () => {
    switch (level) {
      case "high":
        return "text-[#6131ca]"
      case "moderate":
        return "text-[#f9ca24]"
      case "low":
        return "text-[#83c55b]"
      default:
        return "text-gray-400"
    }
  }

  const getRiskBackground = () => {
    switch (level) {
      case "high":
        return "bg-[#6131ca]/10"
      case "moderate":
        return "bg-[#f9ca24]/10"
      case "low":
        return "bg-[#83c55b]/10"
      default:
        return "bg-gray-100"
    }
  }

  return (
    <Card className={`mb-4 border border-gray-200 shadow-sm ${getRiskBackground()}`}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium flex items-center">
          {getRiskIcon()}
          <span className={`ml-2 ${getRiskColor()}`}>
            Injury Risk Assessment: {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-gray-700">{description}</p>
      </CardContent>
    </Card>
  )
}

export default RiskAssessment
