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
