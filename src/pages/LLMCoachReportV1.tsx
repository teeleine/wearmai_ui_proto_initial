import type React from "react"
import Header from "@/components/Header"
import TabNavigation from "@/components/run-detail/TabNavigation"
import NarrativeSection from "@/components/llm-coach-report/NarrativeSection"
import ExpandableInfo from "@/components/llm-coach-report/ExpandableInfo"
import FormComparisonVisual from "@/components/llm-coach-report/FormComparisonVisual"
import ProgressTrendChart from "@/components/llm-coach-report/ProgressTrendChart"
import GaitCycleAnalysis from "@/components/llm-coach-report/GaitCycleAnalysis"
import { Activity, Dumbbell, Footprints } from 'lucide-react'
import MobileNavbar from "@/components/dashboard/MobileNavBar"

const LLMCoachReportV1: React.FC = () => {
  // Sample run date
  const runDate = "May 16, 2025"

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header title={`Coach Report: ${runDate}`} showBackButton={true} />

      <div className="container max-w-md mx-auto px-4 py-4 pb-20">
        <TabNavigation activeTab="coach-report" />

        <div className="mt-6">
          <div className="bg-[#f0f7ff] p-4 rounded-lg mb-6">
            <h1 className="text-lg font-medium text-[#42b4f7] mb-2">Let's break down your run, Alex!</h1>
            <p className="text-sm text-gray-700">
              Great effort on your 5.2 km run today! Overall, your pacing was consistent. I've analyzed your
              biomechanics and how your body handled the load, and there are a few interesting points to discuss to help
              you keep running strong and injury-free.
            </p>
          </div>

          <FormComparisonVisual />

          <NarrativeSection
            title="Your Movement & Form"
            icon={<Footprints size={18} className="text-[#42b4f7]" />}
            content={
              <>
                <p className="mb-2">
                  During this run, your <strong>pelvic stability</strong> was generally good, but I noticed a slight
                  increase in your <strong>right pelvic drop</strong> (avg 5.2° in the last km vs. 3.8° earlier). This
                  often happens with fatigue and can put extra strain on your right knee, which did show a{" "}
                  <strong>higher peak force</strong> (2.8x body weight) compared to your left.
                </p>
                <p className="mb-2">
                  We want to keep an eye on that. Your <strong>hip flexion</strong> on both sides (avg 22.5° L, 21.9° R)
                  was in a healthy range, showing good power generation.
                </p>
                <div className="bg-[#f0f7ff] p-3 rounded-md mb-3">
                  <p className="text-xs text-gray-600">
                    <strong className="text-[#42b4f7]">Pelvic stability</strong> refers to how well your pelvis stays
                    level while running. A drop on one side can indicate muscle imbalance or fatigue.
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <p className="text-xs text-gray-500 mb-1">3D Body Visualization</p>
                  <div className="w-24 h-36 bg-gray-200 rounded-md mx-auto relative">
                    <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-[#f9ca24] bg-opacity-50 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-[#6131ca] bg-opacity-50 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </>
            }
            actionLabel="View Body Map"
          />

          <GaitCycleAnalysis />

          <NarrativeSection
            title="How Your Body Responded (Load & Risk)"
            icon={<Activity size={18} className="text-[#42b4f7]" />}
            content={
              <>
                <p className="mb-2">
                  In terms of muscle effort, your <strong>quadriceps and glutes</strong> did most of the work, which is
                  expected. However, the <strong>load on your left calf</strong> seems a bit higher than usual.
                </p>
                <p className="mb-2">
                  Combined with the pelvic drop, this puts you at a slight risk for ITB discomfort if it becomes a
                  consistent pattern. For now, the overall risk is <strong>moderate</strong>.
                </p>
                <div className="flex items-center justify-center my-3">
                  <div className="w-8 h-8 rounded-full bg-[#f9ca24] flex items-center justify-center">
                    <span className="text-white font-bold">!</span>
                  </div>
                  <div className="h-1 w-8 bg-gray-200"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 font-bold">!</span>
                  </div>
                  <div className="h-1 w-8 bg-gray-200"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 font-bold">!</span>
                  </div>
                </div>
              </>
            }
            actionLabel="Show Calf Load on Body Map"
          />

          <ProgressTrendChart />

          <NarrativeSection
            title="What To Focus On Next"
            icon={<Dumbbell size={18} className="text-[#42b4f7]" />}
            content={
              <>
                <p className="mb-2">
                  So, to help with that pelvic stability and knee load, I recommend adding{" "}
                  <strong>Glute Bridges</strong> to your routine. They're great for strengthening those key supporting
                  muscles.
                </p>
                <p className="mb-2">Try 2 sets of 12 reps, 3 times a week.</p>
                <p className="mb-2">
                  Also, pay attention to landing a bit softer on your right side on your next few runs.
                </p>
                <div className="bg-[#e3f7d4] p-3 rounded-md">
                  <p className="text-sm text-gray-700 font-medium">Glute Bridge Technique:</p>
                  <ol className="text-xs text-gray-600 list-decimal pl-4 mt-1">
                    <li>Lie on your back with knees bent, feet flat on the floor</li>
                    <li>Push through your heels to lift your hips off the ground</li>
                    <li>Squeeze your glutes at the top</li>
                    <li>Lower slowly and repeat</li>
                  </ol>
                </div>
              </>
            }
            actionLabel="View Glute Bridge Drill"
          />

          <ExpandableInfo title="Curious about the data?">
            <p className="mb-2">
              <strong>Pelvic drop</strong> is measured by the 'pelvic_list_angle_avg' from your sensors, which tracks
              the side-to-side tilt of your pelvis during running.
            </p>
            <p className="mb-2">
              <strong>Joint forces</strong> are calculated based on your weight, running speed, and the angles of your
              joints during impact.
            </p>
            <p>
              <strong>Muscle load</strong> is estimated from joint angles and forces, showing which muscles are working
              hardest during your run.
            </p>
          </ExpandableInfo>
        </div>
      </div>
      <MobileNavbar/>
    </div>
  )
}

export default LLMCoachReportV1
