import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GameTimer } from "../GameTimer"
import type { LogicGameState } from "../../types/game"

interface LogicGameProps {
  onComplete: () => void
  onFail: () => void
  timeLimit: number
}

export function LogicGame({ onComplete, onFail, timeLimit }: LogicGameProps) {
  const [gameState, setGameState] = useState<LogicGameState>({
    sequence: [],
    playerSequence: [],
    showingSequence: false,
    currentStep: 0,
    gameActive: false,
  })

  const [round, setRound] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  const colors = [
    { id: 1, bg: "bg-blue-500", hover: "hover:bg-blue-400", active: "bg-blue-300" },
    { id: 2, bg: "bg-green-500", hover: "hover:bg-green-400", active: "bg-green-300" },
    { id: 3, bg: "bg-orange-500", hover: "hover:bg-orange-400", active: "bg-orange-300" },
    { id: 4, bg: "bg-purple-500", hover: "hover:bg-purple-400", active: "bg-purple-300" },
  ]

  const generateSequence = (length: number) => {
    const newSequence = []
    for (let i = 0; i < length; i++) {
      newSequence.push(Math.floor(Math.random() * 4) + 1)
    }
    return newSequence
  }

  const startRound = () => {
    const newSequence = generateSequence(2 + round)
    setGameState({
      sequence: newSequence,
      playerSequence: [],
      showingSequence: true,
      currentStep: 0,
      gameActive: true,
    })
    showSequence(newSequence)
  }

  const showSequence = (sequence: number[]) => {
    sequence.forEach((step, index) => {
      setTimeout(() => {
        setGameState((prev) => ({ ...prev, currentStep: step }))
        setTimeout(() => {
          setGameState((prev) => ({ ...prev, currentStep: 0 }))
          if (index === sequence.length - 1) {
            setTimeout(() => {
              setGameState((prev) => ({ ...prev, showingSequence: false }))
            }, 500)
          }
        }, 600)
      }, index * 1000)
    })
  }

  const handlePlayerInput = (colorId: number) => {
    if (gameState.showingSequence) return

    const newPlayerSequence = [...gameState.playerSequence, colorId]
    setGameState((prev) => ({ ...prev, playerSequence: newPlayerSequence }))

    // Check if the input is correct
    if (colorId !== gameState.sequence[newPlayerSequence.length - 1]) {
      onFail()
      return
    }

    // Check if sequence is complete
    if (newPlayerSequence.length === gameState.sequence.length) {
      if (round >= 3) {
        setShowSuccess(true)
        setTimeout(() => {
          onComplete()
        }, 1500)
      } else {
        setRound((prev) => prev + 1)
        setTimeout(() => {
          startRound()
        }, 1000)
      }
    }
  }

  useEffect(() => {
    startRound()
  }, [round])

  return (
    <div className="space-y-6">
      <GameTimer timeLimit={timeLimit} onTimeUp={onFail} isActive={gameState.gameActive} />

      <Card className="bg-black/60 backdrop-blur-lg border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400 text-center">Secuencia de Activación - Ronda {round}/3</CardTitle>
          {gameState.showingSequence && <p className="text-center text-gray-400">Memoriza la secuencia...</p>}
          {!gameState.showingSequence && !showSuccess && (
            <p className="text-center text-green-400">¡Repite la secuencia!</p>
          )}
          {showSuccess && <p className="text-center text-green-400 text-xl font-bold">¡CÓDIGO DESCIFRADO!</p>}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {colors.map((color) => (
              <Button
                key={color.id}
                onClick={() => handlePlayerInput(color.id)}
                disabled={gameState.showingSequence || showSuccess}
                className={`
                  h-24 w-24 mx-auto transition-all duration-300
                  ${color.bg} ${color.hover} border-2 border-white/20
                  ${gameState.currentStep === color.id ? color.active + " scale-110 border-white" : ""}
                  ${gameState.showingSequence ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
                `}
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 mb-2">Progreso:</p>
            <div className="flex justify-center gap-2">
              {gameState.sequence.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < gameState.playerSequence.length ? "bg-green-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
