"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, Calendar } from "lucide-react"

interface ActionFooterProps {
  onAskCoach?: () => void
  onDismiss?: () => void
  onAdjustPlan?: () => void
  showAdjustPlan?: boolean
  className?: string
}

const ActionFooter: React.FC<ActionFooterProps> = ({
  onAskCoach,
  onDismiss,
  onAdjustPlan,
  showAdjustPlan = false,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <Button className="bg-wearmai-primary hover:bg-wearmai-primary/80 text-white" onClick={onAskCoach}>
        <MessageSquare className="mr-2 h-4 w-4" />
        Ask Coach About This Alert
      </Button>
      <Button variant="outline" onClick={onDismiss}>
        <X className="mr-2 h-4 w-4" />
        Dismiss Alert
      </Button>
      {showAdjustPlan && (
        <Button variant="outline" className="border-[#42b4f7] text-[#42b4f7]" onClick={onAdjustPlan}>
          <Calendar className="mr-2 h-4 w-4" />
          See Plan Adjustment Options
        </Button>
      )}
    </div>
  )
}

export default ActionFooter
