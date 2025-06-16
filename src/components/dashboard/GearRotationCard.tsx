import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footprints, AlertCircle } from "lucide-react"

interface GearRotationCardProps {
  shoes: {
    name: string
    distance: number
    totalDistance: number
    maxDistance: number
    lastUsed: string
    status: "primary" | "rotation" | "recovery" | "replace"
  }[]
  compact?: boolean
}

const GearRotationCard: React.FC<GearRotationCardProps> = ({ shoes = defaultShoes, compact = false }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "primary":
        return "bg-[#42b4f7]"
      case "rotation":
        return "bg-[#83c55b]"
      case "recovery":
        return "bg-[#f9ca24]"
      case "replace":
        return "bg-[#6131ca]"
      default:
        return "bg-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "primary":
        return "Primary"
      case "rotation":
        return "Rotation"
      case "recovery":
        return "Recovery"
      case "replace":
        return "Replace Soon"
      default:
        return status
    }
  }

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardHeader className={compact ? "pb-2 pt-3" : "pb-2 pt-4"}>
        <CardTitle className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center`}>
          <Footprints size={16} className="mr-1.5 text-[#42b4f7]" />
          Gear Rotation
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-3" : "pb-4"}>
        <div className="space-y-3">
          {shoes.slice(0, compact ? 2 : 3).map((shoe, index) => {
            // Calculate percentage of shoe life used
            const percentUsed = Math.min(100, Math.round((shoe.totalDistance / shoe.maxDistance) * 100))

            return (
              <div key={index} className="bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-sm text-gray-800">{shoe.name}</div>
                  <div
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      shoe.status === "replace" ? "bg-[#6131ca]/20 text-[#6131ca]" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {getStatusText(shoe.status)}
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Total: {shoe.totalDistance} km</span>
                  <span>Last: {shoe.lastUsed}</span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      percentUsed > 90 ? "bg-[#6131ca]" : percentUsed > 70 ? "bg-[#f9ca24]" : "bg-[#83c55b]"
                    }`}
                    style={{ width: `${percentUsed}%` }}
                  ></div>
                </div>

                {shoe.status === "replace" && (
                  <div className="flex items-center mt-1 text-xs text-[#6131ca]">
                    <AlertCircle size={12} className="mr-1" />
                    <span>Consider replacing soon ({shoe.maxDistance - shoe.totalDistance} km remaining)</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {!compact && (
          <div className="mt-3 text-xs text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#42b4f7] rounded-full mr-1"></div>
              <span>Recommended for next run: {shoes.find((s) => s.status === "primary")?.name}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const defaultShoes = [
  {
    name: "Nike Pegasus 39",
    distance: 5.2,
    totalDistance: 320,
    maxDistance: 500,
    lastUsed: "Today",
    status: "primary",
  },
  {
    name: "Hoka Clifton 8",
    distance: 0,
    totalDistance: 180,
    maxDistance: 500,
    lastUsed: "3 days ago",
    status: "rotation",
  },
  {
    name: "Brooks Ghost 14",
    distance: 0,
    totalDistance: 460,
    maxDistance: 500,
    lastUsed: "1 week ago",
    status: "replace",
  },
  {
    name: "Saucony Endorphin Speed",
    distance: 0,
    totalDistance: 120,
    maxDistance: 400,
    lastUsed: "2 weeks ago",
    status: "recovery",
  },
]

export default GearRotationCard
