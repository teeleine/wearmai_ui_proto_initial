import type React from "react"

interface Mistake {
  text: string
}

interface CommonMistakesProps {
  mistakes: Mistake[]
  title?: string
  compact?: boolean
}

const CommonMistakes: React.FC<CommonMistakesProps> = ({ mistakes, title = "Common Mistakes", compact = false }) => {
  return (
    <div className="w-full">
      <h3 className={`font-medium text-gray-900 ${compact ? "text-sm mb-2" : "text-base mb-3"}`}>{title}</h3>
      <ul className="space-y-2">
        {mistakes.map((mistake, index) => (
          <li key={index} className={`flex ${compact ? "gap-2" : "gap-3"}`}>
            <div className="flex-shrink-0 text-red-500">•</div>
            <p className={`text-gray-700 ${compact ? "text-sm" : "text-base"}`}>{mistake.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommonMistakes
