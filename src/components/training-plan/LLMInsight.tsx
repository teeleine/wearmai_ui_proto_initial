import type React from "react"
import { Card } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

interface LLMInsightProps {
  text: string
}

const LLMInsight: React.FC<LLMInsightProps> = ({ text }) => {
  return (
    <Card className="p-3 bg-amber-50 border-amber-200">
      <div className="flex">
        <Lightbulb className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-amber-800 mb-1">Coach Insight</h4>
          <p className="text-sm text-amber-700">{text}</p>
        </div>
      </div>
    </Card>
  )
}

export default LLMInsight
