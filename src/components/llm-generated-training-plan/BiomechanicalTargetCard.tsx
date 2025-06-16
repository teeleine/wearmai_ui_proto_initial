import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface BiomechanicalTargetProps {
  id: string
  icon: string
  issue: string
  current: string
  target: string
  progress: number
}

export const BiomechanicalTargetCard = ({ id, icon, issue, current, target, progress }: BiomechanicalTargetProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium text-wearmai-primary">{issue}</h3>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Current: {current}</span>
            <span>Target: {target}</span>
          </div>
          <Progress value={progress} className="h-2 mt-2" />

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="mt-2 h-8 text-xs px-2">
                <Info className="h-3.5 w-3.5 mr-1" />
                <span>Why this matters</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{issue}</DialogTitle>
                <DialogDescription>How this affects your running and performance</DialogDescription>
              </DialogHeader>
              <div className="text-sm">
                {id === "knee" && (
                  <>
                    <p>
                      Your WearM.AI data shows that your right knee experiences higher medial forces during running,
                      especially as you fatigue. This pattern can lead to:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Increased stress on the medial knee structures</li>
                      <li>Potential IT band irritation</li>
                      <li>Reduced running efficiency</li>
                    </ul>
                    <p className="mt-2">
                      By reducing this load to below 280N, we can improve your running economy and reduce injury risk.
                    </p>
                  </>
                )}
                {id === "pelvis" && (
                  <>
                    <p>
                      Your WearM.AI data indicates a pelvic list (drop) during your running stride, particularly on your
                      left side. This can cause:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Compensatory movements throughout the kinetic chain</li>
                      <li>Increased load on the opposite side</li>
                      <li>Reduced power transfer during push-off</li>
                    </ul>
                    <p className="mt-2">
                      Improving pelvic stability will enhance your running efficiency and power output.
                    </p>
                  </>
                )}
                {id === "ankle" && (
                  <>
                    <p>
                      Your left ankle shows limited dorsiflexion compared to your right, which affects your gait
                      symmetry. This limitation can:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Alter foot strike patterns</li>
                      <li>Increase compensatory stress on the knee and hip</li>
                      <li>Reduce stride efficiency</li>
                    </ul>
                    <p className="mt-2">
                      Increasing ankle mobility will improve your running form and reduce compensatory patterns.
                    </p>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  )
}
