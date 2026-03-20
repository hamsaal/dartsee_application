import { getAllGames } from './games.repository'
import type { GamesListResponse } from './games.types'

export const getGames = async (): Promise<GamesListResponse> => {
  return getAllGames()
}
