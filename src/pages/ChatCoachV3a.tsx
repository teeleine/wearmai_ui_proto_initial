"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "@/components/Header"
import ChatInput from "@/components/chat-coach/ChatInput"
import ChatMessage from "@/components/chat-coach/ChatMessage"
import RichChatMessage from "@/components/chat-coach/RichChatMessage"
import ContextChip from "@/components/chat-coach/ContextChip"
import PreemptivePrompt from "@/components/chat-coach/PreemptivePrompt"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"

// Variation 3a: Full Screen Chat Invocation

const ChatCoachV3a: React.FC = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<
    Array<{
      text: string
      isUser: boolean
      timestamp: Date
      cards?: any[]
      quickReplies?: string[]
      isRich?: boolean
    }>
  >([])
  const [context, setContext] = useState<string | null>("Pace Chart from Run on May 16, 2025")

  // Contextual prompts based on the chart context
  const contextualPrompts = [
    "What does this peak mean?",
    "Is this pace pattern good or bad?",
    "Why did my pace slow in the middle?",
    "How does this compare to my usual pace?",
  ]

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true, timestamp: new Date(), isRich: false }])

    // Simulate AI response
    setTimeout(() => {
      if (message.toLowerCase().includes("peak") || message.toLowerCase().includes("spike")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "The pace peak you're seeing at the 3.5km mark indicates a sudden slowdown. This coincides with the uphill section of your route, which explains the temporary reduction in pace.",
            isUser: false,
            timestamp: new Date(),
            isRich: true,
            cards: [
              {
                type: "data",
                title: "Elevation at Pace Peak",
                description: "+15m gain",
              },
            ],
            quickReplies: ["How was my hill technique?", "Should I maintain even pace on hills?"],
          },
        ])
      } else if (message.toLowerCase().includes("good or bad") || message.toLowerCase().includes("pattern")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "Your pace pattern shows good consistency overall, with natural variation on hills. The slight slowing trend in the final kilometer (5:40/km vs starting 5:25/km) suggests some fatigue, but it's within a normal range for this distance.",
            isUser: false,
            timestamp: new Date(),
            isRich: false,
          },
        ])
      } else if (message.toLowerCase().includes("slow in the middle")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "The slower pace in the middle section (kilometers 2-3) corresponds with two factors:",
            isUser: false,
            timestamp: new Date(),
            isRich: true,
            cards: [
              {
                type: "data",
                title: "Middle Section Pace",
                description: "5:45 min/km",
              },
            ],
            quickReplies: ["How can I maintain better pace?", "Is this affecting my efficiency?"],
          },
        ])
      } else if (message.toLowerCase().includes("compare") || message.toLowerCase().includes("usual pace")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "Compared to your usual 5km pace over the past month, this run was:",
            isUser: false,
            timestamp: new Date(),
            isRich: true,
            cards: [
              {
                type: "data",
                title: "Pace Comparison",
                description: "2% faster overall",
              },
            ],
            quickReplies: ["What's improving in my running?", "Show me my pace trends"],
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "I see you're looking at the pace chart from your May 16th run. Your average pace was 5:30 min/km with some variation throughout. What specific aspect of the pace data would you like me to explain?",
            isUser: false,
            timestamp: new Date(),
            isRich: false,
          },
        ])
      }
    }, 1000)
  }

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt)
  }

  const handleQuickReplyClick = (reply: string) => {
    handleSendMessage(reply)
  }

  const handleDismissContext = () => {
    setContext(null)
  }

  const handleBackToChart = () => {
    navigate("/data-explorer/v1")
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Header title="Chat with Your AI Coach" showBackButton={true} />

      <div className="flex-1 container max-w-md mx-auto px-4 py-4 pb-20 flex flex-col">
        {context && (
          <div className="mb-4 flex items-center justify-between">
            <ContextChip context={`Explaining: ${context}`} onDismiss={handleDismissContext} />
            <Button variant="ghost" size="sm" className="text-xs" onClick={handleBackToChart}>
              <ArrowLeft size={14} className="mr-1" />
              Back to chart
            </Button>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col">
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100 flex items-center">
              <Sparkles size={20} className="text-[#42b4f7] mr-3 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                I can help explain the pace chart from your May 16th run. What would you like to know?
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 mb-4">
              {contextualPrompts.map((prompt, index) => (
                <PreemptivePrompt key={index} text={prompt} onClick={() => handlePromptClick(prompt)} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, index) =>
              msg.isRich ? (
                <RichChatMessage
                  key={index}
                  message={msg.text}
                  timestamp={msg.timestamp}
                  cards={msg.cards}
                  quickReplies={msg.quickReplies}
                  onQuickReplyClick={handleQuickReplyClick}
                />
              ) : (
                <ChatMessage key={index} message={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
              ),
            )}
          </div>
        )}

        <div className="sticky bottom-0 bg-[#f8f9fa] pt-2">
          <ChatInput onSendMessage={handleSendMessage} placeholder="Ask about this chart..." />
        </div>
      </div>

      <MobileNavbar />
    </div>
  )
}

export default ChatCoachV3a
