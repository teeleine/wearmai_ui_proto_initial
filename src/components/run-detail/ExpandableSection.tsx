"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ExpandableSectionProps {
  title: string
  defaultExpanded?: boolean
  children: React.ReactNode
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, defaultExpanded = false, children }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full p-4 flex justify-between items-center bg-gray-50 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-base font-medium text-gray-700">{title}</h2>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isExpanded && <div className="p-4 bg-white">{children}</div>}
    </div>
  )
}

export default ExpandableSection
