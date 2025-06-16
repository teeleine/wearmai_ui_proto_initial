import { Card } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Circle } from "lucide-react"

interface TimelineEvent {
  date: string
  title: string
  type: "workout" | "rest" | "key-session" | "race"
  isAffected?: boolean
  isHighlighted?: boolean
}

interface TimelineVisualizationProps {
  events: TimelineEvent[]
  changeDate: string
}

const TimelineVisualization = ({ events, changeDate }: TimelineVisualizationProps) => {
  return (
    <Card className="p-4 mb-4">
      <h3 className="text-lg font-medium mb-3">Training Timeline Impact</h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {/* Timeline events */}
        <div className="space-y-4">
          {events.map((event, index) => {
            const isChangeDay = event.date === changeDate

            // Determine icon based on event type and if it's affected
            let Icon = Circle
            let iconColor = "text-gray-400"

            if (event.type === "key-session") {
              Icon = event.isAffected ? AlertCircle : CheckCircle
              iconColor = event.isAffected ? "text-amber-500" : "text-green-500"
            } else if (event.type === "race") {
              Icon = CheckCircle
              iconColor = "text-purple-500"
            } else if (event.type === "rest") {
              Icon = Circle
              iconColor = "text-blue-400"
            } else {
              Icon = Circle
              iconColor = "text-gray-400"
            }

            return (
              <div key={index} className={`flex items-start ${isChangeDay ? "animate-pulse" : ""}`}>
                <div className={`relative flex items-center justify-center w-8 h-8 ${iconColor}`}>
                  <Icon
                    size={isChangeDay ? 24 : 20}
                    className={`z-10 ${isChangeDay ? "text-wearmai-primary" : iconColor}`}
                  />
                  {isChangeDay && <div className="absolute inset-0 bg-wearmai-light rounded-full opacity-50"></div>}
                </div>

                <div
                  className={`ml-4 pb-4 ${event.isHighlighted ? "bg-wearmai-light/10 p-2 rounded-md border-l-2 border-wearmai-primary" : ""}`}
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{event.date}</span>
                    {isChangeDay && (
                      <span className="ml-2 text-xs bg-wearmai-primary text-white px-2 py-0.5 rounded-full">
                        Change Day
                      </span>
                    )}
                    {event.isAffected && (
                      <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        Affected
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${isChangeDay ? "font-medium text-wearmai-primary" : ""}`}>
                    {event.title}
                  </p>

                  {event.isAffected && (
                    <p className="text-xs text-amber-600 mt-1">This session may be impacted by today's change.</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

export default TimelineVisualization
