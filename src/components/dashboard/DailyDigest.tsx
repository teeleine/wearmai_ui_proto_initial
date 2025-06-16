import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DailyDigestProps {
  summary: string
  biomechanicalInsight?: string
}

const DailyDigest: React.FC<DailyDigestProps> = ({ summary, biomechanicalInsight }) => {
  return (
    <Card className="shadow-sm border border-[#a3d7fb] rounded-xl bg-gradient-to-br from-[#D0ECFF] to-[#D0ECFF] mb-5">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium flex items-center text-gray-700">
          <Sparkles size={18} className="text-[#42b4f7] mr-2" />
          Today's Coach Briefing
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-gray-700 mb-4">{summary}</p>

        {biomechanicalInsight && (
          <div className="bg-white/50 p-3 rounded-lg mb-4 border border-[#a3d7fb]/50">
            <p className="text-sm text-gray-700 font-medium mb-1">Biomechanical Insight:</p>
            <p className="text-sm text-gray-700">{biomechanicalInsight}</p>
          </div>
        )}

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full text-xs px-3"
          >
            View Knee Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full text-xs px-3"
          >
            See Body Map
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default DailyDigest
