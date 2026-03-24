import { getAllGames } from './repository'
import type { GamesListResponse } from './types'

export const getGames = async (page: number, limit: number): Promise<GamesListResponse> => {
  return getAllGames(page, limit)
}
