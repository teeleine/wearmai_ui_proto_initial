import { Card } from "@/components/ui/card"

interface ChangeSummaryProps {
  summary: string
}

const ChangeSummary = ({ summary }: ChangeSummaryProps) => {
  return (
    <Card className="p-4 bg-wearmai-light/10 border-wearmai-primary">
      <h3 className="text-lg font-medium mb-2">The Suggested Change</h3>
      <p className="text-gray-700">{summary}</p>
    </Card>
  )
}

export default ChangeSummary
