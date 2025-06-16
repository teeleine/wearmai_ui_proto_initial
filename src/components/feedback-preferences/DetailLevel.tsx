"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export type DetailLevelType = "quick" | "standard" | "detailed"

interface DetailLevelProps {
  selectedLevel: DetailLevelType
  onChange: (level: DetailLevelType) => void
}

const DetailLevel = ({ selectedLevel, onChange }: DetailLevelProps) => {
  const levelToValue = (level: DetailLevelType): number => {
    switch (level) {
      case "quick":
        return 0
      case "standard":
        return 50
      case "detailed":
        return 100
      default:
        return 50
    }
  }

  const valueToLevel = (value: number): DetailLevelType => {
    if (value <= 25) return "quick"
    if (value <= 75) return "standard"
    return "detailed"
  }

  const handleChange = (value: number[]) => {
    onChange(valueToLevel(value[0]))
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Level of Detail in Feedback Reports</h3>
      <div className="space-y-6">
        <Slider
          value={[levelToValue(selectedLevel)]}
          min={0}
          max={100}
          step={1}
          onValueChange={handleChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="text-center">
            <div
              className={`mb-1 h-2 w-2 rounded-full mx-auto ${
                selectedLevel === "quick" ? "bg-wearmai-primary" : "bg-gray-300"
              }`}
            ></div>
            <Label className={selectedLevel === "quick" ? "font-medium text-wearmai-primary" : ""}>Quick Summary</Label>
            <p className="text-xs">(Key takeaways only)</p>
          </div>
          <div className="text-center">
            <div
              className={`mb-1 h-2 w-2 rounded-full mx-auto ${
                selectedLevel === "standard" ? "bg-wearmai-primary" : "bg-gray-300"
              }`}
            ></div>
            <Label className={selectedLevel === "standard" ? "font-medium text-wearmai-primary" : ""}>
              Standard Insights
            </Label>
            <p className="text-xs">(Balanced detail)</p>
          </div>
          <div className="text-center">
            <div
              className={`mb-1 h-2 w-2 rounded-full mx-auto ${
                selectedLevel === "detailed" ? "bg-wearmai-primary" : "bg-gray-300"
              }`}
            ></div>
            <Label className={selectedLevel === "detailed" ? "font-medium text-wearmai-primary" : ""}>
              In-Depth Analysis
            </Label>
            <p className="text-xs">(Comprehensive)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailLevel
