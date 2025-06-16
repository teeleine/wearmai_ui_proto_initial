"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header"
import ChatInput from "@/components/chat-coach/ChatInput"
import ChatMessage from "@/components/chat-coach/ChatMessage"
import ContextChip from "@/components/chat-coach/ContextChip"
import MobileNavbar from "@/components/dashboard/MobileNavBar"

// Variation 2a: Purely Text-Based LLM Responses

const ChatCoachV2a: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp: Date }>>([
    {
      text: "Hi Alex, I'm your AI running coach. How can I help you today?",
      isUser: false,
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const [context, setContext] = useState<string | null>("Right Knee Impact from Run on May 16, 2025")

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true, timestamp: new Date() }])

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (message.toLowerCase().includes("knee") || message.toLowerCase().includes("impact")) {
        response =
          "Based on the data from your May 16th run, your right knee experienced peak forces of 2.8x your body weight, which is about 12% higher than your left knee and 10% above your typical average.\n\nThis asymmetry appears to be related to the increased pelvic drop on your right side (5.2° vs 3.8° on your left) that developed during the final kilometer of your run, possibly indicating fatigue in your hip stabilizers.\n\nWhile this isn't an immediate concern, consistent asymmetry in knee forces can potentially lead to issues like IT band syndrome or patellofemoral pain over time if not addressed. I'd recommend focusing on hip stability exercises like side leg raises, clamshells, and single-leg balance work to help correct this pattern."
      } else if (message.toLowerCase().includes("exercise") || message.toLowerCase().includes("drill")) {
        response =
          "Here are some specific exercises to help with your right side pelvic stability and reduce knee forces:\n\n1. Glute Bridges\n   - Lie on your back with knees bent, feet flat on floor\n   - Push through heels to lift hips, squeezing glutes at top\n   - 2 sets of 12 reps, 3 times weekly\n\n2. Side-Lying Leg Raises\n   - Lie on left side, lift right leg 45 degrees\n   - Focus on keeping hips stacked, no rotation\n   - 2 sets of 15 reps each side\n\n3. Single-Leg Balance\n   - Stand on right leg, slight knee bend\n   - Hold 30 seconds, progress to 60 seconds\n   - Add arm movements for challenge\n\nThese exercises target the hip abductors and external rotators that control pelvic stability during running."
      } else if (message.toLowerCase().includes("training plan") || message.toLowerCase().includes("schedule")) {
        response =
          "Looking at your training plan for the next week:\n\nToday (May 18): Rest/Recovery\nTomorrow (May 19): Easy Run - 5km at 6:00-6:15/km pace\nTuesday (May 20): Strength Training + 3km easy\nWednesday (May 21): Tempo Run - 6km with 3km at 5:10-5:20/km\nThursday (May 22): Rest/Recovery\nFriday (May 23): Easy Run - 4km with strides\nSaturday (May 24): Long Run - 10km at easy pace\n\nGiven the higher forces we saw in your right knee, I'd suggest adding the hip stability exercises after your Monday and Friday runs, and being particularly mindful of your form during Wednesday's tempo session."
      } else {
        response =
          "I can help you with questions about your running performance, biomechanics, training plan, or recovery strategies. Based on your recent data, we might want to focus on your right knee loading patterns or your overall training sustainability score, which is currently at 65/100. What aspect would you like to explore further?"
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
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
          ))}
        </div>

        <div className="sticky bottom-0 bg-[#f8f9fa] pt-2">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>

      <MobileNavbar />
    </div>
  )
}

export default ChatCoachV2a
