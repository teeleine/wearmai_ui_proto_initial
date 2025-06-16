"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type NotificationFrequency = "daily" | "milestones" | "weekly"

interface MotivationalNotificationsProps {
  enabled: boolean
  frequency: NotificationFrequency
  onToggleEnabled: () => void
  onChangeFrequency: (frequency: NotificationFrequency) => void
}

const MotivationalNotifications = ({
  enabled,
  frequency,
  onToggleEnabled,
  onChangeFrequency,
}: MotivationalNotificationsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Goal Reminders & Motivation</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enable-notifications">Enable motivational notifications</Label>
            <p className="text-sm text-muted-foreground">Receive reminders and encouragement</p>
          </div>
          <Switch id="enable-notifications" checked={enabled} onCheckedChange={onToggleEnabled} />
        </div>

        {enabled && (
          <div className="pt-2">
            <Label htmlFor="notification-frequency" className="mb-2 block">
              Notification Frequency:
            </Label>
            <Select value={frequency} onValueChange={(value) => onChangeFrequency(value as NotificationFrequency)}>
              <SelectTrigger id="notification-frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily Summary</SelectItem>
                <SelectItem value="milestones">Key Milestones Only</SelectItem>
                <SelectItem value="weekly">Weekly Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  )
}

export default MotivationalNotifications
