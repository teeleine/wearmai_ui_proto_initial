import type React from "react"
import Header from "@/components/Header"
import ChatButton from "@/components/dashboard/ChatButton"
import RunListItem from "@/components/run-history/RunListItem"
import FilterButton from "@/components/run-history/FilterButton"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

// Sample run data
const runs = [
  { date: "May 16, 2025", distance: 5.2, pace: "5:30 min/km", loadLevel: "High" as const, hasFeedback: true },
  { date: "May 14, 2025", distance: 8.0, pace: "5:45 min/km", loadLevel: "Medium" as const, hasFeedback: true },
  { date: "May 12, 2025", distance: 3.5, pace: "5:20 min/km", loadLevel: "Low" as const, hasFeedback: true },
  { date: "May 9, 2025", distance: 10.0, pace: "6:00 min/km", loadLevel: "High" as const, hasFeedback: true },
  { date: "May 7, 2025", distance: 5.0, pace: "5:35 min/km", loadLevel: "Medium" as const, hasFeedback: false },
  { date: "May 5, 2025", distance: 6.5, pace: "5:40 min/km", loadLevel: "Low" as const, hasFeedback: true },
  { date: "May 2, 2025", distance: 4.0, pace: "5:25 min/km", loadLevel: "Medium" as const, hasFeedback: true },
  { date: "April 29, 2025", distance: 7.5, pace: "5:50 min/km", loadLevel: "High" as const, hasFeedback: true },
  { date: "April 27, 2025", distance: 5.5, pace: "5:30 min/km", loadLevel: "Medium" as const, hasFeedback: false },
  { date: "April 24, 2025", distance: 9.0, pace: "6:05 min/km", loadLevel: "High" as const, hasFeedback: true },
]

const RunHistoryV1: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header title="Run History" showBackButton={true} />

      <div className="container max-w-md mx-auto px-4 py-4 pb-20">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-[#2d3748]">Run History</h1>
          <FilterButton />
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {runs.map((run, index) => (
            <RunListItem
              key={index}
              date={run.date}
              distance={run.distance}
              pace={run.pace}
              loadLevel={run.loadLevel}
              hasFeedback={run.hasFeedback}
            />
          ))}
        </div>
      </div>
      <MobileNavbar/>
    </div>
  )
}

export default RunHistoryV1
