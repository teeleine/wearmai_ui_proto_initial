"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface DataTransparencyProps {
  showDefinitions: boolean
  showDataSources: boolean
  onToggleDefinitions: () => void
  onToggleDataSources: () => void
}

const DataTransparency = ({
  showDefinitions,
  showDataSources,
  onToggleDefinitions,
  onToggleDataSources,
}: DataTransparencyProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Clarity & Data Presentation</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="show-definitions">Show technical term definitions inline</Label>
            <p className="text-sm text-muted-foreground">Explains technical terms as they appear</p>
          </div>
          <Switch id="show-definitions" checked={showDefinitions} onCheckedChange={onToggleDefinitions} />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="show-data-sources">Always show data sources for insights</Label>
            <p className="text-sm text-muted-foreground">Shows which metrics informed each insight</p>
          </div>
          <Switch id="show-data-sources" checked={showDataSources} onCheckedChange={onToggleDataSources} />
        </div>
      </div>
    </div>
  )
}

export default DataTransparency
