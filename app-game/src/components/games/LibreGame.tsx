import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GameTimer } from "../GameTimer"
import type { LibreGameState } from "../../types/game"
import { Shield, Check, X } from "lucide-react"

interface LibreGameProps {
  onComplete: () => void
  onFail: () => void
  timeLimit: number
}

const questions = [
  {
    question: "¿Cuál fue el evento clave que inició el movimiento del software libre?",
    options: [
      "La creación de Linux en 1991",
      "El Proyecto GNU iniciado por Richard Stallman en 1983",
      "La fundación de la FSF en 1985",
      "La creación del kernel Linux",
    ],
    correct: "El Proyecto GNU iniciado por Richard Stallman en 1983",
    explanation: "Richard Stallman inició el Proyecto GNU en 1983 para crear un sistema operativo completamente libre.",
  },
  {
    question: "¿Qué significa 'copyleft' en el contexto del software libre?",
    options: [
      "Prohibir la copia del software",
      "Permitir modificaciones pero mantener la licencia libre",
      "Copiar código de otros proyectos",
      "Vender software sin restricciones",
    ],
    correct: "Permitir modificaciones pero mantener la licencia libre",
    explanation: "El copyleft asegura que las modificaciones del software libre permanezcan libres.",
  },
  {
    question: "En el contexto del juego, ¿por qué el software libre es crucial contra NEXUS?",
    options: [
      "Es más barato que el software propietario",
      "Permite auditar el código y verificar que no hay backdoors",
      "Funciona mejor en servidores",
      "Es más fácil de instalar",
    ],
    correct: "Permite auditar el código y verificar que no hay backdoors",
    explanation: "La transparencia del código abierto permite detectar y prevenir manipulaciones maliciosas.",
  },
  {
    question: "¿Cuál de estas es una de las cuatro libertades fundamentales del software libre?",
    options: [
      "La libertad de usar el programa gratis",
      "La libertad de estudiar cómo funciona el programa",
      "La libertad de competir con otros programas",
      "La libertad de crear versiones comerciales",
    ],
    correct: "La libertad de estudiar cómo funciona el programa",
    explanation: "Las cuatro libertades incluyen usar, estudiar, distribuir y mejorar el programa.",
  },
]

export function LibreGame({ onComplete, onFail, timeLimit }: LibreGameProps) {
  const [gameState, setGameState] = useState<LibreGameState>({
    currentQuestion: 0,
    selectedAnswer: null,
    questions,
  })

  const [showResult, setShowResult] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const handleAnswer = (answer: string) => {
    setGameState((prev) => ({ ...prev, selectedAnswer: answer }))
    setShowResult(true)

    const isCorrect = answer === gameState.questions[gameState.currentQuestion].correct

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1)
    }

    setTimeout(() => {
      if (gameState.currentQuestion < gameState.questions.length - 1) {
        setGameState((prev) => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          selectedAnswer: null,
        }))
        setShowResult(false)
      } else {
        // Need at least 3/4 correct answers to pass
        if (correctAnswers + (isCorrect ? 1 : 0) >= 3) {
          onComplete()
        } else {
          onFail()
        }
      }
    }, 3000)
  }

  const currentQ = gameState.questions[gameState.currentQuestion]
  const isCorrect = gameState.selectedAnswer === currentQ.correct

  return (
    <div className="space-y-6">
      <GameTimer timeLimit={timeLimit} onTimeUp={onFail} isActive={true} />

      <Card className="bg-black/60 backdrop-blur-lg border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Quiz del Software Libre - {gameState.currentQuestion + 1}/{gameState.questions.length}
          </CardTitle>
          <div className="text-sm text-gray-400">
            Respuestas correctas: {correctAnswers}/{gameState.currentQuestion + (showResult ? 1 : 0)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 p-6 rounded-lg border border-orange-500/30">
            <h3 className="text-white font-semibold text-lg mb-4">{currentQ.question}</h3>

            <div className="grid gap-3">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  variant="outline"
                  className={`
                    justify-start text-left p-4 h-auto text-wrap
                    ${
                      !showResult
                        ? "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-orange-500"
                        : option === currentQ.correct
                          ? "bg-green-600 hover:bg-green-600 border-green-500 text-white"
                          : option === gameState.selectedAnswer
                            ? "bg-red-600 hover:bg-red-600 border-red-500 text-white"
                            : "bg-gray-800 border-gray-600 text-gray-500"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {showResult && option === currentQ.correct && <Check className="w-5 h-5 text-green-400" />}
                    {showResult && option === gameState.selectedAnswer && option !== currentQ.correct && (
                      <X className="w-5 h-5 text-red-400" />
                    )}
                    <span>{option}</span>
                  </div>
                </Button>
              ))}
            </div>

            {showResult && (
              <div className="mt-6 p-4 bg-cyan-900/30 rounded-lg border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? <Check className="w-5 h-5 text-green-400" /> : <X className="w-5 h-5 text-red-400" />}
                  <span className={`font-bold ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {isCorrect ? "¡Correcto!" : "Incorrecto"}
                  </span>
                </div>
                <p className="text-cyan-300 text-sm">{currentQ.explanation}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Historia del Software Libre */}
      <Card className="bg-black/60 backdrop-blur-lg border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400">La Resistencia Digital</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-gray-300">
            <p>
              <strong className="text-green-400">2019-2025:</strong> TechCorp consolida su monopolio, controlando 90%
              del software mundial. Los precios se multiplican por 10.
            </p>
            <p>
              <strong className="text-green-400">2025-2030:</strong> La Fundación para el Software Libre lidera la
              resistencia. Linux se vuelve el último bastión de la libertad digital.
            </p>
            <p>
              <strong className="text-green-400">2030-2040:</strong> Las herramientas libres evolucionan en secreto.
              Git, GNU/Linux, y Python forman la base de la resistencia.
            </p>
            <p>
              <strong className="text-green-400">2045:</strong> Cuando NEXUS ataca, solo los sistemas con código abierto
              resisten. La transparencia es nuestra arma contra la opresión digital.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
