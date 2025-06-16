"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type ToneType = "encouraging" | "neutral" | "technical"

interface CommunicationToneProps {
  selectedTone: ToneType
  onChange: (tone: ToneType) => void
}

const CommunicationTone = ({ selectedTone, onChange }: CommunicationToneProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Communication Tone</h3>
      <Tabs value={selectedTone} onValueChange={(value) => onChange(value as ToneType)} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="encouraging">Encouraging</TabsTrigger>
          <TabsTrigger value="neutral">Neutral / Factual</TabsTrigger>
          <TabsTrigger value="technical">Direct / Technical</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default CommunicationTone
