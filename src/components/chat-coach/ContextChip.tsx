"use client"

import type React from "react"
import { X } from "lucide-react"

interface ContextChipProps {
  context: string
  onDismiss: () => void
}

const ContextChip: React.FC<ContextChipProps> = ({ context, onDismiss }) => {
  return (
    <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#e3f7ff] text-[#42b4f7] rounded-full text-xs">
      <span>{context}</span>
      <button onClick={onDismiss} className="text-[#42b4f7] hover:text-[#42b4f7]/80">
        <X size={14} />
        <span className="sr-only">Dismiss</span>
      </button>
    </div>
  )
}

export default ContextChip
