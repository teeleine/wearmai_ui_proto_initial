import type React from "react"
import { AlertTriangle, Activity, Dumbbell } from "lucide-react"

interface AlertHeaderProps {
  type: "warning" | "joint" | "muscle"
  title: string
  subtitle: string
  className?: string
}

const AlertHeader: React.FC<AlertHeaderProps> = ({ type, title, subtitle, className = "" }) => {
  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-[#f9ca24]" />
      case "joint":
        return <Activity className="h-6 w-6 text-[#6131ca]" />
      case "muscle":
        return <Dumbbell className="h-6 w-6 text-[#42b4f7]" />
      default:
        return <AlertTriangle className="h-6 w-6 text-[#f9ca24]" />
    }
  }

  const getIconBackground = () => {
    switch (type) {
      case "warning":
        return "bg-[#fff4e8]"
      case "joint":
        return "bg-[#c3adef]/20"
      case "muscle":
        return "bg-[#e3f7d4]"
      default:
        return "bg-[#fff4e8]"
    }
  }

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className={`p-2 rounded-full ${getIconBackground()}`}>{getIcon()}</div>
      <div>
        <h1 className="text-lg font-medium text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  )
}

export default AlertHeader
