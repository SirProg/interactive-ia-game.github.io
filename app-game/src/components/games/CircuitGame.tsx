import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GameTimer } from "../GameTimer"
import type { CircuitGameState } from "../../types/game"
import { Zap, RotateCcw } from "lucide-react"

interface CircuitGameProps {
  onComplete: () => void
  onFail: () => void
  timeLimit: number
}

const circuitPoints = [
  { id: "battery", x: 50, y: 100, type: "input" as const },
  { id: "resistor1", x: 150, y: 100, type: "component" as const },
  { id: "led1", x: 250, y: 100, type: "component" as const },
  { id: "switch1", x: 350, y: 100, type: "component" as const },
  { id: "ground1", x: 450, y: 100, type: "output" as const },
  { id: "capacitor", x: 200, y: 200, type: "component" as const },
  { id: "resistor2", x: 300, y: 200, type: "component" as const },
  { id: "ground2", x: 450, y: 200, type: "output" as const },
]

const requiredConnections = [
  { from: "battery", to: "resistor1" },
  { from: "resistor1", to: "led1" },
  { from: "led1", to: "switch1" },
  { from: "switch1", to: "ground1" },
  { from: "resistor1", to: "capacitor" },
  { from: "capacitor", to: "resistor2" },
  { from: "resistor2", to: "ground2" },
]

export function CircuitGame({ onComplete, onFail, timeLimit }: CircuitGameProps) {
  const [gameState, setGameState] = useState<CircuitGameState>({
    connections: [],
    requiredConnections,
    selectedPoint: null,
    points: circuitPoints,
  })

  const svgRef = useRef<SVGSVGElement>(null)

  const handlePointClick = (pointId: string) => {
    if (gameState.selectedPoint === null) {
      setGameState((prev) => ({ ...prev, selectedPoint: pointId }))
    } else {
      if (gameState.selectedPoint === pointId) {
        setGameState((prev) => ({ ...prev, selectedPoint: null }))
        return
      }

      const newConnection = { from: gameState.selectedPoint, to: pointId }
      const reverseConnection = { from: pointId, to: gameState.selectedPoint }

      // Check if connection already exists
      const connectionExists = gameState.connections.some(
        (conn) =>
          (conn.from === newConnection.from && conn.to === newConnection.to) ||
          (conn.from === newConnection.to && conn.to === newConnection.from),
      )

      if (!connectionExists) {
        const newConnections = [...gameState.connections, newConnection]
        setGameState((prev) => ({
          ...prev,
          connections: newConnections,
          selectedPoint: null,
        }))

        // Check if all required connections are made
        if (checkAllConnectionsMade(newConnections)) {
          setTimeout(() => {
            onComplete()
          }, 1000)
        }
      } else {
        setGameState((prev) => ({ ...prev, selectedPoint: null }))
      }
    }
  }

  const checkAllConnectionsMade = (connections: Array<{ from: string; to: string }>) => {
    return requiredConnections.every((req) =>
      connections.some(
        (conn) => (conn.from === req.from && conn.to === req.to) || (conn.from === req.to && conn.to === req.from),
      ),
    )
  }

  const resetConnections = () => {
    setGameState((prev) => ({ ...prev, connections: [], selectedPoint: null }))
  }

  const getPointColor = (point: (typeof circuitPoints)[0]) => {
    if (gameState.selectedPoint === point.id) return "fill-yellow-400"
    switch (point.type) {
      case "input":
        return "fill-red-500"
      case "output":
        return "fill-green-500"
      case "component":
        return "fill-blue-500"
      default:
        return "fill-gray-500"
    }
  }

  const getPointLabel = (id: string) => {
    const labels: { [key: string]: string } = {
      battery: "🔋",
      resistor1: "⚡",
      resistor2: "⚡",
      led1: "💡",
      switch1: "🔘",
      capacitor: "⚪",
      ground1: "⏚",
      ground2: "⏚",
    }
    return labels[id] || "○"
  }

  return (
    <div className="space-y-6">
      <GameTimer timeLimit={timeLimit} onTimeUp={onFail} isActive={true} />

      <Card className="bg-black/60 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Reparación de Circuitos
          </CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              Conexiones: {gameState.connections.length}/{requiredConnections.length}
            </p>
            <Button
              onClick={resetConnections}
              variant="outline"
              size="sm"
              className="border-orange-500 text-orange-400 hover:bg-orange-500/10 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <svg ref={svgRef} viewBox="0 0 500 300" className="w-full h-64 bg-gray-800 rounded border border-gray-600">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Connections */}
              {gameState.connections.map((conn, index) => {
                const fromPoint = gameState.points.find((p) => p.id === conn.from)
                const toPoint = gameState.points.find((p) => p.id === conn.to)
                if (!fromPoint || !toPoint) return null

                const isRequired = requiredConnections.some(
                  (req) =>
                    (req.from === conn.from && req.to === conn.to) || (req.from === conn.to && req.to === conn.from),
                )

                return (
                  <line
                    key={index}
                    x1={fromPoint.x}
                    y1={fromPoint.y}
                    x2={toPoint.x}
                    y2={toPoint.y}
                    stroke={isRequired ? "#10b981" : "#ef4444"}
                    strokeWidth="3"
                    strokeDasharray={isRequired ? "0" : "5,5"}
                  />
                )
              })}

              {/* Points */}
              {gameState.points.map((point) => (
                <g key={point.id}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="15"
                    className={`${getPointColor(point)} cursor-pointer stroke-white stroke-2 hover:stroke-yellow-400 transition-all`}
                    onClick={() => handlePointClick(point.id)}
                  />
                  <text
                    x={point.x}
                    y={point.y + 5}
                    textAnchor="middle"
                    className="text-sm font-bold fill-white pointer-events-none"
                  >
                    {getPointLabel(point.id)}
                  </text>
                  <text
                    x={point.x}
                    y={point.y + 35}
                    textAnchor="middle"
                    className="text-xs fill-gray-400 pointer-events-none"
                  >
                    {point.id}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-bold text-cyan-400">Componentes:</h4>
              <div className="space-y-1 text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>🔋 Fuente de energía</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>⚡ Resistencias, 💡 LED, 🔘 Interruptor</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>⏚ Conexiones a tierra</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-orange-400">Instrucciones:</h4>
              <div className="text-gray-300 text-xs space-y-1">
                <p>1. Haz clic en un punto para seleccionarlo</p>
                <p>2. Haz clic en otro punto para conectarlos</p>
                <p>3. Las conexiones verdes son correctas</p>
                <p>4. Las conexiones rojas son incorrectas</p>
                <p>5. Conecta todos los componentes correctamente</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
