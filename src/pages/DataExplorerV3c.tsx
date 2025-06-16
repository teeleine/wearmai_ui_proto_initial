"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header"
import TabNavigation from "@/components/run-detail/TabNavigation"
import MetricSelector from "@/components/data-explorer/MetricSelector"
import ChartArea from "@/components/data-explorer/ChartArea"
import ExplainButton from "@/components/data-explorer/ExplainButton"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import KeyInsightsCard from "@/components/data-explorer/KeyInsightsCard"
import ProgressChart from "@/components/data-explorer/ProgressChart"
import BaselineComparison from "@/components/data-explorer/BaselineComparison"
import PointExplanationCard from "@/components/data-explorer/PointExplanationCard"

const DataExplorerV3c: React.FC = () => {
  // Sample run date
  const runDate = "May 16, 2025"

  // Available metrics
  const availableMetrics = [
    { value: "l-hip-flexion", label: "L. Hip Flexion (°)" },
    { value: "r-hip-flexion", label: "R. Hip Flexion (°)" },
    { value: "l-hip-adduction", label: "L. Hip Adduction (°)" },
    { value: "r-hip-adduction", label: "R. Hip Adduction (°)" },
    { value: "l-knee-flexion", label: "L. Knee Flexion (°)" },
    { value: "r-knee-flexion", label: "R. Knee Flexion (°)" },
    { value: "pelvic-list", label: "Pelvic List Angle (°)" },
    { value: "pelvic-tilt", label: "Pelvic Tilt Angle (°)" },
    { value: "pelvic-rotation", label: "Pelvic Rotation Angle (°)" },
    { value: "l-ankle-dorsiflexion", label: "L. Ankle Dorsiflexion (°)" },
    { value: "l-quad-load", label: "L. Quadriceps Load (Est. %)" },
    { value: "r-knee-force", label: "R. Knee Joint Force (Est. N)" },
  ]

  // State
  const [selectedMetric, setSelectedMetric] = useState(availableMetrics[0].value)
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)
  const [selectedPoint, setSelectedPoint] = useState<{ index: number; value: number } | null>(null)

  // Get the label for the selected metric
  const getSelectedMetricLabel = () => {
    return availableMetrics.find((m) => m.value === selectedMetric)?.label || ""
  }

  // Handle metric change
  const handleMetricChange = (value: string) => {
    setSelectedMetric(value)
    setSelectedPoint(null)
  }

  // Handle explain click
  const handleExplainClick = () => {
    setIsExplanationOpen(true)
  }

  // Handle point click
  const handlePointClick = (pointIndex: number, value: number) => {
    setSelectedPoint({ index: pointIndex, value })
  }

  // Generate key insights based on selected metric
  const getKeyInsights = () => {
    if (selectedMetric.includes("hip-flexion")) {
      return [
        {
          type: "positive" as const,
          text: "Your hip flexion is consistent throughout most of your run, indicating good form stability.",
        },
        {
          type: "warning" as const,
          text: "There's a notable increase at kilometer 3, which could be related to fatigue or terrain changes.",
        },
        {
          type: "neutral" as const,
          text: "Your average hip flexion (24.3°) is within normal ranges for recreational runners.",
        },
      ]
    } else if (selectedMetric.includes("knee-flexion")) {
      return [
        {
          type: "negative" as const,
          text: "Your knee flexion increases significantly in the latter half of your run, suggesting fatigue.",
        },
        {
          type: "positive" as const,
          text: "Initial knee flexion values show good shock absorption mechanics.",
        },
        {
          type: "warning" as const,
          text: "The pattern suggests you may benefit from knee stability exercises.",
        },
      ]
    } else if (selectedMetric.includes("force")) {
      return [
        {
          type: "negative" as const,
          text: "Joint forces exceed recommended thresholds at kilometer 3, coinciding with a downhill section.",
        },
        {
          type: "warning" as const,
          text: "Sustained high forces could increase injury risk over multiple training sessions.",
        },
        {
          type: "positive" as const,
          text: "Forces normalize in the latter portion of your run, showing good adaptation.",
        },
      ]
    } else {
      return [
        {
          type: "positive" as const,
          text: "Your biomechanics show good consistency throughout most of your run.",
        },
        {
          type: "neutral" as const,
          text: "Values are within normal ranges for your running profile.",
        },
        {
          type: "warning" as const,
          text: "Monitor the variation at kilometer 3, which may indicate a form change.",
        },
      ]
    }
  }

  // Generate sample current value for baseline comparison
  const getCurrentValue = () => {
    if (selectedMetric.includes("hip")) return 24.3
    if (selectedMetric.includes("knee")) return 38.7
    if (selectedMetric.includes("force")) return 2.8
    if (selectedMetric.includes("load")) return 76.2
    return 25.6
  }

  // Generate ideal range based on metric
  const getIdealRange = (): [number, number] => {
    if (selectedMetric.includes("hip-flexion")) return [20, 30]
    if (selectedMetric.includes("knee-flexion")) return [30, 45]
    if (selectedMetric.includes("force")) return [1.5, 2.5]
    if (selectedMetric.includes("load")) return [60, 80]
    return [15, 35]
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header title={`Data Explorer: ${getSelectedMetricLabel()}`} showBackButton={true} />

      <div className="container max-w-md mx-auto px-4 py-4 pb-20">
        <TabNavigation activeTab="data-explorer" />

        <div className="mt-6">
          <MetricSelector
            label="View Metric:"
            value={selectedMetric}
            onChange={handleMetricChange}
            metrics={availableMetrics}
          />

          <ChartArea
            title={getSelectedMetricLabel()}
            yAxisLabel={
              selectedMetric.includes("force")
                ? "Force (N)"
                : selectedMetric.includes("load")
                  ? "Load (%)"
                  : "Angle (°)"
            }
            xAxisLabel="Kilometer"
            onPointClick={handlePointClick}
            showMagicIcon={false}
            showAnnotations={true}
          />

          {selectedPoint && (
            <PointExplanationCard
              pointIndex={selectedPoint.index}
              value={selectedPoint.value}
              metricName={getSelectedMetricLabel()}
              onClose={() => setSelectedPoint(null)}
            />
          )}

          <ExplainButton onClick={handleExplainClick} />

          <KeyInsightsCard insights={getKeyInsights()} metricName={getSelectedMetricLabel()} />

          <BaselineComparison
            metricName={getSelectedMetricLabel()}
            currentValue={getCurrentValue()}
            idealRange={getIdealRange()}
            userType="Recreational Runner"
          />

          <ProgressChart
            title={`${getSelectedMetricLabel()} Trend`}
            metricName={getSelectedMetricLabel()}
            timeframe="3months"
          />
        </div>
      </div>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName={getSelectedMetricLabel()}
        runDate={runDate}
      />
      <MobileNavbar />
    </div>
  )
}

export default DataExplorerV3c
