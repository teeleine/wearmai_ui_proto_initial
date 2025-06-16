import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface HistoricalComparisonChartProps {
  region: string
  dataType: "muscle-load" | "joint-force" | "soreness"
}

const HistoricalComparisonChart: React.FC<HistoricalComparisonChartProps> = ({ region, dataType }) => {
  // Mock data - in real app this would come from API
  const data = [
    { name: "Last Run", value: 65 },
    { name: "This Run", value: 85 },
    { name: "Avg. Last 5", value: 55 },
    { name: "Avg. Last 30", value: 50 },
  ]

  // Customize label based on data type
  const getYAxisLabel = () => {
    if (dataType === "muscle-load") return "Load (% of Max)"
    if (dataType === "joint-force") return "Force (x BW)"
    return "Soreness (0-10)"
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{region} Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis
                fontSize={10}
                label={{ value: getYAxisLabel(), angle: -90, position: "insideLeft", style: { fontSize: 10 } }}
              />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 pt-1 border-t border-gray-200">
          <p className="text-xs text-muted-foreground">
            Your {dataType.replace("-", " ")} for {region} is 30% higher than your 30-day average, and 20% higher than
            your last run.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default HistoricalComparisonChart
