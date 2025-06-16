"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DrillVisualProps {
  drillName: string
  size?: "small" | "medium" | "large"
  isVideo?: boolean
  className?: string
}

const DrillVisual: React.FC<DrillVisualProps> = ({ drillName, size = "medium", isVideo = false, className = "" }) => {
  const [isPlaying, setIsPlaying] = React.useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "h-32"
      case "large":
        return "h-64"
      case "medium":
      default:
        return "h-48"
    }
  }

  return (
    <Card
      className={`relative w-full ${getSizeClasses()} flex items-center justify-center bg-gray-100 overflow-hidden ${className}`}
    >
      <div className="text-center p-4">
        <p className="font-medium text-gray-700">
          {isVideo ? "Video/Animation:" : "Image:"} {drillName}
        </p>
      </div>

      {isVideo && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center gap-2 px-4">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <div className="h-1.5 flex-1 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full bg-wearmai-primary rounded-full" style={{ width: isPlaying ? "35%" : "0%" }} />
          </div>
        </div>
      )}
    </Card>
  )
}

export default DrillVisual
