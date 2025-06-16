// MobileNavBar.tsx
import React from "react"
import { Home, Activity, Calendar, MessageSquare, User } from "lucide-react"
import { useLocation, Link } from "react-router-dom"
import ChatButton from "./ChatButton"

interface MobileNavBarProps {
  onChatClick?: () => void
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ onChatClick }) => {
  const { pathname } = useLocation()

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Activity, label: "Activity", path: "/activity" },
    { icon: Calendar, label: "Plan", path: "/plan" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: User, label: "Profile", path: "/profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <div className="container mx-auto max-w-xl px-0 relative">
        <div className="bg-white border-t border-gray-200 flex justify-around items-center h-16">
          {navItems.map(({ icon: Icon, label, path }, i) => {
            const active = pathname === path
            const color = active ? "text-[#42b4f7]" : "text-gray-500"
            return (
              <Link
                key={i}
                to={path}
                className={`flex flex-col items-center justify-center h-full ${color}`}
              >
                <Icon size={20} className={color} />
                <span className="text-xs mt-1">{label}</span>
              </Link>
            )
          })}
        </div>

        {/* Pass down the handler here */}
        <div className="absolute -top-20 right-0">
          <ChatButton onClick={onChatClick} />
        </div>
      </div>
    </div>
  )
}

export default MobileNavBar
