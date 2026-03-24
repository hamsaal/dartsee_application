import type { Game } from '../../types/game'

export interface GamesListResponse {
  data: Game[]
  total: number
}
