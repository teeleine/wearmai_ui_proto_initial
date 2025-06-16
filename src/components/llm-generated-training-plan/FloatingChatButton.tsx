"use client"

import { useNavigate } from "react-router-dom"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export const FloatingChatButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      className="fixed bottom-20 right-4 rounded-full w-14 h-14 shadow-lg bg-wearmai-primary hover:bg-wearmai-primary/80 text-white flex items-center justify-center p-0"
      aria-label="Chat with assistant"
      onClick={() => navigate("/chat-coach/v3b")}
    >
      <MessageSquare size={24} className="text-white" />
    </Button>
  )
}
