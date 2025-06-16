import type React from "react"
import { ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import DrillVisual from "@/components/drill-detail/DrillVisual"
import StepByStep from "@/components/drill-detail/StepByStep"
import CommonMistakes from "@/components/drill-detail/CommonMistakes"
import CoachInsight from "@/components/drill-detail/CoachInsight"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

const DrillDetailV2: React.FC = () => {
  const drillData = {
    drillName: "Glute Bridges",
    targetAreas: ["Glute Strength", "Core Stability"],
    steps: [
      {
        text: "Lie on your back with knees bent and feet flat on the floor, hip-width apart.",
        hasImage: true,
      },
      {
        text: "Press your arms into the floor for support and engage your core.",
        hasImage: true,
      },
      {
        text: "Push through your heels to lift your hips off the ground until your knees, hips, and shoulders form a straight line.",
        hasImage: true,
      },
      {
        text: "Squeeze your glutes at the top and hold for 2-3 seconds.",
        hasImage: true,
      },
      {
        text: "Lower back down with control and repeat.",
        hasImage: true,
      },
    ],
    mistakes: [
      { text: "Pushing through your toes instead of your heels." },
      { text: "Overextending your back at the top position." },
      { text: "Not engaging your core throughout the movement." },
      { text: "Letting your knees fall inward or outward during the movement." },
    ],
    coachInsight:
      "Based on your recent run data showing right glute underactivation, glute bridges are excellent for isolating and strengthening this area. This will help improve your power output and reduce the compensatory load we're seeing on your left hamstring. The pelvic stability improvements should also help with the right pelvic drop we observed in your last few runs.",
    repsAndSets: "Recommended Routine: 3 sets of 10-12 reps, 2-3 times per week",
  }

  return (
    <div className="min-h-screen bg-gray-50">
     <header className="sticky top-0 z-10 bg-white border-b px-4 py-5 flex items-center justify-between container max-w-xl mx-auto">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">{drillData.drillName}</h1>
        <Button variant="ghost" size="icon">
          <Star className="h-5 w-5" />
        </Button>
      </header>

      <main className="pb-20 container max-w-md mx-auto px-4 py-2">
        <DrillVisual drillName={drillData.drillName} size="large" isVideo={true} />

        <div className="px-4 py-6 space-y-6">
          <p className="text-sm font-medium text-gray-700">Focuses on: {drillData.targetAreas.join(", ")}</p>

          <CoachInsight text={drillData.coachInsight} title="Coach's Insight: Why This Helps You" />

          <StepByStep steps={drillData.steps} title="Step-by-Step Instructions" />

          <CommonMistakes mistakes={drillData.mistakes} title="Form Check: Avoid These" />

          <p className="font-medium text-gray-900">{drillData.repsAndSets}</p>
        </div>
        <footer className=" border-t p-4 flex gap-3">
        <Button className="flex-1">Add to Training Plan</Button>
        <Button variant="outline" className="flex-1">
          Start Timed Set
        </Button>
      </footer>
      </main>

      

      {/* Floating Chat Icon */}
      {/* <div className="fixed bottom-20 right-4"> */}
        <MobileNavbar/>
      {/* </div> */}
    </div>
  )
}

export default DrillDetailV2
