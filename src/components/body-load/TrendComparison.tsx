import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface TrendComparisonProps {
  title: string
  dataType: "muscle-load" | "joint-force" | "soreness" | "asymmetry"
  selectedRegion: string
}

const TrendComparison: React.FC<TrendComparisonProps> = ({ title, dataType, selectedRegion }) => {
  // Mock data - in a real app, this would come from API
  const data = [
    { name: "10%", current: 30, average: 25 },
    { name: "20%", current: 35, average: 30 },
    { name: "30%", current: 40, average: 35 },
    { name: "40%", current: 55, average: 40 },
    { name: "50%", current: 60, average: 45 },
    { name: "60%", current: 65, average: 50 },
    { name: "70%", current: 75, average: 55 },
    { name: "80%", current: 85, average: 60 },
    { name: "90%", current: 80, average: 65 },
    { name: "100%", current: 75, average: 60 },
  ]

  // Get proper label based on data type
  const getValueLabel = () => {
    if (dataType === "muscle-load") return "Muscle Load (%)"
    if (dataType === "joint-force") return "Joint Force (x BW)"
    if (dataType === "soreness") return "Soreness Level"
    return "Value"
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          {title}: {selectedRegion}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground mb-2">Change over run duration compared to your average</div>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis
                fontSize={10}
                label={{ value: getValueLabel(), angle: -90, position: "insideLeft", style: { fontSize: 10 } }}
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="current" stroke="#EF4444" name="This Run" strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#9CA3AF"
                name="Your Average"
                strokeWidth={2}
                strokeDasharray="3 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-xs">
          <p>
            Your {dataType.replace("-", " ")} for {selectedRegion} increased more rapidly than usual between 50-80% of
            your run. This may indicate fatigue or technique changes.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TrendComparison
