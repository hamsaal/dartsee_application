import { db } from '../../../db'
import { AppError } from '../../../middleware/error.middleware'
import { LIST_QUERIES } from './queries'
import type { Game } from '../common/types'
import type { GamesListResponse } from './types'

export const getAllGames = async (page: number, limit: number): Promise<GamesListResponse> => {
  try {
    const { getAllGames, countGames } = LIST_QUERIES
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
