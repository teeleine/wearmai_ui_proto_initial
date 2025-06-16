"use client"

import { useState } from "react"
import { ArrowLeft, Info, Flag, TrendingUp, FolderSyncIcon as Sync, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom"
import ChatButton from "@/components/dashboard/ChatButton"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

const LLMGeneratedTrainingPlanV1 = () => {
  const navigate = useNavigate()
  const [activeWeek, setActiveWeek] = useState("week1")
  const [openRationaleDay, setOpenRationaleDay] = useState<string | null>(null)

  const weeks = [
    { id: "week1", label: "Week 1", focus: "Foundation & Form Focus" },
    { id: "week2", label: "Week 2", focus: "Building Endurance" },
    { id: "week3", label: "Week 3", focus: "Quality & Technique" },
    { id: "week4", label: "Week 4", focus: "Recovery & Consolidation" },
  ]

  const weekData = {
    week1: [
      {
        day: "Mon, Oct 28",
        workout: {
          type: "Easy Run",
          duration: "45 min",
          intensity: "Zone 2 (RPE 3-4/10)",
          rationale:
            "Builds aerobic base. Your WearM.AI data showed good load distribution on your last easy effort – maintain that form with focus on left hip engagement.",
          drills: [
            {
              name: "Hip Stability Series",
              rationale: "Targets glute medius to address pelvic drop observed via WearM.AI",
            },
          ],
        },
      },
      {
        day: "Tue, Oct 29",
        workout: {
          type: "Cross Training",
          duration: "30 min",
          intensity: "Low Impact (RPE 3/10)",
          rationale:
            "Active recovery that maintains fitness while giving running-specific muscles a break. Recommended based on your right knee joint force patterns.",
        },
      },
      {
        day: "Wed, Oct 30",
        workout: {
          type: "Easy Run + Strides",
          duration: "50 min (incl. 6x20s strides)",
          intensity: "Zone 2 + Zone 4 strides",
          rationale:
            "Maintains aerobic development while introducing brief faster segments to improve neuromuscular coordination. Your WearM.AI data shows good symmetry at higher cadences.",
          drills: [
            {
              name: "Ankle Mobility Routine",
              rationale: "Addresses limited dorsiflexion noted in your left ankle (WearM.AI)",
            },
          ],
        },
      },
      {
        day: "Thu, Oct 31",
        workout: {
          type: "Tempo Run",
          duration: "6km (incl. 3km @ Tempo)",
          intensity: "Zone 3-4 (RPE 6-7/10)",
          rationale:
            "Improves lactate clearance. Your right knee showed higher force on recent fast runs, so we're keeping this moderate for now while you focus on form.",
          drills: [
            {
              name: "Knee Alignment Drill",
              rationale: "Targets proper knee tracking to reduce medial forces detected by WearM.AI",
            },
          ],
        },
      },
      {
        day: "Fri, Nov 1",
        workout: null,
        restDay: {
          rationale:
            "Crucial for adaptation and to manage the load on your Achilles which showed early overuse signs (WearM.AI). Take time to foam roll and stretch.",
        },
      },
      {
        day: "Sat, Nov 2",
        workout: {
          type: "Long Run",
          duration: "10km",
          intensity: "Zone 2 (RPE 4/10)",
          rationale:
            "Builds endurance and teaches your body to utilize fat as fuel. Keep it conversational pace. Your WearM.AI data shows fatigue-related form changes after 40 minutes, so focus on maintaining posture in the final third.",
          drills: [
            {
              name: "Post-Run Recovery Sequence",
              rationale: "Targets areas of highest load identified by WearM.AI after your previous long runs",
            },
          ],
        },
      },
      {
        day: "Sun, Nov 3",
        workout: null,
        restDay: {
          rationale:
            "Complete rest to allow for full recovery and adaptation. Your WearM.AI data shows your body needs 24-36 hours to fully recover from longer efforts.",
        },
      },
    ],
    week2: [
      // Week 2 data would go here - simplified for brevity
      {
        day: "Mon, Nov 4",
        workout: {
          type: "Easy Run",
          duration: "50 min",
          intensity: "Zone 2 (RPE 3-4/10)",
          rationale:
            "Slightly longer easy run to build on Week 1's foundation. Focus on maintaining the improved hip stability.",
        },
      },
      {
        day: "Tue, Nov 5",
        workout: {
          type: "Strength Training",
          duration: "40 min",
          intensity: "Moderate (RPE 5/10)",
          rationale:
            "Targeted strength work focusing on areas identified by WearM.AI: glutes, hamstrings, and core stability.",
        },
      },
      // Additional days would be included here
    ],
    week3: [
      // Week 3 data would go here
    ],
    week4: [
      // Week 4 data would go here
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="sticky top-0 z-10 bg-white border-b px-4 py-5 flex items-center justify-between container max-w-xl mx-auto">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">Your New Training Plan</h1>
        </div>
      </header>
      <div className="container max-w-md mx-auto px-4 py-2">

      <ScrollArea className="flex-1 px-4 py-6">
        {/* Plan Overview & Rationale */}
        <section className="mb-6">
          <h2 className="text-lg font-medium mb-3">Coach's Strategy for Your Next 4 Weeks</h2>
          <Card className="p-4 mb-4">
            <p className="text-sm text-gray-700 mb-4">
              Based on your goal of running a sub-50 min 10k and your recent biomechanical data showing a tendency for
              right knee valgus under fatigue, this 4-week plan focuses on building endurance while incorporating
              specific strength work to improve knee stability. We'll progressively increase mileage, with key quality
              sessions and active recovery.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1 bg-blue-50">
                <Flag className="h-3.5 w-3.5" />
                <span>Aligns with: Sub-50 min 10k</span>
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 bg-green-50">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Projected Load: Moderate Build</span>
              </Badge>
            </div>
          </Card>
        </section>

        {/* Weekly Breakdown */}
        <section>
          <Tabs value={activeWeek} onValueChange={setActiveWeek} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              {weeks.map((week) => (
                <TabsTrigger key={week.id} value={week.id} className="text-xs">
                  {week.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(weekData).map(([weekId, days]) => (
              <TabsContent key={weekId} value={weekId} className="mt-0">
                <div className="mb-4">
                  <h3 className="text-md font-medium">
                    {weeks.find((w) => w.id === weekId)?.label} of 4: {weeks.find((w) => w.id === weekId)?.focus}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 mb-4">
                    {weekId === "week1" &&
                      "This week, we'll establish a solid base. Pay attention to your left hip engagement during easy runs, as per your recent WearM.AI data."}
                    {weekId === "week2" &&
                      "Building on last week's foundation, we'll increase volume slightly while maintaining focus on form."}
                  </p>
                </div>

                <div className="space-y-3">
                  {days.map((day, index) => (
                    <Card key={index} className="p-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">{day.day}</div>

                      {day.workout ? (
                        <div className="bg-white rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{day.workout.type}</div>
                              <div className="text-sm text-gray-600">{day.workout.duration}</div>
                              <div className="text-xs text-gray-500">{day.workout.intensity}</div>
                            </div>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-7 px-2">
                                  <Info className="h-4 w-4 text-wearmai-primary" />
                                  <span className="text-xs ml-1">Why this workout?</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Workout Rationale</DialogTitle>
                                  <DialogDescription>
                                    {day.workout.type} - {day.workout.duration}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="text-sm">
                                  <p>{day.workout.rationale}</p>

                                  {day.workout.drills && day.workout.drills.length > 0 && (
                                    <div className="mt-4">
                                      <h4 className="font-medium mb-2">Recommended Drills:</h4>
                                      {day.workout.drills.map((drill, i) => (
                                        <div key={i} className="mb-2 p-2 bg-gray-50 rounded">
                                          <div className="font-medium">{drill.name}</div>
                                          <div className="text-xs text-gray-600">{drill.rationale}</div>
                                          <Button
                                            variant="link"
                                            size="sm"
                                            className="p-0 h-auto text-xs text-wearmai-primary"
                                            onClick={() => navigate("/drill-detail/v3")}
                                          >
                                            View Drill →
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>

                          {day.workout.drills && day.workout.drills.length > 0 && (
                            <div className="mt-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 text-xs"
                                      onClick={() => navigate("/drill-detail/v3")}
                                    >
                                      <span className="text-wearmai-primary">
                                        Pre/Post-Run: {day.workout.drills[0].name}
                                      </span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs">{day.workout.drills[0].rationale}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-green-50 p-3 rounded-md">
                          <div className="flex justify-between items-start">
                            <div className="font-medium text-green-800">Rest & Recovery</div>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-7 px-2">
                                  <Info className="h-4 w-4 text-green-600" />
                                  <span className="text-xs ml-1">Why rest?</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Rest Day Rationale</DialogTitle>
                                </DialogHeader>
                                <div className="text-sm">
                                  <p>{day.restDay?.rationale}</p>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Adaptive Plan Note */}
        <section className="mt-8 mb-6">
          <Card className="p-4 bg-blue-50">
            <div className="flex items-start gap-3">
              <Sync className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Dynamic Plan:</span> This plan will be monitored by your AI Coach and
                  may be adjusted based on your completed runs, feedback, and how your body responds (WearM.AI
                  insights). Stay tuned for updates!
                </p>
              </div>
            </div>
          </Card>
        </section>
      </ScrollArea>

      {/* Action Buttons Footer */}
      <footer className="sticky bottom-0 bg-white border-t p-4 flex flex-col gap-2 pb-20">
        <Button className="w-full bg-wearmai-primary hover:bg-wearmai-primary/90">Accept This Plan</Button>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => navigate("/chat-coach/v2b")}>
            Request Modifications
          </Button>
          <Button variant="outline" className="flex-1">
            Save for Later
          </Button>
        </div>
      </footer>

     
      <MobileNavbar/> 
      </div>
    </div>
  )
}

export default LLMGeneratedTrainingPlanV1
