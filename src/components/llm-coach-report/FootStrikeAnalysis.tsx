"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info } from 'lucide-react'

interface FootStrikeAnalysisProps {
  title?: string
  className?: string
}

const FootStrikeAnalysis: React.FC<FootStrikeAnalysisProps> = ({ 
  title = "Foot Strike & Pressure Analysis", 
  className = "" 
}) => {
  const [showInfo, setShowInfo] = useState(false)

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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Foot Strike Pattern</h3>
            <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-center">
              <div className="relative w-full max-w-[200px]">
                {/* Foot outline */}
                <svg viewBox="0 0 100 200" className="w-full">
                  {/* Left foot */}
                  <path 
                    d="M20,50 C15,70 15,120 20,140 C25,160 35,170 40,170 C45,170 55,160 60,140 C65,120 65,70 60,50 C55,30 45,20 40,20 C35,20 25,30 20,50 Z" 
                    fill="#e2e8f0" 
                    stroke="#a0aec0" 
                    strokeWidth="1"
                  />
                  
                  {/* Pressure points - heel strike with midfoot transition */}
                  <circle cx="40" cy="150" r="10" fill="#6131ca" fillOpacity="0.3" /> {/* Heel - high pressure */}
                  <circle cx="40" cy="110" r="8" fill="#f9ca24" fillOpacity="0.3" /> {/* Midfoot - medium pressure */}
                  <circle cx="40" cy="70" r="6" fill="#42b4f7" fillOpacity="0.3" /> {/* Forefoot - low pressure */}
                  
                  {/* Strike indicator */}
                  <circle cx="40" cy="150" r="4" fill="#6131ca" />
                  
                  {/* Labels */}
                  <text x="65" y="150" fontSize="8" fill="#6131ca" fontWeight="bold">Initial Impact</text>
                  <text x="65" y="110" fontSize="8" fill="#f9ca24">Mid Stance</text>
                  <text x="65" y="70" fontSize="8" fill="#42b4f7">Push Off</text>
                </svg>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              <p className="font-medium">Heel Strike Pattern</p>
              <p>You have a pronounced heel strike with good transition to midfoot.</p>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Pressure Distribution</h3>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-gray-500">Left Foot</span>
                <span className="text-xs text-gray-500">Right Foot</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  {/* Left foot heat map */}
                  <svg viewBox="0 0 100 200" className="w-full">
                    {/* Foot outline */}
                    <path 
                      d="M20,50 C15,70 15,120 20,140 C25,160 35,170 40,170 C45,170 55,160 60,140 C65,120 65,70 60,50 C55,30 45,20 40,20 C35,20 25,30 20,50 Z" 
                      fill="#e2e8f0" 
                      stroke="#a0aec0" 
                      strokeWidth="1"
                    />
                    
                    {/* Heat map gradient */}
                    <defs>
                      <radialGradient id="leftHeel" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                        <stop offset="0%" stopColor="#6131ca" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#6131ca" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="leftMid" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                        <stop offset="0%" stopColor="#f9ca24" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#f9ca24" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="leftFore" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                        <stop offset="0%" stopColor="#42b4f7" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#42b4f7" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    
                    {/* Pressure areas */}
                    <ellipse cx="40" cy="150" rx="15" ry="15" fill="url(#leftHeel)" />
                    <ellipse cx="40" cy="110" rx="15" ry="20" fill="url(#leftMid)" />
                    <ellipse cx="40" cy="70" rx="15" ry="15" fill="url(#leftFore)" />
                    
                    {/* Medial arch indicator */}
                    <path 
                      d="M30,100 Q40,115 50,100" 
                      fill="none" 
                      stroke="#a0aec0" 
                      strokeWidth="1" 
                      strokeDasharray="2,2"
                    />
                  </svg>
                </div>
                
                <div className="flex-1 relative">
                  {/* Right foot heat map */}
                  <svg viewBox="0 0 100 200" className="w-full">
                    {/* Foot outline */}
                    <path 
                      d="M40,50 C35,70 35,120 40,140 C45,160 55,170 60,170 C65,170 75,160 80,140 C85,120 85,70 80,50 C75,30 65,20 60,20 C55,20 45,30 40,50 Z" 
                      fill="#e2e8f0" 
                      stroke="#a0aec0" 
                      strokeWidth="1"
                    />
                    
                    {/* Heat map gradient */}
                    <defs>
                      <radialGradient id="rightHeel" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                        <stop offset="0%" stopColor="#6131ca" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#6131ca" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="rightMid" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                        <stop offset="0%" stopColor="#f9ca24" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#f9ca24" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="rightFore" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                        <stop offset="0%" stopColor="#42b4f7" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#42b4f7" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    
                    {/* Pressure areas - slightly different from left foot */}
                    <ellipse cx="60" cy="150" rx="18" ry="15" fill="url(#rightHeel)" />
                    <ellipse cx="60" cy="110" rx="12" ry="20" fill="url(#rightMid)" />
                    <ellipse cx="60" cy="70" rx="15" ry="15" fill="url(#rightFore)" />
                    
                    {/* Medial arch indicator */}
                    <path 
                      d="M50,100 Q60,120 70,100" 
                      fill="none" 
                      stroke="#a0aec0" 
                      strokeWidth="1" 
                      strokeDasharray="2,2"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <p>Your right heel shows 28% higher pressure than left, which may contribute to the observed knee load.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#42b4f7] mr-1"></div>
            <span>Low Pressure</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#f9ca24] mr-1"></div>
            <span>Medium Pressure</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#6131ca] mr-1"></div>
            <span>High Pressure</span>
          </div>
        </div>
        
        {showInfo && (
          <div className="mt-3 p-3 bg-[#f0f7ff] rounded-md text-xs text-gray-700">
            <p className="font-medium mb-1">Understanding Foot Strike</p>
            <p>
              Your foot strike pattern affects how impact forces travel through your body. 
              A heel strike (like yours) is common but can increase knee loading. The pressure 
              distribution shows where force is concentrated during your stride.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default FootStrikeAnalysis
