"use client"

import type React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MetricSelectorProps {
  label: string
  value: string
  onChange: (value: string) => void
  metrics: { value: string; label: string }[]
}

const MetricSelector: React.FC<MetricSelectorProps> = ({ label, value, onChange, metrics }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select a metric" />
        </SelectTrigger>
        <SelectContent>
          {metrics.map((metric) => (
            <SelectItem key={metric.value} value={metric.value}>
              {metric.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default MetricSelector
