import { getAllGames } from './games.repository'
import type { GamesListResponse } from './games.types'

export const getGames = async (page: number, limit: number): Promise<GamesListResponse> => {
  return getAllGames(page, limit)
}
