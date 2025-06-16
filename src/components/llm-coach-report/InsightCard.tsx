"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface InsightCardProps {
  title: string
  description: string
  severity: "high" | "medium" | "low" | "info"
  dataSource?: string
  actionLabel?: string
  onActionClick?: () => void
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  severity,
  dataSource,
  actionLabel,
  onActionClick,
}) => {
  const getSeverityColor = () => {
    switch (severity) {
      case "high":
        return "bg-[#6131ca]"
      case "medium":
        return "bg-[#f9ca24]"
      case "low":
        return "bg-[#42b4f7]"
      case "info":
        return "bg-[#83c55b]"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <Card className="mb-3 border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start mb-2">
          <div className={`${getSeverityColor()} w-3 h-3 rounded-full mt-1.5 mr-2 flex-shrink-0`} />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 mb-2">{description}</p>
            {dataSource && <p className="text-xs text-gray-400 mb-2">Data: {dataSource}</p>}
            {actionLabel && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-[#42b4f7] hover:bg-[#e3f7d4] rounded-md"
                onClick={onActionClick}
              >
                {actionLabel}
                <ExternalLink size={14} className="ml-1" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InsightCard
