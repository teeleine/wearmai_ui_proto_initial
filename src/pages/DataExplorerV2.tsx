"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header"
import TabNavigation from "@/components/run-detail/TabNavigation"
import MetricSelector from "@/components/data-explorer/MetricSelector"
import ChartArea from "@/components/data-explorer/ChartArea"
import LLMExplanationModal from "@/components/data-explorer/LLMExplanationModal"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import KeyInsightsCard from "@/components/data-explorer/KeyInsightsCard"
import ComparisonInsight from "@/components/data-explorer/ComparisonInsight"
import PointExplanationCard from "@/components/data-explorer/PointExplanationCard"

const DataExplorerV2: React.FC = () => {
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

  // Comparison options
  const comparisonOptions = [
    { value: "right-side", label: "Right Side Equivalent" },
    { value: "previous-run", label: "Previous Run (May 14)" },
    { value: "first-vs-last", label: "First KM vs. Last KM" },
    { value: "personal-best", label: "Personal Best Run" },
  ]

  // State
  const [selectedMetricA, setSelectedMetricA] = useState(availableMetrics[0].value)
  const [selectedComparison, setSelectedComparison] = useState(comparisonOptions[0].value)
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)
  const [activeExplanationChart, setActiveExplanationChart] = useState<"a" | "b" | null>(null)
  const [selectedPoint, setSelectedPoint] = useState<{ index: number; value: number } | null>(null)

  // Get the label for the selected metrics
  const getSelectedMetricALabel = () => {
    return availableMetrics.find((m) => m.value === selectedMetricA)?.label || ""
  }

  const getComparisonLabel = () => {
    return comparisonOptions.find((c) => c.value === selectedComparison)?.label || ""
  }

  // Get comparison metric B label based on selected comparison
  const getComparisonMetricLabel = () => {
    if (selectedComparison === "right-side") {
      // If left side is selected, show right side and vice versa
      if (selectedMetricA.startsWith("l-")) {
        const rightEquivalent = availableMetrics.find((m) => m.value === selectedMetricA.replace("l-", "r-"))
        return rightEquivalent?.label || "Right Side Equivalent"
      } else if (selectedMetricA.startsWith("r-")) {
        const leftEquivalent = availableMetrics.find((m) => m.value === selectedMetricA.replace("r-", "l-"))
        return leftEquivalent?.label || "Left Side Equivalent"
      }
      return "Equivalent Side"
    }

    return `${getSelectedMetricALabel()} (${getComparisonLabel()})`
  }

  // Handle metric change
  const handleMetricAChange = (value: string) => {
    setSelectedMetricA(value)
    setSelectedPoint(null)
  }

  // Handle comparison change
  const handleComparisonChange = (value: string) => {
    setSelectedComparison(value)
    setSelectedPoint(null)
  }

  // Handle explain click for chart A
  const handleExplainClickA = () => {
    setActiveExplanationChart("a")
    setIsExplanationOpen(true)
  }

  // Handle explain click for chart B
  const handleExplainClickB = () => {
    setActiveExplanationChart("b")
    setIsExplanationOpen(true)
  }

  // Handle point click
  const handlePointClick = (pointIndex: number, value: number) => {
    setSelectedPoint({ index: pointIndex, value })
  }

  // Generate key insights based on selected metric and comparison
  const getKeyInsights = () => {
    if (selectedComparison === "right-side") {
      if (selectedMetricA.includes("hip") || selectedMetricA.includes("knee")) {
        return [
          {
            type: "warning" as const,
            text: "There's a 12% asymmetry between your left and right sides, which is slightly above the recommended threshold.",
          },
          {
            type: "neutral" as const,
            text: "Your right side shows higher values throughout the run, suggesting potential muscle imbalances.",
          },
          {
            type: "positive" as const,
            text: "The asymmetry pattern is consistent, indicating a stable biomechanical pattern rather than fatigue-related changes.",
          },
        ]
      } else {
        return [
          {
            type: "positive" as const,
            text: "Your left-right symmetry is good, with only 5% difference between sides.",
          },
          {
            type: "neutral" as const,
            text: "Both sides show similar patterns throughout your run, indicating balanced biomechanics.",
          },
          {
            type: "warning" as const,
            text: "Minor asymmetry appears at kilometer 3, which could be related to terrain changes.",
          },
        ]
      }
    } else if (selectedComparison === "previous-run") {
      return [
        {
          type: "positive" as const,
          text: "Your current run shows 8% improvement in biomechanical efficiency compared to your previous run.",
        },
        {
          type: "warning" as const,
          text: "The pattern at kilometer 3 persists across both runs, suggesting a consistent form issue.",
        },
        {
          type: "neutral" as const,
          text: "Overall trends are similar, indicating consistent running mechanics between sessions.",
        },
      ]
    } else if (selectedComparison === "first-vs-last") {
      return [
        {
          type: "negative" as const,
          text: "Your biomechanics show significant changes between first and last kilometer, indicating fatigue effects.",
        },
        {
          type: "warning" as const,
          text: "Last kilometer values are 15% higher, which could increase injury risk if this pattern persists.",
        },
        {
          type: "positive" as const,
          text: "Your ability to maintain form through most of the run shows good endurance.",
        },
      ]
    } else {
      return [
        {
          type: "neutral" as const,
          text: "Your current values are within 10% of your personal best run.",
        },
        {
          type: "positive" as const,
          text: "Your personal best run shows more consistent patterns, suggesting a target to aim for.",
        },
        {
          type: "warning" as const,
          text: "The difference is most notable in the middle portion of your run.",
        },
      ]
    }
  }

  // Generate sample values for comparison
  const getCurrentValue = () => {
    if (selectedMetricA.includes("hip")) return 24.3
    if (selectedMetricA.includes("knee")) return 38.7
    if (selectedMetricA.includes("force")) return 2.8
    if (selectedMetricA.includes("load")) return 76.2
    return 25.6
  }

  const getComparisonValue = () => {
    const current = getCurrentValue()
    if (selectedComparison === "right-side") {
      return current * 1.12 // 12% higher for right side
    } else if (selectedComparison === "previous-run") {
      return current * 0.92 // 8% lower in previous run
    } else if (selectedComparison === "first-vs-last") {
      return current * 1.15 // 15% higher in last km
    } else {
      return current * 1.05 // 5% higher in personal best
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header title="Data Explorer: Comparison" showBackButton={true} />

      <div className="container max-w-md mx-auto px-4 py-4 pb-20">
        <TabNavigation activeTab="data-explorer" />

        <div className="mt-6">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <MetricSelector
              label="Metric A:"
              value={selectedMetricA}
              onChange={handleMetricAChange}
              metrics={availableMetrics}
            />

            <MetricSelector
              label="Compare with:"
              value={selectedComparison}
              onChange={handleComparisonChange}
              metrics={comparisonOptions}
            />
          </div>

          <ChartArea
            title={getSelectedMetricALabel()}
            yAxisLabel={
              selectedMetricA.includes("force")
                ? "Force (N)"
                : selectedMetricA.includes("load")
                  ? "Load (%)"
                  : "Angle (°)"
            }
            xAxisLabel="Kilometer"
            onExplainClick={handleExplainClickA}
            onPointClick={handlePointClick}
            showMagicIcon={true}
            comparisonMode={true}
            comparisonLabel={getComparisonLabel()}
          />

          {selectedPoint && (
            <PointExplanationCard
              pointIndex={selectedPoint.index}
              value={selectedPoint.value}
              metricName={getSelectedMetricALabel()}
              onClose={() => setSelectedPoint(null)}
            />
          )}

          <ComparisonInsight
            metricName={getSelectedMetricALabel()}
            currentValue={getCurrentValue()}
            comparisonValue={getComparisonValue()}
            comparisonLabel={getComparisonLabel()}
          />

          <KeyInsightsCard insights={getKeyInsights()} metricName={`${getSelectedMetricALabel()} Comparison`} />

          {selectedComparison === "first-vs-last" && (
            <div className="bg-[#f0f7ff] p-3 rounded-md mb-6">
              <p className="text-sm text-[#42b4f7] font-medium">Comparison View</p>
              <p className="text-xs text-gray-600 mt-1">
                This view shows how your {getSelectedMetricALabel()} changed between the first and last kilometer of
                your run, helping identify fatigue-related changes in your biomechanics.
              </p>
            </div>
          )}
        </div>
      </div>

      <LLMExplanationModal
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        metricName={activeExplanationChart === "a" ? getSelectedMetricALabel() : getComparisonMetricLabel()}
        runDate={runDate}
        specificPoint={activeExplanationChart === "b" ? "comparison" : undefined}
      />
      <MobileNavbar />
    </div>
  )
}

export default DataExplorerV2
