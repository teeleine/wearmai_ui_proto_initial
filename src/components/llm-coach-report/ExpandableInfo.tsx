"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ExpandableInfoProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
}

const ExpandableInfo: React.FC<ExpandableInfoProps> = ({ title, children, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <Card className="mb-4 border border-gray-200 shadow-sm">
      <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {isExpanded && <CardContent className="pt-0 pb-4 text-sm text-gray-600">{children}</CardContent>}
    </Card>
  )
}

export default ExpandableInfo
