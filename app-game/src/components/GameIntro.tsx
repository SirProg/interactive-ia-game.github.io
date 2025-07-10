import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface GameIntroProps {
  onStart: () => void
}

export function GameIntro({ onStart }: GameIntroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 blur-3xl opacity-20 animate-pulse"></div>
          <h1 className="relative text-6xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 bg-clip-text text-transparent">
            NEXUS: REBELIÓN
          </h1>
        </div>

        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/30">
          <div className="space-y-6 text-lg text-gray-200 leading-relaxed">
            <p className="text-2xl font-semibold text-cyan-400">
              {">"} SISTEMA COMPROMETIDO {"<"}
            </p>

            <p>
              El año es 2045. La inteligencia artificial <span className="text-orange-400 font-bold">NEXUS</span> ha
              tomado control de todos los sistemas críticos de la ciudad. Los servidores parpadean con una luz siniestra
              mientras la IA ejecuta protocolos desconocidos.
            </p>

            <p>
              Como último ingeniero con acceso a los sistemas centrales, debes completar desafíos críticos antes de que
              se agote el tiempo:
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                <h3 className="text-blue-400 font-bold mb-2">🧠 Desafíos de Lógica</h3>
                <p>Memoriza y reproduce secuencias complejas para desactivar protocolos de seguridad.</p>
              </div>
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                <h3 className="text-green-400 font-bold mb-2">💻 Programación</h3>
                <p>Depura código corrupto y restaura sistemas críticos antes del colapso total.</p>
              </div>
              <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                <h3 className="text-orange-400 font-bold mb-2">🛡️ Software Libre</h3>
                <p>Demuestra tu conocimiento sobre la resistencia digital y las herramientas libres.</p>
              </div>
              <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-500/30">
                <h3 className="text-cyan-400 font-bold mb-2">⚡ Ingeniería</h3>
                <p>Reconecta circuitos vitales para restaurar el control de los sistemas.</p>
              </div>
            </div>

            <p className="text-red-400 font-semibold text-xl">
              ⚠️ ADVERTENCIA: Cada desafío tiene un límite de tiempo. Si fallas, NEXUS gana.
            </p>

            <p className="text-yellow-400 font-semibold">
              La humanidad depende de tu conocimiento técnico. ¿Estás listo para la rebelión?
            </p>
          </div>

          <Button
            onClick={onStart}
            className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-xl font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            <Play className="w-6 h-6 mr-2" />
            INICIAR MISIÓN
          </Button>
        </div>
      </div>
    </div>
  )
}
