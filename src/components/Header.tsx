"use client"

import type React from "react"
import { Bell, Search, ChevronLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"

interface HeaderProps {
  title?: string
  showBackButton?: boolean
}

const Header: React.FC<HeaderProps> = ({ title = "WearM.AI", showBackButton = false }) => {
  const navigate = useNavigate()

  return (
       <header className="sticky top-0 z-10 bg-white border-b px-4 py-5 flex items-center justify-between container max-w-xl mx-auto">
      <div className="flex items-center">
        {showBackButton && (
          <button onClick={() => navigate(-1)} className="mr-2 p-1 rounded-full hover:bg-gray-100" aria-label="Go back">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
        )}
        <div className="flex items-center mr-2 text-[#b8e986]">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#42b4f7">
            <path d="M12 2L2 7v9.5C2 19.54 6.46 22 12 22s10-2.46 10-5.5V7L12 2zm6 14.5c0 1.93-3.27 3.5-8 3.5s-8-1.57-8-3.5V9.26L12 5l10 4.26v7.24z" />
            <path d="M12 12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
          </svg>
          <span className="ml-2 font-bold text-xl text-gray-800">{title}</span>
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative mr-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full py-2 pl-10 pr-3 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-[#b8e986]"
            placeholder="Search"
          />
        </div>
        <button className="relative p-2 mr-2">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#f9ca24] rounded-full"></span>
        </button>
        <Avatar className="border-2 border-[#42b4f7]">
          <AvatarImage src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" alt="User" />
          <AvatarFallback className="bg-[#b8e986] text-white">RN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Header
