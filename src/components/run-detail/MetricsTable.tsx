import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface MetricRow {
  label: string
  value: string
}

interface MetricsTableProps {
  title: string
  metrics: MetricRow[]
}

const MetricsTable: React.FC<MetricsTableProps> = ({ title, metrics }) => {
  return (
    <div className="mb-6">
      <h2 className="text-base font-medium text-gray-700 mb-2">{title}</h2>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Metric</TableHead>
              <TableHead className="w-1/2">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.map((metric, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{metric.label}</TableCell>
                <TableCell>{metric.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MetricsTable
