"use client"

import { Card } from "@/components/ui/card"
import type { CoachPersona } from "./PersonaSelector"
import type { ToneType } from "./CommunicationTone"
import type { DetailLevelType } from "./DetailLevel"

interface LivePreviewProps {
  persona: CoachPersona
  tone: ToneType
  detailLevel: DetailLevelType
}

const LivePreview = ({ persona, tone, detailLevel }: LivePreviewProps) => {
  const getExampleFeedback = () => {
    // Motivator persona examples
    if (persona === "motivator") {
      if (detailLevel === "quick") {
        return "Awesome run! You really pushed it on that last km! Keep up the great work! 👍"
      } else if (detailLevel === "standard") {
        return "Great job on today's run! You maintained a consistent pace and your cadence was spot on. I noticed your right knee load was a bit higher than usual, but nothing to worry about. Keep focusing on your form and you'll crush your next goal!"
      } else {
        return "Fantastic effort today! 🌟 Your pace was steady at 5:20/km and you maintained excellent cadence (175-180 spm). I noticed your right knee load was slightly elevated (68% vs. usual 60%), but your overall form remained strong. Your training consistency is paying off - you're 85% of the way to your monthly distance goal! Keep this momentum going and remember to celebrate these wins!"
      }
    }

    // Analyst persona examples
    if (persona === "analyst") {
      if (detailLevel === "quick") {
        return "Run data: 5.2km, avg pace 5:20/km, right knee load 68% (↑8% from baseline)."
      } else if (detailLevel === "standard") {
        return "Run analysis: Distance 5.2km at 5:20/km average pace. Cadence maintained at 175-180 spm throughout. Right knee load measured at 68%, which is 8% above your baseline. This correlates with a 5° increase in knee valgus during mid-stance phase. Consider monitoring this pattern in upcoming runs."
      } else {
        return "Analysis indicates right knee valgus exceeded 8° during 75% of stance phase (see data ref X.Y), primarily correlated with decreased gluteus medius activation (inferred from pelvic drop > 5°). This pattern emerged after km 3 and corresponds with a 12% increase in vertical oscillation. Recommend: 1) Targeted glute strengthening, 2) Cadence increase of 5-8 spm, 3) Monitoring of right knee load in next 3 runs to establish pattern significance."
      }
    }

    // Guide persona examples
    if (persona === "guide") {
      if (detailLevel === "quick") {
        return "Nice run today. I noticed a bit more load on your right knee - maybe take it easier next time or try some gentle stretching."
      } else if (detailLevel === "standard") {
        return "It looks like there was a bit more load on your right side today, especially the knee. Your pace was good and consistent, but I noticed your form changed slightly in the second half of the run. Taking it a bit easier next time or perhaps some light stretching could be helpful. Let me know if you'd like some specific stretches to try."
      } else {
        return "I noticed your right knee was taking on more load today (about 8% more than usual). This started around the 3km mark, which is when your running form began to show some small changes - particularly in how your foot lands and how your hip stabilizes. This isn't something to worry about right now, but it's worth keeping an eye on. Some gentle hip and glute strengthening exercises could really help with this. Would you like me to suggest a few simple exercises you could try at home?"
      }
    }

    // Straight-shooter persona examples
    if (persona === "straightShooter") {
      if (detailLevel === "quick") {
        return "Right knee load high (68%). Check form. Next run: reduce intensity."
      } else if (detailLevel === "standard") {
        return "Your right knee is showing elevated load (68%, up 8% from baseline). This started at km 3 when your form deteriorated. Fix: strengthen glutes, increase cadence slightly, reduce next run intensity by 10-15%."
      } else {
        return "Problem: Right knee load at 68% (8% above baseline) with increased valgus angle of 8° during stance phase. Cause: Weak gluteus medius causing pelvic drop of >5° after km 3. Solution: 1) Implement twice-weekly glute strengthening routine, 2) Increase cadence by 5-8 spm, 3) Reduce intensity of next run by 10-15%, 4) Re-evaluate after 3 runs."
      }
    }

    return "Example feedback will appear here based on your selected preferences."
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Example Coach Feedback:</h3>
      <Card className="p-4 bg-gray-50">
        <p className="text-gray-800">{getExampleFeedback()}</p>
      </Card>
    </div>
  )
}

export default LivePreview
