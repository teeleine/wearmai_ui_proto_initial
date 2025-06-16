import { Card } from "@/components/ui/card"

interface WorkoutDetail {
  title: string
  duration: string
  intensity: string
  load: string
  focus: string
}

interface SideBySideComparisonProps {
  currentWorkout: WorkoutDetail
  suggestedWorkout: WorkoutDetail
}

const SideBySideComparison = ({ currentWorkout, suggestedWorkout }: SideBySideComparisonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4 border-2 border-gray-200">
        <h3 className="text-lg font-medium mb-3">Originally Scheduled: {currentWorkout.title}</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="font-medium w-24">Duration:</span>
            <span>{currentWorkout.duration}</span>
          </li>
          <li className="flex items-start">
            <span className="font-medium w-24">Intensity:</span>
            <span>{currentWorkout.intensity}</span>
          </li>
          <li className="flex items-start">
            <span className="font-medium w-24">Expected Load:</span>
            <span>{currentWorkout.load}</span>
          </li>
          <li className="flex items-start">
            <span className="font-medium w-24">Key Focus:</span>
            <span>{currentWorkout.focus}</span>
          </li>
        </ul>
      </Card>

      <Card className="p-4 border-2 border-wearmai-primary bg-wearmai-light/10">
        <h3 className="text-lg font-medium mb-3 text-wearmai-primary">New Suggestion: {suggestedWorkout.title}</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="font-medium w-24">Duration:</span>
            <span
              className={
                currentWorkout.duration !== suggestedWorkout.duration ? "text-wearmai-primary font-medium" : ""
              }
            >
              {suggestedWorkout.duration}
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-medium w-24">Intensity:</span>
            <span
              className={
                currentWorkout.intensity !== suggestedWorkout.intensity ? "text-wearmai-primary font-medium" : ""
              }
            >
              {suggestedWorkout.intensity}
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-medium w-24">Expected Load:</span>
            <span className={currentWorkout.load !== suggestedWorkout.load ? "text-wearmai-primary font-medium" : ""}>
              {suggestedWorkout.load}
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-medium w-24">Key Focus:</span>
            <span className={currentWorkout.focus !== suggestedWorkout.focus ? "text-wearmai-primary font-medium" : ""}>
              {suggestedWorkout.focus}
            </span>
          </li>
        </ul>
      </Card>
    </div>
  )
}

export default SideBySideComparison
