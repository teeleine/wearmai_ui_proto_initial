"use client"

import React from "react"
import { ArrowLeft, MessageSquare, ChevronDown, ChevronUp, Calendar, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useNavigate } from "react-router-dom"
import ChatButton from "@/components/dashboard/ChatButton"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

const LLMGeneratedTrainingPlanV2 = () => {
  const navigate = useNavigate()
  const [openWeeks, setOpenWeeks] = React.useState<Record<string, boolean>>({
    week1: true,
    week2: false,
    week3: false,
    week4: false,
  })

  const toggleWeek = (week: string) => {
    setOpenWeeks((prev) => ({
      ...prev,
      [week]: !prev[week],
    }))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b px-4 py-5 flex items-center justify-between container max-w-xl mx-auto">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">A Message From Your AI Coach: Your New Plan!</h1>
        </div>
      </header>

    <div className="container max-w-md mx-auto px-4 py-2">
       <ScrollArea className="flex-1 px-4 py-6">
        <Card className="p-5 mb-6">
          <div className="prose prose-sm max-w-none">
            <p className="font-medium text-lg">Hi Alex,</p>

            <p className="mt-4">
              I've put together a new training plan for you, focusing on your sub-50 minute 10k goal and carefully
              considering your recent performance. I've noticed from your WearM.AI data that your cadence consistency is
              excellent! – let's build on that. I've also seen that your left ankle shows some signs of overuse after
              longer runs, so we'll manage that proactively.
            </p>

            <p className="mt-4">
              This plan is designed to gradually build your endurance while addressing the biomechanical patterns we've
              observed. Let me walk you through what I've created:
            </p>
          </div>
        </Card>

        {/* Weekly "Chapters" */}
        <div className="space-y-4">
          <Collapsible open={openWeeks.week1} onOpenChange={() => toggleWeek("week1")}>
            <Card className="overflow-hidden">
              <CollapsibleTrigger asChild>
                <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                  <div>
                    <h3 className="font-semibold text-wearmai-primary">Week 1: Building a Smart Foundation</h3>
                    <p className="text-sm text-gray-500">Oct 28 - Nov 3</p>
                  </div>
                  {openWeeks.week1 ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-4 pb-4">
                  <div className="prose prose-sm max-w-none">
                    <p>
                      We'll start with some comfortable easy runs on Monday and Wednesday to get you into the rhythm. On
                      Monday, really focus on that feeling your glutes engage, as your data showed they weren't as
                      active on your left side{" "}
                      <Badge variant="outline" className="text-xs bg-blue-50">
                        WearM.AI Data
                      </Badge>
                      .
                    </p>

                    <div className="my-3 p-3 bg-blue-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Mon: Easy Run (40 min, Z2)</span>
                      </div>
                      <p className="text-xs mt-1 ml-6">Focus on glute engagement, especially left side</p>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-xs ml-6 p-0 h-auto text-wearmai-primary"
                        onClick={() => {}}
                      >
                        View full workout details
                      </Button>
                    </div>

                    <p>
                      Thursday will be our first quality session: a Tempo run designed to push your lactate threshold
                      slightly. We'll keep the volume moderate here because your right knee joint force was a bit high
                      on your last harder effort.
                    </p>

                    <div className="my-3 p-3 bg-orange-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">Thu: Tempo Run (6km incl. 3km @ Tempo)</span>
                      </div>
                      <p className="text-xs mt-1 ml-6">Focus on maintaining knee alignment</p>
                      <div className="flex ml-6 mt-1">
                        <Button
                          variant="link"
                          size="sm"
                          className="text-xs p-0 h-auto text-wearmai-primary"
                          onClick={() => {}}
                        >
                          View full workout details
                        </Button>
                        <span className="mx-2 text-xs">+</span>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-xs p-0 h-auto text-wearmai-primary"
                          onClick={() => navigate("/drill-detail/v2")}
                        >
                          Knee Alignment Drill
                        </Button>
                      </div>
                    </div>

                    <p>
                      Friday is crucial active recovery – perhaps some light cross-training. Then, Saturday is our long
                      run, building up to 10km. I've suggested a Post-Run Recovery Sequence afterwards to specifically
                      help with hip stability.
                    </p>

                    <div className="mt-4 border-t pt-3">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Week 1 Load: Moderate (Building Phase)</span>
                      </div>
                      <div className="mt-2 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <Collapsible open={openWeeks.week2} onOpenChange={() => toggleWeek("week2")}>
            <Card className="overflow-hidden">
              <CollapsibleTrigger asChild>
                <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                  <div>
                    <h3 className="font-semibold text-wearmai-primary">Week 2: Strengthening Fundamentals</h3>
                    <p className="text-sm text-gray-500">Nov 4 - Nov 10</p>
                  </div>
                  {openWeeks.week2 ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-4 pb-4">
                  <div className="prose prose-sm max-w-none">
                    <p>
                      Building on Week 1, we'll increase your easy run duration slightly and add more structured
                      strength training to address the biomechanical patterns we've observed in your WearM.AI data.
                    </p>

                    <div className="my-3 p-3 bg-blue-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Mon: Easy Run (50 min, Z2)</span>
                      </div>
                      <p className="text-xs mt-1 ml-6">Focus on maintaining the improved hip stability</p>
                    </div>

                    <div className="my-3 p-3 bg-purple-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Tue: Strength Training (40 min)</span>
                      </div>
                      <p className="text-xs mt-1 ml-6">Targeting glutes, hamstrings, and core stability</p>
                    </div>

                    <div className="mt-4 border-t pt-3">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Week 2 Load: Moderate-High</span>
                      </div>
                      <div className="mt-2 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <Collapsible open={openWeeks.week3} onOpenChange={() => toggleWeek("week3")}>
            <Card className="overflow-hidden">
              <CollapsibleTrigger asChild>
                <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                  <div>
                    <h3 className="font-semibold text-wearmai-primary">Week 3: Building Quality</h3>
                    <p className="text-sm text-gray-500">Nov 11 - Nov 17</p>
                  </div>
                  {openWeeks.week3 ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-4 pb-4">
                  <div className="prose prose-sm max-w-none">
                    <p>
                      This is our peak week where we'll introduce more quality work to prepare you for your goal pace.
                    </p>

                    <div className="mt-4 border-t pt-3">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium">Week 3 Load: High (Peak Week)</span>
                      </div>
                      <div className="mt-2 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <Collapsible open={openWeeks.week4} onOpenChange={() => toggleWeek("week4")}>
            <Card className="overflow-hidden">
              <CollapsibleTrigger asChild>
                <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                  <div>
                    <h3 className="font-semibold text-wearmai-primary">Week 4: Recovery & Consolidation</h3>
                    <p className="text-sm text-gray-500">Nov 18 - Nov 24</p>
                  </div>
                  {openWeeks.week4 ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-4 pb-4">
                  <div className="prose prose-sm max-w-none">
                    <p>
                      A recovery week to allow your body to absorb the training and prepare for the next training block.
                    </p>

                    <div className="mt-4 border-t pt-3">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Week 4 Load: Low (Recovery)</span>
                      </div>
                      <div className="mt-2 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>

        {/* Closing */}
        <Card className="p-5 mt-6">
          <div className="prose prose-sm max-w-none">
            <p>
              Remember, this is a starting point, and I'll be watching your progress via your WearM.AI data to make
              adjustments as needed. The plan is designed to gradually improve your biomechanics while building the
              fitness needed for your 10k goal.
            </p>

            <p className="mt-3">
              Let me know if you have any questions or if you'd like any modifications to the plan!
            </p>

            <p className="mt-4 font-medium">Your AI Coach</p>
          </div>
        </Card>
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

     </div>
      <MobileNavbar/> 
    </div>
  )
}

export default LLMGeneratedTrainingPlanV2
