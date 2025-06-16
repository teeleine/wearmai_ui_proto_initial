import { Card } from "@/components/ui/card"

interface WorkoutDetail {
  title: string
  originalTitle?: string
  duration: string
  originalDuration?: string
  intensity: string
  originalIntensity?: string
  load: string
  originalLoad?: string
  focus: string
  originalFocus?: string
}

interface TrackChangesViewProps {
  workout: WorkoutDetail
}

const TrackChangesView = ({ workout }: TrackChangesViewProps) => {
  return (
    <Card className="p-4 border-2 border-wearmai-primary">
      <h3 className="text-lg font-medium mb-3">
        {workout.originalTitle ? (
          <>
            <span className="line-through text-gray-400 mr-2">{workout.originalTitle}</span>
            <span className="text-wearmai-primary">{workout.title}</span>
          </>
        ) : (
          workout.title
        )}
      </h3>
      <ul className="space-y-3">
        <li className="flex items-start">
          <span className="font-medium w-24">Duration:</span>
          {workout.originalDuration ? (
            <div>
              <span className="line-through text-gray-400 mr-2">{workout.originalDuration}</span>
              <span className="text-wearmai-primary font-medium">{workout.duration}</span>
            </div>
          ) : (
            <span>{workout.duration}</span>
          )}
        </li>
        <li className="flex items-start">
          <span className="font-medium w-24">Intensity:</span>
          {workout.originalIntensity ? (
            <div>
              <span className="line-through text-gray-400 mr-2">{workout.originalIntensity}</span>
              <span className="text-wearmai-primary font-medium">{workout.intensity}</span>
            </div>
          ) : (
            <span>{workout.intensity}</span>
          )}
        </li>
        <li className="flex items-start">
          <span className="font-medium w-24">Expected Load:</span>
          {workout.originalLoad ? (
            <div>
              <span className="line-through text-gray-400 mr-2">{workout.originalLoad}</span>
              <span className="text-wearmai-primary font-medium">{workout.load}</span>
            </div>
          ) : (
            <span>{workout.load}</span>
          )}
        </li>
        <li className="flex items-start">
          <span className="font-medium w-24">Key Focus:</span>
          {workout.originalFocus ? (
            <div>
              <span className="line-through text-gray-400 mr-2">{workout.originalFocus}</span>
              <span className="text-wearmai-primary font-medium">{workout.focus}</span>
            </div>
          ) : (
            <span>{workout.focus}</span>
          )}
        </li>
      </ul>
    </Card>
  )
}

export default TrackChangesView
