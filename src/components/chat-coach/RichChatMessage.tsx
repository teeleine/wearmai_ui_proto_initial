"use client"

import type React from "react"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"

interface RichChatMessageProps {
  message: string
  timestamp: Date
  cards?: {
    type: "drill" | "data" | "link" | "action"
    title: string
    description?: string
    linkText?: string
    linkUrl?: string
    actionText?: string
    onAction?: () => void
    imageUrl?: string
  }[]
  quickReplies?: string[]
  onQuickReplyClick?: (reply: string) => void
}

const RichChatMessage: React.FC<RichChatMessageProps> = ({
  message,
  timestamp,
  cards = [],
  quickReplies = [],
  onQuickReplyClick,
}) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex flex-col max-w-[80%]">
        <div className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-800">
          <p className="text-sm whitespace-pre-wrap mb-3">{message}</p>

          {cards.map((card, index) => (
            <Card key={index} className="mb-3 border border-gray-200 overflow-hidden">
              <CardContent className="p-3">
                {card.type === "drill" && (
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{card.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{card.description}</p>
                      <Button variant="ghost" size="sm" className="text-xs text-[#42b4f7] p-0 h-auto" asChild>
                        <Link to="/drill-detail/v1">
                          View Full Drill Details
                          <ChevronRight size={14} className="ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}

                {card.type === "data" && (
                  <div>
                    <h4 className="text-sm font-medium">{card.title}</h4>
                    <div className="flex items-center justify-between my-2">
                      <span className="text-lg font-semibold">{card.description}</span>
                      <div className="text-xs text-gray-500">vs. Avg: 22.1°</div>
                    </div>
                    <div className="h-10 bg-gray-100 rounded-md mb-2">
                      {/* Mini chart placeholder */}
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#42b4f7] w-3/4"></div>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs text-[#42b4f7] p-0 h-auto" asChild>
                      <Link to="/data-explorer/v1">
                        See in Data Explorer
                        <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </Button>
                  </div>
                )}

                {card.type === "link" && (
                  <div>
                    <p className="text-sm mb-2">{card.description}</p>
                    <Button variant="ghost" size="sm" className="text-xs text-[#42b4f7] p-0 h-auto" asChild>
                      <Link to={card.linkUrl || "#"}>
                        {card.linkText}
                        <ExternalLink size={14} className="ml-1" />
                      </Link>
                    </Button>
                  </div>
                )}

                {card.type === "action" && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">{card.title}</h4>
                    <Button variant="outline" size="sm" className="text-xs w-full" onClick={card.onAction}>
                      {card.actionText}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs bg-white text-[#42b4f7] border-[#42b4f7] hover:bg-[#e3f7ff]"
                onClick={() => onQuickReplyClick && onQuickReplyClick(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>
        )}

        <span className="text-xs text-gray-500 mt-1">{format(timestamp, "h:mm a")}</span>
      </div>
    </div>
  )
}

export default RichChatMessage
