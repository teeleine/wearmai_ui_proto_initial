import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const ChatButton = () => {
  return (
    <Button
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 bg-wearmai-primary hover:bg-wearmai-primary/80 shadow-lg"
      aria-label="Chat with coach"
    >
      <MessageCircle size={24} />
    </Button>
  )
}

export default ChatButton
