"use client"

import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlanHeaderProps {
  title: string
}

export const PlanHeader = ({ title }: PlanHeaderProps) => {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 bg-white border-b px-4 py-5 flex items-center justify-between container max-w-xl mx-auto">

      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold ml-2">{title}</h1>
      </div>
    </header>
  )
}
