import { useState, useEffect } from "react"
import type { GameState, Challenge } from "../types/game"

const initialChallenges: Challenge[] = [
  {
    id: "logic-1",
    title: "Secuencia de Activación",
    type: "logic",
    difficulty: 1,
    description: "Memoriza y repite la secuencia de códigos de seguridad",
    story:
      "La IA NEXUS ha bloqueado todos los accesos. Debes memorizar la secuencia de activación antes de que cambie.",
    completed: false,
    timeLimit: 60,
  },
  {
    id: "programming-1",
    title: "Depuración de Código",
    type: "programming",
    difficulty: 2,
    description: "Completa el código corrupto para restaurar los sistemas",
    story: "Los sistemas de soporte vital fallan. Debes completar el código antes de que sea demasiado tarde.",
    completed: false,
    timeLimit: 90,
  },
  {
    id: "libre-1",
    title: "Quiz del Software Libre",
    type: "libre",
    difficulty: 3,
    description: "Demuestra tu conocimiento sobre el movimiento del software libre",
    story: "Solo conociendo la historia del software libre podrás acceder a las herramientas de la resistencia.",
    completed: false,
    timeLimit: 120,
  },
  {
    id: "engineering-1",
    title: "Reparación de Circuitos",
    type: "engineering",
    difficulty: 2,
    description: "Conecta los circuitos correctamente para restaurar la energía",
    story: "Los circuitos principales están desconectados. Debes reconectarlos siguiendo el diagrama.",
    completed: false,
    timeLimit: 75,
  },
]

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: "intro",
    currentChallenge: null,
    playerProgress: 0,
    gameTime: 0,
    isPlaying: false,
    challenges: initialChallenges,
  })

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameState.isPlaying) {
      interval = setInterval(() => {
        setGameState((prev) => ({ ...prev, gameTime: prev.gameTime + 1 }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameState.isPlaying])

  const startGame = () => {
    setGameState((prev) => ({ ...prev, currentScreen: "playing", isPlaying: true }))
  }

  const selectChallenge = (challenge: Challenge) => {
    setGameState((prev) => ({ ...prev, currentChallenge: challenge, currentScreen: "challenge" }))
  }

  const completeChallenge = () => {
    setGameState((prev) => {
      const newProgress = prev.playerProgress + 25
      const updatedChallenges = prev.challenges.map((c) =>
        c.id === prev.currentChallenge?.id ? { ...c, completed: true } : c,
      )

      return {
        ...prev,
        playerProgress: newProgress,
        currentScreen: newProgress >= 100 ? "victory" : "playing",
        currentChallenge: null,
        challenges: updatedChallenges,
      }
    })
  }

  const failChallenge = () => {
    setGameState((prev) => ({ ...prev, currentScreen: "gameOver" }))
  }

  const resetGame = () => {
    setGameState({
      currentScreen: "intro",
      currentChallenge: null,
      playerProgress: 0,
      gameTime: 0,
      isPlaying: false,
      challenges: initialChallenges,
    })
  }

  return {
    gameState,
    startGame,
    selectChallenge,
    completeChallenge,
    failChallenge,
    resetGame,
    setGameState,
  }
}