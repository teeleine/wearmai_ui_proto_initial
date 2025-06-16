import type React from "react"

interface SectionHeaderProps {
  title: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="sticky top-0 z-10 bg-gray-50 p-2 border-b border-gray-200">
      <h2 className="text-sm font-semibold text-gray-600">{title}</h2>
    </div>
  )
}

export default SectionHeader
