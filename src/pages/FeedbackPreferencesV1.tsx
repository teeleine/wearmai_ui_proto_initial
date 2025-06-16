"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
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

// V1: Granular Controls

const FeedbackPreferencesV1 = () => {
  const navigate = useNavigate()
  const [persona, setPersona] = useState<CoachPersona>("motivator")
  const [tone, setTone] = useState<ToneType>("encouraging")
  const [detailLevel, setDetailLevel] = useState<DetailLevelType>("standard")
  const [showDefinitions, setShowDefinitions] = useState(true)
  const [showDataSources, setShowDataSources] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [notificationFrequency, setNotificationFrequency] = useState<NotificationFrequency>("daily")

  const handleBack = () => {
    navigate(-1)
  }

  const handleSave = () => {
    // In a real app, this would save the preferences
    navigate(-1)
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
          <PersonaSelector selectedPersona={persona} onChange={setPersona} />

          <Separator />

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

export default FeedbackPreferencesV1
