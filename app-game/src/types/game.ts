export interface Challenge {
  id: string
  title: string
  type: "logic" | "programming" | "libre" | "engineering"
  difficulty: number
  description: string
  story: string
  completed: boolean
  timeLimit: number
}

export interface GameState {
  currentScreen: "intro" | "playing" | "challenge" | "gameOver" | "victory"
  currentChallenge: Challenge | null
  playerProgress: number
  gameTime: number
  isPlaying: boolean
  challenges: Challenge[]
}

export interface LogicGameState {
  sequence: number[]
  playerSequence: number[]
  showingSequence: boolean
  currentStep: number
  gameActive: boolean
}

export interface ProgrammingGameState {
  currentQuestion: number
  selectedAnswers: string[]
  questions: Array<{
    code: string
    question: string
    options: string[]
    correct: string
  }>
}

export interface LibreGameState {
  currentQuestion: number
  selectedAnswer: string | null
  questions: Array<{
    question: string
    options: string[]
    correct: string
    explanation: string
  }>
}

export interface CircuitGameState {
  connections: Array<{ from: string; to: string }>
  requiredConnections: Array<{ from: string; to: string }>
  selectedPoint: string | null
  points: Array<{ id: string; x: number; y: number; type: "input" | "output" | "component" }>
}