import { db } from '../../db'
import { AppError } from '../../middleware/error.middleware'
import { GAMES_QUERIES } from './games.queries'
import type { Game, GamesListResponse, RawGameDetail, PlayerRow } from './games.types'

export const getAllGames = async (page: number, limit: number): Promise<GamesListResponse> => {
  try {
    const { getAllGames, countGames } = GAMES_QUERIES
    const offset = (page - 1) * limit
    const { rows } = await db.query<Game>(getAllGames, [limit, offset])
    const count = await db.query<{ count: string }>(countGames)
    return {
      data: rows,
      total: parseInt(count.rows[0].count),
    }
  } catch {
    throw new AppError(500, 'Failed to fetch games')
  }
}

export const getGameById = async (id: number): Promise<RawGameDetail | null> => {
  try {
    const { getGameById: getGameByIdQuery, getPlayersByGameId } = GAMES_QUERIES
    const game = await db.query<Game>(getGameByIdQuery, [id])

    if (!game.rows[0]) return null

    const { rows } = await db.query<PlayerRow>(getPlayersByGameId, [id])

    return {
      ...game.rows[0],
      playerRows: rows,
    }
  } catch {
    throw new AppError(500, 'Failed to fetch game')
  }
}
