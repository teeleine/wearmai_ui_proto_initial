"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info } from 'lucide-react'

interface AsymmetryIndexProps {
  title?: string
  className?: string
}

const AsymmetryIndex: React.FC<AsymmetryIndexProps> = ({ 
  title = "Biomechanical Asymmetry Index", 
  className = "" 
}) => {
  const [showInfo, setShowInfo] = useState(false)
  
  // Asymmetry data
  const asymmetryData = [
    { metric: "Calf Muscle Load", left: 70, right: 63, difference: 7, status: "medium" },
    { metric: "Knee Joint Force", left: 2.5, right: 2.8, difference: 0.3, status: "high" },
    { metric: "Hip Flexion", left: 22.5, right: 21.9, difference: 0.6, status: "low" },
    { metric: "Foot Pronation", left: 8, right: 10, difference: 2, status: "medium" },
    { metric: "Ground Contact Time", left: 245, right: 252, difference: 7, status: "low" },
  ]
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-[#42b4f7]"
      case "medium":
        return "bg-[#f9ca24]"
      case "high":
        return "bg-[#6131ca]"
      default:
        return "bg-gray-300"
    }
  }
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "low":
        return "Normal"
      case "medium":
        return "Moderate"
      case "high":
        return "Significant"
      default:
        return "Unknown"
    }
  }
  
  // Calculate overall asymmetry score (0-100)
  const overallScore = 72

  return (
    <Card className={`mb-6 border border-gray-200 shadow-sm ${className}`}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center justify-between">
          <span>{title}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={() => setShowInfo(!showInfo)}
          >
            <Info size={16} className="text-[#42b4f7]" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-700">Overall Symmetry Score</h3>
                <span className="text-lg font-bold text-[#42b4f7]">{overallScore}/100</span>
              </div>
              
              {/* Score gauge */}
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                  className={`absolute top-0 left-0 h-full rounded-full ${
                    overallScore >= 80 ? 'bg-[#83c55b]' : 
                    overallScore >= 60 ? 'bg-[#42b4f7]' : 
                    overallScore >= 40 ? 'bg-[#f9ca24]' : 
                    'bg-[#6131ca]'
                  }`}
                  style={{ width: `${overallScore}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>Asymmetrical</span>
                <span>Symmetrical</span>
              </div>
              
              <p className="mt-3 text-xs text-gray-600">
                Your overall symmetry is good, with some moderate asymmetries in calf load and foot pronation.
                The most significant asymmetry is in your knee joint forces.
              </p>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-gray-50 p-3 rounded-lg h-full flex flex-col justify-center">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Key Asymmetries</h3>
              
              {/* Top 3 asymmetries */}
              <div className="space-y-2">
                {asymmetryData
                  .sort((a, b) => b.difference - a.difference)
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)} mr-2`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">{item.metric}</span>
                          <span className="text-xs font-medium text-gray-700">
                            {typeof item.difference === 'number' && item.difference < 1 
                              ? item.difference.toFixed(1) 
                              : item.difference}{typeof item.left === 'number' && item.left < 10 ? '°' : '%'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              
              <div className="mt-3 text-xs text-gray-500 italic">
                Tap for detailed left-right comparison
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed asymmetry table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium text-gray-700">Metric</th>
                <th className="text-center py-2 font-medium text-gray-700">Left</th>
                <th className="text-center py-2 font-medium text-gray-700">Right</th>
                <th className="text-center py-2 font-medium text-gray-700">Difference</th>
                <th className="text-right py-2 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {asymmetryData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">{item.metric}</td>
                  <td className="py-2 text-center text-gray-700">
                    {typeof item.left === 'number' && item.left < 10 
                      ? item.left.toFixed(1) + '°' 
                      : item.left + (item.metric === "Ground Contact Time" ? 'ms' : '%')}
                  </td>
                  <td className="py-2 text-center text-gray-700">
                    {typeof item.right === 'number' && item.right < 10 
                      ? item.right.toFixed(1) + '°' 
                      : item.right + (item.metric === "Ground Contact Time" ? 'ms' : '%')}
                  </td>
                  <td className="py-2 text-center font-medium text-gray-700">
                    {typeof item.difference === 'number' && item.difference < 1 
                      ? item.difference.toFixed(1) 
                      : item.difference}{item.metric === "Ground Contact Time" ? 'ms' : '%'}
                  </td>
                  <td className="py-2 text-right">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-white text-[10px] ${
                      getStatusColor(item.status).replace('bg-', 'bg-')
                    }`}>
                      {getStatusText(item.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {showInfo && (
          <div className="mt-3 p-3 bg-[#f0f7ff] rounded-md text-xs text-gray-700">
            <p className="font-medium mb-1">Understanding Asymmetry Index</p>
            <p>
              The Asymmetry Index measures differences between your left and right sides during running.
              Some asymmetry is normal, but significant differences can lead to compensatory movements
              and increased injury risk. Focus on metrics with "Moderate" or "Significant" status.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AsymmetryIndex
