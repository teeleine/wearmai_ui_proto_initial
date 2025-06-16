"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, AlertTriangle, Info } from "lucide-react"

interface LLMAdviceModalProps {
  type: "positive" | "cautionary" | "informative"
  onProceed: () => void
  onGoBack: () => void
  onAskAlternatives?: () => void
}

const LLMAdviceModal: React.FC<LLMAdviceModalProps> = ({ type, onProceed, onGoBack, onAskAlternatives }) => {
  const getIcon = () => {
    switch (type) {
      case "positive":
        return <ThumbsUp className="h-8 w-8 text-green-500" />
      case "cautionary":
        return <AlertTriangle className="h-8 w-8 text-amber-500" />
      case "informative":
        return <Info className="h-8 w-8 text-blue-500" />
      default:
        return <Info className="h-8 w-8 text-blue-500" />
    }
  }

  const getMessage = () => {
    switch (type) {
      case "positive":
        return "Looks like a good adjustment! This easy run fits well with your current training load."
      case "cautionary":
        return "Warning: Changing this to a high-intensity interval session significantly increases your weekly load. This might elevate your fatigue and injury risk given your current sustainability score. Are you sure?"
      case "informative":
        return "FYI: Replacing your planned long run with a short tempo run will reduce your weekly volume. This might impact your progress towards your marathon goal if done frequently."
      default:
        return "Coach has reviewed your changes."
    }
  }

  const getDataReference = () => {
    switch (type) {
      case "positive":
        return "Based on: Weekly Load Increase: +5%, Sustainability Score: 'Optimal Range'"
      case "cautionary":
        return "Based on: Weekly Load Increase: +30%, Sustainability Score: Now 'Elevated Risk'"
      case "informative":
        return "Based on: Weekly Volume Decrease: -15%, Goal Progress: 'Slightly Off Track'"
      default:
        return ""
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {getIcon()}
          <span>Coach's Review of Your Changes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{getMessage()}</p>
        <p className="text-xs text-gray-500">{getDataReference()}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button onClick={onProceed} className="w-full bg-wearmai-primary hover:bg-wearmai-primary/80">
          Proceed & Save Anyway
        </Button>
        <Button onClick={onGoBack} variant="outline" className="w-full">
          Go Back & Edit
        </Button>
        {onAskAlternatives && (
          <Button
            onClick={onAskAlternatives}
            variant="outline"
            className="w-full border-wearmai-primary text-wearmai-primary"
          >
            Ask Coach for Alternatives
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default LLMAdviceModal
