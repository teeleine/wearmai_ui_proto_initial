import type React from "react"

interface Step {
  text: string
  hasImage?: boolean
}

interface StepByStepProps {
  steps: Step[]
  title?: string
  compact?: boolean
}

const StepByStep: React.FC<StepByStepProps> = ({ steps, title = "Step-by-Step Instructions", compact = false }) => {
  return (
    <div className="w-full">
      <h3 className={`font-medium text-gray-900 ${compact ? "text-sm mb-2" : "text-base mb-3"}`}>{title}</h3>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={index} className={`flex ${compact ? "gap-2" : "gap-3"}`}>
            <div
              className={`flex-shrink-0 ${compact ? "w-5 h-5" : "w-6 h-6"} rounded-full bg-wearmai-primary text-white flex items-center justify-center font-medium`}
            >
              {index + 1}
            </div>
            <div className="flex-1">
              <p className={`text-gray-700 ${compact ? "text-sm" : "text-base"}`}>{step.text}</p>

              {step.hasImage && !compact && (
                <div className="mt-2 h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500">Step {index + 1} image</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default StepByStep
