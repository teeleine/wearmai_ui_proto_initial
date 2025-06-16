"use client"

import type React from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface RunPhaseSelectorProps {
  currentPhase: "full-run" | "start" | "middle" | "end"
  onPhaseChange: (phase: "full-run" | "start" | "middle" | "end") => void
}

const RunPhaseSelector: React.FC<RunPhaseSelectorProps> = ({ currentPhase, onPhaseChange }) => {
  return (
    <div className="w-full">
      <p className="text-xs text-muted-foreground mb-1">Run Phase</p>
      <ToggleGroup
        type="single"
        value={currentPhase}
        onValueChange={(value) => value && onPhaseChange(value as any)}
        className="justify-between w-full"
      >
        <ToggleGroupItem value="full-run" aria-label="Full Run" className="flex-1">
          <span className="text-xs">Full Run</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="start" aria-label="Start" className="flex-1">
          <span className="text-xs">Start</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="middle" aria-label="Middle" className="flex-1">
          <span className="text-xs">Middle</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="end" aria-label="End" className="flex-1">
          <span className="text-xs">End</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export default RunPhaseSelector
