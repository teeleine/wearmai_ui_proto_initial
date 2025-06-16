import type React from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

const FilterButton: React.FC = () => {
  return (
    <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Filter runs">
      <Filter size={18} />
    </Button>
  )
}

export default FilterButton


