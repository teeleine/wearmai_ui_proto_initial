import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  icon: LucideIcon
  label: string
  value: string
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, label, value }) => {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4 flex flex-col items-center">
        <div className="bg-[#42b4f7]/10 p-2 rounded-full mb-2">
          <Icon size={20} className="text-[#42b4f7]" />
        </div>
        <div className="text-sm font-medium text-gray-700 mb-1">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </CardContent>
    </Card>
  )
}

export default MetricCard
