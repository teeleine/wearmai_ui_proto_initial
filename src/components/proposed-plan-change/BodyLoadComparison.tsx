import { Card } from "@/components/ui/card"

interface BodyPartLoad {
  name: string
  originalLoad: number // 0-100
  proposedLoad: number // 0-100
}

interface BodyLoadComparisonProps {
  bodyParts: BodyPartLoad[]
}

const BodyLoadComparison = ({ bodyParts }: BodyLoadComparisonProps) => {
  return (
    <Card className="p-4 mb-4">
      <h3 className="text-lg font-medium mb-3">Body Load Impact</h3>

      <div className="space-y-4">
        {bodyParts.map((part, index) => {
          const difference = part.originalLoad - part.proposedLoad
          const isReduction = difference > 0

          return (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{part.name}</span>
                <span className={`text-sm font-medium ${isReduction ? "text-green-600" : "text-amber-600"}`}>
                  {isReduction ? `-${difference}%` : `+${Math.abs(difference)}%`}
                </span>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <span>Proposed: {part.proposedLoad}%</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>Original: {part.originalLoad}%</span>
                  </div>
                </div>

                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${part.proposedLoad}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${isReduction ? "bg-green-500" : "bg-amber-500"}`}
                  ></div>
                  {isReduction && (
                    <div
                      style={{ width: `${difference}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-gray-300 opacity-50"
                    ></div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>The proposed plan adjusts your workout to optimize recovery for high-stress areas.</p>
      </div>
    </Card>
  )
}

export default BodyLoadComparison
