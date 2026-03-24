import { db } from '../../../db'
import { AppError } from '../../../middleware/error.middleware'
import { GAME_TYPES_QUERIES } from './queries'
import type { GameTypeStats } from './types'

export const getGameTypeStats = async (): Promise<GameTypeStats[]> => {
  try {
    const { getGameTypeStats: getGameTypeStatsQuery } = GAME_TYPES_QUERIES
    const { rows } = await db.query<GameTypeStats>(getGameTypeStatsQuery)
    return rows.map((row) => ({
      type: row.type,
      count: Number(row.count),
    }))
  } catch {
    throw new AppError(500, 'Failed to fetch game type report')
  }
}
