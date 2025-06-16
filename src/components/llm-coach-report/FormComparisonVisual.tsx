"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Info } from 'lucide-react'

interface FormComparisonVisualProps {
  title?: string
  className?: string
}

const FormComparisonVisual: React.FC<FormComparisonVisualProps> = ({ 
  title = "Running Form Analysis", 
  className = "" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [view, setView] = useState<"side" | "front">("side")
  const [showInfo, setShowInfo] = useState(false)

  // Simulated animation control
  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      // Simulate animation by cycling through frames
      const interval = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev >= 5) {
            clearInterval(interval)
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 500)
    }
  }

  const resetAnimation = () => {
    setCurrentFrame(0)
    setIsPlaying(false)
  }

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
        <Tabs defaultValue="side" onValueChange={(value) => setView(value as "side" | "front")}>
          <div className="flex justify-between items-center mb-2">
            <TabsList>
              <TabsTrigger value="side">Side View</TabsTrigger>
              <TabsTrigger value="front">Front View</TabsTrigger>
            </TabsList>
            <div className="flex space-x-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={togglePlayback}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={resetAnimation}
              >
                <RotateCcw size={16} />
              </Button>
            </div>
          </div>

          <div className="relative bg-gray-100 rounded-md overflow-hidden" style={{ height: "200px" }}>
            <TabsContent value="side" className="m-0 h-full">
              <div className="flex h-full">
                <div className="w-1/2 border-r border-dashed border-gray-300 relative">
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    Previous Run
                  </div>
                  {/* Stick figure representation - Previous Run */}
                  <svg viewBox="0 0 100 200" className="w-full h-full">
                    {/* Head */}
                    <circle cx="50" cy="40" r="10" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />
                    
                    {/* Body - with slight forward lean */}
                    <line x1="50" y1="50" x2="50" y2="100" stroke="#a0aec0" strokeWidth="2" />
                    
                    {/* Arms */}
                    <line x1="50" y1="60" x2="30" y2="80" stroke="#a0aec0" strokeWidth="2" />
                    <line x1="50" y1="60" x2="70" y2="80" stroke="#a0aec0" strokeWidth="2" />
                    
                    {/* Legs - with knee bend */}
                    <line x1="50" y1="100" x2="40" y2="130" stroke="#a0aec0" strokeWidth="2" />
                    <line x1="40" y1="130" x2="30" y2="160" stroke="#a0aec0" strokeWidth="2" />
                    
                    <line x1="50" y1="100" x2="70" y2="130" stroke="#a0aec0" strokeWidth="2" />
                    <line x1="70" y1="130" x2="80" y2="160" stroke="#a0aec0" strokeWidth="2" />
                    
                    {/* Highlight problem area */}
                    <circle cx="40" cy="130" r="5" fill="#f9ca24" fillOpacity="0.6" />
                  </svg>
                </div>
                <div className="w-1/2 relative">
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    Current Run
                  </div>
                  {/* Stick figure representation - Current Run */}
                  <svg viewBox="0 0 100 200" className="w-full h-full">
                    {/* Head */}
                    <circle cx="50" cy="40" r="10" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />
                    
                    {/* Body - with better posture */}
                    <line x1="50" y1="50" x2="52" y2="100" stroke="#a0aec0" strokeWidth="2" />
                    
                    {/* Arms */}
                    <line x1="50" y1="60" x2="30" y2="75" stroke="#a0aec0" strokeWidth="2" />
                    <line x1="50" y1="60" x2="70" y2="75" stroke="#a0aec0" strokeWidth="2" />
                    
                    {/* Legs - with improved knee bend */}
                    <line x1="52" y1="100" x2="40" y2="130" stroke="#a0aec0" strokeWidth="2" />
                    <line x1="40" y1="130" x2="35" y2="160" stroke="#a0aec0" strokeWidth="2" />
                    
                    <line x1="52" y1="100" x2="70" y2="130" stroke="#a0aec0" strokeWidth="2" />
                    <line x1="70" y1="130" x2="75" y2="160" stroke="#a0aec0" strokeWidth="2" />
                    
                    {/* Highlight improved area */}
                    <circle cx="40" cy="130" r="5" fill="#42b4f7" fillOpacity="0.6" />
                  </svg>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="front" className="m-0 h-full">
              <div className="flex h-full">
                <div className="w-1/2 border-r border-dashed border-gray-300 relative">
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    Previous Run
                  </div>
                  {/* Stick figure representation - Front View Previous */}
                  <svg viewBox="0 0 100 200" className="w-full h-full">
                    {/* Head */}
                    <circle cx="50" cy="40" r="10" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />
                    
                    {/* Body */}
                    <line x1="50" y1="50" x2="50" y2="100" stroke="#a0aec0" strokeWidth="2" />
                    
                    {/* Arms */}
                    <line x1="50" y1="60" x2="30" y2="80" stroke="#a0aec0" strokeWidth="2" />
                    <line x1="50" y1="60" x2="70" y2="80" stroke="#a0aec0" strokeWidth="2" />
                    
                    {/* Legs - with knee valgus (inward) */}
                    <line x1="50" y1="100" x2="45" y2="130" stroke="#a0aec0" strokeWidth="2" />
                    <line x1="45" y1="130" x2="40" y2="160" stroke="#a0aec0" strokeWidth="2" />
                    
                    <line x1="50" y1="100" x2="55" y2="130" stroke="#a0aec0" strokeWidth="2" />
                    <line x1="55" y1="130" x2="60" y2="160" stroke="#a0aec0" strokeWidth="2" />
                    
                    {/* Highlight problem area - knee valgus */}
                    <circle cx="45" cy="130" r="5" fill="#f9ca24" fillOpacity="0.6" />
                    <circle cx="55" cy="130" r="5" fill="#f9ca24" fillOpacity="0.6" />
                  </svg>
                </div>
                <div className="w-1/2 relative">
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    Current Run
                  </div>
                  {/* Stick figure representation - Front View Current */}
                  <svg viewBox="0 0 100 200" className="w-full h-full">
                    {/* Head */}
                    <circle cx="50" cy="40" r="10" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" />
                    
                    {/* Body */}
                    <line x1="50" y1="50" x2="50" y2="100" stroke="#a0aec0" strokeWidth="2" />
                    
                    {/* Arms */}
                    <line x1="50" y1="60" x2="30" y2="80" stroke="#a0aec0" strokeWidth="2" />
                    <line x1="50" y1="60" x2="70" y2="80" stroke="#a0aec0" strokeWidth="2" />
                    
                    {/* Legs - with improved alignment */}
                    <line x1="50" y1="100" x2="40" y2="130" stroke="#a0aec0" strokeWidth="2" />
                    <line x1="40" y1="130" x2="40" y2="160" stroke="#a0aec0" strokeWidth="2" />
                    
                    <line x1="50" y1="100" x2="60" y2="130" stroke="#a0aec0" strokeWidth="2" />
                    <line x1="60" y1="130" x2="60" y2="160" stroke="#a0aec0" strokeWidth="2" />
                    
                    {/* Highlight improved area */}
                    <circle cx="40" cy="130" r="5" fill="#42b4f7" fillOpacity="0.6" />
                    <circle cx="60" cy="130" r="5" fill="#42b4f7" fillOpacity="0.6" />
                  </svg>
                </div>
              </div>
            </TabsContent>
            
            {/* Animation frame indicator */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4, 5].map((frame) => (
                  <div 
                    key={frame} 
                    className={`w-2 h-2 rounded-full ${currentFrame === frame ? 'bg-[#42b4f7]' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {showInfo && (
            <div className="mt-3 p-3 bg-[#f0f7ff] rounded-md text-xs text-gray-700">
              <p className="font-medium mb-1">What am I seeing?</p>
              {view === "side" ? (
                <p>
                  Side view comparison shows your knee flexion angle has improved from your previous run. 
                  Your current run shows better knee bend during landing phase, reducing impact forces on your joints.
                </p>
              ) : (
                <p>
                  Front view comparison shows improved knee alignment. Your previous run showed slight knee valgus 
                  (knees collapsing inward), while your current run shows better alignment, reducing stress on your IT band.
                </p>
              )}
            </div>
          )}
          
          <div className="mt-3 flex justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#f9ca24] mr-1"></div>
              <span>Previous Issue</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#42b4f7] mr-1"></div>
              <span>Current Improvement</span>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default FormComparisonVisual
