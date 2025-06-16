"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Send } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  placeholder?: string
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, placeholder = "Type a message..." }) => {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-center gap-2 p-3 border-t bg-white">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button type="button" size="icon" variant="ghost" className="rounded-full h-10 w-10 text-gray-500">
        <Mic size={20} />
        <span className="sr-only">Voice input</span>
      </Button>
      <Button
        type="button"
        size="icon"
        onClick={handleSend}
        disabled={!message.trim()}
        className="rounded-full h-10 w-10 bg-[#42b4f7] hover:bg-[#42b4f7]/90"
      >
        <Send size={20} />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  )
}

export default ChatInput
