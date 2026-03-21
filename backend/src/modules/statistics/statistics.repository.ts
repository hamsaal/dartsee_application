import { db } from '../../db'
import { AppError } from '../../middleware/error.middleware'
import { STATISTICS_QUERIES } from './statistics.queries'
import type { GameTypeStats } from './statistics.types'

export const getGameTypeStats = async (): Promise<GameTypeStats[]> => {
  try {
    const { getGameTypeStats: getGameTypeStatsQuery } = STATISTICS_QUERIES
    const { rows } = await db.query<GameTypeStats>(getGameTypeStatsQuery)
    return rows.map((row) => ({
      type: row.type,
      count: Number(row.count),
    }))
  } catch {
    throw new AppError(500, 'Failed to fetch game type report')
  }
}
