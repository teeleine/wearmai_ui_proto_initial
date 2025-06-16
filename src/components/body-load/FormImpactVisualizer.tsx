import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FormImpactVisualizerProps {
  dataType: "muscle-load" | "joint-force" | "soreness"
}

const FormImpactVisualizer: React.FC<FormImpactVisualizerProps> = ({ dataType }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 space-y-4">
      <h3 className="text-sm font-medium">Form Impact Analysis</h3>
      <p className="text-xs text-muted-foreground">
        See how different running techniques affect your {dataType.replace("-", " ")} levels
      </p>

      <Tabs defaultValue="current">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Form</TabsTrigger>
          <TabsTrigger value="improved">Improved Form</TabsTrigger>
          <TabsTrigger value="comparison">Side by Side</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-3 pt-3">
          <div className="aspect-video w-full bg-gray-200 rounded flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium">Current Running Form</p>
              <p className="text-xs text-muted-foreground">(Animation placeholder)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium">Knee Impact</span>
                  <span className="text-xs text-red-500 font-medium">High</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[75%]"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium">Quad Strain</span>
                  <span className="text-xs text-amber-500 font-medium">Medium</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[60%]"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-xs">
            Your current form shows a heavy heel strike pattern causing increased knee impact forces.
          </p>
        </TabsContent>

        <TabsContent value="improved" className="space-y-3 pt-3">
          <div className="aspect-video w-full bg-gray-200 rounded flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium">Improved Form Simulation</p>
              <p className="text-xs text-muted-foreground">(Animation placeholder)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium">Knee Impact</span>
                  <span className="text-xs text-green-500 font-medium">Low</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[35%]"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium">Quad Strain</span>
                  <span className="text-xs text-green-500 font-medium">Low</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[40%]"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-xs">
            A midfoot strike with slightly increased cadence could reduce knee impact by up to 40%.
          </p>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-3 pt-3">
          <div className="flex space-x-2">
            <div className="w-1/2 aspect-video bg-gray-200 rounded flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs font-medium">Current</p>
              </div>
            </div>
            <div className="w-1/2 aspect-video bg-gray-200 rounded flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs font-medium">Improved</p>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-3">
              <p className="text-xs font-medium mb-1">Potential Improvement:</p>
              <div className="flex space-x-3 items-center">
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
                  <div className="absolute left-0 top-0 h-full w-[60%] bg-gradient-to-r from-red-500 to-green-500 rounded-full"></div>
                  <div className="absolute left-[60%] top-0 h-4 w-1 bg-black rounded-full -translate-y-1"></div>
                </div>
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
              </div>
              <p className="text-xs text-center mt-2">Estimated 40% reduction in {dataType.replace("-", " ")}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="pt-2 border-t border-gray-200">
        <p className="text-xs text-muted-foreground">
          This simulation is based on biomechanical analysis of your recent runs. Try these changes gradually.
        </p>
      </div>
    </div>
  )
}

export default FormImpactVisualizer
