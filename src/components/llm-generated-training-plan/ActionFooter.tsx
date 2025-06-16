"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export const ActionFooter = () => {
  const navigate = useNavigate()

  return (
    <footer className="sticky bottom-0 bg-white border-t p-4 flex flex-col gap-2 pb-20">
      <Button className="w-full bg-wearmai-primary hover:bg-wearmai-primary/90">Accept This Plan</Button>
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={() => navigate("/chat-coach/v2b")}>
          Request Modifications
        </Button>
        <Button variant="outline" className="flex-1">
          Save for Later
        </Button>
      </div>
    </footer>
  )
}
