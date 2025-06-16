"use client"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export type CoachPersona = "motivator" | "analyst" | "guide" | "straightShooter"

interface PersonaSelectorProps {
  selectedPersona: CoachPersona
  onChange: (persona: CoachPersona) => void
  showDescription?: boolean
}

const PersonaSelector = ({ selectedPersona, onChange, showDescription = true }: PersonaSelectorProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-1">Choose Your Coach's Style (Persona)</h3>
        {showDescription && (
          <p className="text-sm text-muted-foreground mb-3">
            Select the persona that best suits your preferred coaching approach.
          </p>
        )}
      </div>

      <RadioGroup value={selectedPersona} onValueChange={(value) => onChange(value as CoachPersona)}>
        <div className="space-y-3">
          <Card
            className={`p-3 cursor-pointer border-2 ${
              selectedPersona === "motivator" ? "border-wearmai-primary" : "border-gray-200"
            }`}
            onClick={() => onChange("motivator")}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="motivator" id="motivator" className="mt-1" />
              <div>
                <Label htmlFor="motivator" className="text-base font-medium cursor-pointer">
                  The Motivator
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Focuses on encouragement, positive reinforcement, and goal achievement.
                </p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-3 cursor-pointer border-2 ${
              selectedPersona === "analyst" ? "border-wearmai-primary" : "border-gray-200"
            }`}
            onClick={() => onChange("analyst")}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="analyst" id="analyst" className="mt-1" />
              <div>
                <Label htmlFor="analyst" className="text-base font-medium cursor-pointer">
                  The Data Analyst
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Provides detailed, data-driven insights and objective analysis.
                </p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-3 cursor-pointer border-2 ${
              selectedPersona === "guide" ? "border-wearmai-primary" : "border-gray-200"
            }`}
            onClick={() => onChange("guide")}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="guide" id="guide" className="mt-1" />
              <div>
                <Label htmlFor="guide" className="text-base font-medium cursor-pointer">
                  The Gentle Guide
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Offers supportive, empathetic feedback with a focus on gradual improvement.
                </p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-3 cursor-pointer border-2 ${
              selectedPersona === "straightShooter" ? "border-wearmai-primary" : "border-gray-200"
            }`}
            onClick={() => onChange("straightShooter")}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="straightShooter" id="straightShooter" className="mt-1" />
              <div>
                <Label htmlFor="straightShooter" className="text-base font-medium cursor-pointer">
                  The Straight-Shooter
                </Label>
                <p className="text-sm text-muted-foreground mt-1">Delivers direct, concise, and no-nonsense advice.</p>
              </div>
            </div>
          </Card>
        </div>
      </RadioGroup>
    </div>
  )
}

export default PersonaSelector
