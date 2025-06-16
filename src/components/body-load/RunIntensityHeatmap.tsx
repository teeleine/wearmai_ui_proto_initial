"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface RunIntensityHeatmapProps {
  dataType: "muscle-load" | "joint-force" | "soreness"
}

const RunIntensityHeatmap: React.FC<RunIntensityHeatmapProps> = ({ dataType }) => {
  const [currentFrame, setCurrentFrame] = useState(0)

  // Create animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % 5)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // This would normally use canvas with proper heatmap rendering
  // For this prototype, we're simulating with SVG
  return (
    <div className="relative w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
      <svg
        width="300"
        height="400"
        viewBox="0 0 300 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-h-full"
      >
        {/* Background running track */}
        <path
          d="M50,200 C50,100 250,100 250,200 C250,300 50,300 50,200"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="5"
          strokeDasharray="10,5"
        />

        {/* Intensity spots - these would normally be dynamically generated */}
        <circle cx="50" cy="200" r={10 + currentFrame * 2} fill="rgba(16, 185, 129, 0.7)" />
        <circle cx="100" cy="150" r={12 + currentFrame * 1.5} fill="rgba(245, 158, 11, 0.7)" />
        <circle cx="150" cy="120" r={15 + currentFrame} fill="rgba(239, 68, 68, 0.7)" />
        <circle cx="200" cy="150" r={13 + currentFrame * 1.2} fill="rgba(245, 158, 11, 0.7)" />
        <circle cx="250" cy="200" r={11 + currentFrame * 1.8} fill="rgba(16, 185, 129, 0.7)" />
        <circle cx="200" cy="250" r={16 - currentFrame} fill="rgba(239, 68, 68, 0.7)" />
        <circle cx="150" cy="280" r={14 - currentFrame * 0.8} fill="rgba(245, 158, 11, 0.7)" />
        <circle cx="100" cy="250" r={12 - currentFrame * 1.2} fill="rgba(16, 185, 129, 0.7)" />

        {/* Info text */}
        <text x="150" y="50" textAnchor="middle" fontSize="14" fill="#1F2937" fontWeight="bold">
          Run Intensity Heatmap
        </text>
        <text x="150" y="70" textAnchor="middle" fontSize="12" fill="#4B5563">
          {dataType === "muscle-load" ? "Muscle Load" : dataType === "joint-force" ? "Joint Force" : "Soreness"}{" "}
          hotspots
        </text>

        {/* Legend */}
        <circle cx="70" cy="350" r="6" fill="rgba(16, 185, 129, 0.7)" />
        <text x="85" y="353" fontSize="10" fill="#4B5563">
          Low
        </text>

        <circle cx="150" cy="350" r="6" fill="rgba(245, 158, 11, 0.7)" />
        <text x="165" y="353" fontSize="10" fill="#4B5563">
          Medium
        </text>

        <circle cx="230" cy="350" r="6" fill="rgba(239, 68, 68, 0.7)" />
        <text x="245" y="353" fontSize="10" fill="#4B5563">
          High
        </text>
      </svg>

      <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded text-xs font-medium">Intensity Map</div>
    </div>
  )
}

export default RunIntensityHeatmap
