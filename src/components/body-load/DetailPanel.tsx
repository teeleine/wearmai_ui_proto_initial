"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface DetailPanelProps {
  region: string
  metric: string
  insight: string
  onAskCoach?: () => void
  onViewDrills?: () => void
}

const DetailPanel: React.FC<DetailPanelProps> = ({ region, metric, insight, onAskCoach, onViewDrills }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{region}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium">{metric}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{insight}</p>
        </div>
        <div className="flex space-x-2 pt-2">
          {onViewDrills && (
            <Button variant="outline" size="sm" className="text-xs" onClick={onViewDrills}>
              View Related Drills
            </Button>
          )}
          {onAskCoach && (
            <Button variant="default" size="sm" className="text-xs" onClick={onAskCoach}>
              <MessageCircle className="h-3 w-3 mr-1" />
              Ask Coach
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default DetailPanel
