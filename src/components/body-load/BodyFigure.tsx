"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface BodyFigureProps {
  view: "front" | "back"
  dataType: "muscle-load" | "joint-force" | "soreness" | "asymmetry"
  onRegionClick?: (region: string) => void
  runPhase?: "full-run" | "start" | "middle" | "end"
  timePoint?: number // 0-100 percentage of run completed
  viewMode?: "normal" | "3d"
  animate?: boolean
  highlightAsymmetry?: boolean
}

const BodyFigure: React.FC<BodyFigureProps> = ({
  view,
  dataType,
  onRegionClick,
  runPhase = "full-run",
  timePoint = 100,
  viewMode = "normal",
  animate = false,
  highlightAsymmetry = false,
}) => {
  const [rotation, setRotation] = useState(0)
  const [pulsing, setPulsing] = useState<string | null>(null)

  // For 3D view effect
  useEffect(() => {
    if (viewMode === "3d") {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 1) % 20)
      }, 100)
      return () => clearInterval(interval)
    } else {
      setRotation(0)
    }
  }, [viewMode])

  // For pulsing effect on asymmetry areas
  useEffect(() => {
    if (animate && highlightAsymmetry) {
      const regions = ["Left Quadriceps", "Left Knee"]
      let index = 0

      const interval = setInterval(() => {
        setPulsing(regions[index])
        index = (index + 1) % regions.length
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [animate, highlightAsymmetry])

  const handleRegionClick = (region: string) => {
    if (onRegionClick) {
      onRegionClick(region)
    }
  }

  // Get color based on run phase or time point
  const getPhaseColor = (region: string, defaultColor: string) => {
    if (runPhase === "start" && region.includes("Calf")) {
      return "#10B981" // Green - lower load at start
    } else if (runPhase === "middle" && region.includes("Quadriceps")) {
      return "#F59E0B" // Yellow - moderate load in middle
    } else if (runPhase === "end" && region.includes("Quadriceps")) {
      return "#EF4444" // Red - high load at end
    } else if (timePoint < 30 && region.includes("Calf")) {
      return "#10B981" // Green - lower load at start
    } else if (timePoint >= 30 && timePoint < 70 && region.includes("Quadriceps")) {
      return "#F59E0B" // Yellow - moderate load in middle
    } else if (timePoint >= 70 && region.includes("Quadriceps")) {
      return "#EF4444" // Red - high load at end
    }

    return defaultColor
  }

  // Determine if a region should pulse
  const shouldPulse = (region: string) => {
    return pulsing === region
  }

  return (
    <div className="relative w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${viewMode === "3d" ? `transform perspective-1000 rotateY(${rotation}deg)` : ""}`}
      >
        {/* Simplified body outline */}
        <svg
          width="180"
          height="350"
          viewBox="0 0 180 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-h-full"
        >
          {/* Head */}
          <circle cx="90" cy="40" r="30" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />

          {/* Torso */}
          <rect x="60" y="70" width="60" height="100" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />

          {/* Arms */}
          <rect x="30" y="80" width="30" height="80" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
          <rect x="120" y="80" width="30" height="80" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />

          {/* Legs */}
          <rect x="60" y="170" width="25" height="120" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
          <rect x="95" y="170" width="25" height="120" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />

          {/* Muscle load or joint force overlays */}
          {dataType === "muscle-load" && (
            <>
              {/* Left Quad - High Load (Red) */}
              <rect
                x="60"
                y="170"
                width="25"
                height="60"
                fill={getPhaseColor("Left Quadriceps", "#EF4444")}
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Left Quadriceps")}
                className="cursor-pointer"
              />

              {/* Right Quad - Medium Load (Yellow) */}
              <rect
                x="95"
                y="170"
                width="25"
                height="60"
                fill={getPhaseColor("Right Quadriceps", "#F59E0B")}
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Right Quadriceps")}
                className="cursor-pointer"
              />

              {/* Left Calf - Low Load (Green) */}
              <rect
                x="60"
                y="230"
                width="25"
                height="60"
                fill={getPhaseColor("Left Calf", "#10B981")}
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Left Calf")}
                className="cursor-pointer"
              />

              {/* Right Calf - Medium Load (Yellow) */}
              <rect
                x="95"
                y="230"
                width="25"
                height="60"
                fill={getPhaseColor("Right Calf", "#F59E0B")}
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Right Calf")}
                className="cursor-pointer"
              />
            </>
          )}

          {dataType === "joint-force" && (
            <>
              {/* Left Knee - High Force (Red) */}
              <circle
                cx="72.5"
                cy="230"
                r="10"
                fill="#EF4444"
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Left Knee")}
                className="cursor-pointer"
              />

              {/* Right Knee - Medium Force (Yellow) */}
              <circle
                cx="107.5"
                cy="230"
                r="10"
                fill="#F59E0B"
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Right Knee")}
                className="cursor-pointer"
              />

              {/* Left Ankle - Low Force (Green) */}
              <circle
                cx="72.5"
                cy="290"
                r="8"
                fill="#10B981"
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Left Ankle")}
                className="cursor-pointer"
              />

              {/* Right Ankle - Low Force (Green) */}
              <circle
                cx="107.5"
                cy="290"
                r="8"
                fill="#10B981"
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Right Ankle")}
                className="cursor-pointer"
              />
            </>
          )}

          {dataType === "soreness" && (
            <>
              {/* Left Quad - Sore (Red) */}
              <rect
                x="60"
                y="170"
                width="25"
                height="60"
                fill="#EF4444"
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Left Quadriceps")}
                className="cursor-pointer"
              />

              {/* Right Knee - Slightly Sore (Yellow) */}
              <circle
                cx="107.5"
                cy="230"
                r="10"
                fill="#F59E0B"
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Right Knee")}
                className="cursor-pointer"
              />
            </>
          )}

          {dataType === "asymmetry" && (
            <>
              {/* Left Quad - Higher Load (Red) */}
              <rect
                x="60"
                y="170"
                width="25"
                height="60"
                fill="#EF4444"
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Left Quadriceps")}
                className="cursor-pointer"
              />

              {/* Right Quad - Lower Load (Green) */}
              <rect
                x="95"
                y="170"
                width="25"
                height="60"
                fill="#10B981"
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Right Quadriceps")}
                className="cursor-pointer"
              />

              {/* Left Knee - Higher Force (Red) */}
              <circle
                cx="72.5"
                cy="230"
                r="10"
                fill="#EF4444"
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Left Knee")}
                className="cursor-pointer"
              />

              {/* Right Knee - Lower Force (Green) */}
              <circle
                cx="107.5"
                cy="230"
                r="10"
                fill="#10B981"
                fillOpacity="0.7"
                onClick={() => handleRegionClick("Right Knee")}
                className="cursor-pointer"
              />

              {/* Highlight the asymmetry with a pulsing effect */}
              {shouldPulse("Left Quadriceps") && (
                <rect
                  x="60"
                  y="170"
                  width="25"
                  height="60"
                  stroke="#EF4444"
                  strokeWidth="3"
                  fill="none"
                  className="animate-pulse"
                />
              )}

              {shouldPulse("Left Knee") && (
                <circle
                  cx="72.5"
                  cy="230"
                  r="12"
                  stroke="#EF4444"
                  strokeWidth="3"
                  fill="none"
                  className="animate-pulse"
                />
              )}
            </>
          )}

          {/* Hip alignment indicator for asymmetry */}
          {dataType === "asymmetry" && (
            <>
              <line x1="60" y1="170" x2="120" y2="170" stroke="#000000" strokeWidth="2" strokeDasharray="4" />
              <line x1="60" y1="170" x2="116" y2="175" stroke="#FF0000" strokeWidth="2" />
              <text x="125" y="175" fontSize="8" fill="#FF0000">
                +5°
              </text>
            </>
          )}

          {/* Connection lines for chain reaction */}
          {dataType === "asymmetry" && highlightAsymmetry && (
            <>
              <path
                d="M72.5 200 C 72.5 210, 72.5 220, 72.5 230"
                stroke="#FF0000"
                strokeWidth="1.5"
                strokeDasharray="3,3"
                fill="none"
              />
              <path
                d="M72.5 230 C 80 240, 85 245, 90 250"
                stroke="#FF0000"
                strokeWidth="1.5"
                strokeDasharray="3,3"
                fill="none"
              />
            </>
          )}

          {/* Hotspots */}
          {view === "front" && (
            <>
              {/* Left Quad Hotspot */}
              <circle
                cx="72.5"
                cy="200"
                r="6"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2"
                onClick={() => handleRegionClick("Left Quadriceps")}
                className="cursor-pointer"
              />

              {/* Right Quad Hotspot */}
              <circle
                cx="107.5"
                cy="200"
                r="6"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2"
                onClick={() => handleRegionClick("Right Quadriceps")}
                className="cursor-pointer"
              />

              {/* Left Calf Hotspot */}
              <circle
                cx="72.5"
                cy="260"
                r="6"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2"
                onClick={() => handleRegionClick("Left Calf")}
                className="cursor-pointer"
              />

              {/* Right Calf Hotspot */}
              <circle
                cx="107.5"
                cy="260"
                r="6"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2"
                onClick={() => handleRegionClick("Right Calf")}
                className="cursor-pointer"
              />
            </>
          )}
        </svg>
      </div>

      {/* 3D rotation hints */}
      {viewMode === "3d" && (
        <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs">
          <span>3D View - Auto-rotating</span>
        </div>
      )}

      {/* View indicator */}
      <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded text-xs font-medium">
        {view === "front" ? "Front View" : "Back View"}
      </div>

      {/* Data type or Run phase indicator */}
      <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded text-xs font-medium">
        {dataType === "muscle-load" && "Muscle Load"}
        {dataType === "joint-force" && "Joint Force"}
        {dataType === "soreness" && "Soreness"}
        {dataType === "asymmetry" && "Asymmetry"}
        {runPhase !== "full-run" && ` - ${runPhase.charAt(0).toUpperCase() + runPhase.slice(1)} Phase`}
        {timePoint < 100 && ` - ${timePoint}%`}
      </div>
    </div>
  )
}

export default BodyFigure
