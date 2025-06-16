"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info, ChevronLeft, ChevronRight } from 'lucide-react'

interface GaitCycleAnalysisProps {
  title?: string
  className?: string
}

const GaitCycleAnalysis: React.FC<GaitCycleAnalysisProps> = ({ 
  title = "Gait Cycle Analysis", 
  className = "" 
}) => {
  const [showInfo, setShowInfo] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  
  const gaitPhases = [
    {
      name: "Initial Contact",
      description: "Your right foot heel strike shows good alignment with minimal overpronation.",
      metrics: [
        { name: "Impact Force", value: "2.1x BW", status: "good" },
        { name: "Pronation Angle", value: "8°", status: "good" },
      ]
    },
    {
      name: "Loading Response",
      description: "Your knee flexion during loading is optimal, absorbing impact well.",
      metrics: [
        { name: "Knee Flexion", value: "15°", status: "good" },
        { name: "Ankle Dorsiflexion", value: "10°", status: "good" },
      ]
    },
    {
      name: "Mid Stance",
      description: "Your pelvic stability during mid-stance shows improvement but still has a slight drop.",
      metrics: [
        { name: "Pelvic Drop", value: "5.2°", status: "caution" },
        { name: "Foot Pronation", value: "12°", status: "good" },
      ]
    },
    {
      name: "Terminal Stance",
      description: "Your push-off phase shows good power generation from your calf muscles.",
      metrics: [
        { name: "Ankle Plantarflexion", value: "25°", status: "good" },
        { name: "Calf Activation", value: "70%", status: "good" },
      ]
    },
    {
      name: "Swing Phase",
      description: "Your hip flexion during swing phase is efficient with good knee drive.",
      metrics: [
        { name: "Hip Flexion", value: "35°", status: "good" },
        { name: "Knee Flexion", value: "85°", status: "good" },
      ]
    }
  ]
  
  const nextPhase = () => {
    setCurrentPhase((prev) => (prev === gaitPhases.length - 1 ? 0 : prev + 1))
  }
  
  const prevPhase = () => {
    setCurrentPhase((prev) => (prev === 0 ? gaitPhases.length - 1 : prev - 1))
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-[#42b4f7]"
      case "caution":
        return "text-[#f9ca24]"
      case "warning":
        return "text-[#6131ca]"
      default:
        return "text-gray-500"
    }
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
        <div className="relative bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={prevPhase}
            >
              <ChevronLeft size={16} />
            </Button>
            <h3 className="text-sm font-medium text-gray-800">
              {gaitPhases[currentPhase].name}
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={nextPhase}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              {/* Gait cycle visualization */}
              <div className="bg-white rounded-md p-2 h-[120px] flex items-center justify-center">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Ground line */}
                  <line x1="10" y1="80" x2="190" y2="80" stroke="#d1d5db" strokeWidth="2" />
                  
                  {/* Gait cycle visualization based on current phase */}
                  {currentPhase === 0 && (
                    <>
                      {/* Initial Contact - heel strike */}
                      <circle cx="50" cy="20" r="8" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" /> {/* Head */}
                      <line x1="50" y1="28" x2="50" y2="60" stroke="#a0aec0" strokeWidth="2" /> {/* Body */}
                      <line x1="50" y1="35" x2="40" y2="45" stroke="#a0aec0" strokeWidth="2" /> {/* Left arm */}
                      <line x1="50" y1="35" x2="60" y2="45" stroke="#a0aec0" strokeWidth="2" /> {/* Right arm */}
                      <line x1="50" y1="60" x2="40" y2="75" stroke="#a0aec0" strokeWidth="2" /> {/* Left leg */}
                      <line x1="40" y1="75" x2="30" y2="80" stroke="#a0aec0" strokeWidth="2" /> {/* Left lower leg */}
                      <line x1="50" y1="60" x2="65" y2="70" stroke="#a0aec0" strokeWidth="2" /> {/* Right leg */}
                      <line x1="65" y1="70" x2="80" y2="80" stroke="#a0aec0" strokeWidth="2" /> {/* Right lower leg */}
                      <circle cx="80" cy="80" r="3" fill="#42b4f7" /> {/* Heel strike point */}
                      <text x="80" y="90" fontSize="8" textAnchor="middle">Initial Contact</text>
                    </>
                  )}
                  
                  {currentPhase === 1 && (
                    <>
                      {/* Loading Response */}
                      <circle cx="60" cy="25" r="8" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" /> {/* Head */}
                      <line x1="60" y1="33" x2="60" y2="65" stroke="#a0aec0" strokeWidth="2" /> {/* Body */}
                      <line x1="60" y1="40" x2="50" y2="50" stroke="#a0aec0" strokeWidth="2" /> {/* Left arm */}
                      <line x1="60" y1="40" x2="70" y2="50" stroke="#a0aec0" strokeWidth="2" /> {/* Right arm */}
                      <line x1="60" y1="65" x2="45" y2="75" stroke="#a0aec0" strokeWidth="2" /> {/* Left leg */}
                      <line x1="45" y1="75" x2="35" y2="80" stroke="#a0aec0" strokeWidth="2" /> {/* Left lower leg */}
                      <line x1="60" y1="65" x2="75" y2="75" stroke="#a0aec0" strokeWidth="2" /> {/* Right leg */}
                      <line x1="75" y1="75" x2="85" y2="80" stroke="#a0aec0" strokeWidth="2" /> {/* Right lower leg */}
                      <path d="M75,80 L95,80" stroke="#42b4f7" strokeWidth="3" /> {/* Foot flat */}
                      <text x="85" y="90" fontSize="8" textAnchor="middle">Loading Response</text>
                    </>
                  )}
                  
                  {currentPhase === 2 && (
                    <>
                      {/* Mid Stance */}
                      <circle cx="80" cy="25" r="8" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" /> {/* Head */}
                      <line x1="80" y1="33" x2="80" y2="65" stroke="#a0aec0" strokeWidth="2" /> {/* Body */}
                      <line x1="80" y1="40" x2="70" y2="50" stroke="#a0aec0" strokeWidth="2" /> {/* Left arm */}
                      <line x1="80" y1="40" x2="90" y2="50" stroke="#a0aec0" strokeWidth="2" /> {/* Right arm */}
                      <line x1="80" y1="65" x2="65" y2="75" stroke="#a0aec0" strokeWidth="2" /> {/* Left leg */}
                      <line x1="65" y1="75" x2="55" y2="80" stroke="#a0aec0" strokeWidth="2" /> {/* Left lower leg */}
                      <line x1="80" y1="65" x2="80" y2="75" stroke="#a0aec0" strokeWidth="2" /> {/* Right leg */}
                      <line x1="80" y1="75" x2="80" y2="80" stroke="#a0aec0" strokeWidth="2" /> {/* Right lower leg */}
                      <path d="M70,80 L90,80" stroke="#42b4f7" strokeWidth="3" /> {/* Foot flat */}
                      <circle cx="77" cy="65" r="3" fill="#f9ca24" /> {/* Pelvic drop highlight */}
                      <text x="80" y="90" fontSize="8" textAnchor="middle">Mid Stance</text>
                    </>
                  )}
                  
                  {currentPhase === 3 && (
                    <>
                      {/* Terminal Stance */}
                      <circle cx="100" cy="25" r="8" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" /> {/* Head */}
                      <line x1="100" y1="33" x2="100" y2="65" stroke="#a0aec0" strokeWidth="2" /> {/* Body */}
                      <line x1="100" y1="40" x2="90" y2="50" stroke="#a0aec0" strokeWidth="2" /> {/* Left arm */}
                      <line x1="100" y1="40" x2="110" y2="50" stroke="#a0aec0" strokeWidth="2" /> {/* Right arm */}
                      <line x1="100" y1="65" x2="85" y2="75" stroke="#a0aec0" strokeWidth="2" /> {/* Left leg */}
                      <line x1="85" y1="75" x2="75" y2="80" stroke="#a0aec0" strokeWidth="2" /> {/* Left lower leg */}
                      <line x1="100" y1="65" x2="110" y2="75" stroke="#a0aec0" strokeWidth="2" /> {/* Right leg */}
                      <line x1="110" y1="75" x2="120" y2="80" stroke="#a0aec0" strokeWidth="2" /> {/* Right lower leg */}
                      <path d="M110,80 L120,80" stroke="#42b4f7" strokeWidth="3" /> {/* Heel off */}
                      <circle cx="115" cy="75" r="3" fill="#42b4f7" /> {/* Calf activation highlight */}
                      <text x="110" y="90" fontSize="8" textAnchor="middle">Terminal Stance</text>
                    </>
                  )}
                  
                  {currentPhase === 4 && (
                    <>
                      {/* Swing Phase */}
                      <circle cx="130" cy="25" r="8" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1" /> {/* Head */}
                      <line x1="130" y1="33" x2="130" y2="65" stroke="#a0aec0" strokeWidth="2" /> {/* Body */}
                      <line x1="130" y1="40" x2="120" y2="50" stroke="#a0aec0" strokeWidth="2" /> {/* Left arm */}
                      <line x1="130" y1="40" x2="140" y2="50" stroke="#a0aec0" strokeWidth="2" /> {/* Right arm */}
                      <line x1="130" y1="65" x2="115" y2="55" stroke="#a0aec0" strokeWidth="2" /> {/* Left leg - swing */}
                      <line x1="115" y1="55" x2="105" y2="65" stroke="#a0aec0" strokeWidth="2" /> {/* Left lower leg */}
                      <line x1="130" y1="65" x2="140" y2="75" stroke="#a0aec0" strokeWidth="2" /> {/* Right leg */}
                      <line x1="140" y1="75" x2="150" y2="80" stroke="#a0aec0" strokeWidth="2" /> {/* Right lower leg */}
                      <circle cx="115" cy="55" r="3" fill="#42b4f7" /> {/* Hip flexion highlight */}
                      <text x="130" y="90" fontSize="8" textAnchor="middle">Swing Phase</text>
                    </>
                  )}
                </svg>
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <p className="text-xs text-gray-600 mb-2">
                {gaitPhases[currentPhase].description}
              </p>
              <div className="space-y-2">
                {gaitPhases[currentPhase].metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">{metric.name}:</span>
                    <span className={`text-xs font-medium ${getStatusColor(metric.status)}`}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Phase indicator */}
          <div className="flex justify-between items-center">
            <div className="h-1 bg-gray-200 rounded-full flex-1">
              <div 
                className="h-1 bg-[#42b4f7] rounded-full" 
                style={{ width: `${(currentPhase + 1) * 20}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {showInfo && (
          <div className="mt-3 p-3 bg-[#f0f7ff] rounded-md text-xs text-gray-700">
            <p className="font-medium mb-1">Understanding Gait Cycle</p>
            <p>
              The gait cycle is the sequence of movements during walking or running, from one heel strike to the next.
              Analyzing each phase helps identify areas for improvement in your running form.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default GaitCycleAnalysis
