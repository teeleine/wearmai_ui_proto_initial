import type React from "react"
import { format } from "date-fns"

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp: Date
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className="flex flex-col max-w-[80%]">
        <div className={`px-4 py-3 rounded-2xl ${isUser ? "bg-[#42b4f7] text-white" : "bg-gray-100 text-gray-800"}`}>
          <p className="text-sm whitespace-pre-wrap">{message}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1 self-end">{format(timestamp, "h:mm a")}</span>
      </div>
    </div>
  )
}

export default ChatMessage
