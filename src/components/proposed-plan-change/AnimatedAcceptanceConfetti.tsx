"use client"

import { useEffect, useState } from "react"

interface AnimatedAcceptanceConfettiProps {
  isVisible: boolean
}

const AnimatedAcceptanceConfetti = ({ isVisible }: AnimatedAcceptanceConfettiProps) => {
  const [confetti, setConfetti] = useState<{ x: number; y: number; size: number; color: string; speed: number }[]>([])

  useEffect(() => {
    if (!isVisible) return

    // Create confetti pieces
    const colors = ["#4CAF50", "#2196F3", "#FFC107", "#9C27B0", "#FF5722"]
    const newConfetti = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: -10 - Math.random() * 10,
      size: 5 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 1 + Math.random() * 3,
    }))

    setConfetti(newConfetti)

    // Animation frame for falling confetti
    let animationId: number
    let lastTime = 0

    const animate = (time: number) => {
      if (!lastTime) lastTime = time
      const delta = time - lastTime
      lastTime = time

      setConfetti(
        (prev) =>
          prev
            .map((piece) => ({
              ...piece,
              y: piece.y + piece.speed * (delta / 16),
              x: piece.x + Math.sin(time / 1000 + piece.x) * 0.5,
            }))
            .filter((piece) => piece.y < 120), // Remove pieces that fall out of view
      )

      if (confetti.some((piece) => piece.y < 120)) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((piece, index) => (
        <div
          key={index}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.x * 10}deg)`,
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedAcceptanceConfetti
