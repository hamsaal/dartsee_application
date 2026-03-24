export interface ThrowData {
  id: number
  score: number
  modifier: number
  x: number
  y: number
}

export interface PlayerAnalysisResponse {
  player: {
    id: string
    name: string
  }
  game: {
    id: number
    type: string
  }
  throws: ThrowData[]
}

export interface Round {
  number: number
  throws: ThrowData[]
  total: number
  isComplete: boolean
}
