"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header"
import ChatInput from "@/components/chat-coach/ChatInput"
import ChatMessage from "@/components/chat-coach/ChatMessage"
import PreemptivePrompt from "@/components/chat-coach/PreemptivePrompt"
import ContextChip from "@/components/chat-coach/ContextChip"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

// Variation 1b: Dynamic & Contextual Pre-emptive Prompts

const ChatCoachV1b: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp: Date }>>([])
  const [context, setContext] = useState<string | null>("Right Knee Impact from Run on May 16, 2025")

  // Dynamic prompts based on context
  const getPreemptivePrompts = () => {
    if (context?.includes("Knee Impact")) {
      return [
        "Tell me more about my knee impact",
        "How can I reduce knee forces?",
        "Is this a potential injury risk?",
        "Show me exercises for knee health",
      ]
    } else if (context?.includes("Sustainability Score")) {
      return [
        "How can I improve my training sustainability?",
        "What factors affect my sustainability score?",
        "Is my current training load too high?",
        "How does recovery affect sustainability?",
      ]
    } else if (context?.includes("Tempo Run")) {
      return [
        "Tips for my upcoming Tempo Run?",
        "How should I pace my tempo run?",
        "What's the purpose of tempo runs?",
        "How do I recover after a tempo run?",
      ]
    } else {
      // Default prompts if no specific context
      return [
        "Analyze my recent training trends",
        "How's my running form developing?",
        "Suggest recovery strategies",
        "What should I focus on this week?",
      ]
    }
  }

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true, timestamp: new Date() }])

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (message.toLowerCase().includes("knee impact") || message.toLowerCase().includes("knee force")) {
        response =
          "Your right knee experienced peak forces of 2.8x your body weight during your last run, which is about 12% higher than your left knee and 10% above your typical average.\n\nThis asymmetry appears to be related to the increased pelvic drop on your right side (5.2° vs 3.8° on your left) that developed during the final kilometer of your run, possibly indicating fatigue in your hip stabilizers."
      } else if (
        message.toLowerCase().includes("reduce knee") ||
        message.toLowerCase().includes("exercises for knee")
      ) {
        response =
          "To reduce knee forces and improve knee health, focus on these areas:\n\n1. Strengthen hip stabilizers with side leg raises and clamshells\n2. Improve pelvic stability with single-leg balance exercises\n3. Consider slightly increasing your cadence (aim for 175-180 spm)\n4. Ensure you're not overstriding (your foot should land under your center of mass)\n\nWould you like me to show you specific exercises for any of these areas?"
      } else if (message.toLowerCase().includes("injury risk")) {
        response =
          "Based on the data, I'd classify this as a MODERATE risk factor, not an immediate concern but something to address.\n\nConsistent asymmetry in knee forces can potentially lead to issues like IT band syndrome or patellofemoral pain over time. However, the current values aren't in a concerning range, and addressing the underlying pelvic stability should resolve this pattern before it becomes problematic."
      } else if (message.toLowerCase().includes("sustainability") || message.toLowerCase().includes("training load")) {
        response =
          "Your current training sustainability score is 65/100, which falls in the 'Moderate' range. This indicates your training load is manageable but not optimal.\n\nTo improve this score:\n- Add an additional recovery day this week\n- Focus on sleep quality (your sleep data shows an average of 6.5 hours, aim for 7-8)\n- Consider reducing intensity in your next workout by about 10-15%"
      } else {
        response =
          "I'm your AI coach. I can help answer questions about your running data, biomechanics, and training plan. What specific aspect would you like to explore?"
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
              {getPreemptivePrompts().map((prompt, index) => (
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

export default ChatCoachV1b
