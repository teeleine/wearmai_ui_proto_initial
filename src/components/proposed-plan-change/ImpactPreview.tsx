import { Card } from "@/components/ui/card"
import { CheckCircle, AlertCircle } from "lucide-react"

interface ImpactPreviewProps {
  acceptImpacts: string[]
  rejectImpacts: string[]
}

const ImpactPreview = ({ acceptImpacts, rejectImpacts }: ImpactPreviewProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-3">What This Means For You:</h3>

      <div className="mb-4">
        <h4 className="font-medium text-green-600 flex items-center gap-2 mb-2">
          <CheckCircle size={18} />
          If you ACCEPT this suggestion:
        </h4>
        <ul className="space-y-2 pl-6">
          {acceptImpacts.map((impact, index) => (
            <li key={index} className="text-gray-700">
              • {impact}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium text-amber-600 flex items-center gap-2 mb-2">
          <AlertCircle size={18} />
          If you KEEP your original plan:
        </h4>
        <ul className="space-y-2 pl-6">
          {rejectImpacts.map((impact, index) => (
            <li key={index} className="text-gray-700">
              • {impact}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

export default ImpactPreview
