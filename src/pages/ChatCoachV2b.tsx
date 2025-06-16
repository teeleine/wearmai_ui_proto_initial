"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header"
import ChatInput from "@/components/chat-coach/ChatInput"
import ChatMessage from "@/components/chat-coach/ChatMessage"
import RichChatMessage from "@/components/chat-coach/RichChatMessage"
import ContextChip from "@/components/chat-coach/ContextChip"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

// Variation 2b: LLM Responses with Structured "Cards" & Interactive Elements

const ChatCoachV2b: React.FC = () => {
  const [messages, setMessages] = useState<
    Array<{
      text: string
      isUser: boolean
      timestamp: Date
      cards?: any[]
      quickReplies?: string[]
      isRich?: boolean
    }>
  >([
    {
      text: "Hi Alex, I'm your AI running coach. How can I help you today?",
      isUser: false,
      timestamp: new Date(Date.now() - 60000),
      isRich: false,
    },
  ])
  const [context, setContext] = useState<string | null>("Right Knee Impact from Run on May 16, 2025")

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true, timestamp: new Date(), isRich: false }])

    // Simulate AI response
    setTimeout(() => {
      if (message.toLowerCase().includes("knee") || message.toLowerCase().includes("impact")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "I've analyzed the data from your May 16th run. Your right knee is experiencing higher forces than usual:",
            isUser: false,
            timestamp: new Date(),
            isRich: true,
            cards: [
              {
                type: "data",
                title: "Key Metric: Right Knee Peak Force",
                description: "2.8x body weight",
              },
            ],
            quickReplies: ["Why is this happening?", "Is this a problem?", "How can I fix this?"],
          },
        ])
      } else if (message.toLowerCase().includes("why is this happening")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "The increased knee force appears to be related to your pelvic stability. During the final kilometer of your run, I noticed:",
            isUser: false,
            timestamp: new Date(),
            isRich: true,
            cards: [
              {
                type: "data",
                title: "Right Pelvic Drop Angle",
                description: "5.2°",
              },
            ],
            quickReplies: ["What causes pelvic drop?", "Show me exercises to fix this"],
          },
        ])
      } else if (message.toLowerCase().includes("exercise") || message.toLowerCase().includes("fix this")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "Here's a key exercise to help improve your pelvic stability and reduce knee forces:",
            isUser: false,
            timestamp: new Date(),
            isRich: true,
            cards: [
              {
                type: "drill",
                title: "Glute Bridge",
                description: "Targets: Glutes, Core, Hip Stabilizers",
              },
            ],
            quickReplies: ["Show me more exercises", "When should I do these?", "Will this fix my knee issue?"],
          },
        ])
      } else if (message.toLowerCase().includes("training plan") || message.toLowerCase().includes("schedule")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "Here's your training plan for the next week. I've adjusted it slightly to account for your knee loading pattern:",
            isUser: false,
            timestamp: new Date(),
            isRich: true,
            cards: [
              {
                type: "action",
                title: "Modified Training Plan",
                actionText: "Add to my calendar",
              },
            ],
            quickReplies: ["Why these changes?", "Is this enough recovery?"],
          },
        ])
      } else if (message.toLowerCase().includes("pelvic stability") || message.toLowerCase().includes("pelvic drop")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "Pelvic stability refers to how well your pelvis maintains its position during running. Poor stability can lead to increased forces elsewhere in the body.",
            isUser: false,
            timestamp: new Date(),
            isRich: true,
            cards: [
              {
                type: "link",
                description: "Want to learn more about how pelvic mechanics affect running?",
                linkText: "Read about pelvic stability in running",
                linkUrl: "#",
              },
            ],
            quickReplies: ["How's my pelvic stability?", "Show me stability exercises"],
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "I can help you with questions about your running performance, biomechanics, training plan, or recovery strategies. Based on your recent data, here are some areas we could focus on:",
            isUser: false,
            timestamp: new Date(),
            isRich: true,
            cards: [
              {
                type: "data",
                title: "Training Sustainability Score",
                description: "65/100",
              },
            ],
            quickReplies: ["Tell me about my knee impact", "Show me recovery exercises", "How's my training plan?"],
          },
        ])
      }
    }, 1000)
  }

  const handleQuickReplyClick = (reply: string) => {
    handleSendMessage(reply)
  }

  const handleDismissContext = () => {
    setContext(null)
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Header title="Chat with Your AI Coach" showBackButton={true} />

      <div className="flex-1 container max-w-md mx-auto px-4 py-4 pb-20 flex flex-col">
        {context && (
          <div className="mb-4">
            <ContextChip context={`Continuing discussion about: ${context}`} onDismiss={handleDismissContext} />
          </div>
        )}

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

        <div className="sticky bottom-0 bg-[#f8f9fa] pt-2">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>

      <MobileNavbar />
    </div>
  )
}

export default ChatCoachV2b
