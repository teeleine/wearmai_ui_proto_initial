"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { BiomechanicalTargetCard } from "@/components/llm-generated-training-plan/BiomechanicalTargetCard"
import { WeeklyPlanTabs } from "@/components/llm-generated-training-plan/WeeklyPlanTabs"
import { ProjectedImprovementChart } from "@/components/llm-generated-training-plan/ProjectedImprovementChart"
import { ActionFooter } from "@/components/llm-generated-training-plan/ActionFooter"
import { PlanHeader } from "@/components/llm-generated-training-plan/PlanHeader"
import ChatButton from "@/components/dashboard/ChatButton"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

const LLMGeneratedTrainingPlanV3 = () => {
  const biomechanicalTargets = [
    {
      id: "knee",
      icon: "🦵",
      issue: "Reduce Right Knee Medial Load",
      current: "320 N",
      target: "<280 N",
      progress: 30,
    },
    {
      id: "pelvis",
      icon: "🦴",
      issue: "Improve Pelvic Stability (Reduce List)",
      current: "4.2°",
      target: "<2.5°",
      progress: 40,
    },
    {
      id: "ankle",
      icon: "👣",
      issue: "Increase Left Ankle Dorsiflexion",
      current: "18°",
      target: ">22°",
      progress: 25,
    },
  ]

  const projectedTargets = [
    {
      id: "knee",
      issue: "Reduce Right Knee Medial Load",
      current: "320 N",
      target: "<280 N",
      projected: "275 N",
      projectedPercentage: 70,
    },
    {
      id: "pelvis",
      issue: "Improve Pelvic Stability (Reduce List)",
      current: "4.2°",
      target: "<2.5°",
      projected: "2.8°",
      projectedPercentage: 70,
    },
    {
      id: "ankle",
      issue: "Increase Left Ankle Dorsiflexion",
      current: "18°",
      target: ">22°",
      projected: "21°",
      projectedPercentage: 85,
    },
  ]

  const weeks = [
    { id: "week1", label: "Week 1" },
    { id: "week2", label: "Week 2" },
    { id: "week3", label: "Week 3" },
    { id: "week4", label: "Week 4" },
  ]

  const weekData = {
    week1: [
      {
        day: "Mon",
        date: "Oct 28",
        workout: {
          type: "Easy Run",
          duration: "45 min",
          intensity: "Zone 2",
          targetModule: {
            focus: "Knee Stability Focus",
            rationale:
              "This easy run incorporates specific form cues to reduce right knee medial load by strengthening VMO and glutes during low-intensity activity.",
            drills: ["Knee Alignment Drill", "VMO Activation"],
          },
        },
      },
      {
        day: "Tue",
        date: "Oct 29",
        workout: {
          type: "Strength",
          duration: "40 min",
          intensity: "Moderate",
          targetModule: {
            focus: "Pelvic Control Module",
            rationale:
              "These exercises directly target the muscles that control pelvic stability, addressing the list observed in your WearM.AI data.",
            drills: ["Single Leg Balance Series", "Hip Hinge Progression"],
          },
        },
      },
      {
        day: "Wed",
        date: "Oct 30",
        workout: {
          type: "Easy Run + Strides",
          duration: "50 min",
          intensity: "Zone 2 + Zone 4",
          targetModule: {
            focus: "Ankle Mobility Module",
            rationale:
              "The strides component helps improve ankle range of motion while the easy pace allows for proper form focus.",
            drills: ["Ankle Mobility Routine", "Calf Stretching Sequence"],
          },
        },
      },
      {
        day: "Thu",
        date: "Oct 31",
        workout: {
          type: "Rest",
          duration: "Active Recovery",
          intensity: "Very Low",
        },
      },
      {
        day: "Fri",
        date: "Nov 1",
        workout: {
          type: "Tempo Run",
          duration: "6km",
          intensity: "Zone 3-4",
          targetModule: {
            focus: "Knee Stability Under Load",
            rationale:
              "This workout applies moderate stress to test and strengthen knee stability mechanisms under controlled fatigue.",
            drills: ["Pre-Run Activation", "Post-Run Recovery"],
          },
        },
      },
      {
        day: "Sat",
        date: "Nov 2",
        workout: {
          type: "Cross Training",
          duration: "30 min",
          intensity: "Low",
          targetModule: {
            focus: "Pelvic & Core Stability",
            rationale:
              "Low-impact activity that allows focused work on core and pelvic stability without running load.",
            drills: ["Core Stability Circuit"],
          },
        },
      },
      {
        day: "Sun",
        date: "Nov 3",
        workout: {
          type: "Long Run",
          duration: "10km",
          intensity: "Zone 2",
          targetModule: {
            focus: "Integrated Biomechanics",
            rationale:
              "Longer duration to practice maintaining proper form under fatigue, with specific focus points for each target area.",
            drills: ["Pre-Run Activation", "Post-Run Recovery Sequence"],
          },
        },
      },
    ],
    week2: [
      {
        day: "Mon",
        date: "Nov 4",
        workout: {
          type: "Easy Run",
          duration: "50 min",
          intensity: "Zone 2",
          targetModule: {
            focus: "Knee Stability Focus",
            rationale: "Building on week 1 with slightly longer duration to progressively challenge stability.",
            drills: ["Knee Alignment Drill", "VMO Activation"],
          },
        },
      },
      {
        day: "Tue",
        date: "Nov 5",
        workout: {
          type: "Strength + Mobility",
          duration: "45 min",
          intensity: "Moderate",
          targetModule: {
            focus: "Pelvic Control Module",
            rationale: "Progressing the exercises from week 1 with increased resistance and complexity.",
            drills: ["Advanced Hip Stability", "Single Leg RDL Progression"],
          },
        },
      },
      {
        day: "Wed",
        date: "Nov 6",
        workout: {
          type: "Fartlek Run",
          duration: "55 min",
          intensity: "Zone 2-4",
          targetModule: {
            focus: "Ankle Mobility Under Variable Load",
            rationale: "The varied pace helps develop ankle adaptability while maintaining proper mechanics.",
            drills: ["Dynamic Ankle Prep", "Post-Run Mobility Flow"],
          },
        },
      },
      {
        day: "Thu",
        date: "Nov 7",
        workout: {
          type: "Rest",
          duration: "Active Recovery",
          intensity: "Very Low",
        },
      },
      {
        day: "Fri",
        date: "Nov 8",
        workout: {
          type: "Tempo Run",
          duration: "7km",
          intensity: "Zone 3-4",
          targetModule: {
            focus: "Knee Stability Under Increased Load",
            rationale: "Slightly longer tempo segment to progressively challenge knee stability mechanisms.",
            drills: ["Pre-Run Activation Plus", "Targeted Recovery Protocol"],
          },
        },
      },
      {
        day: "Sat",
        date: "Nov 9",
        workout: {
          type: "Cross Training",
          duration: "35 min",
          intensity: "Low-Moderate",
          targetModule: {
            focus: "Integrated Core & Hip Control",
            rationale: "Focusing on rotational stability and anti-rotation to improve pelvic control.",
            drills: ["Advanced Core Circuit", "Hip Mobility Flow"],
          },
        },
      },
      {
        day: "Sun",
        date: "Nov 10",
        workout: {
          type: "Long Run",
          duration: "12km",
          intensity: "Zone 2",
          targetModule: {
            focus: "Integrated Biomechanics",
            rationale: "Increased distance to build endurance while maintaining form improvements from week 1.",
            drills: ["Extended Warm-up Routine", "Comprehensive Recovery Protocol"],
          },
        },
      },
    ],
    week3: [
      {
        day: "Mon",
        date: "Nov 11",
        workout: {
          type: "Easy Run",
          duration: "45 min",
          intensity: "Zone 2",
          targetModule: {
            focus: "Form Maintenance",
            rationale: "Slightly reduced volume to prepare for the more intense workouts later this week.",
            drills: ["Maintenance Routine", "Light Mobility Work"],
          },
        },
      },
      {
        day: "Tue",
        date: "Nov 12",
        workout: {
          type: "Strength + Plyometrics",
          duration: "50 min",
          intensity: "Moderate-High",
          targetModule: {
            focus: "Advanced Pelvic Stability",
            rationale: "Adding plyometric elements to challenge stability systems under dynamic conditions.",
            drills: ["Plyometric Progression", "Advanced Hip Circuit"],
          },
        },
      },
      {
        day: "Wed",
        date: "Nov 13",
        workout: {
          type: "Hill Repeats",
          duration: "60 min",
          intensity: "Zone 2-5",
          targetModule: {
            focus: "Ankle Drive & Knee Control",
            rationale: "Hill work specifically targets ankle dorsiflexion while challenging knee stability.",
            drills: ["Hill-Specific Warm-up", "Technical Downhill Practice"],
          },
        },
      },
      {
        day: "Thu",
        date: "Nov 14",
        workout: {
          type: "Rest",
          duration: "Active Recovery",
          intensity: "Very Low",
        },
      },
      {
        day: "Fri",
        date: "Nov 15",
        workout: {
          type: "Tempo Run",
          duration: "8km",
          intensity: "Zone 3-4",
          targetModule: {
            focus: "Sustained Form Under Fatigue",
            rationale: "Longer tempo segment to practice maintaining improved mechanics when tired.",
            drills: ["Form Cue Sequence", "Targeted Recovery"],
          },
        },
      },
      {
        day: "Sat",
        date: "Nov 16",
        workout: {
          type: "Cross Training",
          duration: "40 min",
          intensity: "Moderate",
          targetModule: {
            focus: "Complementary Stability Work",
            rationale: "Non-running activity that reinforces the stability patterns we're developing.",
            drills: ["Comprehensive Stability Circuit"],
          },
        },
      },
      {
        day: "Sun",
        date: "Nov 17",
        workout: {
          type: "Long Run",
          duration: "14km",
          intensity: "Zone 2",
          targetModule: {
            focus: "Endurance With Form Focus",
            rationale: "Increased distance with specific form check-ins at regular intervals.",
            drills: ["Long Run Preparation", "Extended Recovery Protocol"],
          },
        },
      },
    ],
    week4: [
      {
        day: "Mon",
        date: "Nov 18",
        workout: {
          type: "Easy Run",
          duration: "40 min",
          intensity: "Zone 2",
          targetModule: {
            focus: "Active Recovery",
            rationale: "Reduced volume to begin tapering for the final assessment at the end of the week.",
            drills: ["Light Technique Drills", "Mobility Maintenance"],
          },
        },
      },
      {
        day: "Tue",
        date: "Nov 19",
        workout: {
          type: "Strength Maintenance",
          duration: "35 min",
          intensity: "Moderate",
          targetModule: {
            focus: "Stability Reinforcement",
            rationale: "Maintaining the gains from previous weeks without excessive fatigue.",
            drills: ["Key Movement Patterns", "Targeted Mobility"],
          },
        },
      },
      {
        day: "Wed",
        date: "Nov 20",
        workout: {
          type: "Speed Play",
          duration: "50 min",
          intensity: "Zone 2-4",
          targetModule: {
            focus: "Form Under Variable Conditions",
            rationale: "Testing improved mechanics across different speeds and intensities.",
            drills: ["Dynamic Form Drills", "Speed Transition Practice"],
          },
        },
      },
      {
        day: "Thu",
        date: "Nov 21",
        workout: {
          type: "Rest",
          duration: "Complete Rest",
          intensity: "None",
        },
      },
      {
        day: "Fri",
        date: "Nov 22",
        workout: {
          type: "Pre-Assessment Shakeout",
          duration: "25 min",
          intensity: "Zone 1-2",
          targetModule: {
            focus: "Form Rehearsal",
            rationale: "Light activity with mental rehearsal of optimal movement patterns.",
            drills: ["Movement Pattern Review", "Mental Rehearsal"],
          },
        },
      },
      {
        day: "Sat",
        date: "Nov 23",
        workout: {
          type: "Assessment Run",
          duration: "5km",
          intensity: "Race Effort",
          targetModule: {
            focus: "Integrated Biomechanics Test",
            rationale: "Testing the improvements in a controlled, measured effort.",
            drills: ["Comprehensive Warm-up", "Full Recovery Protocol"],
          },
        },
      },
      {
        day: "Sun",
        date: "Nov 24",
        workout: {
          type: "Recovery Run",
          duration: "30 min",
          intensity: "Zone 1",
          targetModule: {
            focus: "Active Recovery",
            rationale: "Very easy effort to promote recovery while maintaining movement quality.",
            drills: ["Light Mobility Work", "Recovery Emphasis"],
          },
        },
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PlanHeader title="Your Biomechanically-Optimized Training Plan" />

      <div className="container max-w-md mx-auto px-4 py-2">
        <ScrollArea className="flex-1 px-4 py-6">
        {/* Introduction & Key Biomechanical Targets */}
        <section className="mb-6">
          <h2 className="text-lg font-medium mb-3">Coach's Plan to Enhance Your Form & Performance</h2>
          <Card className="p-4 mb-6">
            <p className="text-sm text-gray-700 mb-4">
              This plan is tailored to help you achieve your sub-50 minute 10k goal while specifically addressing these
              areas identified from your WearM.AI data:
            </p>
          </Card>

          <div className="space-y-3">
            {biomechanicalTargets.map((target) => (
              <BiomechanicalTargetCard
                key={target.id}
                id={target.id}
                icon={target.icon}
                issue={target.issue}
                current={target.current}
                target={target.target}
                progress={target.progress}
              />
            ))}
          </div>
        </section>

        {/* Weekly Plan */}
        <WeeklyPlanTabs weeks={weeks} weekData={weekData} />

        {/* Projected Improvement Visualizer */}
        <section className="mb-6">
          <h2 className="text-lg font-medium mb-3">How This Plan Helps Your Biomechanics (Projected)</h2>
          <ProjectedImprovementChart targets={projectedTargets} />
        </section>
      </ScrollArea>

      <ActionFooter />
      </div>
      <MobileNavbar/> 
    </div>
  )
}

export default LLMGeneratedTrainingPlanV3
