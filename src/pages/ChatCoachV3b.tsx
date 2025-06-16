"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header"
import ChatOverlay from "@/components/chat-coach/ChatOverlay"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ChartArea from "@/components/data-explorer/ChartArea"
import { useNavigate } from "react-router-dom"

// Variation 3b: Modal/Bottom Sheet Overlay Chat Invocation

const ChatCoachV3b: React.FC = () => {
  const navigate = useNavigate()
  const [showChatOverlay, setShowChatOverlay] = useState(false)
  const [overlayContext, setOverlayContext] = useState<string | null>(null)

  const handleChatButtonClick = () => {
    setOverlayContext("general questions")
    setShowChatOverlay(true)
  }

  const handleExplainChartClick = () => {
    setOverlayContext("Pace Chart from May 16th Run")
    setShowChatOverlay(true)
  }

  const handleCloseOverlay = () => {
    setShowChatOverlay(false)
  }

  const handleExpandOverlay = () => {
    // Navigate to the full chat screen with context
    navigate("/chat-coach/v3a")
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header title="Data Explorer: Pace" showBackButton={true} />

      <div className="container max-w-md mx-auto px-4 py-4 pb-20">
        <Card className="mb-6">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-4">
              This screen demonstrates how the chat interface can be invoked as an overlay. You can:
            </p>
            <ol className="text-sm text-gray-600 list-decimal pl-5 mb-4 space-y-2">
              <li>Click the floating chat button in the bottom right</li>
              <li>Click the "magic wand" icon on the chart to ask about that specific data</li>
            </ol>
            <p className="text-sm text-gray-600">
              The overlay will appear with context from where you triggered it, and you can expand it to a full screen
              chat.
            </p>
          </CardContent>
        </Card>

        <ChartArea
          title="Pace (min/km)"
          yAxisLabel="Pace"
          xAxisLabel="Distance (km)"
          onExplainClick={handleExplainChartClick}
          showMagicIcon={true}
          showAnnotations={true}
        />

        <div className="mt-6">
          <h3 className="text-base font-medium mb-2">Other Data</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="border border-gray-200">
              <CardContent className="p-3">
                <h4 className="text-sm font-medium mb-1">Heart Rate</h4>
                <div className="h-10 bg-gray-100 rounded-md"></div>
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleExplainChartClick}>
                    <Sparkles size={14} className="text-[#42b4f7]" />
                    <span className="sr-only">Explain</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-200">
              <CardContent className="p-3">
                <h4 className="text-sm font-medium mb-1">Cadence</h4>
                <div className="h-10 bg-gray-100 rounded-md"></div>
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleExplainChartClick}>
                    <Sparkles size={14} className="text-[#42b4f7]" />
                    <span className="sr-only">Explain</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>


      {/* Chat Overlay */}
      {showChatOverlay && (
        <ChatOverlay
          title={overlayContext === "general questions" ? "Quick Help from Coach" : `Explain This Chart?`}
          onClose={handleCloseOverlay}
          onExpand={handleExpandOverlay}
          initialContext={overlayContext}
        />
      )}

      <MobileNavbar onChatClick={handleChatButtonClick} />
    </div>
  )
}

export default ChatCoachV3b
