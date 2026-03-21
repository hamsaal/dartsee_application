export interface Game {
  id: number
  type: string
}

export interface GamesListResponse {
  data: Game[]
  total: number
}

export interface PlayerThrow {
  score: number
  modifier: number
}

export interface Player {
  id: string
  name: string
  avg_score: number
  miss_count: number
}

export interface PlayerRow {
  id: string
  name: string
  score: number | null
  modifier: number | null
}

export interface RawGameDetail extends Game {
  playerRows: PlayerRow[]
}

export interface GameDetail extends Game {
  players: Player[]
}
