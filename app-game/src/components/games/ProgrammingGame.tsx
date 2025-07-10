import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GameTimer } from "../GameTimer"
import type { ProgrammingGameState } from "../../types/game"

interface ProgrammingGameProps {
  onComplete: () => void
  onFail: () => void
  timeLimit: number
}

const questions = [
  {
    code: `function calculateOxygen(level) {
    if (level < 0.18) {
        return "CRITICAL";
    } else if (level < 0.20) {
        return "WARNING";
    } else {
        return _____;
    }
}`,
    question: "¿Qué debe retornar la función cuando el nivel de oxígeno es normal?",
    options: ['"NORMAL"', '"SAFE"', '"OK"', '"OPTIMAL"'],
    correct: '"NORMAL"',
  },
  {
    code: `for (let i = 0; i < systems.length; i++) {
    if (systems[i].status === "OFFLINE") {
        systems[i].restart();
        _____
    }
}`,
    question: "¿Qué línea falta para salir del bucle después de reiniciar el primer sistema offline?",
    options: ["continue;", "break;", "return;", "exit;"],
    correct: "break;",
  },
  {
    code: `async function hackNexus() {
    try {
        const response = await fetch('/api/nexus');
        const data = await response.json();
        return data;
    } catch (error) {
        _____
    }
}`,
    question: "¿Qué debe ir en el bloque catch para manejar errores correctamente?",
    options: [
      'console.log("Error:", error);',
      'throw new Error("Hack failed");',
      'return { error: "Connection failed" };',
      'alert("Error occurred");',
    ],
    correct: 'return { error: "Connection failed" };',
  },
]

export function ProgrammingGame({ onComplete, onFail, timeLimit }: ProgrammingGameProps) {
  const [gameState, setGameState] = useState<ProgrammingGameState>({
    currentQuestion: 0,
    selectedAnswers: [],
    questions,
  })

  const [selectedOption, setSelectedOption] = useState<string>("")
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = () => {
    if (!selectedOption) return

    const isCorrect = selectedOption === gameState.questions[gameState.currentQuestion].correct
    const newSelectedAnswers = [...gameState.selectedAnswers, selectedOption]

    if (!isCorrect) {
      onFail()
      return
    }

    setGameState((prev) => ({ ...prev, selectedAnswers: newSelectedAnswers }))
    setShowResult(true)

    setTimeout(() => {
      if (gameState.currentQuestion < gameState.questions.length - 1) {
        setGameState((prev) => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }))
        setSelectedOption("")
        setShowResult(false)
      } else {
        onComplete()
      }
    }, 1500)
  }

  const currentQ = gameState.questions[gameState.currentQuestion]

  return (
    <div className="space-y-6">
      <GameTimer timeLimit={timeLimit} onTimeUp={onFail} isActive={true} />

      <Card className="bg-black/60 backdrop-blur-lg border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400">
            Depuración de Código - Pregunta {gameState.currentQuestion + 1}/{gameState.questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">{currentQ.code}</pre>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">{currentQ.question}</h3>

            <div className="grid gap-3">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedOption(option)}
                  disabled={showResult}
                  variant={selectedOption === option ? "default" : "outline"}
                  className={`
                    justify-start text-left p-4 h-auto font-mono
                    ${
                      selectedOption === option
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                    }
                    ${showResult && option === currentQ.correct ? "bg-green-600 hover:bg-green-600" : ""}
                    ${showResult && option === selectedOption && option !== currentQ.correct ? "bg-red-600 hover:bg-red-600" : ""}
                  `}
                >
                  {option}
                </Button>
              ))}
            </div>

            {showResult && (
              <div className="text-center">
                <p className="text-green-400 font-bold text-lg">¡Correcto! Sistema restaurado.</p>
              </div>
            )}

            <Button
              onClick={handleAnswer}
              disabled={!selectedOption || showResult}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
            >
              EJECUTAR CÓDIGO
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
