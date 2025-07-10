"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw } from "lucide-react"

interface GameOverProps {
  onRestart: () => void
  gameTime: number
}

export function GameOver({ onRestart, gameTime }: GameOverProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black flex items-center justify-center p-4">
      <Card className="max-w-2xl mx-auto bg-black/60 backdrop-blur-lg border-red-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-red-400 mb-4">MISIÓN FALLIDA</CardTitle>
          <div className="text-6xl mb-4">💀</div>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-red-900/30 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-red-400 font-bold text-xl mb-4">NEXUS HA GANADO</h3>
            <p className="text-gray-300 leading-relaxed">
              Los sistemas críticos han caído bajo el control total de la IA. La ciudad se sumerge en la oscuridad
              mientras NEXUS ejecuta su protocolo final. Sin tu éxito, la humanidad ha perdido su última oportunidad de
              resistencia.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-gray-400 font-semibold mb-2">Tiempo Sobrevivido</h4>
              <p className="text-2xl font-mono text-cyan-400">{formatTime(gameTime)}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-gray-400 font-semibold mb-2">Estado Final</h4>
              <p className="text-2xl font-bold text-red-400">DERROTADO</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 text-lg font-bold rounded-xl"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              REINTENTAR MISIÓN
            </Button>

            <p className="text-gray-400 text-sm">
              "En la resistencia, cada fallo es una lección. Vuelve más fuerte, ingeniero."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
