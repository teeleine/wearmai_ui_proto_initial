"use client"

import type React from "react"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

interface Step {
  text: string
  checked?: boolean
}

interface InteractiveChecklistProps {
  steps: Step[]
  title?: string
  onChange?: (index: number, checked: boolean) => void
}

const InteractiveChecklist: React.FC<InteractiveChecklistProps> = ({
  steps: initialSteps,
  title = "Follow These Steps:",
  onChange,
}) => {
  const [steps, setSteps] = useState(initialSteps)

  const handleCheckChange = (index: number, checked: boolean) => {
    const newSteps = [...steps]
    newSteps[index] = { ...newSteps[index], checked }
    setSteps(newSteps)

    if (onChange) {
      onChange(index, checked)
    }
  }

  return (
    <div className="w-full">
      <h3 className="font-medium text-base mb-3 text-gray-900">{title}</h3>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            <Checkbox
              id={`step-${index}`}
              checked={step.checked}
              onCheckedChange={(checked) => handleCheckChange(index, checked as boolean)}
              className="mt-1"
            />
            <label
              htmlFor={`step-${index}`}
              className={`text-base ${step.checked ? "text-gray-500 line-through" : "text-gray-700"}`}
            >
              {step.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InteractiveChecklist
