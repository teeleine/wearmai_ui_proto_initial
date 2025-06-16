"use client"

import { useState } from "react"
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"
import PersonaSelector, { type CoachPersona } from "@/components/feedback-preferences/PersonaSelector"
import CommunicationTone, { type ToneType } from "@/components/feedback-preferences/CommunicationTone"
import DetailLevel, { type DetailLevelType } from "@/components/feedback-preferences/DetailLevel"
import DataTransparency from "@/components/feedback-preferences/DataTransparency"
import MotivationalNotifications, {
  type NotificationFrequency,
} from "@/components/feedback-preferences/MotivationalNotifications"
import MobileNavbar from "@/components/dashboard/MobileNavBar"
import ChatButton from "@/components/dashboard/ChatButton"

// V2: Persona-Driven Presets with Customization

const FeedbackPreferencesV2 = () => {
  const navigate = useNavigate()
  const [persona, setPersona] = useState<CoachPersona>("motivator")
  const [tone, setTone] = useState<ToneType>("encouraging")
  const [detailLevel, setDetailLevel] = useState<DetailLevelType>("standard")
  const [showDefinitions, setShowDefinitions] = useState(true)
  const [showDataSources, setShowDataSources] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [notificationFrequency, setNotificationFrequency] = useState<NotificationFrequency>("daily")
  const [customizeExpanded, setCustomizeExpanded] = useState(false)

  const handleBack = () => {
    navigate(-1)
  }

  const handleSave = () => {
    // In a real app, this would save the preferences
    navigate(-1)
  }

  const handlePersonaChange = (newPersona: CoachPersona) => {
    setPersona(newPersona)

    // Update defaults based on persona
    switch (newPersona) {
      case "motivator":
        setTone("encouraging")
        setDetailLevel("standard")
        break
      case "analyst":
        setTone("technical")
        setDetailLevel("detailed")
        break
      case "guide":
        setTone("neutral")
        setDetailLevel("standard")
        break
      case "straightShooter":
        setTone("technical")
        setDetailLevel("quick")
        break
    }
  }

  const getPersonaDefaults = () => {
    switch (persona) {
      case "motivator":
        return "This sets Tone to 'Encouraging' and Detail to 'Standard'. You can customize below."
      case "analyst":
        return "This sets Tone to 'Technical' and Detail to 'In-Depth'. You can customize below."
      case "guide":
        return "This sets Tone to 'Neutral' and Detail to 'Standard'. You can customize below."
      case "straightShooter":
        return "This sets Tone to 'Technical' and Detail to 'Quick'. You can customize below."
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="container max-w-md mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-bold">Feedback & Coach Preferences</h1>
        </div>
      </div>

      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="space-y-8">
          <div>
            <PersonaSelector selectedPersona={persona} onChange={handlePersonaChange} />
            <p className="text-sm text-muted-foreground mt-3 italic">{getPersonaDefaults()}</p>
          </div>

          <Separator />

          <div>
            <Button
              variant="ghost"
              className="flex w-full justify-between items-center p-0 h-auto"
              onClick={() => setCustomizeExpanded(!customizeExpanded)}
            >
              <h2 className="text-lg font-medium">Fine-Tune Your Preferences</h2>
              {customizeExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </Button>

            {customizeExpanded && (
              <div className="mt-6 space-y-6">
                <CommunicationTone selectedTone={tone} onChange={setTone} />

                <Separator />

                <DetailLevel selectedLevel={detailLevel} onChange={setDetailLevel} />

                <Separator />

                <DataTransparency
                  showDefinitions={showDefinitions}
                  showDataSources={showDataSources}
                  onToggleDefinitions={() => setShowDefinitions(!showDefinitions)}
                  onToggleDataSources={() => setShowDataSources(!showDataSources)}
                />
              </div>
            )}
          </div>

          <Separator />

          <MotivationalNotifications
            enabled={notificationsEnabled}
            frequency={notificationFrequency}
            onToggleEnabled={() => setNotificationsEnabled(!notificationsEnabled)}
            onChangeFrequency={setNotificationFrequency}
          />

          <Button className="w-full bg-wearmai-primary hover:bg-wearmai-primary/80 mt-6" onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </div>

      <MobileNavbar />
    </div>
  )
}

export default FeedbackPreferencesV2
