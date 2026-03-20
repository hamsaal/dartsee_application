import { db } from '../../db'
import { AppError } from '../../middleware/error.middleware'
import type { Game, GamesListResponse } from './games.types'

export const getAllGames = async (): Promise<GamesListResponse> => {
  try {
    const { rows } = await db.query<Game>('SELECT id, type FROM games ORDER BY id DESC')
    const count = await db.query<{ count: string }>('SELECT COUNT(*) as count FROM games')
    return {
      data: rows,
      total: parseInt(count.rows[0].count),
    }
  } catch {
    throw new AppError(500, 'Failed to fetch games')
  }
}
