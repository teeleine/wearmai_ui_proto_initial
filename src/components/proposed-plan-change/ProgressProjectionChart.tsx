import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface ProgressProjectionChartProps {
  originalPlan: { date: string; value: number }[]
  proposedPlan: { date: string; value: number }[]
  goalValue: number
  metric: string
  unit: string
}

const ProgressProjectionChart = ({
  originalPlan,
  proposedPlan,
  goalValue,
  metric,
  unit,
}: ProgressProjectionChartProps) => {
  // Calculate when each plan reaches the goal
  const originalGoalDate = originalPlan.find((point) => point.value >= goalValue)?.date || "Not reached"
  const proposedGoalDate = proposedPlan.find((point) => point.value >= goalValue)?.date || "Not reached"

  // Calculate if proposed plan reaches goal faster
  const isProposedFaster =
    originalGoalDate === "Not reached" ? proposedGoalDate !== "Not reached" : originalGoalDate > proposedGoalDate

  return (
    <Card className="p-4 mb-4">
      <h3 className="text-lg font-medium mb-3">Projected Progress</h3>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.split(" ")[0]} // Show only day
              height={40}
            />
            <YAxis
              domain={["dataMin - 5", "dataMax + 5"]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}${unit}`}
              width={40}
            />
            <Tooltip formatter={(value) => [`${value}${unit}`, metric]} labelFormatter={(label) => `Date: ${label}`} />
            <ReferenceLine
              y={goalValue}
              stroke="#FF6B6B"
              strokeDasharray="3 3"
              label={{
                value: `Goal: ${goalValue}${unit}`,
                position: "insideBottomRight",
                fill: "#FF6B6B",
                fontSize: 12,
              }}
            />
            <Line
              data={originalPlan}
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              name="Original Plan"
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: "#8884d8", strokeWidth: 2 }}
            />
            <Line
              data={proposedPlan}
              type="monotone"
              dataKey="value"
              stroke="#4CAF50"
              strokeWidth={2}
              name="Proposed Plan"
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: "#4CAF50", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-sm">
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 bg-[#8884d8] rounded-full mr-2"></div>
          <span>Original Plan</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#4CAF50] rounded-full mr-2"></div>
          <span>Proposed Plan</span>
        </div>
      </div>

      {isProposedFaster && (
        <div className="mt-3 p-2 bg-green-50 border border-green-100 rounded-md text-sm text-green-700">
          The proposed plan may help you reach your goal{" "}
          {originalGoalDate === "Not reached" ? "when the original plan wouldn't" : "faster"}.
        </div>
      )}
    </Card>
  )
}

export default ProgressProjectionChart
