import type React from "react"

interface LegendProps {
  dataType: "muscle-load" | "joint-force" | "soreness" | "asymmetry"
}

const Legend: React.FC<LegendProps> = ({ dataType }) => {
  return (
    <div className="flex items-center justify-center space-x-4 p-2 bg-white rounded-lg shadow-sm">
      {dataType === "asymmetry" ? (
        <>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-xs">Higher Load</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-xs">Lower Load</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-red-500 bg-transparent rounded mr-2"></div>
            <span className="text-xs">Significant Imbalance</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-xs">
              High {dataType === "muscle-load" ? "Load" : dataType === "joint-force" ? "Force" : "Soreness"}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span className="text-xs">
              Moderate {dataType === "muscle-load" ? "Load" : dataType === "joint-force" ? "Force" : "Soreness"}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-xs">
              Normal/Low {dataType === "muscle-load" ? "Load" : dataType === "joint-force" ? "Force" : "Soreness"}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default Legend
