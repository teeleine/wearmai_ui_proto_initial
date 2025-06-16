import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface CoachRationaleProps {
  explanation: string
}

const CoachRationale = ({ explanation }: CoachRationaleProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-3">Reasoning for this Suggestion:</h3>
      <p className="text-gray-700 mb-4">{explanation}</p>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <ExternalLink size={16} />
        View Supporting Data
      </Button>
    </Card>
  )
}

export default CoachRationale
