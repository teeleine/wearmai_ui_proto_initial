"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkoutDayCard } from "./WorkoutDayCard"

interface Week {
  id: string
  label: string
}

interface TargetModule {
  focus: string
  rationale: string
  drills?: string[]
}

interface Workout {
  type: string
  duration: string
  intensity: string
  targetModule?: TargetModule
}

interface Day {
  day: string
  date: string
  workout: Workout
}

interface WeekData {
  [key: string]: Day[]
}

interface WeeklyPlanTabsProps {
  weeks: Week[]
  weekData: WeekData
}

export const WeeklyPlanTabs = ({ weeks, weekData }: WeeklyPlanTabsProps) => {
  const navigate = useNavigate()
  const [activeWeek, setActiveWeek] = useState(weeks[0].id)

  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Weekly Training Plan</h2>
        <Button variant="outline" size="sm" className="text-xs" onClick={() => navigate("/training-plan/v3")}>
          View in Calendar
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <Tabs value={activeWeek} onValueChange={setActiveWeek} className="w-full">
        <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
          {weeks.map((week) => (
            <TabsTrigger key={week.id} value={week.id} className="text-xs">
              {week.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(weekData).map(([weekId, days]) => (
          <TabsContent key={weekId} value={weekId} className="mt-0">
            <div className="space-y-3">
              {days.map((day, index) => (
                <WorkoutDayCard key={index} day={day.day} date={day.date} workout={day.workout} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
