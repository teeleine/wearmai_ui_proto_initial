"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface NarrativeSectionProps {
  title: string
  content: string | React.ReactNode
  actionLabel?: string
  onActionClick?: () => void
  icon?: React.ReactNode
}

const NarrativeSection: React.FC<NarrativeSectionProps> = ({ title, content, actionLabel, onActionClick, icon }) => {
  return (
    <Card className="mb-4 border border-gray-200 shadow-sm">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-sm text-gray-700 mb-3">{content}</div>
        {actionLabel && (
          <Button
            variant="outline"
            size="sm"
            className="text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full"
            onClick={onActionClick}
          >
            {actionLabel}
            <ExternalLink size={14} className="ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default NarrativeSection
