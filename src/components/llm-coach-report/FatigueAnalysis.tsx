"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info } from 'lucide-react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface FatigueAnalysisProps {
  title?: string
  className?: string
}

const FatigueAnalysis: React.FC<FatigueAnalysisProps> = ({ 
  title = "Fatigue Analysis", 
  className = "" 
}) => {
  const [showInfo, setShowInfo] = useState(false)
  
  // Sample data for fatigue metrics across the run
  const fatigueData = [
    { distance: "0.5", pelvicDrop: 3.8, kneeFlexion: 40.1, formScore: 92 },
    { distance: "1.0", pelvicDrop: 3.9, kneeFlexion: 40.0, formScore: 91 },
    { distance: "1.5", pelvicDrop: 4.0, kneeFlexion: 39.8, formScore: 90 },
    { distance: "2.0", pelvicDrop: 4.1, kneeFlexion: 39.7, formScore: 88 },
    { distance: "2.5", pelvicDrop: 4.3, kneeFlexion: 39.5, formScore: 86 },
    { distance: "3.0", pelvicDrop: 4.5, kneeFlexion: 39.3, formScore: 84 },
    { distance: "3.5", pelvicDrop: 4.7, kneeFlexion: 39.0, formScore: 82 },
    { distance: "4.0", pelvicDrop: 4.9, kneeFlexion: 38.7, formScore: 79 },
    { distance: "4.5", pelvicDrop: 5.1, kneeFlexion: 38.3, formScore: 76 },
    { distance: "5.0", pelvicDrop: 5.2, kneeFlexion: 38.0, formScore: 74 },
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
        <div className="h-[200px] mb-3">
          <ChartContainer
            config={{
              "Pelvic Drop": {
                theme: {
                  light: "#6131ca",
                  dark: "#6131ca",
                },
              },
              "Form Score": {
                theme: {
                  light: "#42b4f7",
                  dark: "#42b4f7",
                },
              },
            }}
          >
            <LineChart data={fatigueData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="distance" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10 }}
                label={{ 
                  value: 'Distance (km)', 
                  position: 'insideBottom',
                  offset: -5,
                  style: { fontSize: 10, textAnchor: 'middle' }
                }}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10 }} 
                domain={[3, 6]}
                tickCount={4}
                label={{ 
                  value: 'Pelvic Drop (°)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: 10, textAnchor: 'middle', fill: '#6131ca' }
                }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10 }} 
                domain={[70, 100]}
                tickCount={4}
                label={{ 
                  value: 'Form Score', 
                  angle: 90, 
                  position: 'insideRight',
                  style: { fontSize: 10, textAnchor: 'middle', fill: '#42b4f7' }
                }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="pelvicDrop" 
                name="Pelvic Drop" 
                stroke="var(--color-Pelvic Drop)" 
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="formScore" 
                name="Form Score" 
                stroke="#42b4f7" 
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </LineChart>
          </ChartContainer>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg mb-3">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Fatigue Insights</h3>
          <div className="space-y-2">
            <div className="flex items-start">
              <div className="w-3 h-3 rounded-full bg-[#6131ca] mt-1 mr-2"></div>
              <p className="text-xs text-gray-600">
                Your pelvic stability decreased by 37% in the final kilometer, indicating fatigue in your core and hip stabilizers.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 rounded-full bg-[#42b4f7] mt-1 mr-2"></div>
              <p className="text-xs text-gray-600">
                Your overall form score dropped by 20% from start to finish, with most changes occurring after the 3km mark.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 rounded-full bg-[#f9ca24] mt-1 mr-2"></div>
              <p className="text-xs text-gray-600">
                Knee flexion decreased slightly throughout the run, which may be a compensation for increasing fatigue.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-2 h-8 bg-gradient-to-b from-[#42b4f7] to-[#6131ca] rounded-sm mr-2"></div>
            <div className="text-xs">
              <p className="font-medium text-gray-700">Fatigue Resistance Score</p>
              <p className="text-gray-500">Moderate (65/100)</p>
            </div>
          </div>
          <div className="text-xs text-right">
            <p className="font-medium text-gray-700">Endurance Focus</p>
            <p className="text-[#42b4f7]">Recommended</p>
          </div>
        </div>
        
        {showInfo && (
          <div className="mt-3 p-3 bg-[#f0f7ff] rounded-md text-xs text-gray-700">
            <p className="font-medium mb-1">Understanding Fatigue Analysis</p>
            <p>
              This chart shows how your running form changes as fatigue sets in during your run.
              The pelvic drop increase and form score decrease indicate when your stabilizing muscles
              begin to fatigue, which can lead to compensatory movements and increased injury risk.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default FatigueAnalysis
