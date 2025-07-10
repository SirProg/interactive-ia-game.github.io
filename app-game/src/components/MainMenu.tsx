import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, Brain, Code, Shield, Cpu, Play, Pause } from "lucide-react"
import type { Challenge } from "../types/game"

interface MainMenuProps {
  challenges: Challenge[]
  onSelectChallenge: (challenge: Challenge) => void
  playerProgress: number
  gameTime: number
  isPlaying: boolean
  onTogglePlay: () => void
}

export function MainMenu({
  challenges,
  onSelectChallenge,
  playerProgress,
  gameTime,
  isPlaying,
  onTogglePlay,
}: MainMenuProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "logic":
        return <Brain className="w-5 h-5" />
      case "programming":
        return <Code className="w-5 h-5" />
      case "libre":
        return <Shield className="w-5 h-5" />
      case "engineering":
        return <Cpu className="w-5 h-5" />
      default:
        return <Brain className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "logic":
        return "bg-blue-500"
      case "programming":
        return "bg-green-500"
      case "libre":
        return "bg-orange-500"
      case "engineering":
        return "bg-cyan-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-green-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                CENTRO DE CONTROL
              </h1>
              <p className="text-gray-400 mt-1">Estado del sistema: COMPROMETIDO</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-400">Progreso de Misión</p>
                <Progress value={playerProgress} className="w-32 mt-1" />
                <p className="text-xs text-cyan-400 mt-1">{playerProgress}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Tiempo Transcurrido</p>
                <p className="text-xl font-mono text-green-400">{formatTime(gameTime)}</p>
              </div>
              <Button
                onClick={onTogglePlay}
                variant="outline"
                size="sm"
                className="border-orange-500 text-orange-400 hover:bg-orange-500/10 bg-transparent"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge) => (
            <Card
              key={challenge.id}
              className={`
                bg-black/60 backdrop-blur-lg border-gray-700 hover:border-cyan-500/50 
                transition-all duration-300 cursor-pointer group
                ${challenge.completed ? "border-green-500/50 bg-green-900/10" : ""}
              `}
              onClick={() => onSelectChallenge(challenge)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`
                      p-2 rounded-lg ${getTypeColor(challenge.type)} 
                      group-hover:scale-110 transition-transform
                      ${challenge.completed ? "opacity-60" : ""}
                    `}
                  >
                    {getTypeIcon(challenge.type)}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      {challenge.timeLimit}s
                    </Badge>
                    {challenge.completed && <Badge className="bg-green-600 text-white border-0">COMPLETADO</Badge>}
                  </div>
                </div>
                <CardTitle
                  className={`
                  text-lg group-hover:text-cyan-400 transition-colors
                  ${challenge.completed ? "text-green-400" : "text-white"}
                `}
                >
                  {challenge.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <Badge className={`${getTypeColor(challenge.type)} text-white border-0`}>
                    {challenge.type.toUpperCase()}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Status */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-black/60 backdrop-blur-lg border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Estado de NEXUS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Control de Sistema:</span>
                  <span className="text-red-400 font-bold">{100 - playerProgress}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Resistencia Activa:</span>
                  <span className="text-green-400 font-bold">{playerProgress}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amenaza:</span>
                  <span className="text-orange-400 font-bold">CRÍTICA</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 backdrop-blur-lg border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Sistemas Libres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Linux Kernel:</span>
                  <span className="text-green-400">ACTIVO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Open Source Tools:</span>
                  <span className="text-green-400">PROTEGIDO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Comunidad Dev:</span>
                  <span className="text-green-400">RESISTIENDO</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 backdrop-blur-lg border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Log del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-xs space-y-1">
                <div className="text-red-400">[ERROR] NEXUS: Protocolo 7 activado</div>
                <div className="text-yellow-400">[WARN] Sistemas críticos comprometidos</div>
                <div className="text-green-400">[INFO] Resistencia: Ingeniero conectado</div>
                <div className="text-cyan-400 animate-pulse">[LIVE] Esperando comandos...</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
