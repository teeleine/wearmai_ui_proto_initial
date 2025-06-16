"use client"

import type React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate, useLocation } from "react-router-dom"

interface TabNavigationProps {
  activeTab: string
  onTabChange?: (value: string) => void
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value)
      return
    }

    // Default navigation behavior if no custom handler is provided
    const currentPath = location.pathname
    const basePath = currentPath.split("/").slice(0, -1).join("/")

    if (value === "summary") {
      // Navigate to run detail
      if (currentPath.includes("run-detail")) {
        // Already on run detail, do nothing
        return
      }
      navigate("/run-detail/v3")
    } else if (value === "data-explorer") {
      navigate("/data-explorer/v1")
    } else if (value === "coach-report") {
      navigate("/llm-coach-report/v1")
    }
  }

  return (
    <Tabs value={activeTab} className="w-full" onValueChange={handleTabChange}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="data-explorer">Data Explorer</TabsTrigger>
        <TabsTrigger value="coach-report">LLM Coach Report</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default TabNavigation
