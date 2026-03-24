import type { Game } from '../common/types'

export interface PlayerRow {
  id: string
  name: string
  score: number | null
  modifier: number | null
}

export interface Player {
  id: string
  name: string
  avg_score: number
  miss_count: number
}

export interface RawGameDetail extends Game {
  playerRows: PlayerRow[]
}

export interface GameDetail extends Game {
  players: Player[]
}
