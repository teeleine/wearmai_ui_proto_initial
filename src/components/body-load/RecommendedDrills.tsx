"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ExternalLink } from "lucide-react"

interface RecommendedDrillsProps {
  region: string
  dataType: "muscle-load" | "joint-force" | "soreness"
  onBack: () => void
}

const RecommendedDrills: React.FC<RecommendedDrillsProps> = ({ region, dataType, onBack }) => {
  // Mock data - in real app, these would be specific to the region and data type
  const drills = [
    {
      name: "Single Leg Balance",
      description: "Stand on one leg for 30 seconds, focusing on stability.",
      benefit: "Improves balance and strength asymmetries",
      duration: "2 sets of 30 sec each side",
    },
    {
      name: "Lateral Leg Raises",
      description: "Lie on your side and raise your top leg up and down slowly.",
      benefit: "Targets hip stabilizers that improve running form",
      duration: "3 sets of 12-15 reps each side",
    },
    {
      name: "Clamshells",
      description: "Lie on your side with knees bent, open and close knees like a clam.",
      benefit: "Activates glute medius to reduce knee pressure",
      duration: "2 sets of 15-20 reps each side",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 flex flex-row items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <CardTitle className="text-sm font-medium">Recommended Drills for {region}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground">
          These drills are recommended based on your {dataType.replace("-", " ")} readings to help address imbalances
          and prevent injury.
        </p>

        <div className="space-y-3">
          {drills.map((drill, index) => (
            <div key={index} className="p-3 border rounded-md">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-semibold">{drill.name}</h4>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{drill.duration}</span>
              </div>
              <p className="text-xs mt-1">{drill.description}</p>
              <p className="text-xs text-muted-foreground mt-1">Benefit: {drill.benefit}</p>
              <Button variant="link" size="sm" className="h-6 px-0 text-xs mt-1">
                <ExternalLink className="h-3 w-3 mr-1" />
                Video Instructions
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecommendedDrills
