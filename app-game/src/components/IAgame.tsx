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