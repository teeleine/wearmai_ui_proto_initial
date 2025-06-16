"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header"
import ChatInput from "@/components/chat-coach/ChatInput"
import ChatMessage from "@/components/chat-coach/ChatMessage"
import PreemptivePrompt from "@/components/chat-coach/PreemptivePrompt"
import ContextChip from "@/components/chat-coach/ContextChip"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

// Variation 1a: Static & Generic Pre-emptive Prompts

const ChatCoachV1a: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp: Date }>>([])
  const [context, setContext] = useState<string | null>("Right Knee Impact from Run on May 16, 2025")

  const preemptivePrompts = [
    "Analyze my last run",
    "Suggest some recovery drills",
    "Explain 'pelvic stability'",
    "What's my current training focus?",
  ]

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true, timestamp: new Date() }])

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (message.toLowerCase().includes("last run")) {
        response =
          "Your last run on May 16th showed good overall performance. You maintained a consistent pace of 5:30 min/km over 5.2 km. Your cadence averaged 172 steps per minute, which is in your optimal range.\n\nI noticed your right knee experienced slightly higher forces than usual (2.8x body weight vs. your average of 2.5x). This might be related to the increased pelvic drop on your right side during the last kilometer."
      } else if (message.toLowerCase().includes("recovery") || message.toLowerCase().includes("drill")) {
        response =
          "Based on your recent activity and the higher forces in your right knee, I'd recommend these recovery drills:\n\n1. Glute bridges (2 sets of 12 reps)\n2. Single-leg balance (30 seconds each side)\n3. Gentle foam rolling for your calves and quads\n\nThese will help address the slight pelvic instability I noticed in your last run."
      } else if (message.toLowerCase().includes("pelvic stability")) {
        response =
          "Pelvic stability refers to how well your pelvis maintains its position during movement, especially running. Good pelvic stability means minimal dropping or tilting to either side when you're on one leg.\n\nIn your case, I've noticed a slight right pelvic drop (averaging 5.2° in your last run), which can increase forces on your right knee and potentially lead to IT band issues if not addressed."
      } else if (message.toLowerCase().includes("training focus")) {
        response =
          "Your current training focus is building endurance while improving running economy. We're working on gradually increasing your weekly mileage (currently at 25 km/week) while maintaining good form.\n\nA specific biomechanical focus for you is improving pelvic stability, which will help distribute forces more evenly and potentially reduce the higher loads we're seeing in your right knee."
      } else {
        response =
          "I'm your AI coach. I can help answer questions about your running data, biomechanics, and training plan. What would you like to know about?"
      }

      setMessages((prev) => [
        ...prev,
        {
          text: response,
          isUser: false,
          timestamp: new Date(),
        },
      ])
    }, 1000)
  }

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt)
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

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col">
            <p className="text-center text-gray-600 mb-4">How can I help you today?</p>
            <div className="grid grid-cols-1 gap-2 mb-4">
              {preemptivePrompts.map((prompt, index) => (
                <PreemptivePrompt key={index} text={prompt} onClick={() => handlePromptClick(prompt)} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
            ))}
          </div>
        )}

        <div className="sticky bottom-0 bg-[#f8f9fa] pt-2">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>

      <MobileNavbar />
    </div>
  )
}

export default ChatCoachV1a
