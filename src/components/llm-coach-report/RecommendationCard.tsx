"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface RecommendationCardProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onActionClick?: () => void
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onActionClick,
}) => {
  return (
    <Card className="mb-3 border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="bg-[#42b4f7]/10 p-2 rounded-full mr-3 flex-shrink-0">
            <Icon size={18} className="text-[#42b4f7]" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 mb-2">{description}</p>
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
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RecommendationCard
