"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface AnimatedMetricCardProps {
  title: string
  value: number
  unit: string
  change: number
  icon: React.ReactNode
}

const AnimatedMetricCard: React.FC<AnimatedMetricCardProps> = ({ title, value, unit, change, icon }) => {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 300)

    return () => clearTimeout(timer)
  }, [value])

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <div className="flex items-baseline">
              <motion.span
                className="text-2xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {Math.round(animatedValue)}
              </motion.span>
              <span className="text-sm text-gray-500 ml-1">{unit}</span>
            </div>
          </div>
          <div className="bg-[#42b4f7]/10 p-2 rounded-full">{icon}</div>
        </div>

        <div className="mt-2">
          <div className="flex items-center">
            <motion.div
              className={`text-sm font-medium ${change >= 0 ? "text-green-500" : "text-red-500"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {change >= 0 ? "+" : ""}
              {change}%
            </motion.div>
            <span className="text-xs text-gray-500 ml-1">vs. last run</span>
          </div>

          <motion.div
            className="w-full h-1 bg-gray-100 rounded-full mt-2 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              className={`h-full rounded-full ${change >= 0 ? "bg-green-500" : "bg-red-500"}`}
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(Math.abs(change) * 2, 100)}%` }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            ></motion.div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AnimatedMetricCard
