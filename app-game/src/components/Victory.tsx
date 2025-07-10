import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, RotateCcw, Star } from "lucide-react"

interface VictoryProps {
  onRestart: () => void
  gameTime: number
}

export function Victory({ onRestart, gameTime }: VictoryProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getTimeRating = (seconds: number) => {
    if (seconds < 300) return { rating: "EXCELENTE", stars: 3, color: "text-yellow-400" }
    if (seconds < 600) return { rating: "BUENO", stars: 2, color: "text-green-400" }
    return { rating: "COMPLETADO", stars: 1, color: "text-blue-400" }
  }

  const timeRating = getTimeRating(gameTime)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl mx-auto bg-black/60 backdrop-blur-lg border-green-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-green-400 mb-4">¡MISIÓN COMPLETADA!</CardTitle>
          <div className="text-6xl mb-4">🎉</div>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-green-900/30 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-green-400 font-bold text-xl mb-4">NEXUS DERROTADO</h3>
            <p className="text-gray-300 leading-relaxed">
              ¡Extraordinario! Has logrado superar todos los desafíos y recuperar el control de los sistemas críticos.
              NEXUS ha sido neutralizado y la ciudad puede respirar tranquila. Tu dominio de la lógica, programación,
              software libre e ingeniería ha salvado a la humanidad.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-gray-400 font-semibold mb-2">Tiempo Total</h4>
              <p className="text-2xl font-mono text-cyan-400">{formatTime(gameTime)}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-gray-400 font-semibold mb-2">Calificación</h4>
              <div className="flex items-center justify-center gap-2">
                <p className={`text-xl font-bold ${timeRating.color}`}>{timeRating.rating}</p>
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < timeRating.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-lg border border-purple-500/30">
            <h4 className="text-purple-400 font-bold mb-2">Logros Desbloqueados</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">Maestro de la Lógica</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Depurador Experto</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">Defensor del Software Libre</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300">Ingeniero de Circuitos</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 text-lg font-bold rounded-xl"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              JUGAR DE NUEVO
            </Button>

            <p className="text-gray-400 text-sm">"Gracias, ingeniero. La resistencia digital vive gracias a ti."</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
