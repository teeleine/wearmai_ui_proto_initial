"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

interface ExplainButtonProps {
  onClick: () => void
}

const ExplainButton: React.FC<ExplainButtonProps> = ({ onClick }) => {
  return (
    <Button
      className="w-full bg-[#42b4f7] hover:bg-[#42b4f7]/80 text-white flex items-center justify-center mb-6"
      onClick={onClick}
    >
      <MessageSquare size={18} className="mr-2" />
      Ask Coach About This Graph
    </Button>
  )
}

export default ExplainButton
