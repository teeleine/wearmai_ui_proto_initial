"use client"

import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { useState } from "react"

interface ActionButtonsProps {
  onAccept: () => void
  onReject: () => void
  onDiscuss: () => void
}

const ActionButtons = ({ onAccept, onReject, onDiscuss }: ActionButtonsProps) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-6">
      <Button
        className={`flex-1 bg-wearmai-primary hover:bg-wearmai-primary/80 flex items-center gap-2 transition-all duration-300 ${isHovering ? "scale-105" : ""}`}
        onClick={onAccept}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Check size={18} />
        Accept This Suggestion
      </Button>
      <Button variant="outline" className="flex-1 flex items-center gap-2" onClick={onReject}>
        <X size={18} />
        Keep Original Plan
      </Button>
    </div>
  )
}

export default ActionButtons
