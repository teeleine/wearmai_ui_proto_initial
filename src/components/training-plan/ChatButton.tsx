import type React from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const ChatButton: React.FC = () => {
  return (
    <Button
      className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0 bg-wearmai-primary hover:bg-wearmai-primary/90 shadow-lg"
      size="icon"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )
}

export default ChatButton
