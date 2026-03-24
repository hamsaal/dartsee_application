import type { Game } from '../common/types'

export interface GamesListResponse {
  data: Game[]
  total: number
}
