"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dumbbell } from "lucide-react"

interface AsymmetryPanelProps {
  insights: {
    bodyPart: string
    leftValue: string
    rightValue: string
    difference: string
  }[]
  llmInsight: string
  onViewDrills?: () => void
}

const AsymmetryPanel: React.FC<AsymmetryPanelProps> = ({ insights, llmInsight, onViewDrills }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Left/Right Load Comparison</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {insights.map((item, index) => (
            <div key={index} className="space-y-1">
              <p className="text-xs font-medium">{item.bodyPart}:</p>
              <div className="flex justify-between text-xs">
                <span className="text-red-500 font-medium">{item.leftValue}</span>
                <span className="text-green-500 font-medium">{item.rightValue}</span>
              </div>
              <div className="text-xs text-center">
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{item.difference}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-gray-200">
          <p className="text-sm text-muted-foreground">{llmInsight}</p>
        </div>

        {onViewDrills && (
          <div className="pt-2">
            <Button variant="default" size="sm" className="w-full text-xs" onClick={onViewDrills}>
              <Dumbbell className="h-3 w-3 mr-1" />
              Drills for Asymmetry
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AsymmetryPanel
