export interface ThrowData {
  id: number
  score: number
  modifier: number
  x: number
  y: number
}

export interface PlayerInfo {
  id: string
  name: string
}

export interface GameInfo {
  id: number
  type: string
}

export interface PlayerAnalysisResponse {
  player: PlayerInfo
  game: GameInfo
  throws: ThrowData[]
}
