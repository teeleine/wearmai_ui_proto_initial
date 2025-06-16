"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const VariationSelector: React.FC = () => {
  const [selectedScreenType, setSelectedScreenType] = useState<string>("dashboard")
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null)
  const navigate = useNavigate()

  const screenTypes = [
    { value: "dashboard", label: "Dashboard" },
    { value: "run-history", label: "Run History" },
    { value: "run-detail", label: "Run Detail" },
    { value: "data-explorer", label: "Data Explorer" },
    { value: "llm-coach-report", label: "LLM Coach Report" },
    { value: "drill-detail", label: "Drill Detail" },
    { value: "alert-detail", label: "Alert Detail" },
    { value: "chat-coach", label: "Chat Coach" },
    { value: "training-plan", label: "Training Plan" },
    { value: "proposed-plan-change", label: "Proposed Plan Change" },
    { value: "feedback-preferences", label: "Feedback Preferences" },
    { value: "body-load-visualization", label: "Body Load & Soreness" },
    { value: "workout-edit", label: "Workout Edit" },
    { value: "llm-generated-training-plan", label: "LLM Generated Training Plan" },
  ]

  const dashboardVariations = [
    { name: "Card Layout", description: "Stacked cards with clear sections", path: "/v1" },
    { name: "Feed Layout", description: "Vertical feed of insights and updates", path: "/v2" },
    { name: "Body Load Focus", description: "Dashboard with prominent body load", path: "/v3" },
    { name: "Daily Digest", description: "LLM summary of the day's focus", path: "/v4" },
  ]

  const runHistoryVariations = [
    { name: "Simple List", description: "Basic, easy-to-scan chronological list", path: "/run-history/v1" },
    { name: "Grouped List", description: "Temporal grouping for easier navigation", path: "/run-history/v2" },
    { name: "List with Mini-Graph", description: "Visual cues for richer information", path: "/run-history/v3" },
  ]

  const runDetailVariations = [
    { name: "Table for Metrics", description: "Dense, structured presentation of data", path: "/run-detail/v1" },
    { name: "Icon + Value for Metrics", description: "Visual, scannable presentation", path: "/run-detail/v2" },
    { name: "Expandable Sections", description: "Progressive disclosure of data", path: "/run-detail/v3" },
  ]

  const dataExplorerVariations = [
    { name: "Single Chart View", description: "Focus on one metric at a time", path: "/data-explorer/v1" },
    { name: "Comparison View", description: "Compare metrics or conditions", path: "/data-explorer/v2" },
    { name: "Magic Icon Explanation", description: "LLM explanation via icon", path: "/data-explorer/v3a" },
    { name: "Direct Chart Interaction", description: "Tap chart for explanation", path: "/data-explorer/v3b" },
    { name: "Persistent Ask Button", description: "Dedicated button for explanation", path: "/data-explorer/v3c" },
  ]

  const llmCoachReportVariations = [
    { name: "Narrative Focus", description: "Conversational, storytelling approach", path: "/llm-coach-report/v1" },
    {
      name: "Chunked & Severity Highlighted",
      description: "Scannable, modular approach",
      path: "/llm-coach-report/v2",
    },
    { name: "Interactive Body Map", description: "Visual and interactive approach", path: "/llm-coach-report/v3" },
  ]

  const drillDetailVariations = [
    { name: "Modal Overlay", description: "Quick, contextual drill view", path: "/drill-detail/v1" },
    { name: "Visual Emphasis", description: "Immersive experience with visual priority", path: "/drill-detail/v2" },
    { name: "Interactive Checklist", description: "Guided learning with phased information", path: "/drill-detail/v3" },
  ]

  const alertDetailVariations = [
    {
      name: "Single Scroll Page",
      description: "Linear presentation of all alert information",
      path: "/alert-detail/v1",
    },
    { name: "Tabbed Sections", description: "Information in digestible, selectable chunks", path: "/alert-detail/v2" },
    { name: "Visual First", description: "Leading with body map visualization", path: "/alert-detail/v3" },
  ]

  const chatCoachVariations = [
    {
      name: "Static Pre-emptive Prompts",
      description: "Generic prompt suggestions for chat",
      path: "/chat-coach/v1a",
    },
    {
      name: "Dynamic Contextual Prompts",
      description: "Context-aware prompt suggestions",
      path: "/chat-coach/v1b",
    },
    {
      name: "Text-Based Responses",
      description: "Simple text-only chat responses",
      path: "/chat-coach/v2a",
    },
    {
      name: "Rich Interactive Responses",
      description: "Cards and interactive elements in chat",
      path: "/chat-coach/v2b",
    },
    {
      name: "Full Screen Chat",
      description: "Full screen chat invocation",
      path: "/chat-coach/v3a",
    },
    {
      name: "Modal Overlay Chat",
      description: "Chat as a modal overlay",
      path: "/chat-coach/v3b",
    },
  ]

  const trainingPlanVariations = [
    {
      name: "Calendar View",
      description: "Week/Month toggle with standard calendar layout",
      path: "/training-plan/v1",
    },
    {
      name: "Agenda List View",
      description: "Chronological list of upcoming workouts",
      path: "/training-plan/v2",
    },
    {
      name: "Load Projection View",
      description: "Calendar with integrated training load visualization",
      path: "/training-plan/v3",
    },
  ]

  const proposedPlanChangeVariations = [
    {
      name: "Side-by-Side Comparison",
      description: "Clear comparison between original and suggested workout",
      path: "/proposed-plan-change/v1",
    },
    {
      name: "Track Changes Style",
      description: "Highlight differences with strikethrough formatting",
      path: "/proposed-plan-change/v2",
    },
    {
      name: "Impact Preview",
      description: "Show potential outcomes of accepting or rejecting changes",
      path: "/proposed-plan-change/v3",
    },
  ]

  const feedbackPreferencesVariations = [
    {
      name: "Granular Controls",
      description: "Comprehensive settings with individual controls",
      path: "/feedback-preferences/v1",
    },
    {
      name: "Persona-Driven Presets",
      description: "Simplified setup with persona-based defaults",
      path: "/feedback-preferences/v2",
    },
    {
      name: "Live Preview",
      description: "See example feedback based on your settings",
      path: "/feedback-preferences/v3",
    },
  ]

  const bodyLoadVisualizationVariations = [
    {
      name: "Overall Heatmap",
      description: "Simple heatmap with basic interaction",
      path: "/body-load-visualization/v1",
    },
    {
      name: "Interactive Hotspots",
      description: "Detailed information via interactive hotspots",
      path: "/body-load-visualization/v2",
    },
    {
      name: "Front/Back Toggle",
      description: "Switch between front and back views",
      path: "/body-load-visualization/v3",
    },
    {
      name: "Asymmetry Focus",
      description: "Highlight left/right imbalances",
      path: "/body-load-visualization/v4",
    },
  ]

  const workoutEditVariations = [
    {
      name: "LLM Advice Pre-Save",
      description: "Request coach advice before saving changes",
      path: "/workout-edit/v1",
    },
    {
      name: "LLM Validation After Save",
      description: "Automatic feedback when attempting to save",
      path: "/workout-edit/v2",
    },
    {
      name: "Inline LLM Suggestions",
      description: "Real-time feedback during editing",
      path: "/workout-edit/v3",
    },
  ]

  const llmGeneratedTrainingPlanVariations = [
    {
      name: "Structured Calendar",
      description: "Calendar with expandable rationale & weekly focus",
      path: "/llm-generated-training-plan/v1",
    },
    {
      name: "Coach's Letter",
      description: "Narrative format with inline visuals",
      path: "/llm-generated-training-plan/v2",
    },
    {
      name: "Biomechanical Focus",
      description: "Plan with targeted improvement modules",
      path: "/llm-generated-training-plan/v3",
    },
  ]

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const getVariations = () => {
    if (selectedScreenType === "dashboard") return dashboardVariations
    if (selectedScreenType === "run-history") return runHistoryVariations
    if (selectedScreenType === "run-detail") return runDetailVariations
    if (selectedScreenType === "data-explorer") return dataExplorerVariations
    if (selectedScreenType === "llm-coach-report") return llmCoachReportVariations
    if (selectedScreenType === "drill-detail") return drillDetailVariations
    if (selectedScreenType === "alert-detail") return alertDetailVariations
    if (selectedScreenType === "chat-coach") return chatCoachVariations
    if (selectedScreenType === "training-plan") return trainingPlanVariations
    if (selectedScreenType === "proposed-plan-change") return proposedPlanChangeVariations
    if (selectedScreenType === "feedback-preferences") return feedbackPreferencesVariations
    if (selectedScreenType === "body-load-visualization") return bodyLoadVisualizationVariations
    if (selectedScreenType === "workout-edit") return workoutEditVariations
    if (selectedScreenType === "llm-generated-training-plan") return llmGeneratedTrainingPlanVariations
    return alertDetailVariations
  }

  const handleScreenTypeChange = (value: string) => {
    setSelectedScreenType(value)
    setSelectedVariation(null)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-2 text-center">WearM.AI Prototype</h1>
        <p className="text-center text-muted-foreground mb-6">Select a screen variation to explore:</p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Screen Type:</label>
          <Select value={selectedScreenType} onValueChange={handleScreenTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select screen type" />
            </SelectTrigger>
            <SelectContent>
              {screenTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <p className="text-sm text-muted-foreground mt-4 mb-2">
            {selectedScreenType === "dashboard" && "Dashboard screen variations:"}
            {selectedScreenType === "run-history" && "Run history screen variations:"}
            {selectedScreenType === "run-detail" && "Run detail screen variations:"}
            {selectedScreenType === "data-explorer" && "Data explorer screen variations:"}
            {selectedScreenType === "llm-coach-report" && "LLM Coach Report screen variations:"}
            {selectedScreenType === "drill-detail" && "Drill Detail screen variations:"}
            {selectedScreenType === "alert-detail" && "Alert Detail screen variations:"}
            {selectedScreenType === "chat-coach" && "Chat Coach screen variations:"}
            {selectedScreenType === "training-plan" && "Training Plan screen variations:"}
            {selectedScreenType === "proposed-plan-change" && "Proposed Plan Change screen variations:"}
            {selectedScreenType === "feedback-preferences" && "Feedback Preferences screen variations:"}
            {selectedScreenType === "body-load-visualization" && "Body Load & Soreness screen variations:"}
            {selectedScreenType === "workout-edit" && "Workout Edit screen variations:"}
            {selectedScreenType === "llm-generated-training-plan" && "LLM Generated Training Plan screen variations:"}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {getVariations().map((variation, index) => (
            <div
              key={index}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedVariation === index
                  ? "border-wearmai-primary bg-wearmai-light/10"
                  : "border-gray-200 hover:border-wearmai-primary"
              }`}
              onClick={() => setSelectedVariation(index)}
            >
              <h3 className="font-medium">{variation.name}</h3>
              <p className="text-sm text-muted-foreground">{variation.description}</p>
            </div>
          ))}
        </div>

        <Button
          className="w-full bg-wearmai-primary hover:bg-wearmai-primary/80"
          onClick={() => selectedVariation !== null && handleNavigate(getVariations()[selectedVariation].path)}
          disabled={selectedVariation === null}
        >
          View Selected Variation
        </Button>
      </Card>
    </div>
  )
}

export default VariationSelector
