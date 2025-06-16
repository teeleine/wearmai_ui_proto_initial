"use client"

import type React from "react"
import { useState } from "react"
import { X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatInput from "./ChatInput"
import ChatMessage from "./ChatMessage"

interface ChatOverlayProps {
  title: string
  onClose: () => void
  onExpand: () => void
  initialContext?: string
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ title, onClose, onExpand, initialContext }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp: Date }>>(
    initialContext
      ? [
          {
            text: `I see you're looking at ${initialContext}. How can I help you with that?`,
            isUser: false,
            timestamp: new Date(),
          },
        ]
      : [],
  )

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true, timestamp: new Date() }])

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm your AI coach. I can help answer questions about your running data, biomechanics, and training plan.",
          isUser: false,
          timestamp: new Date(),
        },
      ])
    }, 1000)
  }

  return (
    <div className="fixed bottom-16 right-4 w-[90%] max-w-sm h-[60vh] max-h-[500px] bg-white rounded-lg shadow-lg flex flex-col border border-gray-200 z-50">
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onExpand}>
            <Maximize2 size={16} />
            <span className="sr-only">Expand</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X size={16} />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 bg-white">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
        ))}
      </div>

      <ChatInput onSendMessage={handleSendMessage} placeholder="Ask a question..." />
    </div>
  )
}

export default ChatOverlay
