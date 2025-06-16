import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, TrendingUp, TrendingDown } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface WeeklyTrainingLoadProps {
  data?: any[]
  compact?: boolean
}

const WeeklyTrainingLoad: React.FC<WeeklyTrainingLoadProps> = ({ data = defaultData, compact = false }) => {
  // Calculate the trend (up or down)
  const lastTwoWeeks = data.slice(-2)
  const trend = lastTwoWeeks[1].load > lastTwoWeeks[0].load ? "up" : "down"
  const trendPercentage = Math.abs(
    Math.round(((lastTwoWeeks[1].load - lastTwoWeeks[0].load) / lastTwoWeeks[0].load) * 100),
  )

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white">
      <CardHeader className={compact ? "pb-2 pt-3" : "pb-2 pt-4"}>
        <CardTitle
          className={`${compact ? "text-sm" : "text-base"} font-medium text-gray-700 flex items-center justify-between`}
        >
          <div className="flex items-center">
            <Activity size={16} className="mr-1.5 text-[#42b4f7]" />
            Weekly Training Load
          </div>
          <div className={`flex items-center text-xs ${trend === "up" ? "text-[#6131ca]" : "text-[#83c55b]"}`}>
            {trend === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span className="ml-1">{trendPercentage}%</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-3 pt-0" : "pb-4 pt-0"}>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="loadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#42b4f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#42b4f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis hide={true} domain={[0, "dataMax + 20"]} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <Tooltip
                formatter={(value) => [`${value} units`, "Load"]}
                labelFormatter={(label) => `Week ${label}`}
                contentStyle={{
                  fontSize: "12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              />
              <Area
                type="monotone"
                dataKey="load"
                stroke="#42b4f7"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#loadGradient)"
              />
              <Area
                type="monotone"
                dataKey="optimal"
                stroke="#83c55b"
                strokeWidth={1}
                strokeDasharray="3 3"
                fillOpacity={0}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[#42b4f7] rounded-full mr-1"></div>
            <span>Your load</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[#83c55b] rounded-full mr-1"></div>
            <span>Optimal zone</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[#6131ca] rounded-full mr-1"></div>
            <span>High risk</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Default data if none is provided
const defaultData = [
  { week: "1", load: 65, optimal: 70 },
  { week: "2", load: 72, optimal: 70 },
  { week: "3", load: 68, optimal: 70 },
  { week: "4", load: 75, optimal: 70 },
  { week: "5", load: 85, optimal: 70 },
  { week: "6", load: 78, optimal: 70 },
]

export default WeeklyTrainingLoad
