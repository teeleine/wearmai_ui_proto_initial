"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info, CheckCircle } from 'lucide-react'

interface RecoveryTimelineProps {
  title?: string
  className?: string
}

const RecoveryTimeline: React.FC<RecoveryTimelineProps> = ({ 
  title = "Recovery Timeline", 
  className = "" 
}) => {
  const [showInfo, setShowInfo] = useState(false)
  
  // Recovery timeline data
  const recoveryStages = [
    {
      time: "0-6 hours",
      title: "Acute Recovery",
      status: "active",
      description: "Focus on hydration and light nutrition. Your right knee and left calf need extra attention.",
      recommendations: [
        "Hydrate with electrolytes",
        "Light protein intake",
        "Gentle stretching for calves",
        "10 minutes of cold therapy for right knee"
      ]
    },
    {
      time: "6-24 hours",
      title: "Muscle Recovery",
      status: "upcoming",
      description: "Address muscle soreness and begin tissue repair process.",
      recommendations: [
        "Foam roll quads and calves",
        "Light walking to promote circulation",
        "Adequate protein intake",
        "Compression for left calf"
      ]
    },
    {
      time: "24-48 hours",
      title: "Functional Recovery",
      status: "upcoming",
      description: "Begin restoring movement patterns and addressing imbalances.",
      recommendations: [
        "Glute activation exercises",
        "Light mobility work",
        "Core stability exercises",
        "Balance training"
      ]
    },
    {
      time: "48-72 hours",
      title: "Return to Training",
      status: "upcoming",
      description: "Gradually reintroduce training load based on recovery status.",
      recommendations: [
        "Easy run with focus on form",
        "Strength training for stabilizers",
        "Monitor right knee response",
        "Reassess pelvic stability"
      ]
    }
  ]

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
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-gray-200"></div>
          
          {/* Timeline stages */}
          {recoveryStages.map((stage, index) => (
            <div key={index} className="relative pl-12 pb-6">
              {/* Timeline dot */}
              <div className={`absolute left-4 w-4 h-4 rounded-full transform -translate-x-1/2 mt-1 ${
                stage.status === 'active' 
                  ? 'bg-[#42b4f7]' 
                  : stage.status === 'completed' 
                    ? 'bg-[#83c55b]' 
                    : 'bg-gray-200'
              }`}></div>
              
              {/* Content */}
              <div>
                <div className="flex items-center mb-1">
                  <span className="text-xs text-gray-500 mr-2">{stage.time}</span>
                  <h3 className={`text-sm font-medium ${
                    stage.status === 'active' 
                      ? 'text-[#42b4f7]' 
                      : stage.status === 'completed' 
                        ? 'text-[#83c55b]' 
                        : 'text-gray-700'
                  }`}>
                    {stage.title}
                    {stage.status === 'completed' && <CheckCircle size={14} className="inline ml-1" />}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 mb-2">{stage.description}</p>
                
                {/* Recommendations */}
                <div className={`p-2 rounded-md text-xs ${
                  stage.status === 'active' 
                    ? 'bg-[#f0f7ff]' 
                    : 'bg-gray-50'
                }`}>
                  <div className="grid grid-cols-2 gap-2">
                    {stage.recommendations.map((rec, recIndex) => (
                      <div key={recIndex} className="flex items-start">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1 mr-1 ${
                          stage.status === 'active' 
                            ? 'bg-[#42b4f7]' 
                            : 'bg-gray-300'
                        }`}></div>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {showInfo && (
          <div className="mt-3 p-3 bg-[#f0f7ff] rounded-md text-xs text-gray-700">
            <p className="font-medium mb-1">Understanding Recovery Timeline</p>
            <p>
              This personalized recovery timeline is based on your biomechanical data and load patterns from your run.
              Following these recommendations will help optimize recovery for your specific needs and reduce injury risk
              for future training.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RecoveryTimeline
