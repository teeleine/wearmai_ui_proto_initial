"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Info } from 'lucide-react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface ProgressTrendChartProps {
  title?: string
  className?: string
}

const ProgressTrendChart: React.FC<ProgressTrendChartProps> = ({ 
  title = "Biomechanical Progress Trends", 
  className = "" 
}) => {
  const [showInfo, setShowInfo] = useState(false)
  
  // Sample data for different metrics
  const pelvicStabilityData = [
    { date: "Apr 15", value: 3.8, avg: 4.2 },
    { date: "Apr 22", value: 4.1, avg: 4.1 },
    { date: "Apr 29", value: 3.9, avg: 4.0 },
    { date: "May 6", value: 3.5, avg: 3.9 },
    { date: "May 13", value: 3.2, avg: 3.8 },
    { date: "May 16", value: 3.0, avg: 3.7 },
  ]
  
  const kneeLoadData = [
    { date: "Apr 15", value: 3.1, avg: 2.9 },
    { date: "Apr 22", value: 3.0, avg: 2.9 },
    { date: "Apr 29", value: 2.9, avg: 2.8 },
    { date: "May 6", value: 2.8, avg: 2.8 },
    { date: "May 13", value: 2.7, avg: 2.7 },
    { date: "May 16", value: 2.6, avg: 2.7 },
  ]
  
  const calfAsymmetryData = [
    { date: "Apr 15", value: 12, avg: 10 },
    { date: "Apr 22", value: 11, avg: 10 },
    { date: "Apr 29", value: 10, avg: 9 },
    { date: "May 6", value: 9, avg: 9 },
    { date: "May 13", value: 8, avg: 8 },
    { date: "May 16", value: 7, avg: 8 },
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
        <Tabs defaultValue="pelvic-stability">
          <TabsList className="w-full mb-3">
            <TabsTrigger value="pelvic-stability" className="flex-1">Pelvic Stability</TabsTrigger>
            <TabsTrigger value="knee-load" className="flex-1">Knee Load</TabsTrigger>
            <TabsTrigger value="calf-asymmetry" className="flex-1">Calf Asymmetry</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pelvic-stability" className="mt-0">
            <div className="h-[180px]">
              <ChartContainer
                config={{
                  "Your Data": {
                    theme: {
                      light: "#42b4f7",
                      dark: "#42b4f7",
                    },
                  },
                  "Runner Average": {
                    theme: {
                      light: "#a0aec0",
                      dark: "#a0aec0",
                    },
                  },
                }}
              >
                <LineChart data={pelvicStabilityData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10 }} 
                    domain={[0, 5]}
                    tickCount={6}
                    label={{ 
                      value: 'Degrees', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fontSize: 10, textAnchor: 'middle' }
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Your Data" 
                    stroke="#42b4f7" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avg" 
                    name="Runner Average" 
                    stroke="#6131ca" 
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ChartContainer>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              <p className="font-medium">Pelvic Drop (Right Side)</p>
              <p>Your pelvic stability has improved by 21% over the last month, showing good progress.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="knee-load" className="mt-0">
            <div className="h-[180px]">
              <ChartContainer
                config={{
                  "Your Data": {
                    theme: {
                      light: "#9c34c8",
                      dark: "#42b4f7",
                    },
                  },
                  "Runner Average": {
                    theme: {
                      light: "#a0aec0",
                      dark: "#a0aec0",
                    },
                  },
                }}
              >
                <LineChart data={kneeLoadData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10 }} 
                    domain={[2, 3.5]}
                    tickCount={4}
                    label={{ 
                      value: 'x Body Weight', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fontSize: 10, textAnchor: 'middle' }
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Your Data" 
                    stroke="#9c34c8" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avg" 
                    name="Runner Average" 
                    stroke="#6131ca" 
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ChartContainer>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              <p className="font-medium">Knee Joint Force (Right)</p>
              <p>Your knee load has decreased by 16% over the last month, now below the runner average.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="calf-asymmetry" className="mt-0">
            <div className="h-[180px]">
              <ChartContainer
                config={{
                  "Your Data": {
                    theme: {
                      light: "#42b4f7",
                      dark: "#42b4f7",
                    },
                  },
                  "Runner Average": {
                    theme: {
                      light: "#a0aec0",
                      dark: "#a0aec0",
                    },
                  },
                }}
              >
                <LineChart data={calfAsymmetryData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10 }} 
                    domain={[0, 15]}
                    tickCount={4}
                    label={{ 
                      value: '% Difference', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fontSize: 10, textAnchor: 'middle' }
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Your Data" 
                    stroke="#9c34c8" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avg" 
                    name="Runner Average" 
                    stroke="#2c56e4" 
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ChartContainer>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              <p className="font-medium">Calf Load Asymmetry (L-R)</p>
              <p>Your calf asymmetry has decreased by 42% over the last month, showing excellent progress.</p>
            </div>
          </TabsContent>
        </Tabs>
        
        {showInfo && (
          <div className="mt-3 p-3 bg-[#f0f7ff] rounded-md text-xs text-gray-700">
            <p className="font-medium mb-1">Understanding This Chart</p>
            <p>
              This chart shows your progress over time compared to the average runner with similar goals.
              Lower values indicate improvement for all metrics shown. The dotted line represents the average
              for runners at your level.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ProgressTrendChart
