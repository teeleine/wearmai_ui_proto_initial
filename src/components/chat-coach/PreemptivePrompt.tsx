"use client"

import type React from "react"
import { Button } from "@/components/ui/button"

interface PreemptivePromptProps {
  text: string
  onClick: () => void
}

const PreemptivePrompt: React.FC<PreemptivePromptProps> = ({ text, onClick }) => {
  return (
    <Button
      variant="outline"
      className="text-sm text-gray-700 bg-white border-gray-200 hover:bg-gray-50 justify-start h-auto py-2 px-3 font-normal"
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

export default PreemptivePrompt
