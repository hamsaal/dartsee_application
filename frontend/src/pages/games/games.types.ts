export interface Game {
  id: number
  type: string
}

export interface GamesListResponse {
  data: Game[]
  total: number
}
export interface Player {
  id: string
  name: string
  avg_score: number
  miss_count: number
}

export interface GameDetail {
  id: number
  type: string
  players: Player[]
}
