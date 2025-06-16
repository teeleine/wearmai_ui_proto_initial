// ChatButton.tsx
import React from "react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatButtonProps {
  onClick?: () => void
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => (
  <Button
    onClick={onClick}
    className="rounded-full w-14 h-14 shadow-lg bg-[#42b4f7] hover:bg-[#42b4f7]/80
               text-white flex items-center justify-center p-0"
    aria-label="Chat with assistant"
  >
    <MessageSquare size={24} />
  </Button>
)

export default ChatButton
