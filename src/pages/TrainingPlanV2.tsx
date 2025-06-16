import Header from "@/components/Header"
import AgendaView from "@/components/training-plan/AgendaView"
import { useNavigate } from "react-router-dom"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import ChatButton from "@/components/dashboard/ChatButton"

// V2: Agenda List View

const TrainingPlanV2 = () => {
  const navigate = useNavigate()

  const handleViewCalendar = () => {
    navigate("/training-plan/v1")
  }

  const handleWorkoutSelect = (workout: any) => {
    console.log("Selected workout:", workout)
    // Would navigate to workout detail screen in a real app
  }

  const handleSuggestionSelect = (workout: any) => {
    console.log("Selected suggestion:", workout)
    // Would navigate to proposed plan change screen in a real app
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <div className="container max-w-md mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6 text-[#2d3748]">My Training Plan</h1>

        <div className="mb-6">
          <AgendaView
            onViewCalendar={handleViewCalendar}
            onWorkoutSelect={handleWorkoutSelect}
            onSuggestionSelect={handleSuggestionSelect}
          />
        </div>
      </div>

      <MobileNavbar />
    </div>
  )
}

export default TrainingPlanV2
