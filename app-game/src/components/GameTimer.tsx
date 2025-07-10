"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

interface GameTimerProps {
  timeLimit: number
  onTimeUp: () => void
  isActive: boolean
}

export function GameTimer({ timeLimit, onTimeUp, isActive }: GameTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit)

  useEffect(() => {
    setTimeLeft(timeLimit)
  }, [timeLimit])

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, onTimeUp])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = (timeLeft / timeLimit) * 100
  const isLowTime = timeLeft <= 10

  return (
    <div className="flex items-center gap-4 bg-black/60 backdrop-blur-lg rounded-lg p-4 border border-red-500/30">
      <Clock className={`w-6 h-6 ${isLowTime ? "text-red-400 animate-pulse" : "text-cyan-400"}`} />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Tiempo Restante</span>
          <span className={`font-mono text-lg font-bold ${isLowTime ? "text-red-400" : "text-cyan-400"}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <Progress value={progress} className={`h-2 ${isLowTime ? "bg-red-900" : "bg-gray-700"}`} />
      </div>
    </div>
  )
}
