import { Card } from "@/components/ui/card"

interface BiomechanicalTarget {
  id: string
  issue: string
  current: string
  target: string
  projected: string
  projectedPercentage: number
}

interface ProjectedImprovementChartProps {
  targets: BiomechanicalTarget[]
}

export const ProjectedImprovementChart = ({ targets }: ProjectedImprovementChartProps) => {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        {targets.map((target) => (
          <div key={target.id} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{target.issue}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-24 text-right text-sm">Current</div>
              <div className="flex-1 h-6 bg-gray-100 rounded-md relative">
                <div className="absolute top-0 left-0 h-full bg-orange-400 rounded-md" style={{ width: "100%" }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  {target.current}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-24 text-right text-sm">After 4 weeks</div>
              <div className="flex-1 h-6 bg-gray-100 rounded-md relative">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 rounded-md"
                  style={{ width: `${target.projectedPercentage}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  {target.projected}
                </div>
              </div>
            </div>
          </div>
        ))}

        <p className="text-xs text-gray-500 mt-2">
          Projections are estimates based on adherence and typical adaptation. Actual results may vary.
        </p>
      </div>
    </Card>
  )
}
