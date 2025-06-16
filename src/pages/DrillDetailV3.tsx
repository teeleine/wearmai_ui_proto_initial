"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import DrillVisual from "@/components/drill-detail/DrillVisual"
import InteractiveChecklist from "@/components/drill-detail/InteractiveChecklist"
import CommonMistakes from "@/components/drill-detail/CommonMistakes"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

const DrillDetailV3: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<"understand" | "learn">("understand")
  const [tipsOpen, setTipsOpen] = useState(false)

  const drillData = {
    drillName: "Glute Bridges",
    targetAreas: ["Glute Strength", "Pelvic Stability"],
    coachInsight:
      "Your recent runs show a pattern of right pelvic drop, especially as you fatigue. This indicates your glutes (particularly on the right side) may need strengthening to maintain proper form throughout your runs. Glute bridges directly target this muscle group and will help improve your pelvic stability, potentially reducing knee strain and improving your running efficiency.",
    steps: [
      { text: "Lie on your back with knees bent and feet flat on the floor, hip-width apart." },
      { text: "Press your arms into the floor for support and engage your core." },
      {
        text: "Push through your heels to lift your hips off the ground until your knees, hips, and shoulders form a straight line.",
      },
      { text: "Squeeze your glutes at the top and hold for 2-3 seconds." },
      { text: "Lower back down with control and repeat." },
    ],
    mistakes: [
      { text: "Pushing through your toes instead of your heels." },
      { text: "Overextending your back at the top position." },
      { text: "Not engaging your core throughout the movement." },
      { text: "Letting your knees fall inward or outward during the movement." },
    ],
    repsAndSets: "Recommended: 3 sets of 10-12 reps",
  }

  const moveToLearnPhase = () => {
    setCurrentPhase("learn")
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-gray-50 border-b px-4 py-5 flex items-center justify-between container max-w-xl mx-auto">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold ml-2">{drillData.drillName}</h1>
      </header>

      <main className="p-4 pb-20 space-y-6 container max-w-md mx-auto px-4 py-2">
        {currentPhase === "understand" ? (
          <div className="space-y-6">
            <Card className="p-4 bg-wearmai-light/10 border-wearmai-primary/20">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Phase 1: Understand Why</h2>
              <p className="text-base font-medium text-gray-800 mb-4">Targets: {drillData.targetAreas.join(", ")}</p>

              <div className="mb-6">
                <h3 className="font-medium text-base mb-2 text-gray-900">Why Your Coach Recommends This:</h3>
                <p className="text-gray-700">{drillData.coachInsight}</p>
              </div>

              <DrillVisual drillName={drillData.drillName} size="small" />
            </Card>

            <Button className="w-full" onClick={moveToLearnPhase}>
              Next: Learn How to Perform
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Phase 2: Learn & Perform</h2>

              <DrillVisual drillName={drillData.drillName} size="large" isVideo={true} className="mb-6" />

              <InteractiveChecklist steps={drillData.steps} />

              <div className="mt-6">
                <Collapsible open={tipsOpen} onOpenChange={setTipsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between">
                      <span>Show Form Tips & Mistakes</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${tipsOpen ? "rotate-180" : ""}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4">
                    <CommonMistakes mistakes={drillData.mistakes} />
                  </CollapsibleContent>
                </Collapsible>
              </div>

              <p className="mt-6 font-medium text-gray-900">{drillData.repsAndSets}</p>
            </Card>
          </div>
        )}
              <footer className="border-t p-4 flex gap-3">
        <Button className="flex-1">Add to My Routine</Button>
        <Button variant="outline" className="flex-1">
          I've Practiced This
        </Button>
      </footer>
      </main>



      {/* Floating Chat Icon */}
        <MobileNavbar/>
    </div>
  )
}

export default DrillDetailV3
