import { useGameState } from "../hooks/useGameState"
import { GameIntro } from "../components/GameIntro"
import { MainMenu } from "../components/MainMenu"
import { GameOver } from "../components/GameOver"
import { Victory } from "../components/Victory"
import { LogicGame } from "../components/games/LogicGame"
import { ProgrammingGame } from "../components/games/ProgrammingGame"
import { LibreGame } from "../components/games/LibreGame"
import { CircuitGame } from "../components/games/CircuitGame"
import { Button } from "@/components/ui/button"

interface Challenge {
  id: string
  title: string
  type: "logic" | "programming" | "libre" | "engineering"
  difficulty: number
  description: string
  story: string
  completed: boolean
  timeLimit: number
}

const challenges: Challenge[] = [
  {
    id: "logic-1",
    title: "Secuencia de Activación",
    type: "logic",
    difficulty: 1,
    description: "Encuentra el patrón en la secuencia para desactivar el protocolo de seguridad",
    story: "La IA NEXUS ha bloqueado todos los accesos. Debes encontrar el patrón en sus códigos de seguridad.",
    completed: false,
    timeLimit: 60,
  },
  {
    id: "programming-1",
    title: "Depuración de Código",
    type: "programming",
    difficulty: 2,
    description: "Corrige el algoritmo corrupto que controla los sistemas de ventilación",
    story: "Los sistemas de soporte vital fallan. El código fuente está corrupto por la interferencia de NEXUS.",
    completed: false,
    timeLimit: 120,
  },
  {
    id: "libre-1",
    title: "La Gran Liberación",
    type: "libre",
    difficulty: 3,
    description: "Descubre la historia del software libre y cómo puede salvarnos",
    story:
      "En 2019, la corporación TechCorp monopolizó todo el software mundial. Solo el movimiento del software libre resistió, creando herramientas abiertas que ahora son nuestra única esperanza contra NEXUS.",
    completed: false,
    timeLimit: 180,
  },
  {
    id: "engineering-1",
    title: "Reparación de Circuitos",
    type: "engineering",
    difficulty: 2,
    description: "Reconecta los circuitos para restaurar el control manual",
    story:
      "Los circuitos principales han sido saboteados. Necesitas conocimientos de ingeniería para restaurar el control.",
    completed: false,
    timeLimit: 120,
  },
]

export default function IAgame(){
    const { gameState, startGame, selectChallenge, completeChallenge, failChallenge, resetGame, setGameState } =
    useGameState()

  const togglePlay = () => {
    setGameState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
  }

  const backToMenu = () => {
    setGameState((prev) => ({ ...prev, currentScreen: "playing", currentChallenge: null }))
  }

  if (gameState.currentScreen === "intro") {
    return <GameIntro onStart={startGame} />
  }

  if (gameState.currentScreen === "gameOver") {
    return <GameOver onRestart={resetGame} gameTime={gameState.gameTime} />
  }

  if (gameState.currentScreen === "victory") {
    return <Victory onRestart={resetGame} gameTime={gameState.gameTime} />
  }

  if (gameState.currentScreen === "challenge" && gameState.currentChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <Button
              onClick={backToMenu}
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
            >
              ← Volver al Centro de Control
            </Button>
            <div className="text-cyan-400 font-mono text-lg">
              TIEMPO TOTAL:{" "}
              {Math.floor(gameState.gameTime / 60)
                .toString()
                .padStart(2, "0")}
              :{(gameState.gameTime % 60).toString().padStart(2, "0")}
            </div>
          </div>

          <div className="mb-6 bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30">
            <h2 className="text-2xl font-bold text-white mb-2">{gameState.currentChallenge.title}</h2>
            <p className="text-gray-400 mb-4">{gameState.currentChallenge.description}</p>
            <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-4 rounded-lg border border-cyan-500/30">
              <p className="text-gray-200">{gameState.currentChallenge.story}</p>
            </div>
          </div>

          {gameState.currentChallenge.type === "logic" && (
            <LogicGame
              onComplete={completeChallenge}
              onFail={failChallenge}
              timeLimit={gameState.currentChallenge.timeLimit}
            />
          )}
          {gameState.currentChallenge.type === "programming" && (
            <ProgrammingGame
              onComplete={completeChallenge}
              onFail={failChallenge}
              timeLimit={gameState.currentChallenge.timeLimit}
            />
          )}
          {gameState.currentChallenge.type === "libre" && (
            <LibreGame
              onComplete={completeChallenge}
              onFail={failChallenge}
              timeLimit={gameState.currentChallenge.timeLimit}
            />
          )}
          {gameState.currentChallenge.type === "engineering" && (
            <CircuitGame
              onComplete={completeChallenge}
              onFail={failChallenge}
              timeLimit={gameState.currentChallenge.timeLimit}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <MainMenu
      challenges={gameState.challenges}
      onSelectChallenge={selectChallenge}
      playerProgress={gameState.playerProgress}
      gameTime={gameState.gameTime}
      isPlaying={gameState.isPlaying}
      onTogglePlay={togglePlay}
    />
  )
}