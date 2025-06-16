import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface LLMExplanationProps {
  title: string
  content: string
  className?: string
}

const LLMExplanation: React.FC<LLMExplanationProps> = ({ title, content, className = "" }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-base font-medium text-gray-800 mb-2">{title}</h2>
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <p className="text-sm text-gray-700">{content}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default LLMExplanation
