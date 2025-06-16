import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LLMInsightPanelProps {
  title: string
  insight: string
  selectedRegion?: string
}

const LLMInsightPanel: React.FC<LLMInsightPanelProps> = ({ title, insight, selectedRegion }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{insight}</p>
        {selectedRegion && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs font-medium">Selected: {selectedRegion}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default LLMInsightPanel
